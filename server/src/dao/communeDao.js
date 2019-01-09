import Dao from './dao'

export default class CommuneDao extends Dao{
    getAll(callback) {
        super.query("SELECT name FROM commune", [], callback);
    }
}