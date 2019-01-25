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

let normalToken;
let adminToken;
let userToken;
let publicToken;

const userMail = "person2@mail.no";
const adminMail = "person17@mail.no";
const publicMail = "person1@mail.no";
const normalMail = "person10@mail.no";

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
    normalToken = await loginFetch(normalMail, "password10");
    // console.log("Admin token: " + adminToken + "\nPublic token: " + publicToken + "\nUser token: " + userToken);
}


it("Can add a ticket and edit it", async done => {
    let ticket = {
        commune: "Vik",
        lat: 63.42972,
        lng: 10.39333,
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
        lng: 50.2
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
    expect(ticketData[0].lng).toBe(newTicket.lng);
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

it("Can get tickets by commune", async done => {
    const commune = "Sel";
    let ticketRes = await fetch(fetch_url + "ticketsMap/" + commune, {
        method: "GET",
        headers: HEADERS
    });
    let ticketData = await ticketRes.json();
    expect(ticketRes.status).toBe(200);
    expect(ticketData.length).not.toBeLessThan(1);
    done();
})

it("Public worker can set responsibility and get tickets by responsible company", async done => {
    const comp = "Drogas";
    const body = {
        name: comp
    }
    const ticketId = 2;
    let resp = await fetch(fetch_url + "ticketcomp/" + ticketId, {
        method: "PUT",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + publicToken
        },
        body: JSON.stringify(body)
    });
    let data = await resp.json();
    expect(resp.status).toBe(200);
    expect(data.affectedRows).toBe(1);

    let getTicketRes = await fetch(fetch_url + "ticket/" + ticketId, {
        method: "GET",
        headers: HEADERS
    });
    let ticketData = await getTicketRes.json();
    console.log(ticketData);
    expect(getTicketRes.status).toBe(200);
    expect(ticketData[0].company_name).toBe(comp);

    let ticketRes = await fetch(fetch_url + "tickets", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + publicToken
        }
    });
    ticketData = await ticketRes.json();
    console.log(ticketData);
    expect(ticketRes.status).toBe(200);
    expect(ticketData.length).toBe(1);
    done();
})

it("Admin can delete tickets", async done => {
    const ticketId = 2;
    const body = {
        submitter_id: 2
    }
    let deleteRes = await fetch(fetch_url + "ticket/" + ticketId, {
        method: "DELETE",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + adminToken
        },
        body: JSON.stringify(body)
    });
    console.log(deleteRes);
    let deleteData = await deleteRes.json();
    expect(deleteRes.status).toBe(200);
    expect(deleteData.affectedRows).toBe(1);

    let getTicketRes = await fetch(fetch_url + "ticket/" + ticketId, {
        method: "GET",
        headers: HEADERS
    });
    let getTicketData = await getTicketRes.json();
    expect(getTicketRes.status).toBe(200);
    expect(getTicketData).toEqual([])
    done();
})

it("Get all tickets", async done => {
    let ticketRes = await fetch(fetch_url + "tickets", {
        method: "GET",
        headers: HEADERS
    });
    let ticketData = await ticketRes.json();
    expect(ticketRes.status).toBe(200);
    expect(ticketData.length).toBe(20);
    done();
})

it("Get all tickets as public worker", async done => {
    let ticketRes = await fetch(fetch_url + "tickets", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + publicToken
        }
    });
    let ticketData = await ticketRes.json();
    expect(ticketRes.status).toBe(200);
    expect(ticketData.length).toBe(1);
    done();
})

it("Get all tickets as admin", async done => {
    let ticketRes = await fetch(fetch_url + "tickets", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + adminToken
        }
    });
    let ticketData = await ticketRes.json();
    expect(ticketRes.status).toBe(200);
    expect(ticketData.length).toBe(20);
    done();
})

it("Can get all tickets from the communes the user is following", async done => {
    let ticketRes = await fetch(fetch_url + "tickets", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + normalToken
        }
    });
    let ticketData = await ticketRes.json();
    expect(ticketRes.status).toBe(200);
    expect(ticketData.length).toBe(0);

    const commune = "Sel";
    ticketRes = await fetch(fetch_url + "followCommune/" + commune, {
        method: "POST",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + normalToken
        }
    });
    ticketData = await ticketRes.json();
    expect(ticketRes.status).toBe(200);
    expect(ticketData.affectedRows).toBe(1);

    ticketRes = await fetch(fetch_url + "tickets", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + normalToken
        }
    });
    ticketData = await ticketRes.json();
    expect(ticketRes.status).toBe(200);
    expect(ticketData.length).toBe(1);
    done();
})

it("Can get tickets by user", async done => {
    let ticketRes = await fetch(fetch_url + "ticketsByUser", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        }
    })
    let ticketData = await ticketRes.json();
    expect(ticketData.length).toBe(2);
    expect(ticketRes.status).toBe(200);
    done();
})

it("Cant get ticket if not logged in", async done => {
    let ticketRes = await fetch(fetch_url + "ticketsByUser", {
        method: "GET",
        headers: HEADERS
    })
    expect(ticketRes.status).toBe(401);
    done();
})

it("Get tickets by company given commune", async done => {
    const commune = "Vik";
    let ticketRes = await fetch(fetch_url + "ticketsMap/" + commune, {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        }
    });
    let ticketData = await ticketRes.json();
    expect(ticketRes.status).toBe(200);
    expect(ticketData.length).toBe(0);
    done();
})

it("Get tickets by company given commune", async done => {
    const commune = "Vik";
    let ticketRes = await fetch(fetch_url + "ticketsMap/" + commune, {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        }
    });
    let ticketData = await ticketRes.json();
    expect(ticketRes.status).toBe(200);
    expect(ticketData.length).toBe(0);
    done();
})

it("Get tickets as public worker given commune", async done => {
    const commune = "Vik";
    let ticketRes = await fetch(fetch_url + "ticketsMap/" + commune, {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + publicToken
        }
    });
    let ticketData = await ticketRes.json();
    expect(ticketRes.status).toBe(200);
    expect(ticketData.length).toBe(1);
    done();
})

it("Get tickets as admin given commune", async done => {
    const commune = "Vik";
    let ticketRes = await fetch(fetch_url + "ticketsMap/" + commune, {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + adminToken
        }
    });
    let ticketData = await ticketRes.json();
    expect(ticketRes.status).toBe(200);
    expect(ticketData.length).toBe(1);
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