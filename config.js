import dotenv from 'dotenv';

dotenv.config();

export const config = {
  jwt: {
    secretKey: required('JWT_SECRETKEY'),
    expiresinSec: parseInt(required('JWT_EXPIRESIN_SEC', 6000)),
  },
  bcrypt: {
    saltAround: parseInt(required('BCRYPT_SALTAROUND', 10)),
  },
  host: {
    port: parseInt(required('HOST_PORT', 8000)),
  },
  db: {
    host: required('DB_HOST'),
    username: required('DB_USERNAME'),
    password: required('DB_PASSWORD'),
    database: required('DB_DATABASE'),
  },
};

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key${key} is undefined`);
  }
  return value;
}
