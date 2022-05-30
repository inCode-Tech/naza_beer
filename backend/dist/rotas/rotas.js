"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jogadoresController = __importStar(require("../controller/jogadoresController"));
const vitoriasController = __importStar(require("../controller/vitoriasController"));
const golsController = __importStar(require("../controller/golsController"));
const loginController = __importStar(require("../controller/loginController"));
const rankingController = __importStar(require("../controller/rankingController"));
const pagouController = __importStar(require("../controller/pagouController"));
const rota = (0, express_1.Router)();
//ROTA DE LOGIN
rota.post('/login', loginController.novologin);
rota.post('/logar', loginController.logar);
rota.post('/logout', loginController.logout);
rota.get('/listarLogin', loginController.listarLogin);
//ROTAS DA PÁGINA JOGADORES
rota.get('/jogadores', jogadoresController.listarjogadores);
rota.post('/jogadores', jogadoresController.cadastroJogador);
rota.put('/jogadores/:id', jogadoresController.editarJogador);
rota.delete('/jogadores/:id', jogadoresController.excluirJogador);
//ROTAS DA PÁGINA GOLS
rota.get('/golsTotais', golsController.listarTotalGols);
rota.get('/golsDia', golsController.listarGolsDia);
rota.put('/gols/:id', golsController.editarGols);
//ROTAS DA PÁGINA VITORIAS
rota.get('/vitoriasTotais', vitoriasController.listarTotalVitorias);
rota.get('/vitoriasDia', vitoriasController.listarVitoriasDia);
rota.put('/vitorias/:id', vitoriasController.editarVitorias);
//ROTAS DE PAGAMENTO
rota.get('/pagamento', pagouController.pagamento);
rota.put('/pagamento/:id', pagouController.NovoPagamento);
//ROTAS DE RANKING
rota.get('/rankingols', rankingController.rankingGols);
rota.get('/rankingvitorias', rankingController.rankingVitorias);
rota.get('/relatorioGols', rankingController.rankingPdfGols);
rota.get('/relatorioVitorias', rankingController.rankingPdfVitorias);
exports.default = rota;
