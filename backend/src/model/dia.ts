import { Model, DataTypes } from "sequelize";
import { conexaoDB } from "../conexão/conexaoDB";

export interface TipoDia extends Model{
    id: Number,
    id_jogador: Number,
    pagou: Boolean,
    gols: Number,
    vitorias: Number,
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
        allowNull: false,
        type: DataTypes.BOOLEAN
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