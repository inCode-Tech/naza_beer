import { Request, Response } from "express";
import { Jogador } from "../model/jogadores";

export const listaVitorias = async ( req: Request, res: Response ) => {
    let lista = await Jogador.findAll({
        attributes: [ 'id', 'nome', 'posicao', 'gols', 'vitorias' ]
    });
    res.json(lista);
}

export const editarVitorias = async ( req: Request, res: Response ) => {
    let id = req.params.id;
    let { vitorias } = req.body;
    let novoGol = await Jogador.findByPk( id );

    if ( novoGol ) {
        novoGol.vitorias = vitorias; 

        await novoGol.save();
        res.json( novoGol );

    } else {
        res.json("id não encontrado!")
    }
}
