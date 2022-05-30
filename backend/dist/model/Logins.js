"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logins = void 0;
const sequelize_1 = require("sequelize");
const conexaoDB_1 = require("../conex\u00E3o/conexaoDB");
exports.Logins = conexaoDB_1.conexaoDB.define('login', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    login: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    senha: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: 'login',
    timestamps: false
});
