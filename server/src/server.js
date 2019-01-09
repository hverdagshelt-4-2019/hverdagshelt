import mysql from 'mysql2'
import express from 'express'
import jwt from 'jsonwebtoken'
import UserDao from './dao/userDao'
import TicketDao from './dao/ticketDao.js'
import CategoryDao from './dao/categoryDao.js'
import EventDao from './dao/eventDao.js'

let app = express();

//To be removed
var pool = mysql.createPool({
   connectionLimit: 2,
   host: 'localhost',
   user: 'root',
   password: 'qwerty',
   database: 'hverdagshelt_dev',
   debug: false
});


const categorydao = new CategoryDao(pool);
const userdao = new UserDao(pool);

app.use(express.json());

/*
Get-functions
 */

app.get("/user/:id")

app.get("/ticket/:id")

app.get("/tickets")

app.get("/tickets/category")

app.get("/event/:id")

app.get("/events")

app.get("/events/category")

app.get("/eventcat")

app.get("/ticketcat", (req, res) =>{
    categorydao.getAllTicket((status, data) =>{
        res.status(status);
        res.json(data);
        console.log(data)
    });
});

app.get("/commune/:commune")

app.get("/communes")

/*
Post-functions
 */

app.post("/login", (req, res) => {
    const user = {
        email : 'test',
        id : 1
    }
    jwt.sign({user}, 'key',{expiresIn: '30m'}, (err, token) => {
        res.json({
            token
        })
    });
});

app.post("/ticket", verifyToken, (req,res) => {
    jwt.verify(req.token, 'key', (err, authData) =>{
        if(err){
            res.sendStatus(403);
        }else {
            res.json({
                message: 'Posted',
                authData
            });
        }
    });

});

app.post("/event");

app.post("/user");

app.post("/comment");

app.post("/eventcat");

app.post("/ticketcat", (req, res) =>{
    console.log(req.body.name)
    categorydao.createOneTicket(req.body.name, (status, data) =>{
        res.status(status);
        res.json(data);
        console.log('Added')
    });
});

/*
Put-functions
 */

app.put("/ticket/:id")

app.put("/user/:id")

app.put("/event/:id")


/*
Delete-functions
 */

app.delete("/ticket/:id")

app.delete("/user/:id")

app.delete("/event/:id")

// Verify token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else {
        res.sendStatus(403);
    }
}

let server = app.listen(3000);