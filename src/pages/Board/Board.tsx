import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addBoardId, dragAndDropColumns } from 'app/reducers/boardSlice';
import { AddModalCreateColumn } from 'components/ModalCreateColumn/ModalCreateColumn.Window';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBoardColumns } from 'utils/API/get-board-columns';
import { boardIdLength } from 'utils/const/other';
import { ROUTES } from 'utils/const/routes';
import { AddModalCreateTask } from 'components/ModalCreateTask/ModalCreateTask.Window';
import { getTasksByBoardId } from 'utils/API/get-tasks-by-board-id';
import TaskList from 'pages/TaskList/TasksList';
import { EditColumnTitle } from 'components/EditColumnTitle/EditColumnTitle';
import { showDeleteConfirm } from 'components/ModalConfirm/ModalConfirm';
import './Board.scss';
import { getTitleByBoardId } from 'utils/API/get-title-by-board-id';
import { updateColumnAfterDnD } from 'utils/API/update-column-DnD';

type Column = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};

const Board: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { columns, boardId, tasks, title } = useAppSelector((state) => state.board);
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
    dispatch(getTitleByBoardId(boardIdCurrent));
    dispatch(getTasksByBoardId(boardIdCurrent));
  }, [boardIdCurrent, dispatch, location]);

  const [currentCard, setCurrentCard] = useState({} as Column);
  const [cardList, setCardList] = useState(columns);
  const [dragging, setDragging] = useState(false);
  const [dragItemNode, setDragItemNode] = useState({} as EventTarget);
  // const dragItem = useRef();

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: Column): void => {
    setDragItemNode(e.target);
    // dragItemNode.addEventListener('dragend', dragEndHandler);
    setCurrentCard(card);
    // (dragItem.current as unknown as string) = card._id;
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const dragEndHandler = (): void => {
    // e.target.style.background = 'white';
    dragItemNode.removeEventListener('dragend', dragEndHandler);
    setDragging(false);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    // e.target.style.background = 'lightgray';
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, card: Column): void => {
    e.preventDefault();
    // const newColumns = columns.map((item) => {
    //   if (item._id === card._id) {
    //     return { ...item, order: currentCard.order };
    //   }
    //   if (item._id === currentCard._id) {
    //     return { ...item, order: card.order };
    //   }
    //   return item;
    // });
    // dispatch(dragAndDropColumns(newColumns));
    const columnsForBackend = columns.map((item) => {
      return {
        _id: item._id,
        order: item.order,
      };
    });
    dispatch(updateColumnAfterDnD(columnsForBackend));
    // e.target.style.background = 'white';
    setDragging(false);
  };

  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>, card: Column): void => {
    e.preventDefault();
    // console.log('Entering a drag target', card);
    // e.target.style.background = 'lightgray';
    const newColumns = columns.map((item: Column) => {
      if (item._id === card._id) {
        // console.log('---------------------------');
        // console.log('Entering a drag target item', item);
        // console.log('Entering a drag target card', card);
        // console.log('Entering a drag target currentCard', currentCard);
        // setCurrentCard({ ...item, order: currentCard.order });
        return { ...item, order: currentCard.order };
      }
      if (item._id === currentCard._id) {
        setCurrentCard({ ...item, order: card.order });
        return { ...item, order: card.order };
      }
      return item;
    });
    dispatch(dragAndDropColumns(newColumns));
  };

  const sortCards = (a: Column, b: Column) => {
    if (a && b) {
      if (a.order > b.order) {
        return 1;
      } else {
        return -1;
      }
    } else {
      return 1;
    }
  };

  const getStyles = (item: Column) => {
    if (currentCard._id === item._id) {
      return 'column-item current';
    }
    return 'column-item';
  };

  const tempColumn = [...columns];
  const columnsList = tempColumn.sort(sortCards).map((item) => (
    <div
      key={item._id}
      onDragStart={(e) => dragStartHandler(e, item)}
      // onDragLeave={(e) => dragEndHandler(e)}
      onDragEnter={(e) => dragEnterHandler(e, item)}
      onDragEnd={dragEndHandler}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, item)}
      draggable={true}
      className={dragging ? getStyles(item) : 'column-item'}
    >
      <div>
        <div className="column-item-header">
          <div>
            <EditColumnTitle
              title={item.title}
              order={0}
              columnId={item._id}
              boardId={item.boardId}
            />
            <h3>Column order:</h3>
            <div className="text-cut">{item.order}</div>
            <h3>boardId:</h3>
            <div className="text-cut">{item.boardId}</div>
          </div>
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            danger
            onClick={(e) => showDeleteConfirm(e, dispatch, 'column', item.boardId, item._id)}
          ></Button>
        </div>
        <TaskList tasks={tasks} columnId={item._id} boardId={item.boardId} />
      </div>
      <div>
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
    </div>
  ));

  return (
    <div className="columns-container">
      <h2>{title ? JSON.parse(title).title : ''}</h2>
      <h3>{title ? JSON.parse(title).description : ''}</h3>
      <Button onClick={() => router(`${ROUTES.YOUR_BOARDS}`)}>Back</Button>
      <div className="column-list">
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
    </div>
  );
};

export default Board;
