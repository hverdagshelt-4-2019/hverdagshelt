import {create_app} from './server.js'
import mysql from "mysql2";
import config from "../config"
import https from 'https';
import http from 'http';
import fs from 'fs';
import express from 'express'

let pool = mysql.createPool(config.mysql);

let app = create_app(pool);

let isProd = false; // todo
if( isProd ) {
    let key  = fs.readFileSync('sslcert/server.key', 'utf8');
    let cert = fs.readFileSync('sslcert/server.crt', 'utf8');

    let credentials = {key, cert};
    let http_app = express();
    http_app.get('*', function(req, res) {
        if (req.isSocket)
            return res.redirect('wss://' + req.headers.host + req.url)

        return res.redirect('https://' + req.headers.host + req.url)
    });
    let httpserver = http.createServer(http_app);
    let httpsserver = https.createServer(credentials, app);
    httpsserver.listen(config.httpsport);
    console.log("Listening securely on port", config.httpsport);
    httpserver.listen(config.port);
    console.log("listening on port", config.port);
} else {
    let httpserver = http.createServer(app);
    httpserver.listen(config.port);
    console.log("Listening on port", config.port);
}

