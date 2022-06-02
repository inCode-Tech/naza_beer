import { Request, Response } from "express";
import { Dia } from "../model/dia";

export const pagamento = async ( req: Request, res: Response ) => {
    let lista = await Dia.findAll({
        attributes: [ 'id', 'id_jogador', 'pagou' ]
    });
    res.json(lista);
}

export const NovoPagamento = async ( req: Request, res: Response ) => {
    let id = req.params.id;
    let { dia_jogo, id_jogador, pagou } = req.body;
    let pegaID = await Dia.findByPk( id )

    let diaSelecionado = await Dia.findOne( {
        where: {
            pagou,
            dia_jogo
        }
    });

    if ( diaSelecionado != null ) {
        pegaID?.pagou == 1;

        await diaSelecionado.save();
        res.json( diaSelecionado );
    } else {
        res.render("O jogador não pagou");
    }

    if ( diaSelecionado == null ) {
        try{
            let novoDia = await Dia.create({ id_jogador, pagou, dia_jogo });

            res.send(novoDia);
        }catch(Erro){
            console.log(Erro);
        }
    }else if( diaSelecionado == dia_jogo ){
        res.write("Dia já existente!!");
    }
}