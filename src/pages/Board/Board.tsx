import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  addBoardId,
  Column,
  removeColumnsState,
  swapColumns,
  swapTasksBetween,
  swapTasksInside,
} from 'app/reducers/boardSlice';
import { AddModalCreateColumn } from 'components/ModalCreateColumn/ModalCreateColumn.Window';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBoardColumns } from 'utils/API/get-board-columns';
import { boardIdLength } from 'utils/const/other';
import { ROUTES } from 'utils/const/routes';
import './Board.scss';
import { getTitleByBoardId } from 'utils/API/get-title-by-board-id';
import TasksColumn from 'components/TasksColumn/TasksColumn';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { updateBoardColumnTitle } from 'utils/API/update-board-column-title';
import { Preloader } from 'components/Preloader/Preloader';
import { updateTask } from 'utils/API/update-task';
import { useTranslation } from 'react-i18next';

export const JSONErrorHandler = (title: string, expect: string) => {
  try {
    const obj = JSON.parse(title);
    return obj[expect];
  } catch {
    return '';
  }
};
const Board: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { columns, boardId, title, isLoading } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const boardIdFromUrl =
    document.location.href.split('/')[document.location.href.split('/').length - 1];
  let boardIdCurrent = '';

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    const newColumns = [...columns];
    if (type === 'task') {
      const startColumn = {
        ...newColumns.find((column) => column._id === source.droppableId),
      } as Column;
      const finishColumn = {
        ...newColumns.find((column) => column._id === destination.droppableId),
      } as Column;
      if (source.droppableId !== destination.droppableId) {
        const startTasks = [...startColumn.tasks];
        const finishTasks = [...finishColumn.tasks];
        finishTasks.splice(destination.index, 0, startColumn.tasks[source.index]);
        const orderedFinishTasks = finishTasks.map((task, idx) => ({
          ...task,
          order: idx,
        }));
        startTasks.splice(source.index, 1);
        const orderedStartTasks = startTasks.map((task, idx) => ({
          ...task,
          order: idx,
        }));
        dispatch(
          swapTasksBetween({
            startColumnId: startColumn._id,
            startTasks: orderedStartTasks,
            finishColumnId: finishColumn._id,
            finishTasks: orderedFinishTasks,
          })
        );
        orderedFinishTasks.map((task) => {
          dispatch(
            updateTask({
              ...task,
              columnId: destination.droppableId,
              taskId: task._id,
              isSwap: true,
            })
          );
        });
        orderedStartTasks.map((task) => {
          dispatch(
            updateTask({ ...task, columnId: source.droppableId, taskId: task._id, isSwap: true })
          );
        });
        return;
      }
      const tasks = [...startColumn.tasks];
      const tasksOld = [...startColumn.tasks];
      tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, tasksOld[source.index]);
      const orderedTasks = tasks.map((task, idx) => ({
        ...task,
        order: idx,
      }));
      dispatch(swapTasksInside({ startColumnId: startColumn._id, startTasks: orderedTasks }));
      orderedTasks.map((task) => {
        dispatch(updateTask({ ...task, taskId: task._id, isSwap: true }));
      });
      return;
    }
    newColumns.splice(source.index, 1);
    newColumns.splice(destination.index, 0, columns[source.index]);
    const sortedColumns = newColumns.map((col, idx) => ({ ...col, order: idx }));
    dispatch(swapColumns(sortedColumns));
    sortedColumns.map((column) => {
      dispatch(updateBoardColumnTitle({ ...column, columnId: column._id, isSwap: true }));
    });
  };

  useEffect(() => {
    (token && boardIdFromUrl.length !== boardIdLength && router(ROUTES.NOT_FOUND_PAGE)) ||
      (!token && router(ROUTES.WELCOME_PAGE));
  }, [boardIdFromUrl.length, router, token]);

  useEffect(() => {
    dispatch(removeColumnsState());
    token && dispatch(getTitleByBoardId(boardIdCurrent));
    token && dispatch(getBoardColumns(boardIdCurrent));
  }, [boardIdCurrent, dispatch, location, token]);

  if (boardId) {
    boardIdCurrent = boardId;
  } else {
    boardIdCurrent = boardIdFromUrl;
    dispatch(addBoardId(boardIdCurrent));
  }
  return (
    <div className="columns-container">
      <h2 className="header">{title ? JSONErrorHandler(title, 'title') : ''}</h2>
      <h3>{title ? JSONErrorHandler(title, 'description') : '-'}</h3>
      <Button onClick={() => router(-1)}>{t('columns.back')}</Button>
      <AddModalCreateColumn
        typeButton={'primary'}
        titleTextButton={t('columns.add')}
        titleTextModal={t('columns.add')}
        titleForm={t('columns.title')}
        objField={'columnTitle'}
        boardId={boardId}
      />
      {isLoading && <Preloader />}
      <br />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={boardIdCurrent} direction="horizontal" type="column">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={snapshot.isDraggingOver ? `column-list droppable` : `column-list`}
            >
              {columns.map((item, index) => (
                <TasksColumn key={item._id} item={item} index={index} />
              ))}
              <div className="placeholder">{provided.placeholder}</div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
