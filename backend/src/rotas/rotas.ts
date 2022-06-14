import { Router } from "express";
import * as jogadoresController from "../controller/jogadoresController";
import * as vitoriasController from "../controller/vitoriasController";
import * as golsController from "../controller/golsController";
import * as loginController from "../controller/loginController";
import * as rankingController from "../controller/rankingController"
import * as pagouController from "../controller/pagouController";

const rota = Router();

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
rota.get('/golsDia/:data', golsController.listarGolsDia);
rota.put('/gols/:id', golsController.editarGols);

//ROTAS DA PÁGINA VITORIAS
rota.get('/vitoriasTotais', vitoriasController.listarTotalVitorias);
rota.get('/vitoriasDia/:data', vitoriasController.listarVitoriasDia);
rota.put('/vitorias/:id', vitoriasController.editarVitorias);

//ROTAS DE PAGAMENTO
rota.get('/pagamento', pagouController.pagamento);
rota.put('/pagamento/:id', pagouController.NovoPagamento);

//ROTAS DE RANKING
rota.get('/rankingols', rankingController.rankingGols);
rota.get('/rankingvitorias', rankingController.rankingVitorias);
rota.get('/relatorioGols', rankingController.rankingPdfGols);
rota.get('/relatorioVitorias', rankingController.rankingPdfVitorias);

export default rota;