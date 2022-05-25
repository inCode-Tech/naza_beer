import { Request, Response } from "express";
import { Dia } from "../model/dia";
import { Jogador } from "../model/jogadores";

export const listaGols = async ( req: Request, res: Response ) => {
    let lista = await Jogador.findAll({
        attributes: [ 'id', 'nome', 'posicao', 'gols' ]
    });
    res.json(lista);
}

export const editarGols = async ( req: Request, res: Response ) => {
    let id = req.params.id;
    let { gols, vitorias, dia_jogo, id_jogador, pagou } = req.body;
    let jogadorSelecionado = await Jogador.findByPk( id );
    let diaSelecionado = await Dia.findOne( {
        where: {
            dia_jogo
        }
    });

    if ( jogadorSelecionado ) {
        jogadorSelecionado.gols =+ gols;

        await jogadorSelecionado.save();
        res.json( jogadorSelecionado );
    } else {
        res.render("Jogador não cadastrado!");
    }

    if ( diaSelecionado == null ) {
        try{
            let novoDia = await Dia.create({ id_jogador ,gols, vitorias, dia_jogo, pagou });

            res.send(novoDia);
        }catch(Erro){
            console.log(Erro);
        }
    }else if( diaSelecionado == dia_jogo ){
        res.write("Dia já existente!!");
    }
}

