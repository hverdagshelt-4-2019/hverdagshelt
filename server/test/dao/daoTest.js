import Dao from "../../src/dao/dao"
import config from "../../config"
import mysql from "mysql2"

test("Queries correctly", done => {
    let pool = mysql.createPool(config.test.mysql);
    let dao = new Dao(pool);
    dao.query("SELECT * FROM person", [], (status, rows) => {
        expect(status).toBe(200);
        done();
    })
});

test("Reports faulty connection", done => {
    let pool = mysql.createPool({});
    let dao = new Dao(pool);
    dao.query("SELECT * FROM person", [], (status, rows) => {
        expect(status).toBe(500);
        done();
    })
});