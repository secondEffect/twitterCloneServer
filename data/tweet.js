import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';
const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Tweet.belongsTo(User, { foreignKey: { allowNull: false } });

const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [sequelize.col('user.username'), 'username'],
    [sequelize.col('user.name'), 'name'],
    [sequelize.col('user.email'), 'email'],
    [sequelize.col('user.url'), 'url'],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_DESC = { order: [['createdAt', 'DESC']] };

export function getAll() {
  return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC }).then((data) => data);
}

export function getByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    include: { ...INCLUDE_USER.include, where: { username } },
    ...ORDER_DESC,
  });
}

export function getById(id) {
  return Tweet.findByPk(id, { ...INCLUDE_USER });
}

export function create(text, userId) {
  return Tweet.create({ text, userId }).then((tweet) =>
    getById(tweet.getDataValue('id'))
  );
}

export function update(text, id) {
  return Tweet.findByPk(id).then((tweet) => {
    tweet.text = text;
    return tweet.save();
  });
}

export function remove(id) {
  return Tweet.findByPk(id).then((tweet) => tweet.destroy());
}
