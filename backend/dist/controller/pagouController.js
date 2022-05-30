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
exports.NovoPagamento = exports.pagamento = void 0;
const dia_1 = require("../model/dia");
const pagamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield dia_1.Dia.findAll({
        attributes: ['id', 'id_jogador', 'pagou']
    });
    res.json(lista);
});
exports.pagamento = pagamento;
const NovoPagamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let { dia_jogo, id_jogador, pagou } = req.body;
    let pegaID = yield dia_1.Dia.findByPk(id);
    let diaSelecionado = yield dia_1.Dia.findOne({
        where: {
            pagou,
            dia_jogo
        }
    });
    if (diaSelecionado != null) {
        (pegaID === null || pegaID === void 0 ? void 0 : pegaID.pagou) == 1;
        yield diaSelecionado.save();
        res.json(diaSelecionado);
    }
    else {
        res.render("O jogador não pagou");
    }
    if (diaSelecionado == null) {
        try {
            let novoDia = yield dia_1.Dia.create({ id_jogador, pagou, dia_jogo });
            res.send(novoDia);
        }
        catch (Erro) {
            console.log(Erro);
        }
    }
    else if (diaSelecionado == dia_jogo) {
        res.write("Dia já existente!!");
    }
});
exports.NovoPagamento = NovoPagamento;
