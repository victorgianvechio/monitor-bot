// import '../../../utils/dotenv';

import AreaAlunoMonitor from '../../../services/ServiceMonitor';
import Mail from '../../../lib/Mail';
import mailConfig from '../config/mail';
import template from '../config/mailTemplate';

const uri = process.env.FASB_AREA_ALUNO_URI;
const timer = process.env.FASB_TIMER;

const mail = new Mail(mailConfig);
const areaAlunoMonitor = new AreaAlunoMonitor(uri);

let sendedMail = false;

async function start() {
  const { status, statusText } = await areaAlunoMonitor.monit();

  // Envia e-mail de problema solucionado
  if (sendedMail === true && status === 200) {
    await mail.sendMail(
      template({
        title: 'Problema solucioanado Área Aluno - FASB',
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
        title: 'Perda de conexão Área Aluno - FASB',
        message: `Perda de conexão em <b>${new Date()}</b>`,
        log: `${status} - ${statusText}`,
      })
    );
    sendedMail = true;
  }
}

setInterval(() => start(), timer);
