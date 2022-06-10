import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepo from '../data/auth.js';

export const isAuth = (req, res, next) => {
  const AUTH_ERR_MSG = { message: 'authentication error' };

  const authorization = req.get('authorization');
  if (!(authorization && authorization.startsWith('Bearer'))) {
    return res.status(401).json(AUTH_ERR_MSG);
  }
  const token = authorization.split(' ')[1];
  jwt.verify(token, config.jwt.secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json(AUTH_ERR_MSG);
    }
    const user = await userRepo.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERR_MSG);
    }
    req.userId = user.id;
    req.token = token;
    next();
  });
};
