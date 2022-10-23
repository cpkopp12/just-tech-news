//DECLARATIONS: sequalize, db connection ------------------------
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//CREATE USER MODEL ----------------------------------
class User extends Model {}

// define table columns and configuration
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,  // would set up automatically, better to be explicit
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        sequelize, //imported connection
        timestamps: false, //dont use automatic timestamp fields
        freezeTableName: true, //dont pluralize name of table
        underscored: true, //underscores instead of camel casing
        modelName: 'user' //model will stay lowercase in the database
    }
);

//EXPORT MODEL ------------------------------------------
module.exports = User;