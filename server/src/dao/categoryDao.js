import Dao from "./dao.js";

export default class CategoryDao extends Dao {
    getAllTicket(callback) {
        super.query("SELECT * FROM ticket_category",[], callback);
    };

    createOneTicket(name, callback) {
        super.query("INSERT INTO ticket_category (name) VALUES (?)",
            name,
            callback
        );
    }

    deleteOneTicket(name, callback){
        super.query("DELETE FROM ticket_category WHERE name = ?", [name], callback);
    }

    getAllEvent(callback) {
        super.query("SELECT * FROM happening_category",[], callback);
    };

    createOneEvent(name, callback) {
        super.query("INSERT INTO happening_category (name) VALUES (name)",
            val,
            callback
        );
    }

    deleteOneEvent(name, callback){
        super.query("DELETE FROM happening_category WHERE name = ?", [name], callback);
    }

};
