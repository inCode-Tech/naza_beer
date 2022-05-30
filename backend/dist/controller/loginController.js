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
exports.novologin = exports.logout = exports.logar = exports.listarLogin = void 0;
const Logins_1 = require("../model/Logins");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const listarLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let lista = yield Logins_1.Logins.findAll();
        res.json(lista);
    }
    catch (error) {
        res.json(error);
    }
});
exports.listarLogin = listarLogin;
const logar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //VERIFICAR SE O USUÁRIO EXISTE
    let id = req.body.id;
    let login = req.body.login;
    let senha = req.body.senha;
    let user = yield Logins_1.Logins.findAll({
        where: {
            id,
            login,
            senha
        }
    });
    if (id == user && login == user && senha == user) {
        res.status(500).json({ message: 'Login inválido!' });
    }
    else {
        const token = jsonwebtoken_1.default.sign({ userId: id }, process.env.SECRET, { expiresIn: 60 * 24 });
        res.json({ auth: true, token });
    }
    //VERIFICAR DEPOIS
});
exports.logar = logar;
const logout = (req, res) => {
    res.json({ auth: false, token: null });
};
exports.logout = logout;
const novologin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hashSenha = yield bcrypt_1.default.hash(req.body.senha, 10);
        let { login } = req.body;
        let novoCadastro = yield Logins_1.Logins.create({ login, senha: hashSenha });
        res.json(novoCadastro);
    }
    catch (error) {
        res.json(error);
    }
});
exports.novologin = novologin;
