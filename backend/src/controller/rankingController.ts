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
    const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      });
    let page = await browser.newPage();
    let data = req.query.data;

    let url = `https://naza-beer.vercel.app/relatorio/gols?data=${data}`;

    await page.goto( url, {
        waitUntil: 'networkidle0'
    });

    let pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',

    });

    await browser.close();

    res.contentType("application/pdf");

    res.send(pdf);
}

export const rankingPdfVitorias = async ( req:Request, res:Response ) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      });
    let page = await browser.newPage();
    let data = req.query.data;

    let url = `https://naza-beer.vercel.app/relatorio/vitorias?data=${data}`;

    await page.goto( url, {
        waitUntil: 'networkidle0'
    });

    let pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',

    });

    await browser.close();

    res.contentType("application/pdf");

    res.send(pdf);
}