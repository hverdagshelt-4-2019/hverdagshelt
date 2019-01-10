import Dao from './dao.js'

export default class CommentDao extends Dao {
    getAll(id, callback) {
        super.query("SELECT description, submitter_id FROM ticket_comment WHERE ticket_id = ?", [id], callback);
    }

    addComment(json, callback) {
        let params = [json.ticket_id, json.description, json.submitter_id]
        super.query("INSERT INTO ticket_comment (ticket_id, description, submitter_id) VALUES (?, ?, ?)",
            params,
            callback);
    }
}