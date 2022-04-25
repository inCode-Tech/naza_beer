import { Request, Response } from "express";
import { Jogador } from "../model/jogadores";

export const listaGols = async ( req: Request, res: Response ) => {
    let lista = await Jogador.findAll({
        attributes: [ 'id', 'nome', 'posicao', 'gols' ]
    });
    res.json(lista);
}

export const editarGols = async ( req: Request, res: Response ) => {
    let id = req.params.id;
    let { gols } = req.body;
    let novoGol = await Jogador.findByPk( id );

    if ( novoGol ) {
        novoGol.gols = gols;

        await novoGol.save();
        res.json( novoGol );

    } else {
        res.json("id não encontrado!")
    }
}

