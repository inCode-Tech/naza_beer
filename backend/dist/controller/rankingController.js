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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankingPdfVitorias = exports.rankingPdfGols = exports.rankingVitorias = exports.rankingGols = void 0;
const jogadores_1 = require("../model/jogadores");
const puppeteer_1 = __importDefault(require("puppeteer"));
const rankingGols = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield jogadores_1.Jogador.findAll({
        attributes: ['id', 'nome', 'posicao', 'gols'],
        order: [["gols", "DESC"]]
    });
    res.json(lista);
});
exports.rankingGols = rankingGols;
const rankingVitorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let lista = yield jogadores_1.Jogador.findAll({
        attributes: ['id', 'nome', 'posicao', 'vitorias'],
        order: [["vitorias", "DESC"]]
    });
    res.json(lista);
});
exports.rankingVitorias = rankingVitorias;
const rankingPdfGols = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let browser = yield puppeteer_1.default.launch({ headless: true });
    let page = yield browser.newPage();
    let dataJogo = req.body.dataJogo;
    let url = `https://naza-beer.vercel.app/relatorio/gols?${dataJogo}`;
    yield page.goto(url, {
        waitUntil: 'networkidle0'
    });
    let pdf = yield page.pdf({
        printBackground: true,
        format: 'Letter',
    });
    yield browser.close();
    res.contentType("application/pdf");
    res.send(pdf);
});
exports.rankingPdfGols = rankingPdfGols;
const rankingPdfVitorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let browser = yield puppeteer_1.default.launch({ headless: true });
    let page = yield browser.newPage();
    let url = "https://naza-beer.vercel.app/relatorio/vitorias";
    yield page.goto(url, {
        waitUntil: 'networkidle0'
    });
    let pdf = yield page.pdf({
        printBackground: true,
        format: 'Letter',
    });
    yield browser.close();
    res.contentType("application/pdf");
    res.send(pdf);
});
exports.rankingPdfVitorias = rankingPdfVitorias;
