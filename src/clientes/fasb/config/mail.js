export default {
  auth: {
    user: process.env.FASB_MAIL_USER,
    pass: process.env.FASB_MAIL_PASS,
  },
  service: 'gmail',
  fromText: `"${process.env.APP_NAME}" <${process.env.FASB_MAIL_USER}>`,
  emailList: process.env.FASB_MAIL_LIST,
};
