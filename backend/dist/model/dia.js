"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dia = void 0;
const sequelize_1 = require("sequelize");
const conexaoDB_1 = require("../conex\u00E3o/conexaoDB");
exports.Dia = conexaoDB_1.conexaoDB.define('dia', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    id_jogador: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    pagou: {
        defaultValue: 0,
        type: sequelize_1.DataTypes.INTEGER
    },
    gols: {
        defaultValue: 0,
        type: sequelize_1.DataTypes.INTEGER
    },
    vitorias: {
        defaultValue: 0,
        type: sequelize_1.DataTypes.INTEGER
    },
    dia_jogo: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: 'dia',
    timestamps: false
});
