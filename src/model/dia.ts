import { Model, DataTypes } from "sequelize";
import { conexaoDB } from "../conexão/conexaoDB";

export interface TipoDia extends Model{
    id: number,
    id_jogador: number,
    pagou: number,
    gols: number,
    vitorias: number,
    dia_jogo: Date
}

export const Dia = conexaoDB.define<TipoDia>('dia', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_jogador: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    pagou: {
        defaultValue: 0,
        type: DataTypes.INTEGER
    },
    gols: {
        defaultValue: 0,
        type: DataTypes.INTEGER
    },
    vitorias: {
        defaultValue: 0,
        type: DataTypes.INTEGER
    },
    dia_jogo: {
        allowNull: false,
        type: DataTypes.DATE
    }
},{
    tableName: 'dia',
    timestamps: false
});