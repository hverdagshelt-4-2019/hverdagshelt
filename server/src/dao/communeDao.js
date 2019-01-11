import Dao from './dao'

export default class CommuneDao extends Dao{
    getAll(callback) {
        super.query("SELECT name FROM commune", [], callback);
    }

    followCommune(user_id, commune_id, callback) {
        super.query("INSERT INTO person_CROSS_commune VALUES(?, ?)", [user_id, commune_id], callback);
    }

    unfollowCommune(user_id, commune_id, callback) {
        super.query("DELETE FROM person_CROSS_commune WHERE person_id = ? AND commune_id = ?", [user_id, commune_id], callback);
    }
}