import Dao from './dao.js';

export default class TicketDao extends Dao {
    getATicket(id, callback) {
        super.query("SELECT t.id, email as submitter_email, responsible_commune, c2.name as company_name, category, " +
            "title, description, picture, submitted_time, finished_time, status, lat, lng FROM ticket t JOIN person p " +
            "ON p.id = t.submitter_id LEFT JOIN company c2 ON responsible_company_id = c2.id WHERE t.id = ?;",
            [id],
            callback)
    }

  getTicketsByCommune(communes, callback) {
    super.query(
      'SELECT t.id, email as submitter_email, responsible_commune, c2.name as company_name, category, ' +
        'title, description, picture, submitted_time, finished_time, status, lat, lng FROM ticket t JOIN person p ' +
        'ON p.id = t.submitter_id LEFT JOIN company c2 ON responsible_company_id = c2.id WHERE responsible_commune in(?);',
      [communes],
      callback
    );
  }
  
    getTicketsByCategory(communes, categories, callback) {
        super.query("SELECT t.id, email as submitter_email, responsible_commune, c2.name as company_name, category, " +
            "title, description, picture, submitted_time, finished_time, status, lat, lng FROM ticket t JOIN person p " +
            "ON p.id = t.submitter_id LEFT JOIN company c2 ON responsible_company_id = c2.id WHERE responsible_commune in(?) AND " +
            "category IN (?);",
            [communes, categories],
            callback)
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

    setPicture(id, json, callback) {
        let params = [json.picture, id];
        super.query("UPDATE ticket SET picture = ? WHERE id = ?", params, callback);
    }

    setStatus(id, json, callback) {
        let params = [json.status, id];
        super.query("UPDATE ticket SET status = ? WHERE ticket.id = ?", params, callback);
    }

    setResponsibility(id, json, callback) {
        let params = [json.company, id];
        super.query("UPDATE ticket SET responsible_company_id = ? WHERE ticket.id = ?", params, callback);
    }
    
    deleteTicket(id, callback) {
        super.query("DELETE FROM ticket WHERE id = ?",
            [id],
            callback)
    }
}

