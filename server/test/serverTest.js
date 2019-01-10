import {create_app} from "../src/server"
import config from "../config"
import mysql from "mysql2"
import fetch from "node-fetch"

test("create app", done => {
    let pool = mysql.createPool(config.test.mysql);
    let app = create_app(pool);
    let server = app.listen(config.test.port);
    fetch(`http://localhost:${config.test.port}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    }).catch(err => {
        console.log(err);
        expect(err).toBe(null);
        server.close();
        done();
    }).then(() => {
        server.close();
        done()
    });
});