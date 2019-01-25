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

it("Can get user info when logged in", async done => {
    let userRes = await fetch(fetch_url + "user", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        }
    });
    let userData = await userRes.json();
    expect(userRes.status).toBe(200);
    expect(userData.length).toBe(1);
    expect(userData[0].email).toBe("person2@mail.no");
    done();
})

it("Can't get user info when not logged in", async done => {
    let userRes = await fetch(fetch_url + "user", {
        method: "GET",
        headers: HEADERS
    });
    expect(userRes.status).toBe(401);
    done();
})

it("User can get level", async done => {
    let userRes = await fetch(fetch_url + "level", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + userToken
        }
    });
    let userData = await userRes.json();
    expect(userRes.status).toBe(200);
    expect(userData.level).toBe("company");

    userRes = await fetch(fetch_url + "level", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + publicToken
        }
    });
    userData = await userRes.json();
    expect(userRes.status).toBe(200);
    expect(userData.level).toBe("publicworker");

    userRes = await fetch(fetch_url + "level", {
        method: "GET",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + adminToken
        }
    });
    userData = await userRes.json();
    expect(userRes.status).toBe(200);
    expect(userData.level).toBe("admin");
    done();
})



it("Can get all public workers", async done => {
    let workRes = await fetch(fetch_url + "publicworkers", {
        method: "GET",
        headers: HEADERS
    });
    let workData = await workRes.json();
    expect(workRes.status).toBe(200);
    expect(workData.length).toBe(5);
    expect(workData).toEqual(expect.arrayContaining([expect.objectContaining({commune_name: "Oslo"})]));
    done();
})

it("Admin can create a new public worker", async done => {
    const newWorker = {
        email: "person10@mail.no",
        commune: "Oslo"
    }
    let workRes = await fetch(fetch_url + "publicworker", {
        method: "POST",
        headers: {
            ...HEADERS,
            Authorization: "Bearer " + adminToken
        },
        body: JSON.stringify(newWorker)
    });
    let workData = await workRes.json();
    expect(workRes.status).toBe(200);
    expect(workData.affectedRows).toBe(1);

    workRes = await fetch(fetch_url + "publicworkers", {
        method: "GET",
        headers: HEADERS
    });
    workData = await workRes.json();
    expect(workRes.status).toBe(200);
    expect(workData.length).toBe(6);
    expect(workData).toEqual(expect.arrayContaining([expect.objectContaining({commune_name: newWorker.commune})]));
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