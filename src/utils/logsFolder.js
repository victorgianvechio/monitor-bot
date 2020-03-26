import os from 'os';
import fs from 'fs';
import { resolve } from 'path';

function mkdir(company) {
  const homedir = os.homedir();
  const path = resolve(homedir, '.pm2', 'logs', company);

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  return path;
}

export default mkdir;
