import { Container } from "./styles";

import { BsTrophyFill } from 'react-icons/bs';
import { IoMdFootball } from 'react-icons/io';

import { Footer } from "../../components/Footer";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

interface PLayerProps {
  id: number;
  nome: string;
  posicao: string;
  gols: number,
  vitorias: number,
}

export function Home() {
  const [players, setPlayers] = useState<PLayerProps[]>([]);
  const [numberOfGoalkeepers, setNumberOfGoalkeepers] = useState(0);
  const [rankingGoals, setRankingGoals] = useState<PLayerProps[]>([]);  
  const [rankingVitories, setRankingVitories] = useState<PLayerProps[]>([]);  

  useEffect(() => {
    api.get('/jogadores').then(response => {
      setPlayers(response.data);

      let count = 0;
      response.data.forEach((player: PLayerProps) => {
        if (player.posicao === 'Goleiro') {
          count++;
        }
      });
      setNumberOfGoalkeepers(count);
    });

    api.get('/rankingvitorias').then(response => {
      setRankingVitories(response.data);
    });
    api.get('/rankingols').then(response => {
      setRankingGoals(response.data);
    });
  }, []);

  return (
    <Container>
      <div className="content">
        <div className="main-information-container">
          <div className="number-of-player-container">
            <div>
              <p>Número de <br /> Jogadores</p>
              <h2>{players.length}</h2>
            </div>
            <div className="img"></div>
          </div>
          <div className="number-of-goalkeeper">
            <div>
              <p>Número de <br /> Goleiros</p>
              <h2>{numberOfGoalkeepers}</h2>
            </div>
            <div className="img"></div>
          </div>
          <div className="top1-container">
            <div>
              <p>Primeiros no <br /> ranking</p>

              <div>
                <p><b>Vitórias:</b> {rankingVitories[0]?.nome}</p>
                <p><b>Gols:</b> {rankingGoals[0]?.nome}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="top3-information-container">
          <div className="top3-victories">
            <p>TOP 3 DE VITÓRIAS</p>
            <table>
              <tbody>
                <tr className="tr-top1">
                  <td className="td-trophy">
                    <BsTrophyFill className="icon" />
                    <div>
                      <span>Posição:</span><br />
                      1º
                    </div>
                  </td>
                  <td>
                    <span>Nome:</span><br />
                    {rankingVitories[0]?.nome}
                  </td>
                  <td>
                    <span>Vitórias:</span><br />
                    {rankingVitories[0]?.vitorias}
                  </td>
                </tr>
                <tr className="tr-top2">
                  <td className="td-trophy">
                    <BsTrophyFill className="icon" />
                    <div>
                      <span>Posição:</span><br />
                      2º
                    </div>
                  </td>
                  <td>
                    <span>Nome:</span><br />
                    {rankingVitories[1]?.nome}
                  </td>
                  <td>
                    <span>Vitórias:</span><br />
                    {rankingVitories[1]?.vitorias}
                  </td>
                </tr>
                <tr className="tr-top3">
                  <td className="td-trophy">
                    <BsTrophyFill className="icon" />
                    <div>
                      <span>Posição:</span><br />
                      3º
                    </div>
                  </td>
                  <td>
                    <span>Nome:</span><br />
                    {rankingVitories[2]?.nome}
                  </td>
                  <td>
                    <span>Vitórias:</span><br />
                    {rankingVitories[2]?.vitorias}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="top3-goals">
            <p>TOP 3 DE GOLS</p>
            <table>
              <tbody>
                <tr className="tr-top1">
                  <td className="td-trophy">
                    <IoMdFootball className="icon" />
                    <div>
                      <span>Posição:</span><br />
                      1º
                    </div>
                  </td>
                  <td>
                    <span>Nome:</span><br />
                    {rankingGoals[0]?.nome}
                  </td>
                  <td>
                    <span>Gols:</span><br />
                    {rankingGoals[0]?.gols}
                  </td>
                </tr>
                <tr className="tr-top2">
                  <td className="td-trophy">
                    <IoMdFootball className="icon" />
                    <div>
                      <span>Posição:</span><br />
                      2º
                    </div>
                  </td>
                  <td>
                    <span>Nome:</span><br />
                    {rankingGoals[1]?.nome}
                  </td>
                  <td>
                    <span>Gols:</span><br />
                    {rankingGoals[1]?.gols}
                  </td>
                </tr>
                <tr className="tr-top3">
                  <td className="td-trophy">
                    <IoMdFootball className="icon" />
                    <div>
                      <span>Posição:</span><br />
                      3º
                    </div>
                  </td>
                  <td>
                    <span>Nome:</span><br />
                    {rankingGoals[2]?.nome}
                  </td>
                  <td>
                    <span>Gols:</span><br />
                    {rankingGoals[2]?.gols}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Footer />
      </div>
    </Container>
  );
}