/* eslint-disable no-shadow */
import '../../utils/dotenv';
import pm2 from 'pm2';

const company = 'fasb';
const serviceAreaDocente = 'area-docente';
const serviceDatabase = 'database';

pm2.connect(err => {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  pm2.start(
    [
      {
        name: `${company}-${serviceAreaDocente}`,
        script: './dist/clientes/fasb/services/AreaDocenteFASB.js',
        exec_mode: 'fork',
        watch: false,
        env_production: {
          NODE_ENV: 'production',
        },
        log_date_format: 'DD-MM-YYYY HH:mm:ss',
        // error_file: `logs/${company}/${serviceAreaDocente}-error.log`,
        // out_file: `logs/${company}/${serviceAreaDocente}-out.log`,
      },
      {
        name: `${company}-${serviceDatabase}`,
        script: './dist/clientes/fasb/services/DatabaseFASB.js',
        exec_mode: 'fork',
        watch: false,
        env_production: {
          NODE_ENV: 'production',
        },
        log_date_format: 'DD-MM-YYYY HH:mm:ss',
        // error_file: `logs/${company}/${serviceDatabase}-error.log`,
        // out_file: `logs/${company}/${serviceDatabase}-out.log`,
      },
    ],
    err => {
      pm2.disconnect();
      if (err) throw err;
    }
  );
});
