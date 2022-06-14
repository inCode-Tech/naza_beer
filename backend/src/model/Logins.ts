import { Model, DataTypes } from "sequelize";
import { conexaoDB } from "../conexão/conexaoDB";

export interface TipoJogador extends Model{
    id: Number,
    login: String,
    senha: String
}

export const Logins = conexaoDB.define<TipoJogador>('login', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    login: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    senha: {
        allowNull: false,
        type: DataTypes.STRING
    },
},{
    tableName: 'login',
    timestamps: false
});