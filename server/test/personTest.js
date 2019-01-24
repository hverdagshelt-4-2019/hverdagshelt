import setup_database from './setup_database';
import fetch from 'node-fetch';
import mysql from 'mysql2';
import config from '../config';
import { create_app } from '../src/server';

jest.setTimeout(10000);

let fetch_url = `http://localhost:${config.test.port}/`;
let HEADERS = {
    "Content-Type": "application/json; charset=utf-8"
};

let fetch_get = {
    method: "GET",
    headers: HEADERS
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

beforeAll( async done => {
    await setup_database(pool);
    done();
});

beforeEach( async done => {
    await setup_database(pool);
    done();
});

it("gets people", (done) => {
    fetch(fetch_url+'users', fetch_get)
        .then(res => {
            expect(res.status).toBe(200);
            return res.json()
        })
        .then(res => {
            expect(res.length).toBeGreaterThan(5);
            expect(res[0].email).toContain('@');
            done();
        });
});

it("can log in and delete itself", done => {
    let token;
    let user = {
        email: "person1@mail.no",
        password: "password1"
    };
    fetch(fetch_url+'login', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(res => {
            token = res.token;
            fetch(fetch_url+'user/'+user.email, {
                method: 'DELETE',
                headers: {
                    ...HEADERS,
                    Authorization: "Bearer "+token
                },
            })
                .then(res => {
                    expect(res.status).toBe(200);
                    return res.json();
                })
                .then(res => {
                    expect(res.affectedRows).toBe(1);
                    done();
                })
        });
});

it("can log in as admin and delete someone else", done => {
    let token;
    let user = {
        email: "person17@mail.no",
        password: "password17"
    };
    fetch(fetch_url+'login', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(res => {
            token = res.token;
            fetch(fetch_url+'user/'+"person1@mail.no", {
                method: 'DELETE',
                headers: {
                    ...HEADERS,
                    Authorization: "Bearer "+token
                },
            })
                .then(res => {
                    expect(res.status).toBe(200);
                    return res.json();
                })
                .then(res => {
                    expect(res.affectedRows).toBe(1);
                    done();
                })
        });
});

it("won't let you delete someone without login", done => {

    fetch(fetch_url+'user/'+"person1@mail.no", {
        method: 'DELETE',
        headers: HEADERS
    })
        .then(res => {
            expect(res.status).toBe(401);
            done();
        });
});

it("won't let you delete someone else without admin status", done => {
    let token;
    let user = {
        email: "person1@mail.no",
        password: "password1"
    };
    fetch(fetch_url+'login', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(res => {
            token = res.token;
            fetch(fetch_url+'user/'+"person2@mail.no", {
                method: 'DELETE',
                headers: {
                    ...HEADERS,
                    Authorization: "Bearer "+token
                },
            })
                .then(res => {
                    expect(res.status).toBe(403);
                    done();
                })
        });
});

it("can log in and change a users email", done => {
    let token;
    let user = {
        email: "person1@mail.no",
        password: "password1"
    };
    let newmail = "person1edit@mail.no";
    fetch(fetch_url+'login', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(res => {
        token = res.token;
        fetch(fetch_url+'usermail/'+user.email, {
            method: 'PUT',
            headers: {
                ...HEADERS,
                Authorization: "Bearer "+token
            },
            body: JSON.stringify({email: newmail})
        })
        .then(res => {
            expect(res.status).toBe(200);
            return res.json();
        })
        .then(res => {
            expect(res.token).not.toBeUndefined();
            fetch(fetch_url+'login', {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify(user)
            })
            .then(res => {
                expect(res.status).toBe(401);
                user.email = newmail;
            });
            done();
        })
    });
});


it("can log in and change a users password", async done => {
    let token;
    let user = {
        email: "person1@mail.no",
        password: "password1"
    };
    let newPassword = "password1new";
    let loginRes = await fetch(fetch_url+'login', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(user)
    });
    let loginRows = await loginRes.json();
    token = loginRows.token;
    let userpassRes = await fetch(fetch_url+'userpass/', {
        method: 'PUT',
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + token
        },
        body: JSON.stringify({ newPassword, oldPassword: user.password })
    });
    expect(userpassRes.status).toBe(200);

    let loginOldRes = await fetch(fetch_url+'login', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(user)
    });
    expect(loginOldRes.status).toBe(401);

    user.password = newPassword;
    let loginNewRes = await fetch(fetch_url+'login', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(user)
    });
    expect(loginNewRes.status).toBe(200);
    let loginNewRows = await loginNewRes.json();
    expect(loginNewRows.token).not.toBeUndefined();
    done();
});

it("registers a user, and can then log in them", done => {
    let user = {
        email: "testUser@mail.com",
        name: "testuser",
        commune: 'Harstad',
        password: "testpassword96"
    };

    fetch(fetch_url+'user', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(user)
    })
    .then(res => {
        expect(res.status).toBe(200);
        return res.json();
    })
    .then(res => {
        expect(res.affectedRows).toBe(1);

        fetch(fetch_url+'login', {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(user)
        })
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.token).not.toBeNull()
        })
        .then(res => {
            done();
        })
    })
});

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