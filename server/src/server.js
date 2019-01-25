import mysql from 'mysql2'
import fs from 'fs'
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
import StatisticsDao from "./dao/statisticsDao.js"

import path from 'path';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import config from '../config';
import fetch from "node-fetch";


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
    const statisticsdao = new StatisticsDao(pool);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: config.email
    });

    app.use(express.json());
    app.use(fileUpload());
    app.use(bodyParser.json({limit: '50mb'})); // to read JSON in body and set bigger limit
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));//to set bigger limit for files


    const client_public = path.join(__dirname,'..','..','client','public');


  /*
    Get-functions
     */

    app.get('/level', verifyToken, (req, res) => {
        jwt.verify(req.token, 'key', (err, authData) =>{
            let level = 'none';
            let commune = 'false';
            let company = 'false';
            let id = -1;
            if(!err){
                id = authData.user.id;
                if(authData.user.isadmin) level = 'admin';
                else if (authData.user.publicworkercommune){
                    level = 'publicworker';
                    commune = authData.user.publicworkercommune;
                }
                else if (authData.user.companyname){
                    level = 'company';
                    company = authData.user.companyname;
                }
                else level = 'user';
            }
            console.log(authData);
            res.status(200);
            res.json({level, id, commune, company})
        });
    });

    app.get("/user", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                console.log("err");
            }
            userdao.getOne(authData.user.id, (status, data) =>{
                console.log('data' + JSON.stringify(data));
                res.status(status);
                res.json(data);
            });
        });
    });

    app.get("/ticket/:id", (req, res) =>{
        ticketdao.getATicket(req.params.id, (status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/tickets", verifyToken2, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if (err) {
                ticketdao.getAllTickets((status, data) => {
                    res.status(status);
                    res.json(data);
                });
            } else {
                console.log(authData.user.publicworkercommune);
                if(authData.user.publicworkercommune) {
                    let communes = [authData.user.publicworkercommune];
                    console.log(authData.user.publicworkercommune);
                    ticketdao.getTicketsByCommune(communes, (status, data) => {
                        res.status(status);
                        res.json(data);
                    });
                } else if(authData.user.companyname) {
                    ticketdao.getTicketsByCompany(authData.user.id, (status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                } else if(authData.user.isadmin) {
                    ticketdao.getAllTickets((status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    communedao.getFollowed(authData.user.id, (status, data) => {
                        if (status == 200) {
                            let communes = data.map(e => e.commune_name);
                            if (communes.length) {
                                ticketdao.getTicketsByCommune(communes, (status2, data2) => {
                                    console.log(data2);
                                    res.status(status2);
                                    res.json(data2);
                                });

                            } else {
                                ticketdao.getAllTickets((status2, data2) => {
                                    console.log(data2);
                                    res.status(status2);
                                    res.json(data2);
                                })
                            }
                        } else {
                            res.sendStatus(500);
                        }
                    });
                }
            }
        });
    });

    app.get("/ticketsMap/:commune", verifyToken2, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if (err) {
                ticketdao.getTicketsByCommune(req.params.commune, (status, data) => {
                    console.log("NO TOKEN");
                    res.status(status);
                    res.json(data);
                });
            } else {
                console.log(authData.user.publicworkercommune);
                if(authData.user.publicworkercommune) {
                    let communes = [authData.user.publicworkercommune];
                    console.log(authData.user.publicworkercommune);
                    ticketdao.getTicketsByCommune(communes, (status, data) => {
                        console.log("BY COMMUYNE");

                        res.status(status);
                        res.json(data);
                    });
                } else if(authData.user.companyname) {
                    ticketdao.getTicketsByCompany(authData.user.id, (status, data) =>{
                        console.log("COMPANY");

                        res.status(status);
                        res.json(data);
                    });
                } else if(authData.user.isadmin) {
                    console.log("ADMIN");

                    ticketdao.getTicketsByCommune(req.params.commune, (status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    communedao.getFollowed(authData.user.id, (status, data) => {
                        if (status == 200) {
                            let communes = data.map(e => e.commune_name);
                            if (communes.length) {
                                ticketdao.getTicketsByCommune(communes, (status2, data2) => {
                                    console.log(data2);
                                    res.status(status2);
                                    res.json(data2);
                                });

                            } else {
                                ticketdao.getTicketsByCommune(req.params.commune, (status2, data2) => {
                                    console.log(data2);
                                    res.status(status2);
                                    res.json(data2);
                                })
                            }
                        } else {
                            res.sendStatus(500);
                        }
                    });
                }
            }
        });
    });

    app.get("/ticketsByUser", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(401);
            } else {
                ticketdao.getTicketsByUser(authData.user.id, (status, data) =>{
                    res.status(status);
                    res.json(data);
                });
            }
        });
    });

    app.get("/event/:id", (req, res) =>{
        console.log(req.params.id);
        eventdao.getOne(req.params.id, (status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/events", verifyToken2, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if (err) {
                eventdao.getAllEvents((status, data) => {
                    res.status(status);
                    res.json(data);
                });
            } else {
                console.log(authData.user.publicworkercommune);
                if(authData.user.publicworkercommune) {
                    let communes = [authData.user.publicworkercommune];
                    console.log(authData.user.publicworkercommune);
                    eventdao.getEventsByCommune(communes, (status, data) => {
                        res.status(status);
                        res.json(data);
                    });
                } else if(authData.user.isadmin || authData.user.companyName) {
                    eventdao.getAllEvents((status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    communedao.getFollowed(authData.user.id, (status, data) => {
                        if (status == 200) {
                            let communes = data.map(e => e.commune_name);
                            if (communes.length) {
                                eventdao.getEventsByCommune(communes, (status2, data2) => {
                                    console.log(data2);
                                    res.status(status2);
                                    res.json(data2);
                                });

                            } else {
                                eventdao.getAllEvents((status2, data2) => {
                                    console.log(data2);
                                    res.status(status2);
                                    res.json(data2);
                                })
                            }
                        } else {
                            res.sendStatus(500);
                        }
                    });
                }
            }
        });
    });

    // TODO: Delete this?
    app.get("/events/category", (req, res) =>{
        console.log(req.body);
        eventdao.getAllCategoryFilter(req.body.communes, req.body.categories, (status, res) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/eventcat", (req, res) =>{
        categorydao.getAllEvent((status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/ticketcat", (req, res) => {
        categorydao.getAllTicket((status, data) => {
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

    app.get("/users", (req, res) =>{ //todo auth
        userdao.getAll((status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/companies", (req, res) => { //todo auth
        companydao.getAll((status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/admins", (req, res) =>{ //todo auth
        admindao.getAll((status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/publicworkers", (req, res) =>{ //todo auth
        publicworkerdao.getAll((status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/followedCommunes", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(401);
            } else {
                communedao.getFollowed(authData.user.id, (status, data) => {
                    res.status(status);
                    res.json(data);
                });
            }
        });
    });

    app.get("/unfollowedCommunes", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(401);
            } else {
                communedao.getNotFollowed(authData.user.id, (status, data) => {
                    res.status(status);
                    res.json(data);
                });
            }
        });
    });

    app.get("/communeByCoordinates/:lat/:lng", (req, res) =>{
                getCommuneByLatLng([req.params.lat, req.params.lng], data =>{
                    console.log(data);
                    res.json(data);
                });
    });

    app.get("/comments/:ticket_id", (req, res) =>{
        commentdao.getAll(req.params.ticket_id, (status, data) =>{
            res.status(status);
            res.json(data);
        });
    });

    app.get("/tokenValid", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(418);
            } else {
                res.sendStatus(200);
            }
        });
    });

    //Stats
    //NATIONAL
    app.get("/ticketAmountNationally", (req, res) => {
        statisticsdao.getTicketAmountNationally((status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get("/solvedTicketsNationally", (req, res) => {
        statisticsdao.getSolvedTicketsNationally((status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get("/getTicketAmountByCategoryNationally", (req, res) => {
        statisticsdao.getTicketAmountByCategoryNationally((status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get("/getTicketAmountByMonthNationally", (req, res) => {
        statisticsdao.getTicketsByMonthNationally((status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    //LOCAL
    app.get("/ticketAmountLocally/:commune", (req, res) => {
        statisticsdao.getTicketAmountLocally(req.params.commune, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get("/solvedTicketsLocally/:commune", (req, res) => {
        statisticsdao.getSolvedTicketsLocally(req.params.commune, (status, data) => {
            res.status(status);
            res.json(data);
        })
    })

    app.get("/getTicketAmountByCategoryLocally/:commune", (req, res) => {
        statisticsdao.getTicketAmountByCategoryLocally(req.params.commune, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get("/getTicketAmountByMonthLocally/:commune", (req, res) => {
        statisticsdao.getTicketsByMonthLocally(req.params.commune, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

  /*
    Post-functions
     */


    app.post("/user", (req, res) =>{
        userdao.createOne(req.body, (status, data) =>{
            let mailoptions = {
                from: 'Hverdagsheltene',
                to: req.body.email,
                subject: 'Registrering',
                text: 'Hei ' + req.body.name + '\nDu er nå registrert i vårt system.\nBrukernavn: ' + req.body.email + '\nPassord: ' + req.body.password + '\nHoved kommune: ' + req.body.commune
            };
            if(status == 200) {
                sendEmail(transporter, mailoptions);

                communedao.followCommune(data.insertId, req.body.commune, (status2, data2) => {
                    res.status(status2);
                    res.json(data2);
                })
            }
        });
    });

    app.post("/login", (req, res) => {
        userdao.login(req.body, (status, data) => {
            if (status == 200) {
                const user = {
                    email: req.body.email,
                    id: data[0].id,
                    isadmin: (data[0].isAdmin != null),
                    companyname: (data[0].companyname != null ? data[0].companyname : false),
                    publicworkercommune: (data[0].commune_name != null ? data[0].commune_name : false)    // Null if not a publicworker
                };
                let level = 'user';
                if(user.isadmin) level = 'admin';
                else if (user.publicworkercommune) level = 'publicworker';
                else if (user.companyname) level = 'company';
                jwt.sign({user}, 'key', {expiresIn: '30d'}, (err, token) => {
                    res.status(status);
                    res.json({
                        token,
                        level,
                        id: user.id,
                        commune: user.publicworkercommune,
                        company: user.companyname
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
                res.sendStatus(401);
            } else {
                let newTicket = {
                    userid: authData.user.id,
                    commune: req.body.commune,
                    title: req.body.title,
                    category: req.body.category,
                    description: req.body.description,
                    picture: (req.body.picture != null ? req.body.picture : "logo.png"),
                    lat: req.body.lat,
                    lng: req.body.lng
                }
                ticketdao.addTicket(newTicket, (status, data) =>{
                    if(status == 200) {
                        userdao.getOne(authData.user.id, (userstatus, userdata) =>{
                            let mailOptions = {
                                from: 'Hverdagsheltene',
                                to: userdata[0].email,
                                subject: 'Registrering av problem',
                                text: 'Du har registrert ett nytt problem.\nSe problemet på: '+config.domainname+'/sak/' + data.insertId
                            };
                            sendEmail(transporter, mailOptions);
                        });
                    }
                    res.status(status);
                    res.json(data);
                });
            }

        });
      });

    app.post("/event", verifyToken, (req, res) =>{

        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                console.log(err);
                res.sendStatus(401);
            } else {
                if(authData.user.isadmin) {
                    console.log("admin");
                    let newEvent = {
                        "submitter_id": authData.user.id,
                        "commune_name": req.body.commune_name,
                        "category": req.body.category,
                        "title": req.body.title,
                        "description": req.body.description,
                        "picture": (req.body.picture != null ? req.body.picture : "./logo.png"),
                        "happening_time": req.body.happening_time
                    }
                    eventdao.createOne(newEvent, (status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                } else if(authData.user.publicworkercommune) {
                    console.log("public worker");
                    let newEvent = {
                        "submitter_id": authData.user.id,
                        "commune_name": authData.user.publicworkercommune,
                        "category": req.body.category,
                        "title": req.body.title,
                        "description": req.body.description,
                        "picture": (req.body.picture != null ? req.body.picture : "./logo.png"),
                        "happening_time": req.body.happening_time
                    }
                    eventdao.createOne(newEvent, (status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        });
    });

    app.post("/comment/:id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(401);
            } else {
                let newComment = {
                    "ticket_id": req.params.id,
                    "description": req.body.description,
                    "submitter_id": authData.user.id
                };
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
                res.sendStatus(401);
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
                res.sendStatus(401);
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
                res.sendStatus(401);
            } else {
                if(authData.user.isadmin) {
                    admindao.createAdmin(req.body, (status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        });
    });

    app.post("/company", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(401);
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
                res.sendStatus(401);
            } else {
                if(authData.user.isadmin) {
                    publicworkerdao.createPublicworker(req.body, (status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        });
    });

    app.post("/followCommune/:commune", verifyToken, (req, res) => {
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(401);
            } else {
                communedao.followCommune(authData.user.id, req.params.commune, (status, data) => {
                    res.status(200);
                    res.json(data);
                });
            }
        });

    });

  /*
    Put-functions
     */

    app.put("/ticket/:id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(401);
            } else {
                console.log(req.body.submitter_id);
                console.log(authData.user.id);
                if(req.body.email == authData.user.id) {
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

    app.put("/forgotPassword/:email", (req, res) =>{
        let newPass = genRandPass();
        userdao.getNewPass(req.body.email, newPass, (status, data) =>{
            let mailOptions = {
                from: 'Hverdagsheltene',
                to: req.params.email,
                subject: 'Nytt Passord',
                text: 'Ditt nye passord er: ' + newPass +'\nHvis du ikke har bedt om nytt passord, vennligst ta kontakt på hverdagsheltene4@gmail.com'
            };
            sendEmail(transporter, mailOptions);
            res.status(status);
            res.json(data);
        });
    });

    app.put("/ticketedit/:id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(401);
            } else {
                userdao.getOne(authData.user.id, (userstatus, userdata) =>{
                    if(req.body.submitter_email == userdata[0].email) {
                        ticketdao.editTicket(req.params.id, req.body, (status, data) =>{
                            res.status(status);
                            res.json(data);
                        });
                    } else {
                        res.sendStatus(403);
                    }
                });
            }
        });
    });

    app.put("/ticket_picture/:ticket_it", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                console.log(err);
            } else {
                userdao.getOne(authData.user.id, (userstatus, userdata) =>{
                    if(req.body.email == userdata[0].email) {
                        ticketdao.setPicture(req.params.ticket_id, req.body, (status, data) =>{
                            res.status(status);
                            res.json(data);
                        });
                    } else {
                        res.sendStatus(403);
                    }
                });
            }
        });
    });

    app.put("/usermail/:email", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(401);
            } else {
                userdao.updateEmail(authData.user.id, req.body, (status, data) => {
                    console.log("Edited email");
                    res.status(status);
                    let user = authData.user;
                    user.email = req.body.email;
                    console.log(user.email)
                    if(status == 200) {
                        let mailOptions = {
                            from: 'Hverdagsheltene',
                            to: user.email,
                            subject: 'Ny Epost',
                            text: 'Din konto hos Hverdagsheltene har fått ny E-post.\nOm du ikke er ansvarlig for dette, vennligst ta kontakt med oss på hverdagsheltene4@gmail.com'
                        };
                        sendEmail(transporter, mailOptions);
                        jwt.sign({ user }, 'key', { expiresIn: '30d' }, (err, token) => {
                            res.status(status);
                            data.token = token;
                            res.json(data);
                        });
                    } else {
                        res.json(data);
                    }
                });
            }
        })
    });

    app.put("/username", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(401);
            } else {
                userdao.updateName(authData.user.id, req.body, (status, data) => {
                    console.log("Edited name");
                    res.status(status);
                });
            }
        })
    });

    app.put("/userpass", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(401);
            } else {
                userdao.updatePassword(authData.user.id, req.body, (status, data) => {
                    let mailOptions = {
                        from: 'Hverdagsheltene',
                        to: user.email,
                        subject: 'Nytt Passord',
                        text: 'Vi har registrert fra din profil har byttet passord.\nDitt nye passord er: ' + req.body.newPassword
                            + '\nOm du ikke har har skiftet passord, venligst ta konntakt på hverdagsheltene4@gmail.com'
                    };
                    if(status == 200) sendEmail(transporter, mailOptions);
                    console.log("Edited password");
                    res.status(status);
                    res.json(data);
                });
            }
        })
    });

    app.put("/event/:id", verifyToken, (req, res) =>{
        console.log(req.body);
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(401);
            } else {
                if(authData.user.isadmin || authData.user.publicworkercommune) {
                    eventdao.updateOne(req.params.id, req.body, (status, data) => {
                            res.status(status);
                            res.json(data);
                        });
                } else {
                    res.status(403);
                }
            }
        });
    });

    app.put("/ticketstatus/:ticket_id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                console.log(err);
            } else {
                if(authData.user.publicworkercommune === req.body.responsible_commune) {
                    ticketdao.setStatus(req.params.ticket_id, req.body, (status, data) =>{
                        if(status == 200) {
                            let mailOptions = {
                                from: 'Hverdagsheltene',
                                to: req.body.email,
                                subject: 'Status oppdatering',
                                text: ('Ditt problem har fått ny status.\n' + req.body.statusText + '\nSe ny status på: ' + config.domainname+'/sak/' + req.params.ticket_id)
                            };
                            sendEmail(transporter, mailOptions);
                            res.status(status);
                            res.json(data);
                        } else {
                            console.log('Feil med å oppdatere status i serverfil');
                        }
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        });
    });

    app.put("/ticketcomp/:ticket_id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                console.log(err);
            } else {
                companydao.getByMail(req.body.name, (status, data) =>{
                    console.log(data[0].id)
                    ticketdao.setResponsibility(req.params.ticket_id, data[0], (status2, data2) =>{
                        res.status(status2);
                        res.json(data2);
                    });
                });
            }
        });
    });

  /*
    Delete-functions
     */


    app.delete("/unfollowCommune/:commune", verifyToken, (req, res) => {
       jwt.verify(req.token, 'key', (err, authData) => {
           if(err) {
               res.sendStatus(401);
           } else {
               communedao.unfollowCommune(authData.user.id, req.params.commune, (status, data) => {
                  res.status(status);
                  res.json(data);
               });
           }
       })
    });

    app.delete("/ticket/:id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(401);
            } else {
                if(authData.user.isadmin) {
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

    app.delete("/user/:email", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(401);
            } else {
                if (req.params.email == authData.user.email || authData.user.isadmin) {
                    userdao.deleteOne(req.params.email, (status, data) => {
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
                res.sendStatus(401);
            } else {
                if(authData.user.isadmin || authData.user.publicworkercommune) {
                    eventdao.deleteOne(req.params.id, (status,data) => {
                        console.log("Deleted event");
                        res.status(status);
                        res.json(data);
                    })

                } else {
                    res.sendStatus(403);
                }
            }
        })
    });

    app.delete("/ticketCategory/:name", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                console.log(err);
                res.sendStatus(401);
            } else {
                if(authData.user.isadmin) {
                    categorydao.deleteOneTicket(req.params.name, (status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        });
    });

    app.delete("/happeningCategory/:name", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                console.log(err);
                res.sendStatus(401);
            } else {
                if(authData.user.isadmin) {
                    categorydao.deleteOneEvent(req.params.name, (status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
            }
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
            res.sendStatus(401);
        }
    }

    function verifyToken2(req, res, next) {
        const bearerHeader = req.headers['authorization'];

        if(typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        }else {
            req.token = 'abcdefghijklmnopqrstuvwxyz';
            next();
        }
    }


    /* Upload image with the ticetkId for the ticket that the image
    is connected to. This is to upload Image
    app.put("/ticket_picture/:ticket_it", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                console.log(err);
            } else {
                userdao.getOne(authData.user.id, (userstatus, userdata) =>{
                    if(req.body.email == userdata[0].email) {
                        ticketdao.setPicture(req.params.ticket_id, req.body, (status, data) =>{
                            res.status(status);
                            res.json(data);
                        });
                    } else {
                        res.sendStatus(403);
                    }
                });
            }
        });
    });
    */ 
    app.post("/image", verifyToken, (req, res) => {
        jwt.verify(req.token, 'key', (err, authData) =>{
            console.log("Got POST-request from client");
            console.log(req.headers['authorization']);
            console.log("id: " + req.body.id);//temp delete
            console.log(req.files);//temp delete

            if (!req.files) {
                console.log("no files were uploaded");
                return res.status(400).send("No files were uploaded.");
            }

            console.log("files where uploaded");
            let file = req.files.uploaded_image;
            let img_name = file.name;
            img_name = req.body.id + img_name;
            console.log(img_name);
            if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
                console.log("Correct type of image");
                file.mv(path.join(client_public,'images', img_name), function (err) {

                    if (err) {
                        console.log("Something went wrong");
                        return res.status(500).send(err);
                    }

                    ticketdao.setPicture(req.body.id, img_name, (status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                });
            }else{
                console.log("Wrong type if image");
                return res.status(400).send();
            }
        });
    });

    //Upload image for an event/happening

     app.post("/imageEvent", verifyToken, (req, res) => {
        jwt.verify(req.token, 'key', (err, authData) =>{
            console.log("Got POST-request from client");
            console.log(req.headers['authorization']);
            console.log("id: " + req.body.id);//temp delete
            console.log(req.files);//temp delete

            if (!req.files) {
                console.log("no files were uploaded");
                return res.status(400).send("No files were uploaded.");
            }

            console.log("files where uploaded");
            let file = req.files.uploaded_image;
            let img_name = file.name;
            img_name = "e" + req.body.id + img_name;
            console.log(img_name);
            if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
                console.log("Correct type of image");
                file.mv(path.join(client_public,'images', img_name), function (err) {

                    if (err) {
                        console.log("Something went wrong");
                        return res.status(500).send(err);
                    }

                    eventdao.setPicture(req.body.id, img_name, (status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                });
            }else{
                console.log("Wrong type if image");
                return res.status(400).send();
            }
        });
    });

    /* Upload image with the ticetkId for the ticket that the image
    is connected to. This is to edit Image*/ 
    app.put("/image", (req, res) => {
        console.log("Got POST-request from client");
        console.log("id: " + req.body.id);//temp delete
        console.log(req.files);//temp delete

        if (!req.files) {
            console.log("no files were uploaded");
            return res.status(400).send("No files were uploaded.");
        }

        console.log("files where uploaded");
        let file = req.files.uploaded_image;
        let img_name = file.name;
        img_name = req.body.id + img_name;
        console.log(img_name);
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
            console.log("Correct type of image");
            file.mv(path.join(client_public,'images', img_name), function (err) {

                if (err) {
                    console.log("Something went wrong");
                    return res.status(500).send(err);
                }

                /*
                Here you have to add how the path will be saved in database. Some example code under
                let val = [overskrift, innhold, kategori, viktighet, img_name];
                caseDao.createOne(val, (status, data) => {
                    res.status(status);
                    res.json(data);
                });*/
            });
        }else{
            console.log("Wrong type if image");
            return res.status(400).send();
        }
    });

    //get image from server side and send to frontend
    app.get("/image/:fileid", (req, res) => {
        const { fileid } = req.params;
        //console.log(fileN);
        res.sendFile(path.join(client_public,'images',fileid));//sending the file that is in the foldier with root from the server
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

    return app;

}

function sendEmail(transport, mailOptions) {
    console.log(JSON.stringify(mailOptions));
    transport.sendMail(mailOptions, function(err, info) {
        if(err) {
            console.log(err)
        } else {
            console.log("Info: " + info.response);
        }
    });
}

function genRandPass() {
    let validChars = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let newPass = '';
    while(newPass.length < 12) {
        newPass += validChars[Math.floor(Math.random() * validChars.length)];
    }
    return newPass;

}

function getCommuneByLatLng(latlng, callback) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng[0]},${latlng[1]}&key=${config.mapskey}`,
        {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(data => data.json())
        .then(res => {
            let kom = res.results.map(e => e.address_components.filter(d => d.types[0] === 'administrative_area_level_2').map(final_res => ({"Kommune" : final_res.short_name.replace(' kommune', '').replace(' Municipality', '')})));
            let fyl = res.results.map(e => e.address_components.filter(d => d.types[0] === 'administrative_area_level_1').map(final_res => ({"Fylke" : final_res.short_name})));

            if(kom.filter(i=>i.length != 0)[0][0].Kommune === 'Bø' || kom.filter(i=>i.length != 0)[0][0].Kommune === 'Herøy' || kom.filter(i=>i.length != 0)[0][0].Kommune === 'Nes' || kom.filter(i=>i.length != 0)[0][0].Kommune === 'Os' || kom.filter(i=>i.length != 0)[0][0].Kommune === 'Sande' || kom.filter(i=>i.length != 0)[0][0].Kommune ===  'Våler') {
                kom.filter(i=>i.length != 0)[0][0].Kommune = kom.filter(i=>i.length != 0)[0][0].Kommune + '(' + fyl[0][0].Fylke + ')';
            }
            if(kom.filter(i=>i.length != 0)[0][0].Kommune === 'Rissa' || kom.filter(i=>i.length != 0)[0][0].Kommune === 'Leksvik') {
                callback({kommune: 'Indre Fosen'});
            } else {
                callback({kommune: kom.filter(i=>i.length != 0)[0][0].Kommune});
            }


        })
        .catch(err => console.log(latlng[0] + ' ' + latlng[1]))
}