import Dao from "./dao";

export default class CompanyDao extends Dao {
    getAll(callback) {
        super.query("SELECT person.id, email, company.name FROM person NATURAL JOIN company", [], callback);
    }

    createCompany(json, callback) {
        super.query("INSERT INTO company VALUES (?, ?)", [json.userId, json.companyName], callback);
    }
}