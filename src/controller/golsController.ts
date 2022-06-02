import { Request, Response } from "express";
import { Dia } from "../model/dia";
import { Jogador } from "../model/jogadores";
import { conexaoDB } from "../conexão/conexaoDB";

export const listarTotalGols = async ( req: Request, res: Response ) => {
    let lista = await Jogador.findAll({
        attributes: [ 'id', 'nome', 'posicao', 'gols' ],
        order: [[ 'gols' ,'DESC' ]]
    });

    res.json(lista);
}

export const listarGolsDia = async ( req: Request, res: Response ) => {
    let { dia } = req.body;

    let listaDia = await conexaoDB.query(`
        SELECT nome, posicao, dia.gols, dia_jogo 
        FROM dia 
        INNER JOIN Jogador 
        ON dia.id_jogador = jogador.id
        WHERE dia.dia_jogo = '${dia} 03:00:00.000 +00:00'
    `);

    res.json(listaDia[0]);
}

export const editarGols = async ( req: Request, res: Response ) => {
    let id_jogador = req.params.id;
    let { dia_jogo, gols } = req.body;
    let jogadorSelecionado = await Jogador.findByPk( id_jogador );
    let diaSelecionado = await Dia.findOne( {
        where: {
            id_jogador,
            dia_jogo,
        }
    });

    if ( diaSelecionado === null ) {
        await Dia.create({ id_jogador, gols, dia_jogo });

    } else {
        diaSelecionado.gols = gols;

        await diaSelecionado.save();
    }

    if (jogadorSelecionado) {
        const golsJogador = await Dia.findAll({
            attributes: [ 'gols' ],
            where: {
                id_jogador: jogadorSelecionado.id
            }
        });

        let totalDeGols = 0;

        golsJogador.forEach(jogador => {
            totalDeGols += jogador.gols;
        });

        jogadorSelecionado.gols = totalDeGols;

        await jogadorSelecionado.save();
    }

    res.json("Gols cadastrados!");
}