import Dao from "./dao";

export default class CompanyDao extends Dao {
    getAll(callback) {
        super.query("SELECT person.id, email, company.name FROM person NATURAL JOIN company", [], callback);
    }

    createCompany(json, callback) {
        super.query("INSERT INTO company VALUES ((SELECT id FROM person WHERE email = ?), ?)", [json.email, json.companyName], callback);
    }

    getByMail(name, callback) {
        super.query("SELECT id FROM company WHERE name = ?", [name], callback);
    }
}