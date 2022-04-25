import { Jogador } from "../model/jogadores";
import { Request, Response } from "express";

export const ranking = async ( req:Request, res:Response ) => {
    let lista = await Jogador.findAll();
    res.json(lista)
}
