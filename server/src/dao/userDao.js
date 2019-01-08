import Dao from "./dao.js";

module.exports = class UserDao extends Dao {
    getOne(email, callback) {
        console.log("Getting user")
        super.query("SELECT * FROM email WHERE email=?", [email], callback);
    };

    createOne(json, callback) {
        var val = [json.email, json.salt, json.password];
        super.query("INSERT INTO person (email, salt, password) VALUES (?,?,?)",
            val,
            callback
        );
    }

    updateOne(email, json, callback) {
        var val = [json.email, json.salt, json.password, email];
        super.query("UPDATE person SET email = ?, salt = ?, password = ? WHERE email=?",
            val,
            callback
        );
    }

};
