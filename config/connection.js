//DECLARATIONS: sequelize, dotenv --------------------
const Sequelize = require('sequelize');
require('dotenv').config();
//SET UP CONNECTION --------------------------
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

//EXPORTS -------------------------------------
module.exports = sequelize;