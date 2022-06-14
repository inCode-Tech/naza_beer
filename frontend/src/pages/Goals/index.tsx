import { useEffect, useState } from "react";

import { Container } from "./styles";

import { MdOutlineExpandMore, MdOutlineExpandLess, MdOutlineDateRange } from 'react-icons/md';
import { GiTrophy } from 'react-icons/gi';
import { Footer } from "../../components/Footer";
import { format, isSaturday, previousSaturday } from "date-fns";
import { DayPickerModal } from "../../components/Modals/DayPickerModal";
import { useDebouncedCallback } from "use-debounce";
import { VscFilePdf } from 'react-icons/vsc';
import { api } from "../../services/api";

interface PlayerGoalsProps {
  id: number;
  nome: string;
  gols: number;
}

function getInitialDay() {
  const today = new Date();
  return isSaturday(today) ? today : previousSaturday(today);
}

export function Goals() {
  const [playerGoals, setPlayerGoals] = useState<PlayerGoalsProps[]>([]);
  const [showDayPickerModal, setShowDayPickerModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(getInitialDay());
  const [highlightTableRow, setHighlightTableRow] = useState<number[]>([]);

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
          setPlayerGoals(playersList);
        });
      }
    });
  }, [selectedDay]);

  function handleNumberOfGoals(id: number, type: "minus" | "plus") {
    if (highlightTableRow.indexOf(id) === -1) {
      setHighlightTableRow(oldState => [...oldState, id]);
    }
    const index = playerGoals.findIndex((playerGoal) => {
      return playerGoal.id === id;
    });
    const tempPlayerGoals = [...playerGoals];

    if(type === "minus" && tempPlayerGoals[index].gols > 0) {
      tempPlayerGoals[index].gols--;
    } else if (type === "plus") {
      tempPlayerGoals[index].gols++;
    }

    setPlayerGoals(tempPlayerGoals);

    sortTableDelay();
  }

  const sortTableDelay = useDebouncedCallback(
    () => {
      sortTable();
      setTimeout(() => {
        playerGoals.forEach(player => {
          highlightTableRow.forEach(playerId => {
            if (player.id === playerId) {
              const params = new URLSearchParams();
              params.append('nome', player.nome);
              params.append('gols', String(player.gols));
              if (selectedDay !== undefined) {
                params.append('dia_jogo', format(selectedDay, 'yyyy-MM-dd'));
              }
              api.put(`/gols/${player.id}`, params).then(response => {
                console.log(response);
              });
            }
          });
        });
        setHighlightTableRow([]);
      }, 1000);
    },
    1000
  );

  function sortTable() {
    const tempPlayerGoals = [...playerGoals];

    tempPlayerGoals.sort((a, b) => {
      if (a.gols > b.gols) {
        return -1;
      }
      if (a.gols < b.gols) {
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
            {playerGoals.map((playerGoal, index) => (
              <tr 
                key={playerGoal.id} 
                className={
                highlightTableRow.indexOf(playerGoal.id) !== -1 ?
                'highlightTableRow' : ''
                }
              >
                <td>{index + 1}º</td>
                <td>{playerGoal.nome}</td>
                <td id="td-goals">{playerGoal.gols}</td>
                <td className="td-buttons">
                  <button
                    type="button"
                    className="down-button"
                    onClick={() => handleNumberOfGoals(playerGoal.id, "minus")}
                  >
                    <MdOutlineExpandMore className="icon" />
                  </button>
                  <div id="goals-number-hidden">
                    {playerGoal.gols}
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