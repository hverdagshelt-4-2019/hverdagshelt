import {create_app} from '../src/server.js'
import mysql from "mysql2";

let pool = mysql.createPool({
  connectionLimit: 2,
  host: 'localhost',
  user: 'root',
  password: 'qwerty',
  database: 'hverdagshelt_test',
  debug: false
});

let app = create_app(pool);

let server = app.listen(3001);
