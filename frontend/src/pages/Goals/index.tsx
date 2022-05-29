import { useEffect, useState } from "react";

import { Container } from "./styles";

import { MdOutlineExpandMore, MdOutlineExpandLess, MdOutlineDateRange } from 'react-icons/md';
import { GiTrophy } from 'react-icons/gi';
import { Footer } from "../../components/Footer";
import { format, isSaturday, previousSaturday } from "date-fns";
import { DayPickerModal } from "../../components/Modals/DayPickerModal";
import { useDebouncedCallback } from "use-debounce";
import { VscFilePdf } from 'react-icons/vsc';

interface PlayerGoalsProps {
  id: number;
  name: string;
  goals: number;
}

const inititalPlayerGoals = [
  {
    id: 1,
    name: 'Carlos Kaiky',
    goals: 37,
  },
  {
    id: 2,
    name: 'Wesley Estevam',
    goals: 31,
  },
  {
    id: 3,
    name: 'Pedro Lucas',
    goals: 27,
  }
  ,
  {
    id: 4,
    name: 'Marcos Cauan',
    goals: 23,
  }
  ,
  {
    id: 5,
    name: 'Talison Ruan',
    goals: 20,
  }
  ,
  {
    id: 6,
    name: 'Filipe Mateus',
    goals: 15,
  }
  ,
  {
    id: 7,
    name: 'Wendell',
    goals: 10,
  }
  ,
  {
    id: 8,
    name: 'Matheus Amorim',
    goals: 7,
  }
  ,
  {
    id: 9,
    name: 'Davi Marinho',
    goals: 0,
  }
];

function getInitialDay() {
  const today = new Date();
  return isSaturday(today) ? today : previousSaturday(today);
}

export function Goals() {
  const [playerGoals, setPlayerGoals] = useState<PlayerGoalsProps[]>([]);
  const [showDayPickerModal, setShowDayPickerModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(getInitialDay());

  useEffect(() => {
    setPlayerGoals(inititalPlayerGoals);
  }, []);

  function handleNumberOfGoals(id: number, type: "minus" | "plus") {
    const index = playerGoals.findIndex((playerGoal) => {
      return playerGoal.id === id;
    });
    const tempPlayerGoals = [...playerGoals];

    if(type === "minus" && tempPlayerGoals[index].goals > 0) {
      tempPlayerGoals[index].goals--;
    } else if (type === "plus") {
      tempPlayerGoals[index].goals++;
    }

    setPlayerGoals(tempPlayerGoals);

    sortTableDelay();
  }

  const sortTableDelay = useDebouncedCallback(
    () => {
      sortTable();
    },
    1000
  );

  function sortTable() {
    const tempPlayerGoals = [...playerGoals];

    tempPlayerGoals.sort((a, b) => {
      if (a.goals > b.goals) {
        return -1;
      }
      if (a.goals < b.goals) {
        return 1;
      }
      return 0;
    });

    setPlayerGoals(tempPlayerGoals);
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
            Gols
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
              <th id="th-goals">
                Gols
              </th>
              <th>
                <span id="span-actions">Ações</span>
                <span id="span-goals">Gols</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {playerGoals.map(playerGoal => (
              <tr key={playerGoal.id}>
                <td>{playerGoal.id}º</td>
                <td>{playerGoal.name}</td>
                <td id="td-goals">{playerGoal.goals}</td>
                <td className="td-buttons">
                  <button
                    type="button"
                    className="down-button"
                    onClick={() => handleNumberOfGoals(playerGoal.id, "minus")}
                  >
                    <MdOutlineExpandMore className="icon" />
                  </button>
                  <div id="goals-number-hidden">
                    {playerGoal.goals}
                  </div>
                  <button
                    type="button"
                    className="up-button"
                    onClick={() => handleNumberOfGoals(playerGoal.id, "plus")}
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