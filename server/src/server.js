import mysql from 'mysql2'
import express from 'express'
import UserDao from './dao/userDao'
import TicketDao from './dao/ticketDao.js'
import CategoryDao from './dao/categoryDao.js'
import EventDao from './dao/eventDao.js'

export function create_app(pool) {
    let app = express();

    const categorydao = new CategoryDao(pool);
    const userdao = new UserDao(pool);
    const ticketdao = new TicketDao(pool);
    const eventdao = new EventDao(pool);

    app.use(express.json());

    /*
    Get-functions
     */

    app.get("/user/:id", (req, res) =>{
        userdao.getOne()
    });

    app.get("/ticket/:id", (req, res) =>{});

    app.get("/tickets", (req, res) =>{});

    app.get("/tickets/category", (req, res) =>{});

    app.get("/event/:id", (req, res) =>{});

    app.get("/events", (req, res) =>{});

    app.get("/events/category", (req, res) =>{});

    app.get("/eventcat", (req, res) =>{});

    app.get("/ticketcat", (req, res) => {
        categorydao.getAllTicket((status, data) => {
            res.status(status);
            res.json(data);
            console.log(data)
        });
    });

    app.get("/commune/:commune", (req, res) =>{});

    app.get("/communes", (req, res) =>{});

    /*
    Post-functions
     */

    app.post("/login")

    app.post("/ticket", (req, res) =>{});

    app.post("/event", (req, res) =>{});

    app.post("/user", (req, res) =>{});

    app.post("/comment", (req, res) =>{});

    app.post("/eventcat", (req, res) =>{});

    app.post("/ticketcat", (req, res) => {
        console.log(req.body.name)
        categorydao.createOneTicket(req.body.name, (status, data) => {
            res.status(status);
            res.json(data);
            console.log('Added')
        });
    });

    /*
    Put-functions
     */

    app.put("/ticket/:id", (req, res) =>{});

    app.put("/user/:id", (req, res) =>{});

    app.put("/event/:id", (req, res) =>{});


    /*
    Delete-functions
     */

    app.delete("/ticket/:id", (req, res) =>{});

    app.delete("/user/:id", (req, res) =>{});

    app.delete("/event/:id", (req, res) =>{});


    return app;
}