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
import { api } from "../../services/api";

import fileDownload from 'js-file-download';

interface PlayerVictoriesProps {
  id: number;
  nome: string;
  vitorias: number;
}

function getInitialDay() {
  const today = new Date();
  return isSaturday(today) ? today : previousSaturday(today);
}

export function Victories() {
  const [playerVictories, setPlayerVictories] = useState<PlayerVictoriesProps[]>([]);
  const [showDayPickerModal, setShowDayPickerModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(getInitialDay());
  const [highlightTableRow, setHighlightTableRow] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
          setPlayerVictories(playersList);
        });
      }
    });
  }, [selectedDay]);

  function handleNumberOfVictories(id: number, type: "minus" | "plus") {
    if (highlightTableRow.indexOf(id) === -1) {
      setHighlightTableRow(oldState => [...oldState, id]);
    }
    const index = playerVictories.findIndex((playerVictorie) => {
      return playerVictorie.id === id;
    });
    const tempPlayerVictories = [...playerVictories];

    if(type === "minus" && tempPlayerVictories[index].vitorias > 0) {
      tempPlayerVictories[index].vitorias--;
    } else if (type === "plus") {
      tempPlayerVictories[index].vitorias++;
    }

    setPlayerVictories(tempPlayerVictories);

    sortTableDelay();
  }

  const sortTableDelay = useDebouncedCallback(
    () => {
      sortTable();
      setTimeout(() => {
        playerVictories.forEach(player => {
          highlightTableRow.forEach(playerId => {
            if (player.id === playerId) {
              const params = new URLSearchParams();
              params.append('nome', player.nome);
              params.append('vitorias', String(player.vitorias));
              if (selectedDay !== undefined) {
                params.append('dia_jogo', format(selectedDay, 'yyyy-MM-dd'));
              }
              api.put(`/vitorias/${player.id}`, params).then(response => {
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

  function generateReport() {
    setIsLoading(true);
    if (selectedDay !== undefined) {
      api.get(`/relatorioVitorias?data=${format(selectedDay, 'y/MM/dd')}`, {
        responseType: 'blob',
      }).then(res => {
        fileDownload(res.data, `vitorias-${format(selectedDay, 'y/MM/dd')}.pdf`);
        setIsLoading(false);
      });
    }
  }

  function sortTable() {
    const tempPlayerVictories = [...playerVictories];

    tempPlayerVictories.sort((a, b) => {
      if (a.vitorias > b.vitorias) {
        return -1;
      }
      if (a.vitorias < b.vitorias) {
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
              onClick={() => generateReport()}
              className="pdf-button"
            >
              <VscFilePdf className="icon" />
              {isLoading ? (
                <span>Carregando...</span>
              ) : (
                <span>Gerar Relatóro</span>
              )}
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
                <td>{playerVictorie.nome}</td>
                <td id="td-victories">{playerVictorie.vitorias}</td>
                <td className="td-buttons">
                  <button
                    type="button"
                    className="down-button"
                    onClick={() => handleNumberOfVictories(playerVictorie.id, "minus")}
                  >
                    <MdOutlineExpandMore className="icon" />
                  </button>
                  <div id="victories-number-hidden">
                    {playerVictorie.vitorias}
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