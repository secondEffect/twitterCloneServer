import express from 'express';
import { body } from 'express-validator';
import * as tweetController from '../controller/tweet.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validator = [
  body('text')
    .trim()
    .isLength({ min: 1 })
    .withMessage('tweet must be over 1letters'),
  validate,
];

router.get('/', isAuth, tweetController.getTweets);

router.get('/:id', isAuth, tweetController.getTweetById);

router.post('/', isAuth, validator, tweetController.createTweet);

router.put('/:id', isAuth, validator, tweetController.updateTweet);

router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router;
