import Dao from "./dao.js";

export default class UserDao extends Dao {
    getOne(email, callback) {
        console.log("Getting user")
        super.query("SELECT * FROM person WHERE email=?", [email], callback);
    };

    createOne(json, callback) {
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
    }

    updateEmail(json, callback) {
        super.query("UPDATE person SET email = ? WHERE id = ?",
            [json.email, json.id],
            callback)
    }

    updatePassword(json, callback) {
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
    }

    deleteOne(email, callback){
        super.query("DELETE FROM person WHERE email = ?", [email], callback);
    }

    login(json, callback){
        super.query("SELECT password FROM person WHERE id = ?", json.id, password => {
            validate_password(json.password, password).then( okay => {
                if(okay) callback(200, {});
                else callback(401, {error: "password not correct"})
            })
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
