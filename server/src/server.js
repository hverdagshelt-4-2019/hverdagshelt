import mysql from 'mysql2'
import fs from 'fs';
import express from 'express'
import jwt from 'jsonwebtoken'
import UserDao from './dao/userDao'
import TicketDao from './dao/ticketDao.js'
import CategoryDao from './dao/categoryDao.js'
import EventDao from './dao/eventDao.js'
import CommuneDao from './dao/communeDao'
import path from 'path'
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';

export function create_app(pool) {
    let app = express();

    const categorydao = new CategoryDao(pool);
    const userdao = new UserDao(pool);
    const ticketdao = new TicketDao(pool);
    const eventdao = new EventDao(pool);
    const communedao = new CommuneDao(pool);

    app.use(express.json());
    app.use(fileUpload());
    app.use(bodyParser.json({limit: '50mb'})); // to read JSON in body and set bigger limit
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));//to set bigger limit for files


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
