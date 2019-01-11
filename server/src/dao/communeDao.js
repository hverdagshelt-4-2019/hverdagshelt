import Dao from './dao'

export default class CommuneDao extends Dao{
    getAll(callback) {
        super.query("SELECT name FROM commune", [], callback);
    }

    getFollowed(id, callback) {
        super.query("SELECT commune.name FROM commune NATURAL JOIN person_CROSS_commune WHERE person_id = ?", [id], callback);
    }

    getNotFollowed(id, callback) {
        super.query("SELECT commune.name FROM commune WHERE commune.name NOT IN (SELECT name FROM commune NATURAL JOIN person_CROSS_commune WHERE id = ?)", [id], callback);
    }

    followCommune(user_id, commune_name, callback) {
        super.query("INSERT INTO person_CROSS_commune VALUES(?, ?)", [user_id, commune_name], callback);
    }

    unfollowCommune(user_id, commune_name, callback) {
        super.query("DELETE FROM person_CROSS_commune WHERE person_id = ? AND commune_name = ?", [user_id, commune_name], callback);
    }
}