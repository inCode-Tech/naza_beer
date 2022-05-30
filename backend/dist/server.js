"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const rotas_1 = __importDefault(require("../src/rotas/rotas"));
dotenv_1.default.config();
const server = (0, express_1.default)();
const port = process.env.PORT || 5000;
server.use((0, cors_1.default)());
server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
server.use(express_1.default.urlencoded({ extended: false }));
server.use(rotas_1.default);
server.use((req, res) => {
    res.status(404);
    res.json({ error: 'Pagina não encontrada!!!' });
});
server.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});
