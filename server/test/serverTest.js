import {create_app} from "../src/server"
import config from "../config"
import mysql from "mysql2"
import fetch from "node-fetch"
import setup_database from "./setup_database"

let fetch_url = `http://localhost:${config.test.port}/`;
let HEADERS = {
    "Content-Type": "application/json; charset=utf-8"
};

let fetch_get = {
    method: "GET",
    headers: HEADERS
};

let pool, app, server;
beforeEach( done => {
    pool = mysql.createPool(config.test.mysql);
    app = create_app(pool);
    server = app.listen(config.test.port);
    setup_database(pool, done);
});

test("create app", done => {
    fetch(fetch_url, fetch_get)
        .catch(err => {
            console.log(err);
            expect(err).toBe(null);
            server.close();
            done();
        }).then(() => {
        server.close();
        done()
    });
});

describe("person API", ()=>{
    it("gets person", (done) => {
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

    it("registers a user, and can then log in as them", done => {
        let user = {
            email: "testUser@mail.com",
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
                console.log(res);
                done();
            })
        })
    });
});


afterEach((done) => {
    server.close();
    done();
});