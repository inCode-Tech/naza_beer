import { Request, Response } from "express";
import { Logins } from "../model/Logins";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const listarLogin = async ( req: Request, res: Response ) => {
    try {
      let lista = await Logins.findAll();
      res.json(lista)
        
    } catch (error) {
        res.json(error);
    }
}
export const logar = async ( req: Request, res: Response ) => {
//VERIFICAR SE O USUÁRIO EXISTE
        let id = req.body.id;
        let login = req.body.login;
        let senha = req.body.senha;
        let user = await Logins.findAll({
            where: {
                id,
                login, 
                senha
            } 
        })
    if( id == user && login == user && senha == user ) {
       res.status(500).json({message: 'Login inválido!'});
    }else{
        const token = jwt.sign({ userId: id }, process.env.SECRET as string, { expiresIn: 60 * 24 });
        res.json({ auth: true, token })
    }

//VERIFICAR DEPOIS
}

export const logout = (req: Request, res:Response) => {
    res.json({ auth: false, token: null });
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
