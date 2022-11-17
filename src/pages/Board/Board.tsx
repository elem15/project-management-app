import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addBoardId, deleteColumnById } from 'app/reducers/boardSlice';
import { AddModalCreateColumn } from 'components/ModalCreateColumn/ModalCreateColumn.Window';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBoardColumns } from 'utils/API/get-board-columns';
import { boardIdLength } from 'utils/const/other';
import { ROUTES } from 'utils/const/routes';
import { deleteBoardColumn } from 'utils/API/delete-board-column';
import { AddModalCreateTask } from 'components/ModalCreateTask/ModalCreateTask.Window';
import { getTasksByBoardId } from 'utils/API/get-tasks-by-board-id';
import TaskList from 'pages/TaskList/TasksList';

const Board: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { columns, isLoadingBoardPage, boardId, tasks } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const location = useLocation();

  const boardIdFromUrl =
    document.location.href.split('/')[document.location.href.split('/').length - 1];
  let boardIdCurrent = '';

  useEffect(() => {
    token && boardIdFromUrl.length !== boardIdLength && router(ROUTES.NOT_FOUND_PAGE);
  }, [boardIdFromUrl.length, router, token]);

  if (boardId) {
    boardIdCurrent = boardId;
  } else {
    boardIdCurrent = boardIdFromUrl;
    dispatch(addBoardId(boardIdCurrent));
  }

  useEffect(() => {
    dispatch(getBoardColumns(boardIdCurrent));
    dispatch(getTasksByBoardId(boardIdCurrent));
  }, [location]);

  const handleClickDeleteColumn = async (columnId: string, boardId: string) => {
    await dispatch(deleteBoardColumn({ columnId: columnId, boardId: boardId }));
    dispatch(deleteColumnById(columnId));
  };

  const columnsList = columns.map((item) => (
    <div key={item._id} className="card-item">
      <h3>Column title:</h3>
      <div>{item.title}</div>
      <h3>Column order:</h3>
      <div>{item.order}</div>
      <h3>boardId:</h3>
      <div>{item.boardId}</div>
      <Button
        shape="circle"
        icon={<DeleteOutlined />}
        danger
        onClick={() => handleClickDeleteColumn(item._id, item.boardId)}
      ></Button>
      <TaskList tasks={tasks} columnId={item._id} boardId={item.boardId} />
      <AddModalCreateTask
        typeButton={'primary'}
        titleTextButton={'Add task'}
        titleTextModal={'Add task'}
        titleForm={'Task title'}
        objField={'taskTitle'}
        boardId={item.boardId}
        columnId={item._id}
      />
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
