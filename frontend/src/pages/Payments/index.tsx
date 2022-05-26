import { useEffect, useState } from "react";

import { Container } from "./styles";

import { BiLike } from 'react-icons/bi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdOutlineDateRange } from "react-icons/md";

import { Footer } from "../../components/Footer";
import { DayPickerModal } from "../../components/Modals/DayPickerModal";

import { format, isSaturday, previousSaturday } from 'date-fns';

interface PlayerStatusProps {
  id: number;
  name: string;
  status: number;
}

const inititalPlayerStatus = [
  {
    id: 1,
    name: 'Carlos Kaiky',
    status: 1,
  },
  {
    id: 2,
    name: 'Wesley Estevam',
    status: 0,
  },
  {
    id: 3,
    name: 'Pedro Lucas',
    status: 1,
  }
  ,
  {
    id: 4,
    name: 'Marcos Cauan',
    status: 1,
  }
  ,
  {
    id: 5,
    name: 'Talison Ruan',
    status: 0,
  }
  ,
  {
    id: 6,
    name: 'Filipe Mateus',
    status: 1,
  }
  ,
  {
    id: 7,
    name: 'Wendell',
    status: 1,
  }
  ,
  {
    id: 8,
    name: 'Matheus Amorim',
    status: 0,
  }
  ,
  {
    id: 9,
    name: 'Davi Marinho',
    status: 0,
  }
];

function getInitialDay() {
  const today = new Date();
  return isSaturday(today) ? today : previousSaturday(today);
}

export function Payments() {
  const [playerStatus, setPlayerStatus] = useState<PlayerStatusProps[]>([]);
  const [showDayPickerModal, setShowDayPickerModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(getInitialDay());

  useEffect(() => {
    setPlayerStatus(inititalPlayerStatus);
  }, []);

  function handlePlayerStatus(id: number) {
    const index = playerStatus.findIndex((player) => {
      return player.id === id;
    });
    const tempPlayerStatus = [...playerStatus];

    if(tempPlayerStatus[index].status === 0) {
      tempPlayerStatus[index].status = 1;
    } else {
      tempPlayerStatus[index].status = 0;
    }

    setPlayerStatus(tempPlayerStatus);
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
            <RiMoneyDollarCircleLine className="icon" />
            Pagamentos
          </h1>

          <button 
            type="button"
            onClick={() => setShowDayPickerModal(true)}
          >
            <MdOutlineDateRange className="icon" />
            {selectedDay && format(selectedDay, 'dd/MM/y')}
          </button>
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
              <th>
                <span id="span-actions">Status</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {playerStatus.map((playerStts, index) => (
              <tr
                key={playerStts.id}
              >
                <td>{index+1}º</td>
                <td>{playerStts.name}</td>
                <td className="td-buttons">
                  <button
                    type="button"
                    className={playerStts.status === 0 ? "status-button false" : "status-button true"}
                    onClick={() => handlePlayerStatus(playerStts.id)}
                  >
                    <BiLike className="icon" />
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