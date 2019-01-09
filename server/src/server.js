import mysql from 'mysql2'
import express from 'express'
import UserDao from './dao/userDao'
import TicketDao from './dao/ticketDao.js'
import CategoryDao from './dao/categoryDao.js'
import EventDao from './dao/eventDao.js'

let app = express();

//To be removed
var pool = mysql.createPool({
   connectionLimit: 2,
   host: "localhost",
   user: 'root',
   password: 'qwerty',
   database: 'hverdagshelt_dev',
   debug: false
});

const categorydao = new CategoryDao(pool);

/*
Get-functions
 */

app.use(express.json());

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

app.post("/login")

app.post("/ticket");

app.post("/event");

app.post("/user");

app.post("/comment");

app.post("/eventcat");

app.post("/ticketcat", (req, res) =>{
    categorydao.createOneTicket(req.body, (status, data) =>{
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

let server = app.listen(3000);