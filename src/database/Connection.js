import oracledb from 'oracledb';

class Connection {
  constructor(databaseConfig) {
    oracledb.outFormat = oracledb.OBJECT;

    this.databaseConfig = databaseConfig;
    this.conn = '';
  }

  async testConnection() {
    try {
      this.conn = await oracledb.getConnection(this.databaseConfig);
      return { status: true };
    } catch (err) {
      return {
        status: false,
        err,
      };
    } finally {
      if (this.conn) {
        try {
          await this.conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}

export default Connection;
