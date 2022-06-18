import { useEffect, useState } from "react";

import { Container } from "./styles";

import { GiTrophy } from 'react-icons/gi';
import { Footer } from "../../../components/Footer";
import { MdOutlineDateRange } from "react-icons/md";
import { format, isSaturday, previousSaturday } from "date-fns";
import { api } from "../../../services/api";

interface PlayersProps {
  id: number;
  nome: string;
  vitorias: number;
}

function getInitialDay() {
  const today = new Date();
  return isSaturday(today) ? today : previousSaturday(today);
}

export function PublicRankingVictories() {
  const [players, setPlayers] = useState<PlayersProps[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(getInitialDay());

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const date = urlParams.get('data');
    if (typeof(date) === 'string') {
      setSelectedDay(new Date(date));
    }
  }, []);

  useEffect(() => {
    api.get('/jogadores').then(responsePlayers => {
      if (selectedDay !== undefined) {
        api.get(`/vitoriasDia/${format(selectedDay, 'yyyy-MM-dd')}`).then(responseVictories => {
          let playersList = responsePlayers.data;
          const playerVictories = responseVictories.data;
          playersList.forEach((player: any) => {
            player.vitorias = 0;
            playerVictories.forEach((playerVictorie: any) => {
              if (player.id === playerVictorie.id_jogador) {
                player.vitorias = playerVictorie.vitorias;
              }
            });
          });

          playersList.sort((a: any, b: any) => {
            if (a.vitorias > b.vitorias) {
              return -1;
            }
            if (a.vitorias < b.vitorias) {
              return 1;
            }
            return 0;
          });
          setPlayers(playersList);
        });
      }
    });
  }, [selectedDay]);

  return (
    <Container>
      <div className="content">
        <header>
          <h1>
            <GiTrophy className="icon" />
            Ranking de Vitórias
          </h1>

          <button 
            type="button"
          >
            <MdOutlineDateRange className="icon" />
            {selectedDay && format(selectedDay, 'dd/MM/y')}
          </button>
        </header>

        <table>
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                Nome
              </th>
              <th>
                Vitórias
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.id}>
                <td>{index + 1}º</td>
                <td>{player.nome}</td>
                <td className="td-victories">{player.vitorias}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Footer />
      </div>
    </Container>
  );
}