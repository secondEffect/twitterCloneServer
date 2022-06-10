import express from 'express';
import { body } from 'express-validator';

import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const resisterValidator = [
  body('username')
    .trim()
    .isLength({ min: 4, max: 12 })
    .withMessage('username must be 4 to 12 letters'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 12 })
    .withMessage('password must be 4 to 12 letters'),
  body('email').trim().isEmail().withMessage('please check email-form'),
  body('url')
    .trim()
    .isURL()
    .optional({ checkFalsy: false, nullable: true })
    .withMessage('url is optional'),
  validate,
];

const signinValidator = [
  body('username')
    .trim()
    .isLength({ min: 4, max: 12 })
    .withMessage('username must be 4 to 12 letters'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 12 })
    .withMessage('password must be 4 to 12 letters'),
  validate,
];

router.post('/resister', resisterValidator, authController.resister);

router.post('/signin', signinValidator, authController.signin);

router.get('/me', isAuth, authController.me);

export default router;
