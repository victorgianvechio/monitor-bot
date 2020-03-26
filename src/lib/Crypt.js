/* eslint-disable new-cap */
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

class Crypt {
  constructor() {
    this.iv_length = 16;
    this.algorithm = process.env.CRYPT_ALGORITHM;
  }

  encrypt(text, key) {
    const iv = randomBytes(this.iv_length);
    const cipher = createCipheriv(this.algorithm, new Buffer.from(key), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decrypt(text, key) {
    const textParts = text.split(':');
    const iv = new Buffer.from(textParts.shift(), 'hex');
    const encryptedText = new Buffer.from(textParts.join(':'), 'hex');
    const decipher = createDecipheriv(this.algorithm, new Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}

export default new Crypt();
