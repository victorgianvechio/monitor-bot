import '../../../utils/dotenv';

import AreaDocenteMonitor from '../../../services/ServiceMonitor';
import Mail from '../../../lib/Mail';
import mailConfig from '../config/mail';
import template from '../config/mailTemplate';

const uri = process.env.FASB_AREA_DOCENTE_URI;
const timer = process.env.FASB_TIMER;

const mail = new Mail(mailConfig);
const areaDocenteMonitor = new AreaDocenteMonitor(uri);

let sendedMail = false;

async function start() {
  const { status, statusText } = await areaDocenteMonitor.monit();

  // Envia e-mail de problema solucionado
  if (sendedMail === true && status === 200) {
    await mail.sendMail(
      template({
        title: 'Problema solucioanado Área Docente - FASB',
        message: `Solucionado em <b>${new Date()}</b>`,
        log: `${status} - ${statusText}`,
      })
    );
    sendedMail = false;
  }

  // Envia e-mail com o problema encontrado
  if (sendedMail === false && status !== 200) {
    await mail.sendMail(
      template({
        title: 'Perda de conexão Área Docente - FASB',
        message: `Perda de conexão em <b>${new Date()}</b>`,
        log: `${status} - ${statusText}`,
      })
    );
    sendedMail = true;
  }
}

setInterval(() => start(), timer);
