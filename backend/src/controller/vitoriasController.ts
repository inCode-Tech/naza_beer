import { Request, Response } from "express";
import { Jogador } from "../model/jogadores";
import { conexaoDB } from "../conexão/conexaoDB";
import { Dia } from "../model/dia";

export const listarTotalVitorias = async ( req: Request, res: Response ) => {
    let lista = await Jogador.findAll({
        attributes: [ 'id', 'nome', 'posicao', 'gols', 'vitorias' ]
    });
    res.json(lista);
}

export const listarVitoriasDia = async ( req: Request, res: Response ) => {
    let data = req.params.data;

    let listaDia = await conexaoDB.query(`
        SELECT id_jogador, nome, posicao, dia.vitorias, dia_jogo 
        FROM dia 
        INNER JOIN Jogador 
        ON dia.id_jogador = jogador.id
        WHERE dia.dia_jogo = '${data} 03:00:00.000 +00:00'
    `);

    res.json(listaDia[0]);
}

export const editarVitorias = async ( req: Request, res: Response ) => {
    let id_jogador = req.params.id;
    let { dia_jogo, vitorias } = req.body;
    let jogadorSelecionado = await Jogador.findByPk( id_jogador );
    let diaSelecionado = await Dia.findOne( {
        where: {
            id_jogador,
            dia_jogo,
        }
    });

    if ( diaSelecionado === null ) {
        await Dia.create({ id_jogador, vitorias, dia_jogo });

    } else {
        diaSelecionado.vitorias = vitorias;

        await diaSelecionado.save();
    }

    if (jogadorSelecionado) {
        const golsJogador = await Dia.findAll({
            attributes: [ 'vitorias' ],
            where: {
                id_jogador: jogadorSelecionado.id
            }
        });

        let totalDeVitorias = 0;

        golsJogador.forEach(jogador => {
            totalDeVitorias += jogador.vitorias;
        });

        jogadorSelecionado.vitorias = totalDeVitorias;

        await jogadorSelecionado.save();
    }

    res.json("Vitorias cadastrados!");
}
