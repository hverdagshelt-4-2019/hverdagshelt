import Dao from './dao.js';

export default class EventDao extends Dao {
  getAll(communes, callback) {
    super.query('SELECT * FROM happening WHERE commune_name IN (?)', [communes], callback);
  }

  getAllCategoryFilter(communes, categories, callback) {
    super.query(
      'SELECT * FROM happening WHERE commune_name IN (?) AND category IN (?)',
      [communes],
      [categories],
      callback
    );
  }

  getOne(id, callback) {
    super.query('SELECT * FROM happening WHERE id = ?', [id], callback);
  }

  createOne(json, callback) {
    var val = [
      json.submitter_id,
      json.commune_name,
      json.category,
      json.title,
      json.description,
      json.picture,
      json.happening_time
    ];
    super.query(
      'INSERT INTO happening (submitter_id,commune_name, category, title, description, picture, happening_time) VALUES (?,?,?,?,?,?,?)',
      val,
      callback
    );
  }

    updateOne(id, json, callback) {
        var val = [json.commune_name, json.category, json.title, json.description, json.picture, json.happening_time, id];
        super.query("UPDATE happening SET commune_name = ?, category = ?, title = ?, description = ?, picture = ?, happening_time = ? WHERE id = ?",
            val,
            callback
        );
    }

    setPicture(id, img, callback) {
        let params = [img, id];
        super.query("UPDATE event SET picture = ? WHERE id = ?", params, callback);
    }


  deleteOne(id, callback) {
    super.query('DELETE FROM happening WHERE id = ?', [id], callback);
  }

  getAllEvents(callback) {
        super.query("SELECT id, submitter_id, commune_name, category, title, description, picture, happening_time FROM happening", [], callback);
    }

  getEventsByCommune(communes, callback) {
      super.query(
            'SELECT h.id, h.submitter_id, h.commune_name, h.category, h.title, h.description, h.picture, h.happening_time ' +
            'FROM happening h ' +
            'JOIN commune c ON h.commune_name = c.name ' +
            'WHERE c.name in(?);',
            [communes],
            callback
        );
    }
}
