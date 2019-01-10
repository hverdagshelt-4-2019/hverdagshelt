import {create_app} from "../src/server"
import config from "../config"
import mysql from "mysql2"
import fetch from "node-fetch"

let fetch_url = `http://localhost:${config.test.port}/`;
let fetch_get = {
    method: "GET",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    }
};

let pool, app, server;
beforeEach( done => {
    pool = mysql.createPool(config.test.mysql);
    app = create_app(pool);
    server = app.listen(config.test.port);
    done();
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

test("get person", (done) => {
    fetch(fetch_url+'users', fetch_get)
    .then(res => {
        expect(res.status).toBe(200);
        return res.json()
    })
    .then(res => {
        expect(res.length).toBeGreaterThan(1000);
        expect(res[0].email).toContain('@');
        done();
    });
});

afterEach((done) => {
    server.close();
    done();
});