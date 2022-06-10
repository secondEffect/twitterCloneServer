import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';

export const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(48),
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING(48), allowNull: false },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: { type: DataTypes.STRING(128), allowNull: false },
    url: { type: DataTypes.TEXT, allowNull: true },
  },
  { timestamps: false }
);

export function findByUsername(username) {
  return User.findOne({ where: { username } });
}

export function resister(user) {
  return User.create(user).then((data) => data.dataValues.id);
}

export function findById(id) {
  return User.findByPk(id);
}
