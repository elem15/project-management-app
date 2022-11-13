import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AddModalCreateColumn } from 'components/ModalCreateColumn/ModalCreateColumn.Window';
import React, { useEffect } from 'react';
import { getBoardColumns } from 'utils/API/get-board-columns';

const Board: React.FC = () => {
  const { columns, isLoadingBoardPage } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  let boardId: string;
  if (columns[0]) {
    boardId = columns[0].boardId;
  } else {
    boardId = document.location.href.split('/')[document.location.href.split('/').length - 1];
  }

  useEffect(() => {
    dispatch(getBoardColumns(boardId));
  }, []);

  const columnsList = columns.map((item) => (
    <div key={item._id} className="card-item">
      <h3>Column title:</h3>
      <div>{item.title}</div>
      <h3>Column order:</h3>
      <div>{item.order}</div>
      <h3>boardId:</h3>
      <div>{item.boardId}</div>
    </div>
  ));

  return (
    <>
      <h2>Board</h2>
      {isLoadingBoardPage ? (
        <h2>Loading...</h2>
      ) : (
        <div className="list">
          {columnsList}{' '}
          <AddModalCreateColumn
            typeButton={'primary'}
            titleTextButton={'Add column'}
            titleTextModal={'Add column'}
            titleForm={'Column title'}
            objField={'columnTitle'}
            boardId={boardId}
          />
        </div>
      )}
    </>
  );
};

export default Board;
