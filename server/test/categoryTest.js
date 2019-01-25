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

it("Get all ticket categories", async done => {
    let ticketRes = await fetch(fetch_url + "ticketcat", {
        method: "GET",
        headers: HEADERS
    });
    let ticketData = await ticketRes.json();
    expect(ticketRes.status).toBe(200);
    expect(ticketData.length).toBe(6);
    done();
})

it("Can create a ticket category as admin and then delete it", async done => {
    const newCat = {
        name: "Stoff"
    }
    let catRes = await fetch(fetch_url + "ticketcat", {
        method: "POST",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + adminToken
        },
        body: JSON.stringify(newCat)
    });
    let catData = await catRes.json();
    expect(catRes.status).toBe(200);
    expect(catData.affectedRows).toBe(1);

    catRes = await fetch(fetch_url + "ticketcat", {
        method: "GET",
        headers: HEADERS
    });
    catData = await catRes.json();
    expect(catRes.status).toBe(200);
    expect(catData.length).toBe(7);
    expect(catData).toEqual(expect.arrayContaining([expect.objectContaining({name: newCat.name})]));

    catRes = await fetch(fetch_url + "ticketCategory/" + newCat.name, {
        method: "DELETE",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + adminToken
        }
    });
    catData = await catRes.json();
    expect(catRes.status).toBe(200);
    expect(catData.affectedRows).toBe(1);

    catRes = await fetch(fetch_url + "ticketcat", {
        method: "GET",
        headers: HEADERS
    });
    catData = await catRes.json();
    expect(catRes.status).toBe(200);
    expect(catData.length).toBe(6);
    expect(catData).not.toEqual(expect.arrayContaining([expect.objectContaining({name: newCat.name})]));
    done();
})

it("Can get event categories", async done => {
    let catRes = await fetch(fetch_url + "eventcat", {
        method: "GET",
        headers: HEADERS
    });
    let catData = await catRes.json();
    expect(catRes.status).toBe(200);
    expect(catData.length).toBe(5);
    expect(catData).toEqual(expect.arrayContaining([expect.objectContaining({name: "Tivoli"})]));
    done();
})

it("Admin can create event category and then delete it", async done => {
    const newCat = {
        name: "Tezt"
    }
    let catRes = await fetch(fetch_url + "eventcat", {
        method: "POST",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + adminToken
        },
        body: JSON.stringify(newCat)
    });
    let catData = await catRes.json();
    expect(catRes.status).toBe(200);
    expect(catData.affectedRows).toBe(1);

    catRes = await fetch(fetch_url + "eventcat", {
        method: "GET",
        headers: HEADERS
    });
    catData = await catRes.json();
    expect(catRes.status).toBe(200);
    expect(catData.length).toBe(6);
    expect(catData).toEqual(expect.arrayContaining([expect.objectContaining({name: newCat.name})]));

    catRes = await fetch(fetch_url + "happeningCategory/" + newCat.name, {
        method: "DELETE",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + adminToken
        }
    });
    catData = await catRes.json();
    expect(catRes.status).toBe(200);
    expect(catData.affectedRows).toBe(1);

    catRes = await fetch(fetch_url + "eventcat", {
        method: "GET",
        headers: HEADERS
    });
    catData = await catRes.json();
    expect(catRes.status).toBe(200);
    expect(catData.length).toBe(5);
    expect(catData).not.toEqual(expect.arrayContaining([expect.objectContaining({name: newCat.name})]));
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