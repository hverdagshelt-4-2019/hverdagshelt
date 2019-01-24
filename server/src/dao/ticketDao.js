import Dao from './dao.js';

export default class TicketDao extends Dao {
    getATicket(id, callback) {
        super.query("SELECT t.id, username as name, email as submitter_email, responsible_commune, c2.name as company_name, category, \n" +
            "title, description, picture, submitted_time, finished_time, status, statusText, lat, lng FROM ticket t JOIN person p \n" +
            "ON p.id = t.submitter_id LEFT JOIN company c2 ON responsible_company_id = c2.id WHERE t.id = ?;",
            [id],
            callback)
    }

    getTicketsByCommune(communes, callback) {
        super.query(
            'SELECT t.id, email as submitter_email, count(t2.description) as countcomm, responsible_commune,\n' +
            ' c2.name as company_name, category, title, t.description, picture, submitted_time, finished_time, status,\n' +
            ' lat, lng FROM ticket t JOIN person p ON p.id = t.submitter_id LEFT JOIN company c2 ON\n' +
            ' responsible_company_id = c2.id JOIN ticket_comment t2 on t.id = t2.ticket_id WHERE responsible_commune in (?) GROUP BY t.id;',
            [communes],
            callback
        );
    }

    getTicketsByCompany(companyId, callback) {
        super.query(
            'SELECT t.id, email as submitter_email, count(t2.description) as countcomm, responsible_commune,\n' +
            ' c2.name as company_name, category, title, description, picture, submitted_time, finished_time, status,\n' +
            ' lat, lng FROM ticket t JOIN person p ON p.id = t.submitter_id LEFT JOIN company c2 ON\n' +
            ' responsible_company_id = c2.id JOIN ticket_comment t2 ON t.id = t2.ticket_id\n' +
            ' WHERE responsible_company_id = ? GROUP BY t.id;',
            [companyId],
            callback
        )
    }

    addTicket(json, callback) {
        let params = [json.userid, json.commune, json.category, json.title, json.description, json.picture, json.lat, json.long]
        super.query("INSERT INTO ticket (submitter_id, responsible_commune, category, title, description, picture, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            params,
            callback)
    }

    editTicket(id, json, callback) {
        let params = [json.category, json.title, json.description, json.lat, json.long, id]
        super.query(
            "UPDATE ticket SET category = ?, title = ?, description = ?, lat = ?, lng = ? WHERE id = ?;",
            params,
            callback)
    }

    setPicture(id, img, callback) {
        let params = [img, id];
        super.query("UPDATE ticket SET picture = ? WHERE id = ?", params, callback);
    }

    setStatus(id, json, callback) {
        let params = [json.status, json.statusText, id];
        super.query("UPDATE ticket SET status = ?, statusText = ? WHERE ticket.id = ?", params, callback);
    }

    setResponsibility(id, json, callback) {
        let params = [json.id, id];
        super.query("UPDATE ticket SET responsible_company_id = ? WHERE ticket.id = ?", params, callback);
    }

    deleteTicket(id, callback) {
        super.query("DELETE FROM ticket WHERE id = ?",
            [id],
            callback)
    }

    getAllTickets(callback) {
        super.query("SELECT t.id, email as submitter_email, responsible_commune, c2.name as company_name, category,\n" +
            "title, t.description, picture, submitted_time, finished_time, status, lat, lng, COUNT(co.id) as countcomm FROM ticket t\n" +
            "JOIN person p ON p.id = t.submitter_id LEFT JOIN company c2 ON responsible_company_id = c2.id LEFT JOIN\n" +
            "ticket_comment co ON t.id = co.ticket_id GROUP BY t.id;\n",
            [],
            callback);
    }

    getTicketsByUser(id, callback) {
        super.query("SELECT t.id, email as submitter_email, responsible_commune, c2.name as company_name, category,\n" +
            "title, t.description, picture, submitted_time, finished_time, status, lat, lng, COUNT(co.id) as countcomm FROM ticket t JOIN person p\n" +
            "ON p.id = t.submitter_id LEFT JOIN company c2 ON responsible_company_id = c2.id\n" +
             "LEFT JOIN ticket_comment co ON t.id = co.ticket_id WHERE t.submitter_id = ? GROUP BY t.id;",
            [id],
            callback);
    }
}

