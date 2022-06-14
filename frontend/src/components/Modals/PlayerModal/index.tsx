import { FormEvent, useEffect, useState } from 'react';
import { api } from '../../../services/api';
import Modal from 'react-modal';

import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { Content } from './styles';

interface PlayerModalProps {
  showPlayerModal: boolean;
  onRequestClose: () => void;
  type: string;
  playerEditInfo: any;
  changePlayerCount: () => void;
}

export function PlayerModal({
  showPlayerModal,
  onRequestClose,
  type,
  playerEditInfo,
  changePlayerCount
}: PlayerModalProps) {
  const [id, setId] = useState(undefined);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('Linha');

  useEffect(() => {
    if (Object.keys(playerEditInfo).length !== 0) {
      setId(playerEditInfo.id);
      setName(playerEditInfo.nome);
      setPosition(playerEditInfo.posicao);
    }
  }, [playerEditInfo]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name || !position) {
      toast.error('Campo incompleto!');
    } else {
      toast.dismiss();
      if (type === 'new') {
        const params = new URLSearchParams();
        params.append('nome', name);
        params.append('posicao', position);
        api.post('/jogadores', params).then(response => {
          changePlayerCount();
          console.log(response);
          toast.success('Novo jogador cadastrado!');
        });
      }
      if (type === 'edit') {
        const params = new URLSearchParams();
        params.append('nome', name);
        params.append('posicao', position);
        api.put(`/jogadores/${id}`, params).then(response => {
          changePlayerCount();
          console.log(response);
          toast.success('Jogador editado!');
        });
      }
      onRequestClose();
    }
  }

  function closeModal() {
    setName('');
    setPosition('Linha');
    onRequestClose();
  }

  return (
    <Modal
      isOpen={showPlayerModal}
      onRequestClose={closeModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <Content>
        <header>
          <h1>{type === "new" ? "Novo" : "Editar"} Jogador</h1>
          <AiFillCloseCircle
            className="closeModalIcon"
            onClick={closeModal}
          />
        </header>
        <form onSubmit={handleSubmit}>
          <p>Nome:</p>
          <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <p>Posição:</p>
          <select 
            value={position}
            onChange={event => setPosition(event.target.value)}
          >
            <option value="Linha">Linha</option>
            <option value="Goleiro">Goleiro</option>
          </select>

          <div className="buttons-container">
            <button type="button" className="cancel" onClick={closeModal}>
              Cancelar
            </button>
            <button type="submit" className="submit">
              {type === "new" ? "Adicionar" : "Editar"}
            </button>
          </div>
        </form>
      </Content>
    </Modal>
  );
}