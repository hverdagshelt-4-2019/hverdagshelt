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
    const companydao = new CompanyDao(pool);
    const publicworkerdao = new PublicWorkerDao(pool);

    app.use(express.json());


    const client_public = path.join(__dirname,'..','..','client','public');

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

    app.get("/users", (req, res) =>{
        userdao.getAll((status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/companies", (req, res) {
        companydao.getAll((status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/admins", (req, res) =>{
        admindao.getAll((status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/publicworkers", (req, res) =>{
        publicworkerdao.getAll((status, data) =>{
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
                console.log(err);
                res.sendStatus(500);
            } else {
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
                console.log("ok")
            }
        });

    });

    app.post("/event", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                if(authData.user.isadmin) {
                    console.log("admin");
                    let newEvent = {
                        "submitter_id": authData.user.id,
                        "commune_name": authData.body.commune,
                        "category": req.body.category,
                        "title": req.body.title,
                        "description": req.body.description,
                        "picture": (req.body.picture != null ? req.body.picture : "./logo.PNG"),
                        "happening_time": req.body.time
                    }
                } else if(authData.user.publicworkercommune) {
                    console.log("public worker");
                    let newEvent = {
                        "submitter_id": authData.user.id,
                        "commune_name": authData.user.publicworkercommune,
                        "category": req.body.category,
                        "title": req.body.title,
                        "description": req.body.description,
                        "picture": (req.body.picture != null ? req.body.picture : "./logo.PNG"),
                        "happening_time": req.body.time
                    }
                } else {
                    res.sendStatus(403);
                }
            }
        });
    });

    app.post("/comment", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(500);
            } else {
                let newComment = {
                    "ticket_id": req.body.ticketid,
                    "description": req.body.description,
                    "submitter_id": authData.user.id
                }
                commentdao.addComment(newComment, (status, data) =>{
                    console.log('data:' + data);
                    res.status(status);
                    res.json(data);
                });
            }
        });
    });

    app.post("/eventcat", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(500);
            } else {
                if(authData.user.isadmin || authData.user.publicworkercommune) {
                    categorydao.createOneEvent(req.body.name, (status, data) => {
                        console.log('Added');
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        });
    });

    app.post("/ticketcat", verifyToken, (req, res) => {
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(500);
            } else {
                if(authData.user.isadmin || authData.user.publicworkercommune) {
                    categorydao.createOneTicket(req.body.name, (status, data) => {
                        console.log('Added');
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        });
    });

    app.post("/admin", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(500);
            } else {
                if(authData.user.isadmin) {
                    admindao.createAdmin(req.body);
                } else {
                    res.sendStatus(403);
                }
            }
        });
    });

    app.post("/company", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(500);
            } else {
                if(authData.user.isadmin || authData.user.publicworkercommune) {
                    companydao.createCompany(req.body, (status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        });
    });

    app.post("/publicworker", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(500);
            } else {
                if(authData.user.isadmin) {
                    publicworkerdao.createPublicworker(req.body, (stauts, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        });
    });


    /*
    Put-functions
     */

    app.put("/ticket/:id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(500);
            } else {
                if(req.body.submitterid === authData.id) {
                    ticketdao.editTicket(req.params.id, req.body, (status, data) => {
                       console.log("Edited ticket");
                       res.status(status);
                       res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        })
    });

    app.put("/usermail/:id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(500);
            } else {
                if(req.params.id === authData.id) {
                    userdao.updateEmail(req.params.id, req.body, (status, data) => {
                       console.log("Edited username");
                       res.status(status);
                       res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        })
    });

    app.put("/userpass/:id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(500);
            } else {
                if(req.params.id === authData.id) {
                    userdao.updatePassword(req.params.id, req.body, (status, data) => {
                        console.log("Edited password");
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        })
    });

    app.put("/event/:id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(500);
            } else {
                if(authData.isadmin || authData.publicworkercommune) {
                    eventdao.updateOne(req.params.id, req.body, (status, data) => {
                       console.log("Edited event");
                       res.status(status);
                       res.json(data);
                    });
                } else {
                    res.status(403);
                }
            }
        });
    });


    /*
    Delete-functions
     */

    app.delete("/ticket/:id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(500);
            } else {
                if(req.body.submitterid === authData.id) {
                    ticketdao.deleteTicket(req.params.id, (status, data) => {
                        console.log("Deleted ticket");
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        })
    });

    app.delete("/user/:id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(500);
            } else {
                if(req.params.id === authData.id) {
                    userdao.deleteOne(req.params.id, (status, data) => {
                        console.log("Deleted user");
                        res.status(status);
                        res.json(data);
                    })
                } else {
                    res.sendStatus(403);
                }
            }
        })
    });

    app.delete("/event/:id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(500);
            } else {
                if(authData.isadmin || authData.publicworkercommune) {
                    console.log("Deleted event");
                    res.status(status);
                    res.json(data);
                } else {
                    res.sendStatus(403);
                }
            }
        })
    });

    app.get("*", (req,res, next) =>{
        let options = {};
        let file = 'index.html';
        if(req.url.includes('.')){
            file = req.url.split('/').pop();
        }
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
