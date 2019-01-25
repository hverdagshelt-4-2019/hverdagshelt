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

it("Can get amount of tickets nationally", async done => {
    let statRes = await fetch(fetch_url + "ticketAmountNationally", {
        method: "GET",
        headers: HEADERS
    });
    let statData = await statRes.json();
    expect(statRes.status).toBe(200);
    expect(statData[0].amount).toBe(20);
    done();
})

it("Get finished tickets nationally", async done => {
    let statRes = await fetch(fetch_url + "solvedTicketsNationally", {
        method: "GET",
        headers: HEADERS
    });
    let statData = await statRes.json();
    expect(statRes.status).toBe(200);
    expect(statData[0].amount).toBe(20);
    done();
})

it("Get tickets by category", async done => {
    let statRes = await fetch(fetch_url + "getTicketAmountByCategoryNationally", {
        method: "GET",
        headers: HEADERS
    });
    let statData = await statRes.json();
    expect(statRes.status).toBe(200);
    expect(statData.length).toBe(6);
    done();
})

it("Can get ticket amount by month nationally", async done => {
    let statRes = await fetch(fetch_url + "getTicketAmountByMonthNationally", {
        method: "GET",
        headers: HEADERS
    });
    let statData = await statRes.json();
    expect(statRes.status).toBe(200);
    expect(statData.length).toBe(1);
    expect(statData[0].value).toBe(20);
    expect(statData[0].month).toBe(1);
    done();
})

it("Can get ticket amount locally by commune", async done => {
    const commune = "Trysil";
    let statRes = await fetch(fetch_url + "ticketAmountLocally/" + commune, {
        method: "GET",
        headers: HEADERS
    });
    let statData = await statRes.json();
    expect(statRes.status).toBe(200);
    expect(statData.length).toBe(1);
    expect(statData).toEqual([{amount: 1}]);
    done();
})

it("Can get solved tickets locally", async done => {
    const commune = "Trysil";
    let statRes = await fetch(fetch_url + "solvedTicketsLocally/" + commune, {
        method: "GET",
        headers: HEADERS
    });
    let statData = await statRes.json();
    expect(statRes.status).toBe(200);
    expect(statData.length).toBe(1);
    done();
})

it("Can get ticket amount by category locally", async done => {
    const commune = "Trysil";
    let statRes = await fetch(fetch_url + "getTicketAmountByCategoryLocally/" + commune, {
        method: "GET",
        headers: HEADERS
    });
    let statData = await statRes.json();
    expect(statRes.status).toBe(200);
    expect(statData.length).toBe(1);
    expect(statData[0].tickets_in_categories).toBe(1);
    done();
})

it("Can get tickets by month locally", async done => {
    const commune = "Trysil";
    let statRes = await fetch(fetch_url + "getTicketAmountByMonthLocally/" + commune, {
        method: "GET",
        headers: HEADERS
    });
    let statData = await statRes.json();
    expect(statRes.status).toBe(200);
    expect(statData.length).toBe(1);
    expect(statData[0].value).toBe(1);
    expect(statData[0].month).toBe(1);
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