import React, { useEffect, useState } from 'react';
import { fetchAllBoards, deleteBoard } from '../api/board.api';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { RootState } from '../store/store';
import { useTranslation } from 'react-i18next';
import Confirmation from './../components/Confirmation';
import { Board } from '../types/Entities/Board';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const [header, setHeader] = useState('');
  const [text, setText] = useState('');
  const [idBoard, setIdBoard] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { boards, loading } = useAppSelector((state: RootState) => state.boards);
  const { t } = useTranslation();

  const handleOpenModal = async (board: Board) => {
    setHeader('Удалить доску');
    setText(`Вы действительно хотите удалить доску ${board.title}?`);
    setIdBoard(board.id);
    setShowModal(true);
  };

  const handleConfirm = () => {
    dispatch(deleteBoard(idBoard));
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, []);

  return (
    <div>
      {t('board.boards_page')}
      {loading
        ? 'LOADING'
        : boards.map((item) => (
            <div key={item.id}>
              <div>{item.title}</div>
              <button onClick={() => handleOpenModal(item)}>Delete</button>
            </div>
          ))}
      <Confirmation
        header={header}
        text={text}
        show={showModal}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </div>
  );
};

export default Main;
