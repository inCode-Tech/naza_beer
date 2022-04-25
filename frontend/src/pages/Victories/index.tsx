import { useEffect, useState } from "react";

import { Container } from "./styles";

import { Navbar } from "../../components/Navbar";

import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';
import { GiTrophy } from 'react-icons/gi';
import { Footer } from "../../components/Footer";

interface PlayerVictoriesProps {
  id: number;
  name: string;
  victories: number;
}

const inititalPlayerVictories = [
  {
    id: 1,
    name: 'Carlos Kaiky',
    victories: 37,
  },
  {
    id: 2,
    name: 'Wesley Estevam',
    victories: 31,
  },
  {
    id: 3,
    name: 'Pedro Lucas',
    victories: 27,
  }
  ,
  {
    id: 4,
    name: 'Marcos Cauan',
    victories: 23,
  }
  ,
  {
    id: 5,
    name: 'Talison Ruan',
    victories: 20,
  }
  ,
  {
    id: 6,
    name: 'Filipe Mateus',
    victories: 15,
  }
  ,
  {
    id: 7,
    name: 'Wendell',
    victories: 10,
  }
  ,
  {
    id: 8,
    name: 'Matheus Amorim',
    victories: 7,
  }
  ,
  {
    id: 9,
    name: 'Davi Marinho',
    victories: 0,
  }
];

export function Victories() {
  const [playerVictories, setPlayerVictories] = useState<PlayerVictoriesProps[]>([]);

  useEffect(() => {
    setPlayerVictories(inititalPlayerVictories);
  }, []);

  function handleNumberOfVictories(id: number, type: "minus" | "plus") {
    const index = playerVictories.findIndex((playerVictorie) => {
      return playerVictorie.id === id;
    });
    const tempPlayerVictories = [...playerVictories];

    if(type === "minus" && tempPlayerVictories[index].victories > 0) {
      tempPlayerVictories[index].victories--;
    } else if (type === "plus") {
      tempPlayerVictories[index].victories++;
    }

    setPlayerVictories(tempPlayerVictories);
  }

  return (
    <Container>
      <div className="content">
        <header>
          <h1>
            <GiTrophy className="icon" />
            Vitórias
          </h1>
        </header>

        <table>
          <thead>
            <tr>
              <th>
                Posição
              </th>
              <th>
                Nome
              </th>
              <th id="th-victories">
                Vitórias
              </th>
              <th>
                <span id="span-actions">Ações</span>
                <span id="span-victories">Vitórias</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {playerVictories.map((playerVictorie, index) => (
              <tr key={playerVictorie.id}>
                <td>{index+1}º</td>
                <td>{playerVictorie.name}</td>
                <td id="td-victories">{playerVictorie.victories}</td>
                <td className="td-buttons">
                  <button
                    type="button"
                    className="down-button"
                    onClick={() => handleNumberOfVictories(playerVictorie.id, "minus")}
                  >
                    <MdOutlineExpandMore className="icon" />
                  </button>
                  <div id="victories-number-hidden">
                    {playerVictorie.victories}
                  </div>
                  <button
                    type="button"
                    className="up-button"
                    onClick={() => handleNumberOfVictories(playerVictorie.id, "plus")}
                  >
                    <MdOutlineExpandLess className="icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Footer />
      </div>
    </Container>
  );
}