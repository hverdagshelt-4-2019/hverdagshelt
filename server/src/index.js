import {create_app} from './server.js'
import mysql from "mysql2";
import config from "../config"

let pool = mysql.createPool(config.mysql);

let app = create_app(pool);

let server = app.listen(config.port);

console.log("Listening on port", config.port);

