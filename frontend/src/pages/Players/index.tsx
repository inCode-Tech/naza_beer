import { useEffect, useState } from "react";

import { Container } from "./styles";

import { PlayerModal } from "../../components/Modals/PlayerModal";

import { MdAdd, MdEdit, MdDeleteForever } from 'react-icons/md';
import { GiSoccerKick } from 'react-icons/gi';
import { Footer } from "../../components/Footer";
import { DeletePlayerModal } from "../../components/Modals/DeletePlayerModal";

interface PlayersProps {
  id: number;
  name: string;
  position: string;
}

const inititalPlayersInfo = [
  {
    id: 1,
    name: 'Carlos Kaiky',
    position: 'Linha',
  },
  {
    id: 2,
    name: 'Wesley Estevam',
    position: 'Goleiro',
  },
  {
    id: 3,
    name: 'Pedro Lucas',
    position: 'Linha',
  }
  ,
  {
    id: 4,
    name: 'Marcos Cauan',
    position: 'Linha',
  }
  ,
  {
    id: 5,
    name: 'Talison Ruan',
    position: 'Linha',
  }
  ,
  {
    id: 6,
    name: 'Filipe Mateus',
    position: 'Linha',
  }
  ,
  {
    id: 7,
    name: 'Wendell',
    position: 'Linha',
  }
  ,
  {
    id: 8,
    name: 'Matheus Amorim',
    position: 'Linha',
  }
  ,
  {
    id: 9,
    name: 'Davi Marinho',
    position: 'Linha',
  }
];

export function Players() {
  const [players, setPlayers] = useState<PlayersProps[]>([]);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showDeletePlayerModal, setShowDeletePlayerModal] = useState(false);
  const [typeModal, setTypeModal] = useState("new");
  const [playerEditInfo, setPlayerEditInfo] = useState<PlayersProps | {}>({});
  const [playerDeleteInfo, setPlayerDeleteInfo] = useState<PlayersProps | {}>({});

  useEffect(() => {
    setPlayers(inititalPlayersInfo);
  }, []);

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

  return (
    <Container>
      <PlayerModal
        showPlayerModal={showPlayerModal}
        onRequestClose={closePlayerModal}
        type={typeModal}
        playerEditInfo={playerEditInfo}
      />
      <DeletePlayerModal
        showDeletePlayerModal={showDeletePlayerModal}
        onRequestClose={closeDeletePlayerModal}
        playerDeleteInfo={playerDeleteInfo}
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
                <td>{player.name}</td>
                <td>{player.position}</td>
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