import setup_database from './setup_database';
import fetch from 'node-fetch';
import mysql from 'mysql2';
import config from '../config';
import { create_app } from '../src/server';

jest.setTimeout(20000);

let fetch_url = `http://localhost:${config.test.port}/`;
let HEADERS = {
    "Content-Type": "application/json; charset=utf-8"
};

let pool, app, server, socketMap;
pool = mysql.createPool(config.test.mysql);
app = create_app(pool);
server = app.listen(config.test.port);
let lastSocketKey = 0;
socketMap = {};
server.on('connection', (socket) => {
    // generate a new, unique socket-key
    let socketKey = ++lastSocketKey;
    // add socket when it is connected
    socketMap[socketKey] = socket;
    socket.on('close', () => {
        // remove socket when it is closed
        delete socketMap[socketKey];
    });
});

let adminToken;
let userToken;
let publicToken;

const userMail = "person2@mail.no";
const adminMail = "person17@mail.no";
const publicMail = "person1@mail.no";

beforeAll(async done => {
    await setup_database(pool);
    await loginAll();
    done();
});

beforeEach( async done => {
    await setup_database(pool);
    done();
});


async function loginFetch(email, password) {
    const user = {
        email: email,
        password: password
    }
    let loginRes = await fetch(fetch_url+'login', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(user)
    });
    let loginRows = await loginRes.json();
    return loginRows.token;
}


async function loginAll() {
    adminToken = await loginFetch(adminMail, "password17");
    userToken = await loginFetch(userMail, "password2");
    publicToken = await loginFetch(publicMail, "password1");
// console.log("Admin token: " + adminToken + "\nPublic token: " + publicToken + "\nUser token: " + userToken);
}

it("Get all admins", async done => {
    let adminRes = await fetch(fetch_url + "admins", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: 'BEARER '+adminToken
        }
    });
    let adminData = await adminRes.json();
    expect(adminRes.status).toBe(200);
    expect(adminData.length).toBe(5);
    expect(adminData).toEqual(expect.arrayContaining([expect.objectContaining({id: 17})]));
    done();
})

it("Can create admin", async done => {
    const newAdmin = {
        email: "person1@mail.no"
    };

    let adminRes = await fetch(fetch_url + "admin", {
        method: "POST",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + adminToken
        },
        body: JSON.stringify(newAdmin)
    });
    let adminData = await adminRes.json();
    expect(adminRes.status).toBe(200);
    expect(adminData.affectedRows).toBe(1);

    const userId = 1;
    let userRes = await fetch(fetch_url + "admins", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: 'Bearer ' + adminToken
        }
    });
    expect(userRes.status).toBe(200);
    let userData = await userRes.json();
    expect(userData).toEqual(expect.arrayContaining([expect.objectContaining({id: userId})]));
    done();
})

afterAll((done) => {
    server.close(async () => {
        let promises = Object.keys(socketMap).map((key) => {
            return new Promise(async (resolve) => {
                socketMap[key].on('close', resolve);
                socketMap[key].destroy();
            })
        });
        await Promise.all(promises);
        pool.end();
        done()
    });
});