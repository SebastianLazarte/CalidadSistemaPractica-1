require('dotenv').config();
const Sequelize = require('sequelize');
const DataBase = process.env.DB_KECIA;

module.exports = new Sequelize(process.env.DB_DEVELOP,{
    logging: false,// true for debugging
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, 
            rejectUnauthorized: false 
      }
}});