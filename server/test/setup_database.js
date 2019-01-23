import mysql from "mysql2";
import fs from "fs";
import path from "path";

async function queryFile(fileContent, pool){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("setup_database: error connecting");
                console.log(err);
                reject()
            } else {
                connection.query(fileContent.toString(), (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        reject();
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
}
export default async function(pool: mysql.Pool, done) {
    let setup = fs.readFileSync(path.join(__dirname, '..', 'sql','setup.sql'));
    await queryFile(setup, pool);

    let communes = fs.readFileSync(path.join(__dirname, '..', 'sql','communes.sql'), 'utf8');
    await queryFile(communes, pool);

    let users = fs.readFileSync(path.join(__dirname, '..', 'sql','users.sql'));
    await queryFile(users, pool);

    let testdata = fs.readFileSync(path.join(__dirname, '..', 'sql','testdata.sql'));
    await queryFile(testdata, pool);

    done();

}
