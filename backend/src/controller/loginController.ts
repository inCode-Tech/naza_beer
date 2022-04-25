import { Request, Response } from "express";
import { Logins } from "../model/Logins";
import bcrypt from "bcrypt"

export const listarLogin = async ( req: Request, res: Response ) => {
    try {
      let lista = await Logins.findAll();
      res.json(lista)
        
    } catch (error) {
        res.json(error);
    }
}
//EM DESENVOLVIMENTO
export const logar = async ( req: Request, res: Response ) => {
    let formLogin = req.body.name;
    let user = await Logins.findAll( )
}

export const novologin = async ( req: Request, res: Response ) => {
    try {
        let hashSenha = await bcrypt.hash(req.body.senha, 10)
        let { login } = req.body;
        let novoCadastro = await Logins.create({ login, senha: hashSenha });
    
        res.json(novoCadastro);
        
    } catch (error) {
        res.json(error);
    }
}
