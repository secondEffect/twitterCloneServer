import { getSocketIO } from '../connect/socket.js';
import * as tweetRepo from '../data/tweet.js';

export async function getTweets(req, res) {
  const { username } = req.query;

  const data = await (username
    ? tweetRepo.getByUsername(username)
    : tweetRepo.getAll());
  res.status(200).json(data);
}

export async function getTweetById(req, res) {
  const { id } = req.params;
  const tweet = await tweetRepo.getById(id);

  if (tweet) {
    return res.status(200).json(tweet);
  } else {
    return res.status(404).json({ message: `Tweet id${id} not found!` });
  }
}

export async function createTweet(req, res) {
  const { text } = req.body;
  const tweet = await tweetRepo.create(text, req.userId);
  res.status(201).json(tweet);
  getSocketIO.emit('tweets', tweet);
}

export async function updateTweet(req, res) {
  const { id } = req.params;
  const { text } = req.body;
  const tweet = await tweetRepo.getById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const update = await tweetRepo.update(text, id);
  res.status(201).json(update);
}

export async function deleteTweet(req, res) {
  const { id } = req.params;
  const tweet = await tweetRepo.getById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const result = await tweetRepo.remove(id);
  result ? res.sendStatus(204) : res.sendStatus(404);
}
