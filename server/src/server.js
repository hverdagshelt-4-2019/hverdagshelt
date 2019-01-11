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
import path from 'path';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

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

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hverdagsheltene4@gmail.com',
            pass: 'thisbepassword123'
        }
    });

    app.use(express.json());
    app.use(fileUpload());
    app.use(bodyParser.json({limit: '50mb'})); // to read JSON in body and set bigger limit
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));//to set bigger limit for files


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
        console.log(req.body);
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

    app.get("/companies", (req, res) => {
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
                res.sendStatus(418);
            } else {
                communedao.getNotFollowed(authData.user.id, (status, data) => {
                    res.status(status);
                    res.json(data);
                });
            }
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
                text: 'Du er nå registrert i vårt system.\nBrukernavn: ' + req.body.email + '\nPassord: ' + req.body.password
            };
            sendEmail(transporter, mailoptions);
            res.status(status);
            res.json(data);
        });
    });

    app.post("/login", (req, res) => {
        console.log("login request");
        userdao.login(req.body, (status, data) => {
            if (status == 200) {
                const user = {
                    email: req.body.email,
                    id: data[0].id,
                    isadmin: (data[0].isAdmin != null),
                    publicworkercommune: (data[0].commune_name != null ? data[0].commune_name : false)    // Null if not a publicworker
                };
                console.log(JSON.stringify(user));
                jwt.sign({user}, 'key', {expiresIn: '30d'}, (err, token) => {
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
                res.sendStatus(401);
            } else {
                let newTicket = {
                    userid: authData.user.id,
                    commune: req.body.commune,
                    title: req.body.title,
                    category: req.body.category,
                    description: req.body.description,
                    picture: (req.body.picture != null ? req.body.picture : "./logo.PNG"),
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

    app.post("/event", (req, res) =>{

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
                        "picture": (req.body.picture != null ? req.body.picture : "./logo.PNG"),
                        "happening_time": req.body.time
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
                        "picture": (req.body.picture != null ? req.body.picture : "./logo.PNG"),
                        "happening_time": req.body.time
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

    app.post("/comment", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(401);
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
                if(req.body.submitter_id == authData.user.id) {
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
    });

    app.put("/ticketstatus/:id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) =>{
            if(err) {
                res.sendStatus(401);
            } else {
                if(authData.user.isadmin || authData.user.publicworkercommune == req.body.commune) {
                    ticketdao.editTicket(req.params.id, req.body, (status, data) =>{
                        res.status(status);
                        res.json(data);
                    });
                } else {
                    res.sendStatus(403);
                }
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

                    if(status == 200) {
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

    app.put("/userpass", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(401);
            } else {
                userdao.updatePassword(authData.user.id, req.body, (status, data) => {
                    console.log("Edited password");
                    res.status(status);
                    res.json(data);
                });
            }
        })
    });

    app.put("/event/:id", verifyToken, (req, res) =>{
        jwt.verify(req.token, 'key', (err, authData) => {
            if(err) {
                res.sendStatus(401);
            } else {
                if(authData.user.isadmin || authData.user.publicworkercommune) {
                    console.log(req.params.id);
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
                if(req.body.submitter_id == authData.user.id) {
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

    /* Upload image with the ticetkId for the ticket that the image
    is connected to. This is to upload Image*/ 
    let iNumber = 0;
    app.post("/ticketI", (req, res) => {
        console.log("Got POST-request from client");
        console.log(req.body.overskrift);//temp delete
        console.log(req.files);//temp delete

        if (!req.files) {
            console.log("no files were uploaded");
            return res.status(400).send("No files were uploaded.");
        }

        console.log("files where uploaded");
        let file = req.files.uploaded_image;
        let img_name = iNumber+file.name;
        iNumber++;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
            console.log("Correct type of image");
            file.mv('src/images/' + img_name, function (err) {

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

    /* Upload image with the ticetkId for the ticket that the image
    is connected to. This is to edit Image*/ 
    app.put("/image/:ticketId", (req, res) => {
        console.log("Got PUT-request from client");
        const { ticketId } = req.params;
        if (!req.files) {
            console.log("no files were uploaded");
            return res.status(400).send("No files were uploaded.");
        }

        console.log("files where uploaded");
        let file = req.files.uploaded_image;
        let img_name = iNumber+file.name;
        iNumber++;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
            console.log("Correct type of image");
            file.mv('src/images/' + img_name, function (err) {

                if (err) {
                    return res.status(500).send(err);
                }
                /*
                Here you have to add how the path will be saved in database. Some example code under
                let val = [img_name, ticketId];
                ticketDao.updateImage(val, (status, data) => {
                    res.status(status);
                    res.json(data);
                });*/
            });
        }
    });

    //get image from server side and send to frontend
    app.get("/image/:fileid", (req, res) => {
        const { fileid } = req.params;
        let fileN = '/images/'+fileid;
        console.log(fileN);
        res.sendFile(fileN, {root: __dirname});//sending the file that is in the foldier with root from the server
    });

    return app;

}

function sendEmail(transport, mailOptions) {
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
