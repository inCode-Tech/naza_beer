import { Request, Response } from "express";
import { conexaoDB } from "../conexão/conexaoDB";
import { Dia } from "../model/dia";
import { Jogador } from "../model/jogadores";

export const listarPagamentoDia = async ( req: Request, res: Response ) => {
    let { data } = req.params;

    let listaDia = await conexaoDB.query(`
        SELECT id_jogador, nome, dia_jogo, pagou
        FROM dia 
        INNER JOIN Jogador 
        ON dia.id_jogador = jogador.id
        WHERE dia.dia_jogo = '${data} 03:00:00.000 +00:00'
    `);

    res.json(listaDia[0]);
}

export const NovoPagamento = async ( req: Request, res: Response ) => {
    let id_jogador = req.params.id;
    let { dia_jogo, pagou } = req.body;
    let jogadorSelecionado = await Jogador.findByPk( id_jogador );
    let diaSelecionado = await Dia.findOne( {
        where: {
            id_jogador,
            dia_jogo,
        }
    });

    if ( diaSelecionado === null ) {
        await Dia.create({ id_jogador, pagou, dia_jogo });

    } else {
        diaSelecionado.pagou = pagou;

        await diaSelecionado.save();
    }

    res.json("pagamento cadastrado!");
}