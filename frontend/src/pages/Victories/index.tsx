import { useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

import { Container } from "./styles";

import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';
import { GiTrophy } from 'react-icons/gi';
import { MdOutlineDateRange } from "react-icons/md";
import { VscFilePdf } from 'react-icons/vsc';

import { Footer } from "../../components/Footer";
import { DayPickerModal } from "../../components/Modals/DayPickerModal";

import { format, isSaturday, previousSaturday } from 'date-fns';

interface PlayerVictoriesProps {
  id: number;
  name: string;
  victories: number;
}

const inititalPlayerVictories = [
  {
    id: 1,
    name: 'Carlos Kaiky',
    victories: 8,
  },
  {
    id: 2,
    name: 'Wesley Estevam',
    victories: 7,
  },
  {
    id: 3,
    name: 'Pedro Lucas',
    victories: 6,
  }
  ,
  {
    id: 4,
    name: 'Marcos Cauan',
    victories: 5,
  }
  ,
  {
    id: 5,
    name: 'Talison Ruan',
    victories: 4,
  }
  ,
  {
    id: 6,
    name: 'Filipe Mateus',
    victories: 3,
  }
  ,
  {
    id: 7,
    name: 'Wendell',
    victories: 2,
  }
  ,
  {
    id: 8,
    name: 'Matheus Amorim',
    victories: 1,
  }
  ,
  {
    id: 9,
    name: 'Davi Marinho',
    victories: 0,
  }
];

function getInitialDay() {
  const today = new Date();
  return isSaturday(today) ? today : previousSaturday(today);
}

export function Victories() {
  const [playerVictories, setPlayerVictories] = useState<PlayerVictoriesProps[]>([]);
  const [showDayPickerModal, setShowDayPickerModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(getInitialDay());
  const [highlightTableRow, setHighlightTableRow] = useState<number[]>([]);

  useEffect(() => {
    setPlayerVictories(inititalPlayerVictories);
  }, []);

  function handleNumberOfVictories(id: number, type: "minus" | "plus") {
    if (highlightTableRow.indexOf(id) === -1) {
      setHighlightTableRow(oldState => [...oldState, id]);
    }
    console.log(highlightTableRow);
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

    sortTableDelay();
  }

  const sortTableDelay = useDebouncedCallback(
    () => {
      sortTable();
      setTimeout(() => {
        setHighlightTableRow([]);
      }, 1000);
    },
    1000
  );

  function sortTable() {
    const tempPlayerVictories = [...playerVictories];

    tempPlayerVictories.sort((a, b) => {
      if (a.victories > b.victories) {
        return -1;
      }
      if (a.victories < b.victories) {
        return 1;
      }
      return 0;
    });

    setPlayerVictories(tempPlayerVictories);
  }

  function closeModal() {
    setShowDayPickerModal(false);
  }

  return (
    <Container>
      <DayPickerModal
        showDayPickerModal={showDayPickerModal}
        onRequestClose={closeModal}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <div className="content">
        <header>
          <h1>
            <GiTrophy className="icon" />
            Vitórias
          </h1>

          <div className="buttons-container">
            <button 
              type="button"
              onClick={() => alert('GERANDO RELATÓRIO!')}
              className="pdf-button"
            >
              <VscFilePdf className="icon" />
              Gerar Relatóro
            </button>
            <button 
              type="button"
              onClick={() => setShowDayPickerModal(true)}
            >
              <MdOutlineDateRange className="icon" />
              {selectedDay && format(selectedDay, 'dd/MM/y')}
            </button>
          </div>
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
              <tr
                key={playerVictorie.id}
                className={
                  highlightTableRow.indexOf(playerVictorie.id) !== -1 ?
                  'highlightTableRow' : ''
                }
              >
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