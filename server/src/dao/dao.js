export default class Dao {
  constructor(pool) {
    // Dependency Injection
    this.pool = pool;
  }

  query(sql, params, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        console.log('dao: error connecting', err);
        callback(500, { error: 'feil ved ved oppkobling' });
      } else {
        console.log('dao: running sql: ' + sql);
        connection.query(sql, params, (err, rows) => {
          connection.release();
          if (err) {
            console.log(err);
            callback(500, { error: 'error querying' });
          } else {
            callback(200, rows);
          }
        });
      }
    });
  }
}
