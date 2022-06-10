import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepo from '../data/auth.js';
import { config } from '../config.js';

export async function resister(req, res) {
  const { username, name, password, email, url } = req.body;
  const check = await userRepo.findByUsername(username);
  console.log('check', check);
  if (check) {
    return res.status(409).json({ message: `invalid already username` });
  }
  const hash = await bcrypt.hash(password, config.bcrypt.saltAround);
  const userId = await userRepo.resister({
    username,
    name,
    password: hash,
    email,
    url,
  });
  const token = await createToken(userId);
  res.status(201).json({ token, username });
}

export async function signin(req, res) {
  const { username, password } = req.body;
  const user = await userRepo.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: `Incorrect username or password` });
  }
  bcrypt.compare(password, user.password, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: `Incorrect username or password` });
    }
  });
  const token = createToken(user.id);
  res.status(200).json({ token, username });
}

export async function me(req, res) {
  const user = await userRepo.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

function createToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresinSec,
  });
}
