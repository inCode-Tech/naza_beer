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
  gols: number;
}

function getInitialDay() {
  const today = new Date();
  return isSaturday(today) ? today : previousSaturday(today);
}

export function PublicRankingGoals() {
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
        api.get(`/golsDia/${format(selectedDay, 'yyyy-MM-dd')}`).then(responseGoals => {
          let playersList = responsePlayers.data;
          const playerGoals = responseGoals.data;
          playersList.forEach((player: any) => {
            player.gols = 0;
            playerGoals.forEach((playerGoal: any) => {
              if (player.id === playerGoal.id_jogador) {
                player.gols = playerGoal.gols;
              }
            });
          });

          playersList.sort((a: any, b: any) => {
            if (a.gols > b.gols) {
              return -1;
            }
            if (a.gols < b.gols) {
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
            Ranking de Gols
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
                Gols
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.id}>
                <td>{index + 1}º</td>
                <td>{player.nome}</td>
                <td className="td-goals">{player.gols}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Footer />
      </div>
    </Container>
  );
}