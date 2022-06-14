import { useEffect, useState } from "react";
import { api } from '../../services/api';

import { Container } from "./styles";

import { PlayerModal } from "../../components/Modals/PlayerModal";

import { MdAdd, MdEdit, MdDeleteForever } from 'react-icons/md';
import { GiSoccerKick } from 'react-icons/gi';
import { Footer } from "../../components/Footer";
import { DeletePlayerModal } from "../../components/Modals/DeletePlayerModal";

interface PlayersProps {
  id: number;
  nome: string;
  posicao: string;
}

export function Players() {
  const [players, setPlayers] = useState<PlayersProps[]>([]);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showDeletePlayerModal, setShowDeletePlayerModal] = useState(false);
  const [typeModal, setTypeModal] = useState("new");
  const [playerEditInfo, setPlayerEditInfo] = useState<PlayersProps | {}>({});
  const [playerDeleteInfo, setPlayerDeleteInfo] = useState<PlayersProps | {}>({});
  const [chagesInNumberOfPlayers, setChagesInNumberOfPlayers] = useState(1);

  useEffect(() => {
    api.get('/jogadores').then(response => {
      setPlayers(response.data);
    });
  }, [chagesInNumberOfPlayers]);

  function openModal() {
    setShowPlayerModal(true);
  }
  function openPlayerModal(player: PlayersProps) {
    setTypeModal("edit");
    setPlayerEditInfo(player);
    setShowPlayerModal(true);
  }
  function openDeleteModal(player: PlayersProps) {
    setPlayerDeleteInfo(player);
    setShowDeletePlayerModal(true);
  }
  function closePlayerModal() {
    setTypeModal("new");
    setPlayerEditInfo({});
    setShowPlayerModal(false);
  }
  function closeDeletePlayerModal() {
    setPlayerDeleteInfo({});
    setShowDeletePlayerModal(false);
  }

  function changePlayerCount() {
    setChagesInNumberOfPlayers(chagesInNumberOfPlayers + 1);
  }

  return (
    <Container>
      <PlayerModal
        showPlayerModal={showPlayerModal}
        onRequestClose={closePlayerModal}
        type={typeModal}
        playerEditInfo={playerEditInfo}
        changePlayerCount={changePlayerCount}
      />
      <DeletePlayerModal
        showDeletePlayerModal={showDeletePlayerModal}
        onRequestClose={closeDeletePlayerModal}
        playerDeleteInfo={playerDeleteInfo}
        changePlayerCount={changePlayerCount}
      />

      <div className="content">
        <header>
          <h1>
            <GiSoccerKick className="icon" />
            Jogadores
          </h1>
          <button 
            type="button"
            onClick={openModal}
          >
            <MdAdd className="icon" />
            Novo Jogador
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
                Posição
              </th>
              <th>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.nome}</td>
                <td>{player.posicao}</td>
                <td className="td-buttons">
                  <button 
                    type="button" 
                    className="edit-button" 
                    onClick={() => openPlayerModal(player)}
                  >
                    <MdEdit className="icon" />
                  </button>
                  <button 
                    type="button" 
                    className="delete-button"
                    onClick={() => openDeleteModal(player)}
                  >
                    <MdDeleteForever className="icon" />
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