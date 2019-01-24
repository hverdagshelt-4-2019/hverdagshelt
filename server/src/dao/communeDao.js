import Dao from './dao'

export default class CommuneDao extends Dao{
    getAll(callback) {
        super.query("SELECT name as commune_name FROM commune", [], callback);
    }

    getFollowed(id, callback) {
        super.query("SELECT commune_name FROM person_CROSS_commune pc WHERE person_id = ?", [id], callback);
    }

    getNotFollowed(id, callback) {
        super.query("SELECT commune.name as commune_name FROM commune WHERE commune.name NOT IN (SELECT name FROM commune JOIN person_CROSS_commune pc ON commune.name = pc.commune_name WHERE person_id = ?)", [id], callback);
    }

    followCommune(user_id, commune_name, callback) {
        super.query("INSERT INTO person_CROSS_commune VALUES(?, ?)", [user_id, commune_name], callback);
    }

    unfollowCommune(user_id, commune_name, callback) {
        super.query("DELETE FROM person_CROSS_commune WHERE person_id = ? AND commune_name = ?", [user_id, commune_name], callback);
    }
}