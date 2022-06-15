import { useEffect, useState } from "react";

import { Container } from "./styles";

import { BiLike } from 'react-icons/bi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdOutlineDateRange } from "react-icons/md";

import { Footer } from "../../components/Footer";
import { DayPickerModal } from "../../components/Modals/DayPickerModal";

import { format, isSaturday, previousSaturday } from 'date-fns';
import { api } from "../../services/api";

interface PlayerStatusProps {
  id: number;
  nome: string;
  pagou: 0 | 1;
}

function getInitialDay() {
  const today = new Date();
  return isSaturday(today) ? today : previousSaturday(today);
}

export function Payments() {
  const [playerStatus, setPlayerStatus] = useState<PlayerStatusProps[]>([]);
  const [showDayPickerModal, setShowDayPickerModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(getInitialDay());

  useEffect(() => {
    api.get('/jogadores').then(responsePlayers => {
      if (selectedDay !== undefined) {
        api.get(`/pagamento/${format(selectedDay, 'yyyy-MM-dd')}`).then(responsePayments => {
          let playersList = responsePlayers.data;
          const playerPayments = responsePayments.data;
          playersList.forEach((player: any) => {
            player.pagou = 0;
            playerPayments.forEach((playerPayment: any) => {
              if (player.id === playerPayment.id_jogador) {
                player.pagou = playerPayment.pagou;
              }
            });
          });
          setPlayerStatus(playersList);
        });
      }
    });
  }, [selectedDay]);

  function handlePlayerStatus(id: number) {
    const index = playerStatus.findIndex((player) => {
      return player.id === id;
    });
    const tempPlayerStatus = [...playerStatus];

    const params = new URLSearchParams();
    if (selectedDay !== undefined) {
      params.append('dia_jogo', format(selectedDay, 'yyyy-MM-dd'));
    }

    if(tempPlayerStatus[index].pagou === 0) {
      tempPlayerStatus[index].pagou = 1;
      params.append('pagou', '1');
      api.put(`/pagamento/${id}`, params);
    } else {
      tempPlayerStatus[index].pagou = 0;
      params.append('pagou', '0');
      api.put(`/pagamento/${id}`, params);
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
                <td>{playerStts.nome}</td>
                <td className="td-buttons">
                  <button
                    type="button"
                    className={playerStts.pagou === 0 ? "status-button false" : "status-button true"}
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