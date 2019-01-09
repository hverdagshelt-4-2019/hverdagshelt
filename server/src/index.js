import {create_app} from './server.js'
import mysql from "mysql2";

var pool = mysql.createPool({
    connectionLimit: 2,
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'hverdagshelt_dev',
    debug: false
});

let app = create_app(pool);

let server = app.listen(3000);