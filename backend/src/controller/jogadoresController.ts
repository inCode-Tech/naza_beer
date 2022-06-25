import { Request, Response } from "express";
import { conexaoDB } from "../conexão/conexaoDB";
import { Dia } from "../model/dia";
import { Jogador } from "../model/jogadores";

export const listarjogadores = async( req: Request, res: Response ) => {
    try {
        let lista = await Jogador.findAll({ 
            attributes: ['id', 'nome', 'posicao', 'gols', 'vitorias']
        });

        res.json(lista);
        
   } catch (error) {
        res.json(error);
   }
}

export const cadastroJogador = async (req:Request, res: Response) => {
    try {
        let { nome, posicao } = req.body;
        let novoJogador = await Jogador.create({ nome, posicao });
        res.json(novoJogador);

    }catch(error) {
        res.json(error);
    }
}

export const editarJogador = async ( req: Request, res: Response ) => {
    let id = req.params.id;
    let { nome, posicao } = req.body;
    let novoJogador = await Jogador.findByPk( id );

    if ( novoJogador ) {
        novoJogador.nome = nome;
        novoJogador.posicao = posicao;

        await novoJogador.save();
        res.json( novoJogador )

    } else {
        res.json({ error: 'Jogador não encontrado' });
    }

}

export const excluirJogador = async ( req: Request, res: Response ) => {
        let id = req.params;
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', id)
        let listaDia = await conexaoDB.query(`
            DELETE FROM dia WHERE id_jogador = ${id}
        `);


        await Jogador.destroy({
            where: id
        });
        
        res.json("Jogador excluido com sucesso")
}