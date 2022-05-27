import { Jogador } from "../model/jogadores";
import { Request, Response } from "express";
import puppeteer from "puppeteer";

export const rankingGols = async ( req:Request, res:Response ) => {
    let lista = await Jogador.findAll({
        attributes: ['nome', 'posicao', 'gols'],
        order: [["gols", "DESC"]]
    });
    res.json(lista);
}
export const rankingVitorias = async ( req:Request, res:Response ) => {
    let lista = await Jogador.findAll({
        attributes: ['nome', 'posicao', 'vitorias'],
        order: [["vitorias", "DESC"]]
    });
    res.json(lista);
}

//ROTA DOWNLOAD DO PDF
export const rankingPDF = async ( req:Request, res:Response ) => {
    let browser = await puppeteer.launch({ headless: true });
    let page = await browser.newPage();

    let url = "https://naza-beer.vercel.app/inicio";

    await page.goto( url, {
        waitUntil: 'networkidle0'
    });

    let pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',
       
    });

    await browser.close();

    res.contentType("application/pdf");

    res.send(pdf)
}