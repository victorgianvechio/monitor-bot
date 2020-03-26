import Connection from '../database/Connection';

class DatabaseMonitor {
  constructor(databaseConfig) {
    this.databaseConfig = databaseConfig;
    this.db = new Connection(databaseConfig);
  }

  async monit() {
    return this.db.testConnection().then(result => {
      console.log(result.status);
      return result;
    });
  }
}

export default DatabaseMonitor;
