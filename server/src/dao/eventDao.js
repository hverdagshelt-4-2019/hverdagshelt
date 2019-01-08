import Dao from "./dao.js";

export default class EventDao extends Dao {
    getAll(communes,callback){
        super.query("SELECT * FROM happening WHERE commune_name IN (?)", [communes], callback);
    };

    getAllCategoryFilter(communes, categories, callback){
        super.query("SELECT * FROM happening WHERE commune_name IN (?) AND category IN (?)", [communes],[categories], callback);
    };

    getOne(id, callback) {
        super.query("SELECT * FROM happening WHERE id = ?", [id], callback);
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