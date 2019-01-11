import Dao from './dao.js'

export default class AdminDao extends Dao {
    getAll(callback) {
        super.query("SELECT id, email FROM person NATURAL JOIN admin", [], callback);
    }

    createAdmin(json, callback) {
        super.query("INSERT INTO admin VALUES ((SELECT id FROM person WHERE email = ?))", [json.email], callback);
    }
}