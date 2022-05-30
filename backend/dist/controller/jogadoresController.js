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
exports.excluirJogador = exports.editarJogador = exports.cadastroJogador = exports.listarjogadores = void 0;
const jogadores_1 = require("../model/jogadores");
const listarjogadores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let lista = yield jogadores_1.Jogador.findAll({
            attributes: ['id', 'nome', 'posicao']
        });
        res.json(lista);
    }
    catch (error) {
        res.json(error);
    }
});
exports.listarjogadores = listarjogadores;
const cadastroJogador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { nome, posicao } = req.body;
        let novoJogador = yield jogadores_1.Jogador.create({ nome, posicao });
        res.json(novoJogador);
    }
    catch (error) {
        res.json(error);
    }
});
exports.cadastroJogador = cadastroJogador;
const editarJogador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let { nome, posicao } = req.body;
    let novoJogador = yield jogadores_1.Jogador.findByPk(id);
    if (novoJogador) {
        novoJogador.nome = nome;
        novoJogador.posicao = posicao;
        yield novoJogador.save();
        res.json(novoJogador);
    }
    else {
        res.json({ error: 'Jogador não encontrado' });
    }
});
exports.editarJogador = editarJogador;
const excluirJogador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params;
    let deletarJogador = yield jogadores_1.Jogador.destroy({
        where: id
    });
    res.json("Jogador excluido com sucesso");
});
exports.excluirJogador = excluirJogador;
