import mysql from 'mysql2';
import { Sequelize } from 'sequelize';
import { config } from '../config.js';

const { host, username, password, database } = config.db;

const pool = mysql.createPool({ user: username, password, database, host });

export const sequelize = new Sequelize(database, username, password, {
  dialect: 'mysql',
  logging: false,
});
