import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';

import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { Content } from './styles';

interface PlayerModalProps {
  showPlayerModal: boolean;
  onRequestClose: () => void;
  type: string;
  playerEditInfo: any;
}

export function PlayerModal({
  showPlayerModal,
  onRequestClose,
  type,
  playerEditInfo,
}: PlayerModalProps) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('Linha');

  useEffect(() => {
    if (Object.keys(playerEditInfo).length !== 0) {
      setName(playerEditInfo.name);
      setPosition(playerEditInfo.position);
    }
  }, [playerEditInfo]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log(name);
    console.log(position);

    if (!name || !position) {
      toast.error('Campo incompleto!');
    } else {
      toast.dismiss();
      toast.success(type === 'new' ? 'Novo jogador cadastrado!' : 'Jogador editado!');
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