import { Jogador } from "../model/jogadores";
import { Request, Response } from "express";
import puppeteer from "puppeteer";

export const rankingGols = async ( req:Request, res:Response ) => {
    let lista = await Jogador.findAll({
        attributes: ['id', 'nome', 'posicao', 'gols'],
        order: [["gols", "DESC"]]
    });
    res.json(lista);
}
export const rankingVitorias = async ( req:Request, res:Response ) => {
    let lista = await Jogador.findAll({
        attributes: ['id', 'nome', 'posicao', 'vitorias'],
        order: [["vitorias", "DESC"]]
    });
    res.json(lista);
}

export const rankingPdfGols = async ( req:Request, res:Response ) => {
    let browser = await puppeteer.launch({ headless: true });
    let page = await browser.newPage();
    let dataJogo = req.body.dataJogo;

    let url = `https://naza-beer.vercel.app/relatorio/gols?${dataJogo}`;

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

export const rankingPdfVitorias = async ( req:Request, res:Response ) => {
    let browser = await puppeteer.launch({ headless: true });
    let page = await browser.newPage();

    let url = "https://naza-beer.vercel.app/relatorio/vitorias";

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