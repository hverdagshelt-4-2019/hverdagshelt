import Dao from "./dao.js";

module.exports = class EventDao extends Dao {
    getAll(categories,callback){
        super.query("SELECT * FROM happening WHERE category_id IN (?)", [categories], callback);
    };

    getOne(id : number, callback: Function) {
        console.log("Get on article")
        super.query("SELECT * FROM article WHERE articleId=?", [id], callback);
    };

    createOne(json: Object, callback: Function) {
        var val = [json.title, json.content, json.picture, json.category, json.priority];
        super.query("INSERT INTO article (title,content, picture, category, priority) VALUES (?,?,?,?,?)",
            val,
            callback
        );
    }

    updateOne(id: number, json: Object, callback: Function) {
        var val = [json.title, json.content, json.picture, json.category, json.priority, id];
        super.query("UPDATE article SET title = ?, content = ?, picture = ?, category = ?, priority = ? WHERE articleId=?",
            val,
            callback
        );
    }

    deleteOne(id: number, callback : Function){
        super.query("DELETE FROM article WHERE articleId = ?", [id], callback);
    }

    getLive(callback : Function){
        super.query("SELECT * FROM article ORDER BY dateUpload DESC LIMIT 10",[], callback);
    }

};