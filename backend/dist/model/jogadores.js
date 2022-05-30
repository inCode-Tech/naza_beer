"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jogador = void 0;
const sequelize_1 = require("sequelize");
const conexaoDB_1 = require("../conex\u00E3o/conexaoDB");
exports.Jogador = conexaoDB_1.conexaoDB.define('jogador', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    nome: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    posicao: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    gols: {
        defaultValue: 0,
        type: sequelize_1.DataTypes.INTEGER
    },
    vitorias: {
        defaultValue: 0,
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    tableName: 'jogador',
    timestamps: false
});
