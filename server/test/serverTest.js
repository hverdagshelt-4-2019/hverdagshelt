import {create_app} from "../src/server"
import config from "../config"
import mysql from "mysql2"
import fetch from "node-fetch"
import setup_database from "./setup_database"

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