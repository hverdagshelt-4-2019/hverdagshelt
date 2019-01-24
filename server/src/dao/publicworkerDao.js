import Dao from "./dao";

export default class PublicWorkerDao extends Dao {
    getAll(callback) {
        super.query("SELECT id, email, username, commune_name FROM person NATURAL JOIN public_worker", [], callback);
    }

    createPublicworker(json, callback) {
        super.query("INSERT INTO public_worker VALUES ((SELECT id FROM person WHERE email = ?), ?)", [json.email, json.commune], callback);
    }
}