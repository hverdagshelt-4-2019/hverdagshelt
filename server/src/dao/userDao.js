import Dao from "./dao.js";

export default class UserDao extends Dao {
    getOne(email, callback) {
        console.log("Getting user")
        super.query("SELECT * FROM email WHERE email=?", [email], callback);
    };

    createOne(json, callback) {
        var val = [json.email, json.password];
        super.query("INSERT INTO person (email, password) VALUES (?,?)",
            val,
            callback
        );
    }

    updateOne(email, json, callback) {
        var val = [json.email, json.password, email];
        super.query("UPDATE person SET email = ?, password = ? WHERE email=?",
            val,
            callback
        );
    }

    deleteOne(email, callback){
        super.query("DELETE FROM person WHERE email = ?", [email], callback);
    }

};
