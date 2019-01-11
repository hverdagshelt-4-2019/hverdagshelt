import mysql from "mysql";
import fs from "fs";
import path from "path";

export default function(pool: mysql.Pool, done) {
    let setup = fs.readFileSync(path.join(__dirname, '..', 'sql','setup.sql'));
    let communes = fs.readFileSync(path.join(__dirname, '..', 'sql','communes.sql'), 'utf8');
    let users = fs.readFileSync(path.join(__dirname, '..', 'sql','users.sql'));
    let testdata = fs.readFileSync(path.join(__dirname, '..', 'sql','testdata.sql'));
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("runsqlfile: error connecting");
            console.log(err);
            done();
        } else {
            connection.query(setup+communes+users+testdata, (err, rows) => {
                connection.release();
                if (err) {
                    console.log(err);
                    done();
                } else {
                    done();
                }
            });
        }
    });
}
