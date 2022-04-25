import { useEffect, useState } from "react";

import { Container } from "./styles";

import { PlayerModal } from "../../components/Modals/PlayerModal";

import { MdAdd, MdEdit, MdDeleteForever } from 'react-icons/md';
import { GiSoccerKick } from 'react-icons/gi';
import { Footer } from "../../components/Footer";

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
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState("new");
  const [playerEditInfo, setPlayerEditInfo] = useState<PlayersProps | {}>({});

  useEffect(() => {
    setPlayers(inititalPlayersInfo);
  }, []);

  function openModal() {
    setShowModal(true);
  }
  function openEditModal(player: PlayersProps) {
    setTypeModal("edit");
    setPlayerEditInfo(player);
    setShowModal(true);
  }
  function closeModal() {
    setTypeModal("new");
    setPlayerEditInfo({});
    setShowModal(false);
  }

  return (
    <Container>
      <PlayerModal
        showPasswordModal={showModal}
        onRequestClose={closeModal}
        type={typeModal}
        playerEditInfo={playerEditInfo}
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
                    onClick={() => openEditModal(player)}
                  >
                    <MdEdit className="icon" />
                  </button>
                  <button 
                    type="button" 
                    className="delete-button"
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