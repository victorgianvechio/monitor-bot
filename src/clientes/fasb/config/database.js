import Crypt from '../../../lib/Crypt';

export default {
  user: Crypt.decrypt(process.env.FASB_DB_USER, process.env.FASB_SECRET_KEY),
  password: Crypt.decrypt(
    process.env.FASB_DB_PASS,
    process.env.FASB_SECRET_KEY
  ),
  connectString: process.env.FASB_CONNECT_STRING,
};
