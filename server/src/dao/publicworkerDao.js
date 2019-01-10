import Dao from "./dao";

export default class PublicWorkerDao extends Dao {
    getAll(callback) {
        super.query("SELECT id, email FROM person NATURAL JOIN public_worker", [], callback);
    }

    createPublicworker(json, callback) {
        super.query("INSERT INTO public_worker VALUES (?)", [json.userId], callback);
    }
}