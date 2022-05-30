"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarGols = exports.listarGolsDia = exports.listarTotalGols = void 0;
const dia_1 = require("../model/dia");
const jogadores_1 = require("../model/jogadores");
const conexaoDB_1 = require("../conex\u00E3o/conexaoDB");
const listarTotalGols = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield jogadores_1.Jogador.findAll({
        attributes: ['id', 'nome', 'posicao', 'gols'],
        order: [['gols', 'DESC']]
    });
    res.json(lista);
});
exports.listarTotalGols = listarTotalGols;
const listarGolsDia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { dia } = req.body;
    let listaDia = yield conexaoDB_1.conexaoDB.query(`
        SELECT nome, posicao, dia.gols, dia_jogo 
        FROM dia 
        INNER JOIN Jogador 
        ON dia.id_jogador = jogador.id
        WHERE dia.dia_jogo = '${dia} 03:00:00.000 +00:00'
    `);
    res.json(listaDia[0]);
});
exports.listarGolsDia = listarGolsDia;
const editarGols = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id_jogador = req.params.id;
    let { dia_jogo, gols } = req.body;
    let jogadorSelecionado = yield jogadores_1.Jogador.findByPk(id_jogador);
    let diaSelecionado = yield dia_1.Dia.findOne({
        where: {
            id_jogador,
            dia_jogo,
        }
    });
    if (diaSelecionado === null) {
        yield dia_1.Dia.create({ id_jogador, gols, dia_jogo });
    }
    else {
        diaSelecionado.gols = gols;
        yield diaSelecionado.save();
    }
    if (jogadorSelecionado) {
        const golsJogador = yield dia_1.Dia.findAll({
            attributes: ['gols'],
            where: {
                id_jogador: jogadorSelecionado.id
            }
        });
        let totalDeGols = 0;
        golsJogador.forEach(jogador => {
            totalDeGols += jogador.gols;
        });
        jogadorSelecionado.gols = totalDeGols;
        yield jogadorSelecionado.save();
    }
    res.json("Gols cadastrados!");
});
exports.editarGols = editarGols;
