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
    setup_database(pool, async () => {
        await loginAll();
        done()
    });
});

beforeEach( done => {
    setup_database(pool, done);
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
    console.log("Admin token: " + adminToken + "\nPublic token: " + publicToken + "\nUser token: " + userToken);
}


it("Can add a ticket and edit it", async done => {
    let ticket = {
        commune: "Vik",
        lat: 63.42972,
        long: 10.39333,
        title: "Tezt",
        description: "This is a description",
        category: "Sykkel"
    }

    let addTicketRes = await fetch(fetch_url + "ticket", {
        method: "POST",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        },
        body: JSON.stringify(ticket)
    });
    expect(addTicketRes.status).toBe(200);

    let resData = await addTicketRes.json();
    const insertId = resData.insertId;
    let getTicketRes = await fetch(fetch_url + "ticket/" + insertId, {
        method: "GET",
        headers: HEADERS
    });
    let ticketData = await getTicketRes.json();
    expect(ticketData[0].title).toBe("Tezt");
    expect(ticketData[0].category).toBe("Sykkel");
    expect(ticketData[0].description).toBe("This is a description");
    expect(ticketData[0].picture).toBe("logo.png");
    expect(ticketData[0].status).toBe("Ubehandlet");

    const newTicket = {
        category: "Vinterdrift",
        submitter_email: userMail,
        title: "Ost",
        description: "Changed desc",
        lat: 20.3,
        long: 50.2
    }

    let editTicketRes = await fetch(fetch_url + "ticketedit/" + insertId, {
        method: "PUT",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        },
        body: JSON.stringify(newTicket)
    });
    let editTicketJson = await editTicketRes.json()
    expect(editTicketRes.status).toBe(200);
    expect(editTicketJson.affectedRows).toBe(1);


    getTicketRes = await fetch(fetch_url + "ticket/" + insertId, {
        method: "GET",
        headers: HEADERS
    });
    ticketData = await getTicketRes.json();

    expect(ticketData[0].title).toBe(newTicket.title);
    expect(ticketData[0].category).toBe(newTicket.category);
    expect(ticketData[0].description).toBe(newTicket.description);
    expect(ticketData[0].lat).toBe(newTicket.lat);
    expect(ticketData[0].lng).toBe(newTicket.long);
    done();
})

it("Public worker can edit status on ticket if from correct commune", async done => {
    const ticketId = 9;
    const newStatus = {
        status: "Fullført",
        statusText: "Git gud",
        responsible_commune: "Vik"
    }
    let editStatusRes = await fetch(fetch_url + "ticketstatus/" + ticketId, {
        method: "PUT",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + publicToken
        },
        body: JSON.stringify(newStatus)
    });
    expect(editStatusRes.status).toBe(200);
    let statusData = await editStatusRes.json();
    expect(statusData.affectedRows).toBe(1);

    let getTicketRes = await fetch(fetch_url + "ticket/" + ticketId, {
        method: "GET",
        headers: HEADERS
    });
    let ticketData = await getTicketRes.json();
    expect(ticketData[0].status).toBe("Fullført");
    done();
})

it("Public worker cannot edit status for a ticket not located in their respective commune", async done => {
    const ticketId = 10;
    const newStatus = {
        status: "Fullført",
        statusText: "Git gud"
    }
    let editStatusRes = await fetch(fetch_url + "ticketstatus/" + ticketId, {
        method: "PUT",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + publicToken
        },
        body: JSON.stringify(newStatus)
    });
    expect(editStatusRes.status).toBe(403);
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