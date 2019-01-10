import Dao from "./dao.js";

export default class UserDao extends Dao {
    getOne(id, callback) {
        console.log("Getting user")
        super.query("SELECT id, email FROM person WHERE id=?", [id], callback);
    };

    /*createOne(json, callback) {
        if(json.password.length < 8){
            callback(400, {error: "Password"});
        } else {
            create_password(json.password).then(password => {
                var val = [json.email, password];
                super.query("INSERT INTO person (email, password) VALUES (?,?)",
                    val,
                    callback
                );
            });
        }
    }*/

    updateEmail(json, callback) {
        super.query("UPDATE person SET email = ? WHERE id = ?",
            [json.email, json.id],
            callback)
    }

   /* updatePassword(json, callback) {
        if(json.newPassword.length < 8) {
            callback(400, {error: "Password"});
        } else {
            super.query("SELECT password FROM person WHERE id = ?", json.id, (code, rows) => {
                if (code === 200) {
                    validate_password(json.oldPassword, rows.password).then(okay => {
                        if (okay) {
                            create_password(json.newPassword).then(password => {
                                super.query("UPDATE person SET password = ? WHERE id = ?",
                                    [password, json.id],
                                    callback)
                            });
                        } else {
                            callback(401, { error: "Old password not valid" })
                        }
                    });
                } else {
                    callback(500, { error: "Something went wrong in the database" })
                }
            });
        }
    }*/

    deleteOne(id, callback){
        super.query("DELETE FROM person WHERE id = ?", [id], callback);
    }

    login(json, callback){
        super.query("SELECT person.id, admin.id as isAdmin, commune_name, password FROM person LEFT JOIN admin on person.id = admin.id LEFT JOIN public_worker on public_worker.id = person.id WHERE email = ?",
            json.email,
            (status, data) => {
            if(data.length == 1) {
                validate_password(json.password, data[0].password).then(okay => {
                    if (okay) callback(200, data);
                    else callback(401, {error: "Invalid username password combination"});
                }).catch(err => {
                    console.log(err);
                    callback(500, {error: "Somethings went wrong."});
                });
            } else {
                callback(401, {error: "Invalid username password combination"})
            }
        });
    }
};

import argon2 from "argon2"

function create_password(password: string){
    return argon2.hash(password, {
        type: argon2.argon2id,
        hashLength: 64,
        saltLength: 64,
        timeCost: 3,
        memoryCost: 4096,
        parallellism: 1,
    });
}

function validate_password(password: string, hash: string){
    return argon2.verify(hash, password)
}