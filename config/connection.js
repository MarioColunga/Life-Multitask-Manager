const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'db_project',
    'root',
    '12345678*',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

module.exports = sequelize;