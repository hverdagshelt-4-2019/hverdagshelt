import mysql from 'mysql2'
import express from 'express'
import jwt from 'jsonwebtoken'
import UserDao from './dao/userDao'
import TicketDao from './dao/ticketDao.js'
import CategoryDao from './dao/categoryDao.js'
import EventDao from './dao/eventDao.js'
import CommuneDao from './dao/communeDao'
import path from 'path';

export function create_app(pool) {
    let app = express();

    const categorydao = new CategoryDao(pool);
    const userdao = new UserDao(pool);
    const ticketdao = new TicketDao(pool);
    const eventdao = new EventDao(pool);
    const communedao = new CommuneDao(pool);

    app.use(express.json());


    const client_public = path.join(__dirname,'..','..','client','public');
    /*const public_path = path.join(__dirname, '/../../client/public');
    app.use(express.static(public_path));*/

    /*
    Get-functions
     */

    app.get("/user/:id", (req, res) =>{
        userdao.getOne(req.params.id, (status, data) =>{
            console.log(data);
            res.status(status);
            res.json(data);
        });
    });

    app.get("/ticket/:id", (req, res) =>{
        ticketdao.getATicket(req.params.id, (status, data) =>{
            console.log(data);
            res.status(status);
            res.json(data);
        });
    });

    app.get("/tickets", (req, res) =>{
        console.log(req.body)
        ticketdao.getTicketsByCommune(req.body.communes, (status, data) =>{
            console.log("test")
        });
    });

    app.get("/tickets/category", (req, res) =>{
        console.log(req.body);
        ticketdao.getTicketsByCategory()
    });

    app.get("/event/:id", (req, res) =>{
        console.log(req.body);
        eventdao.getOne(req.body.communes, (status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/events", (req, res) =>{
        console.log(req.body);
        eventdao.getAll(req.body.communes, (status, res) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/events/category", (req, res) =>{
        console.log(req.body);
        eventdao.getAllCategoryFilter(req.body.communes, req.body.categories, (status, res) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/eventcat", (req, res) =>{
        categorydao.getAllEvent((status, data) =>{
            console.log('data:' + data);
            res.status(status);
            res.json(data);
        });
    });

    app.get("/ticketcat", (req, res) => {
        categorydao.getAllTicket((status, data) => {
            console.log(data)
            res.status(status);
            res.json(data);
        });
    });

    app.get("/communes", (req, res) =>{
        communedao.getAll((status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

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

    app.get("*", (req,res, next) =>{
        let options = {};
        let file = 'index.html';
        if(req.url.includes('.')){
            file = req.url.split('/').pop();
        }
        console.log(req);
        res.sendFile(path.join(client_public, file), options, (err)=>{
            if(err) next();
        });
    });

    
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


    return app;
}
