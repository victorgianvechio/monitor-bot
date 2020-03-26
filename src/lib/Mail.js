import nodemailer from 'nodemailer';

class Mail {
  constructor(mailConfig) {
    this.mailConfig = mailConfig;
    const { auth, service } = this.mailConfig;

    this.transporter = nodemailer.createTransport({ service, auth });
  }

  async sendMail(content) {
    const { fromText, emailList } = this.mailConfig;
    const { title, message } = content;

    await this.transporter.sendMail(
      {
        from: fromText,
        to: emailList,
        subject: title,
        html: message,
      },
      (err, response) => {
        if (err) console.log(err);
        else console.log('Message sent:', response.messageId);
      }
    );
  }
}

export default Mail;
