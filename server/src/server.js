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

    app.get("/ticketcat", (req, res) => {
        categorydao.getAllTicket((status, data) => {
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

    app.put("/ticket/:id")

    app.put("/user/:id")

    app.put("/event/:id")


    /*
    Delete-functions
     */

    app.delete("/ticket/:id")

    app.delete("/user/:id")

    app.delete("/event/:id")


    return app;
}