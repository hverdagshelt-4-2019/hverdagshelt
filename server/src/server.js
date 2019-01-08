//@flow
import reload from 'reload';
import fs from 'fs';
let express = require("express");
let mysql = require("mysql2");
let path = require('path');
let app = express();
let fileUpload = require("express-fileupload");
app.use(fileUpload());//lar oss bruke express sin filopplaster
let bodyParser = require("body-parser");
app.use(bodyParser.json({limit: '50mb'})); // for å tolke JSON i body og sette større limit
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));//for å sette større limit for filer
let pool = mysql.createPool({//database pool til mysql database
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "mariufri",
    password: "7aBJIJ6U",
    database: "mariufri",
    debug: false,
    dateStrings: true
});

type Request = express$Request;
type Response = express$Response;
//test
const public_path = path.join(__dirname, '/../../client/public');
app.use(express.static(public_path));

// Hot reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
    let reloadServer = reload(app);
    fs.watch(public_path, () => reloadServer.reload());
  }
  
  // The listen promise can be used to wait for the web server to start (for instance in your tests)
  export let listen = new Promise<void>((resolve, reject) => {
    app.listen(8080, error => {
      if (error) reject(error.message);
      console.log('Server started');
      resolve();
    });
  });

