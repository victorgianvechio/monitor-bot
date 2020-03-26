/* eslint-disable no-shadow */
import '../../utils/dotenv';
import pm2 from 'pm2';
import mkdir from '../../utils/logsFolder';

const company = 'fasb';
const serviceAreaDocente = 'area-docente';
const serviceAreaAluno = 'area-aluno';
const serviceDatabase = 'database';

const path = mkdir(company);

pm2.connect(err => {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  pm2.start(
    [
      {
        name: `${company}-${serviceAreaAluno}`,
        namespace: `${company}`,
        script: './dist/clientes/fasb/services/AreaAlunoFASB.js',
        exec_mode: 'fork',
        watch: false,
        env_production: {
          NODE_ENV: 'production',
        },
        log_date_format: 'DD-MM-YYYY HH:mm:ss',
        error_file: `${path}/${serviceAreaAluno}-error.log`,
        out_file: `${path}/${serviceAreaAluno}-out.log`,
      },
      {
        name: `${company}-${serviceAreaDocente}`,
        namespace: `${company}`,
        script: './dist/clientes/fasb/services/AreaDocenteFASB.js',
        exec_mode: 'fork',
        watch: false,
        env_production: {
          NODE_ENV: 'production',
        },
        log_date_format: 'DD-MM-YYYY HH:mm:ss',
        error_file: `${path}/${serviceAreaDocente}-error.log`,
        out_file: `${path}/${serviceAreaDocente}-out.log`,
      },
      {
        name: `${company}-${serviceDatabase}`,
        namespace: `${company}`,
        script: './dist/clientes/fasb/services/DatabaseFASB.js',
        exec_mode: 'fork',
        watch: false,
        env_production: {
          NODE_ENV: 'production',
        },
        log_date_format: 'DD-MM-YYYY HH:mm:ss',
        error_file: `${path}/${serviceDatabase}-error.log`,
        out_file: `${path}/${serviceDatabase}-out.log`,
      },
    ],
    err => {
      pm2.disconnect();
      if (err) throw err;
    }
  );
});
