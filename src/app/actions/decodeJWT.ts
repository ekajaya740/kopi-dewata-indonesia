import { getCookie } from './getCookie';

const jwt = require('jsonwebtoken');

export async function decodeJWT() {
  const cookie = await getCookie('JWT');

  if (!cookie) {
    return null;
  }

  const secret = process.env.JWT_SECRET;

  const decoded = jwt.verify(cookie.value, secret);

  return decoded;
}
