import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Column } from 'app/reducers/boardSlice';
import { EditColumnTitle } from 'components/EditColumnTitle/EditColumnTitle';
import React from 'react';
import TaskList from 'components/TaskList/TasksList';
import { showDeleteConfirm } from 'components/ModalConfirm/ModalConfirm';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AddModalCreateTask } from 'components/ModalCreateTask/ModalCreateTask.Window';
import { Draggable } from 'react-beautiful-dnd';

interface IProps {
  item: Column;
  index: number;
}
const TasksColumn = (props: IProps) => {
  const { tasks } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const { item, index } = props;
  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided, snapshot) => (
        <div
          className={snapshot.isDragging ? `column-item draggable` : `column-item`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="column-item-header" {...provided.dragHandleProps}>
            <div className="task-item">
              <EditColumnTitle
                title={item.title}
                order={0}
                columnId={item._id}
                boardId={item.boardId}
              />
              <h3>
                Column order: <span className="text-cut">{item.order}</span>
              </h3>
            </div>
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              danger
              onClick={(e) => showDeleteConfirm(e, dispatch, 'column', item.boardId, item._id)}
            ></Button>
          </div>
          <TaskList tasks={tasks} columnId={item._id} boardId={item.boardId} />
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
      )}
    </Draggable>
  );
};

export default TasksColumn;
