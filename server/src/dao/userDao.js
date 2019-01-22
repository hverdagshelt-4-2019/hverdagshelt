import Dao from './dao.js';

export default class UserDao extends Dao {

    getOne(id, callback) {
        console.log("Getting user")
        super.query("SELECT id, email, username FROM person WHERE id=?", [id], callback);
    };

    createOne(json, callback) {
        let err = password_passes_requirements(json.password);
        if(err){
            console.log(err);
            callback(400, err);
        }
        else {
            create_password(json.password).then(password => {
                var val = [json.email, json.name, password];
                super.query("INSERT INTO person (email,username, password) VALUES (?,?,?)",
                    val,
                    callback
                );
            });
        }
    }

    getAll(callback) {
        super.query("SELECT id, email FROM person WHERE id NOT IN (SELECT id FROM admin UNION (SELECT id FROM public_worker) UNION (SELECT id FROM company)) ORDER BY email", [], callback);
    }

    updateEmail(id, json, callback) {
        super.query("UPDATE person SET email = ? WHERE id = ?",
            [json.email, id],
            callback)
    }

    updateName(id, json, callback) {
        super.query("UPDATE person SET username = ? WHERE id = ?",
            [json.name, id],
            callback)
    }

    updatePassword(id, json, callback) {
        if(password_passes_requirements(json.newPassword)) {
            super.query("SELECT password FROM person WHERE id = ?", id, (code, rows) => {
                if (code === 200) {
                    validate_password(json.oldPassword, rows[0].password).then(okay => {
                        if (okay) {
                            create_password(json.newPassword).then(password => {
                                super.query("UPDATE person SET password = ? WHERE id = ?",
                                    [password, id],
                                    callback)
                            });
                        } else {
                            callback(401, { error: "Old password not valid" })
                        }
                    })
                    .catch(err =>{
                        callback(401, {error: "Old password not valid"});
                    });
                } else {
                    callback(400, { error: "Something went wrong in the database" })
                }
            });
        }
    }

    getNewPass(email, newPass, callback)
    {
        create_password(newPass).then(password => {
            super.query("UPDATE person SET password = ? WHERE email = ?",
                [password, email],
                callback);
        })
    }


    deleteOne(email, callback)
    {
        super.query("DELETE FROM person WHERE email = ?", [email], callback);
    }

    login(json, callback)
    {
        console.log("logging in dao");
        super.query("SELECT person.id, admin.id as isAdmin, commune_name, company.name as companyname, password FROM person LEFT JOIN admin on person.id = admin.id LEFT JOIN public_worker on public_worker.id = person.id LEFT JOIN company ON company.id = person.id WHERE email = ?",
            json.email,
            (status, data) => {
                if (data.length == 1) {
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

function create_password(password: string) {
    return argon2.hash(password, {
        type: argon2.argon2id,
        hashLength: 64,
        saltLength: 64,
        timeCost: 3,
        memoryCost: 4096,
        parallellism: 1,
    });
}

function validate_password(password: string, hash: string) {
    return argon2.verify(hash, password)
}

function password_passes_requirements(password: string){
    if (password < 8) {
        return {error: "Password too short"};
    }
    return true;
}
