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
    let comRes = await fetch(fetch_url + "events", {
        method: "GET",
        headers: HEADERS
    })
    let comData = await comRes.json();
    expect(comRes.status).toBe(200);
    expect(comData.length).toBe(18);
    done();
})

it("Can get an event", async done => {
    const id = 2;
    let comRes = await fetch(fetch_url + "event/" + id, {
        method: "GET",
        headers: HEADERS
    })
    let comData = await comRes.json();
    expect(comRes.status).toBe(200);
    expect(comData.length).toBe(1);
    expect(comData[0].category).toBe("Tivoli");
    done();
})

it("Can create an event as admin", async done => {
    const json = {
        commune_name: "Sel",
        category: "Tivoli",
        title: "Tezt",
        description: "Lorem ipsum",
        picture: "lmao.kek",
        happening_time: "2018-12-12 10:30"
    }
    let eventRes = await fetch(fetch_url + "event", {
        method: "POST",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + adminToken
        },
        body: JSON.stringify(json)
    });
    let eventData = await eventRes.json();
    expect(eventRes.status).toBe(200);
    expect(eventData.affectedRows).toBe(1);
    const insertId = eventData.insertId;

    eventRes = await fetch(fetch_url + "event/" + insertId, {
        method: "GET",
        headers: HEADERS
    });
    eventData = await eventRes.json();
    expect(eventRes.status).toBe(200);
    expect(eventData[0].title).toBe(json.title);
    expect(eventData[0].category).toBe(json.category);
    expect(eventData[0].description).toBe(json.description);
    expect(eventData[0].commune_name).toBe(json.commune_name);
    done();
})

it("Create event as a public worker", async done => {
    const json = {
        category: "Karneval",
        title: "Tezt",
        description: "Lorem ipsum",
        picture: "lmao.kek",
        happening_time: "2018-12-12 10:30"
    }
    let eventRes = await fetch(fetch_url + "event", {
        method: "POST",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + publicToken
        },
        body: JSON.stringify(json)
    });
    let eventData = await eventRes.json();
    expect(eventRes.status).toBe(200);
    expect(eventData.affectedRows).toBe(1);
    const insertId = eventData.insertId;

    eventRes = await fetch(fetch_url + "event/" + insertId, {
        method: "GET",
        headers: HEADERS
    });
    eventData = await eventRes.json();
    expect(eventRes.status).toBe(200);
    expect(eventData[0].title).toBe(json.title);
    expect(eventData[0].category).toBe(json.category);
    expect(eventData[0].description).toBe(json.description);
    done();
})

it("Normal users cannot create events", async done => {
    const json = {
        category: "Tivoli",
        title: "Hei",
        description: "Teeeeest",
        picture: "Heider.jps",
        happening_time: "2017-02-12 14:56"
    }
    let eventRes = await fetch(fetch_url + "event", {
        method: "POST",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        },
        body: JSON.stringify(json)
    });
    expect(eventRes.status).toBe(403);
    done();
})

it("Can edit an event", async done => {
    const id = 2;
    const json = {
        category: "Karneval",
        title: "Best event 2019",
        description: "Updated",
        happening_time: "2019-01-01 10:00"
    }
    let eventRes = await fetch(fetch_url + "event/" + id, {
        method: "PUT",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + publicToken
        },
        body: JSON.stringify(json)
    });
    let eventData = await eventRes.json();
    expect(eventRes.status).toBe(200);
    expect(eventData.affectedRows).toBe(1);

    eventRes = await fetch(fetch_url + "event/" + id, {
        method: "GET",
        headers: HEADERS
    });
    eventData = await eventRes.json();
    expect(eventRes.status).toBe(200);
    expect(eventData[0].category).toBe(json.category);
    expect(eventData[0].title).toBe(json.title);
    expect(eventData[0].description).toBe(json.description);
    done();
})

it("Admin can delete an event", async done => {
    const eventId = 2;
    let eventRes = await fetch(fetch_url + "event/" + eventId, {
        method: "DELETE",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + adminToken
        }
    });
    let eventData = await eventRes.json();
    expect(eventRes.status).toBe(200);
    expect(eventData.affectedRows).toBe(1)

    eventRes = await fetch(fetch_url + "event/" + eventId, {
        method: "GET",
        headers: HEADERS
    })
    eventData = await eventRes.json();
    expect(eventRes.status).toBe(200);
    expect(eventData).toEqual([]);
    done();
})

it("Public worker can get events by commune", async done => {
    let eventRes = await fetch(fetch_url + "events", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + publicToken
        }
    });
    let eventData = await eventRes.json();
    expect(eventRes.status).toBe(200);
    expect(eventData.length).toBe(3);
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