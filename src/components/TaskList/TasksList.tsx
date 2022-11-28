import { Button } from 'antd';
import React, { useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'app/hooks';
import './TaskList.scss';
import { AddModalEditTask } from 'components/ModalEditTask/ModalEditTask.Window';
import { showDeleteConfirm } from 'components/ModalConfirm/ModalConfirm';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getTaskByColumn } from 'utils/API/get-tasks-by-column';

type Task = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
};

type TaskListProps = {
  tasks: Task[];
  columnId: string;
  boardId: string;
};
function TaskList(props: TaskListProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTaskByColumn(props.columnId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const createTaskList = () => {
    const tasksList = props.tasks.map((task, index) => {
      return (
        <Draggable draggableId={task._id} index={index} key={task._id}>
          {(provided, snapshot) => (
            <div
              className={snapshot.isDragging ? `task draggable` : `task`}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <AddModalEditTask
                titleTextButton={task.title}
                titleTextModal={'Task'}
                titleForm={'Task title'}
                objField={'taskTitle'}
                boardId={task.boardId}
                columnId={task.columnId}
                taskId={task._id}
                description={task.description}
                usersTeammates={task.users}
              />
              <Button
                className="button-delete-task"
                icon={<DeleteOutlined />}
                onClick={(e) =>
                  showDeleteConfirm(e, dispatch, 'task', props.boardId, props.columnId, task._id)
                }
                danger
              ></Button>
            </div>
          )}
        </Draggable>
      );
    });

    return <div>{tasksList}</div>;
  };

  return (
    <Droppable droppableId={props.columnId} direction="vertical" type="task">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="task-container">
          {createTaskList()}
        </div>
      )}
    </Droppable>
  );
}

export default TaskList;
