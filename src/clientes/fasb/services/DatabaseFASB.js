// import '../../../utils/dotenv';

import DatabaseMonitor from '../../../services/DatabaseMonitor';
import databaseConfig from '../config/database';
import Mail from '../../../lib/Mail';
import mailConfig from '../config/mail';
import template from '../config/mailTemplate';

const timer = process.env.FASB_TIMER;

const mail = new Mail(mailConfig);
const databaseMonitor = new DatabaseMonitor(databaseConfig);

let sendedMail = false;

async function start() {
  const { err, status } = await databaseMonitor.monit();

  // Envia e-mail de problema solucionado
  if (sendedMail === true && !err) {
    await mail.sendMail(
      template({
        title: 'Problema solucioanado Banco de Dados - FASB',
        message: `Solucionado em <b>${new Date()}</b>`,
        log: `Connection ${status}`,
      })
    );
    sendedMail = false;
  }

  // Envia e-mail com o problema encontrado
  if (sendedMail === false && err) {
    await mail.sendMail(
      template({
        title: 'Perda de conexão Banco de Dados - FASB',
        message: `Perda de conexão em <b>${new Date()}</b>`,
        log: `${err}`,
      })
    );
    sendedMail = true;
  }
}

setInterval(() => start(), timer);
