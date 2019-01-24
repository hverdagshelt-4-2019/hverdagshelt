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

it("Can get all comments", async done => {
    const ticketId = 2;
    let commentRes = await fetch(fetch_url + "comments/" + ticketId, {
        method: "GET",
        headers: HEADERS
    });
    let commentData = await commentRes.json();
    expect(commentRes.status).toBe(200);
    expect(commentData.length).toBe(10);
    const desc = "This trailer really starts at 3:00";
    expect(commentData).toEqual(expect.arrayContaining([expect.objectContaining({description: desc})]));
    done();
})

it("User can add comment", async done => {
    const id = 2;
    let commentRes = await fetch(fetch_url + "comments/" + id, {
        method: "GET",
        headers: HEADERS
    });
    console.log(commentRes)
    let commentData = await commentRes.json();
    expect(commentRes.status).toBe(200);
    const prevLength = commentData.length;

    const newComment = {
        description: "Best description since Shakespeare"
    }
    commentRes = await fetch(fetch_url + "comment/" + id, {
        method: "POST",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        },
        body: JSON.stringify(newComment)
    });
    commentData = await commentRes.json();
    expect(commentRes.status).toBe(200);
    expect(commentData.affectedRows).toBe(1);

    commentRes = await fetch(fetch_url + "comments/" + id, {
        method: "GET",
        headers: HEADERS
    });
    commentData = await commentRes.json();
    expect(commentRes.status).toBe(200);
    expect(commentData.length).toBe(prevLength + 1);
    expect(commentData).toEqual(expect.arrayContaining([expect.objectContaining({description: newComment.description})]));
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