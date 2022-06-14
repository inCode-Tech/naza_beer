import { useEffect, useState } from "react";

import { Container } from "./styles";

import { GiTrophy } from 'react-icons/gi';
import { Footer } from "../../../components/Footer";
import { MdOutlineDateRange } from "react-icons/md";
import { format, isSaturday, previousSaturday } from "date-fns";

interface PlayersProps {
  id: number;
  name: string;
  victories: number;
}

const inititalPlayersInfo = [
  {
    id: 1,
    name: 'Carlos Kaiky',
    victories: 17,
  },
  {
    id: 2,
    name: 'Wesley Estevam',
    victories: 16,
  },
  {
    id: 3,
    name: 'Pedro Lucas',
    victories: 15,
  }
  ,
  {
    id: 4,
    name: 'Marcos Cauan',
    victories: 13,
  }
  ,
  {
    id: 5,
    name: 'Talison Ruan',
    victories: 9,
  }
  ,
  {
    id: 6,
    name: 'Filipe Mateus',
    victories: 7,
  }
  ,
  {
    id: 7,
    name: 'Wendell',
    victories: 6,
  }
  ,
  {
    id: 8,
    name: 'Matheus Amorim',
    victories: 3,
  }
  ,
  {
    id: 9,
    name: 'Davi Marinho',
    victories: 1,
  }
];

function getInitialDay() {
  const today = new Date();
  return isSaturday(today) ? today : previousSaturday(today);
}

export function PublicRankingVictories() {
  const [players, setPlayers] = useState<PlayersProps[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(getInitialDay());

  useEffect(() => {
    setPlayers(inititalPlayersInfo);
  }, []);

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
            {players.map(player => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td className="td-victories">{player.victories}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Footer />
      </div>
    </Container>
  );
}