import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addBoardId, addColumns } from 'app/reducers/boardSlice';
import { AddModalCreateColumn } from 'components/ModalCreateColumn/ModalCreateColumn.Window';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBoardColumns } from 'utils/API/get-board-columns';
import { boardIdLength } from 'utils/const/other';
import { ROUTES } from 'utils/const/routes';
import { getTasksByBoardId } from 'utils/API/get-tasks-by-board-id';
import './Board.scss';
import { getTitleByBoardId } from 'utils/API/get-title-by-board-id';
import TasksColumn from 'components/TasksColumn/TasksColumn';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

const Board: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { columns, boardId, title } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const location = useLocation();

  const boardIdFromUrl =
    document.location.href.split('/')[document.location.href.split('/').length - 1];
  let boardIdCurrent = '';

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    const newColumns = [...columns];
    newColumns.splice(source.index, 1);
    newColumns.splice(destination.index, 0, columns[source.index]);
    dispatch(addColumns(newColumns));
  };

  useEffect(() => {
    (token && boardIdFromUrl.length !== boardIdLength && router(ROUTES.NOT_FOUND_PAGE)) ||
      (!token && router(ROUTES.NOT_FOUND_PAGE));
  }, [boardIdFromUrl.length, router, token]);

  if (boardId) {
    boardIdCurrent = boardId;
  } else {
    boardIdCurrent = boardIdFromUrl;
    dispatch(addBoardId(boardIdCurrent));
  }

  useEffect(() => {
    token && dispatch(getBoardColumns(boardIdCurrent));
    token && dispatch(getTitleByBoardId(boardIdCurrent));
    token && dispatch(getTasksByBoardId(boardIdCurrent));
  }, [boardIdCurrent, dispatch, location, token]);

  return (
    <div className="columns-container">
      <h2 className="header">{title ? JSON.parse(title).title : ''}</h2>
      <h3>{title ? JSON.parse(title).description : ''}</h3>
      <Button onClick={() => router(`${ROUTES.YOUR_BOARDS}`)}>Back</Button>
      <AddModalCreateColumn
        typeButton={'primary'}
        titleTextButton={'Add column'}
        titleTextModal={'Add column'}
        titleForm={'Column title'}
        objField={'columnTitle'}
        boardId={boardId}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={boardIdCurrent}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={snapshot.isDraggingOver ? `column-list droppable` : `column-list`}
            >
              {columns.map((item, index) => (
                <TasksColumn key={item._id} item={item} index={index} />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
