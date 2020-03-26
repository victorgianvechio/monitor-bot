import './dotenv';
import Crypt from '../lib/Crypt';

function encrypt() {
  const user = Crypt.encrypt(process.argv[2], process.env.FASB_SECRET_KEY);
  const pass = Crypt.encrypt(process.argv[3], process.env.FASB_SECRET_KEY);

  console.log(user);
  console.log(pass);
}

encrypt();
