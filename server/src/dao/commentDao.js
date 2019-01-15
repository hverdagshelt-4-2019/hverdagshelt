import Dao from './dao.js'

export default class CommentDao extends Dao {
    getAll(id, callback) {
        super.query("SELECT description, person.email FROM ticket_comment JOIN person ON ticket_comment.submitter_id = person.id WHERE ticket_id = ?", [id], callback);
    }

    addComment(json, callback) {
        let params = [json.ticket_id, json.description, json.submitter_id]
        super.query("INSERT INTO ticket_comment (ticket_id, description, submitter_id) VALUES (?, ?, ?)",
            params,
            callback);
    }
}