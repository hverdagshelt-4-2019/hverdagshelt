import mysql from 'mysql2'
import express from 'express'
import jwt from 'jsonwebtoken'
import UserDao from './dao/userDao'
import TicketDao from './dao/ticketDao.js'
import CategoryDao from './dao/categoryDao.js'
import EventDao from './dao/eventDao.js'
import CommuneDao from './dao/communeDao'
import CommentDao from './dao/commentDao.js'
import AdminDao from './dao/adminDao.js'
import CompanyDao from './dao/companyDao.js'
import PublicWorkerDao from './dao/publicworkerDao.js'
import path from 'path';

export function create_app(pool) {
    let app = express();

    const categorydao = new CategoryDao(pool);
    const userdao = new UserDao(pool);
    const ticketdao = new TicketDao(pool);
    const eventdao = new EventDao(pool);
    const communedao = new CommuneDao(pool);
    const commentdao = new CommentDao(pool);
    const admindao = new AdminDao(pool);
    const conpanydao = new CompanyDao(pool);
    const publicworkerdao = new PublicWorkerDao(pool);

    app.use(express.json());


    const client_public = path.join(__dirname,'..','..','client','public');
    /*const public_path = path.join(__dirname, '/../../client/public');
    app.use(express.static(public_path));*/

    /*
    Get-functions
     */

    app.get("/user/:id", (req, res) =>{
        userdao.getOne(req.params.id, (status, data) =>{
            console.log('data' + JSON.stringify(data));
            res.status(status);
            res.json(data);
        });
    });

    app.get("/ticket/:id", (req, res) =>{
        ticketdao.getATicket(req.params.id, (status, data) =>{
            console.log('data' + data);
            res.status(status);
            res.json(data);
        });
    });

    app.get("/tickets", (req, res) =>{
        console.log(req.body)
        ticketdao.getTicketsByCommune(req.body.communes, (status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/tickets/category", (req, res) =>{
        console.log(req.body);
        ticketdao.getTicketsByCategory(req.body.communes, req.body.categories, (status, data) =>{
            res.status(status);
            res.json(data);
        });
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
            console.log('data:' + data)
            res.status(status);
            res.json(data);
        });
    });

    app.get("/communes", (req, res) =>{
        communedao.getAll((status, data) =>{
            console.log('data' + data);
            res.status(status);
            res.json(data);
        });
    });

    /*
    Post-functions
     */

    app.post("/user", (req, res) =>{
        userdao.createOne(req.body, (status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.post("/login", (req, res) => {
        userdao.login(req.body, (status, data) =>{
            if(status == 200) {
                const user = {
                    email: req.body.email,
                    id: data[0].id,
                    isadmin: (data[0].isAdmin != null),
                    publicworkercommune: (data[0].commune_name != null ? data[0].commune_name : false)    // Null if not a publicworker
                }
                console.log(JSON.stringify(user))
                jwt.sign({user}, 'key',{expiresIn: '30m'}, (err, token) => {
                    res.status(status);
                    res.json({
                        token
                    });
                });
            } else {
                res.status(status);
                res.json(data);
            }
        });
    });

    app.post("/ticket", verifyToken, (req, res) => {
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err){
                res.sendStatus(403);
            }else {
                let newTicket = {
                    userid: authData.user.id,
                    commune: req.body.commune,
                    title: req.body.title,
                    category: req.body.category,
                    description: req.body.description,
                    picture: req.body.picture,
                    lat: req.body.lat,
                    long: req.body.long
                }
                ticketdao.addTicket(newTicket, (status, data) =>{
                    res.status(status);
                    res.json(data);
                });
            }
        });

    });

    app.post("/event", (req, res) =>{});

    app.post("/comment", (req, res) =>{});

    app.post("/eventcat", (req, res) =>{});

    app.post("/ticketcat", (req, res) => {
        categorydao.createOneTicket(req.body.name, (status, data) => {
            res.status(status);
            res.json(data);
            console.log('Added')
        });
    });

    app.post("/admin", (req, res) =>{});

    app.post("/company", (req, res) =>{});

    app.post("/publicworker", (req, res) =>{});


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
