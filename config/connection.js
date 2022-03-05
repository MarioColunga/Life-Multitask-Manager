require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: env.HOST,
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;
