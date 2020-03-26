import axios from 'axios';

class AreaDocenteMonitor {
  constructor(uri) {
    this.uri = uri;
    this.axios = axios;
  }

  async monit() {
    return this.axios
      .get(this.uri)
      .then(response => {
        console.log(response.status, response.statusText);
        return response;
      })
      .catch(error => {
        console.log(error.response.status, error.response.statusText);
        return error.response;
      });
  }
}

export default AreaDocenteMonitor;
