import Modal from 'react-modal';
import ptBr from 'date-fns/locale/pt-BR';
import { DayPicker, DayOfWeek, SelectSingleEventHandler } from 'react-day-picker';
import { format } from 'date-fns';

import { AiFillCloseCircle } from 'react-icons/ai';
import { Content } from './styles';

interface PlayerModalProps {
  showDayPickerModal: boolean;
  onRequestClose: () => void;
  selectedDay: Date | undefined;
  setSelectedDay: SelectSingleEventHandler;
}

export function DayPickerModal({
  showDayPickerModal,
  onRequestClose,
  selectedDay,
  setSelectedDay,
}: PlayerModalProps) {
  const disabledDays: DayOfWeek = {
    dayOfWeek: [0, 1, 2, 3, 4, 5]
  }

  return (
    <Modal
      isOpen={showDayPickerModal}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
      closeTimeoutMS={300}
    >
      <Content className='content-modal'>
        <header>
          <h1>Selecione uma data</h1>
          <AiFillCloseCircle
            className="closeModalIcon"
            onClick={onRequestClose}
          />
        </header>
        <main>
          <DayPicker
            mode="single"
            required
            selected={selectedDay}
            onSelect={setSelectedDay}
            defaultMonth={selectedDay}
            locale={ptBr}
            disabled={disabledDays}
            modifiersClassNames={{
              selected: 'my-selected'
            }}
          />
        </main>
        <div className="buttons-container">
          <button type="button" className="cancel" onClick={onRequestClose}>
            Cancelar
          </button>
          <button type="submit" className="submit" onClick={onRequestClose}>
            Selecionar
            <b>
              {selectedDay && (' (' + format(selectedDay, 'dd/MM/yyyy') + ')')}
            </b>
          </button>
        </div>
      </Content>
    </Modal>
  );
}