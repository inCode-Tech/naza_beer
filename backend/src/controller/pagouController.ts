import { Request, Response } from "express";
import { Dia } from "../model/dia";
import { Jogador } from "../model/jogadores";

export const pagamento = async ( req: Request, res: Response ) => {
    let lista = await Dia.findAll({
        attributes: [ 'id', 'nome', 'pagou' ]
    });
    res.json(lista);
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

    if (jogadorSelecionado) {
        const pagamentoJogador = await Dia.findAll({
            attributes: [ 'pagou' ],
            where: {
                id_jogador: jogadorSelecionado.id
            }
        });

        let totalPagamento = 0;

        pagamentoJogador.forEach(dias => {
            totalPagamento += dias.pagou;
        });

        jogadorSelecionado.pagou = totalPagamento;//Verificar depois

        await jogadorSelecionado.save();
    }

    res.json("pagamento cadastrado!");
}