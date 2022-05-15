import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';

import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { Content } from './styles';

interface DeletePlayerModalProps {
  showDeletePlayerModal: boolean;
  onRequestClose: () => void;
  playerDeleteInfo: any;
}

export function DeletePlayerModal({
  showDeletePlayerModal,
  onRequestClose,
  playerDeleteInfo,
}: DeletePlayerModalProps) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (Object.keys(playerDeleteInfo).length !== 0) {
      setName(playerDeleteInfo.name);
    }
  }, [playerDeleteInfo]);

  function deletePlayer(e: FormEvent) {
    toast.dismiss();
    toast.success('Jogador excluído!');
    closeModal();
  }

  function closeModal() {
    setName('');
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

        <p>{name}</p>

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