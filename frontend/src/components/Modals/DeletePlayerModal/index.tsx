import { FormEvent, useEffect, useState } from 'react';
import { api } from '../../../services/api';
import Modal from 'react-modal';

import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { Content } from './styles';

interface DeletePlayerModalProps {
  showDeletePlayerModal: boolean;
  onRequestClose: () => void;
  playerDeleteInfo: any;
  changePlayerCount: () => void;
}

interface playerProps {
  id: number,
  nome: string,
  posicao: string,
}

export function DeletePlayerModal({
  showDeletePlayerModal,
  onRequestClose,
  playerDeleteInfo,
  changePlayerCount,
}: DeletePlayerModalProps) {
  const [player, setPlayer] = useState<playerProps>({} as playerProps);

  useEffect(() => {
    if (Object.keys(playerDeleteInfo).length !== 0) {
      setPlayer(playerDeleteInfo);
    }
  }, [playerDeleteInfo]);

  function deletePlayer(e: FormEvent) {
    toast.dismiss();
    api.delete(`/jogadores/${playerDeleteInfo.id}`).then(response => {
      console.log(response);
      toast.success('Jogador excluído!');
      changePlayerCount();
    });
    closeModal();
  }

  function closeModal() {
    setPlayer({} as playerProps);
    onRequestClose();
  }

  return (
    <Modal
      isOpen={showDeletePlayerModal}
      onRequestClose={closeModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <Content>
        <header>
          <h1>Deseja excluir o jogador:</h1>
          <AiFillCloseCircle
            className="closeModalIcon"
            onClick={onRequestClose}
          />
        </header>

        <p>{player?.nome}</p>

        <div className="buttons-container">
          <button type="button" className="cancel" onClick={closeModal}>
            Cancelar
          </button>
          <button type="button" className="submit" onClick={deletePlayer}>
            Excluir
          </button>
        </div>
      </Content>
    </Modal>
  );
}