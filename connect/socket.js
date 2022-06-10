import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication Error'));
      }
      jwt.verify(token, config.jwt.secretKey, (err, decoded) => {
        if (err) {
          return next(new Error('Authentication Error'));
        }
      });
      next();

      this.io.on('connection', (socket) => {
        console.log('connected');
        console.log(socket);
      });
    });
  }
}

let socket;

export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}

export function getSocketIO() {
  if (!socket) {
    throw new Error('please call init first');
  }
  return socket.io;
}
