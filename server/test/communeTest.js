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

it("Can get all communes", async done => {
    let communeRes = await fetch(fetch_url + "communes", {
        method: "GET",
        headers: HEADERS
    });
    let communeData = await communeRes.json();
    expect(communeRes.status).toBe(200);
    expect(communeData.length).toBe(421);
    done();
})

it("Get followed communes", async done => {
    let communeRes = await fetch(fetch_url + "followedCommunes", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        }
    });
    let communeData = await communeRes.json();
    expect(communeRes.status).toBe(200);
    expect(communeData.length).toBe(1);
    expect(communeData).toEqual(expect.arrayContaining([expect.objectContaining({commune_name: "Fredrikstad"})]));
    done();
})

it("Get unfollowed communes for a user", async done => {
    let communeRes = await fetch(fetch_url + "unFollowedCommunes", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        }
    });
    let communeData = await communeRes.json();
    expect(communeRes.status).toBe(200);
    expect(communeData.length).toBe(420);
    done();
})

it("User can follow a commune", async done => {
    const com = "Oslo";
    let communeRes = await fetch(fetch_url + "followedCommunes", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        }
    });
    let communeData = await communeRes.json();
    expect(communeRes.status).toBe(200);
    expect(communeData.length).toBe(1);
    expect(communeData).not.toEqual(expect.arrayContaining([expect.objectContaining({commune_name: com})]));

    communeRes = await fetch(fetch_url + "followCommune/" + com, {
        method: "POST",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        }
    });
    communeData = await communeRes.json();
    expect(communeRes.status).toBe(200);
    expect(communeData.affectedRows).toBe(1);

    communeRes = await fetch(fetch_url + "followedCommunes", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        }
    });
    communeData = await communeRes.json();
    expect(communeRes.status).toBe(200);
    expect(communeData.length).toBe(2);
    expect(communeData).toEqual(expect.arrayContaining([expect.objectContaining({commune_name: com})]));
    done();
})

it("User can unfollow a commune", async done => {
    const com = "Fredrikstad";
    let communeRes = await fetch(fetch_url + "unfollowCommune/" + com, {
        method: "DELETE",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        }
    });
    let communeData = await communeRes.json();
    expect(communeRes.status).toBe(200);
    expect(communeData.affectedRows).toBe(1);

    communeRes = await fetch(fetch_url + "unfollowedCommunes", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        }
    });
    communeData = await communeRes.json();
    expect(communeRes.status).toBe(200);
    expect(communeData.length).toBe(421);
    expect(communeData).toEqual(expect.arrayContaining([expect.objectContaining({commune_name: com})]));

    communeRes = await fetch(fetch_url + "followedCommunes", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        }
    });
    communeData = await communeRes.json();
    expect(communeRes.status).toBe(200);
    expect(communeData.length).toBe(0);
    expect(communeData).not.toEqual(expect.arrayContaining([expect.objectContaining({commune_name: com})]));
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