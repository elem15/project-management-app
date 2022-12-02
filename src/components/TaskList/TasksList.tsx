import { Button } from 'antd';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'app/hooks';
import './TaskList.scss';
import { AddModalEditTask } from 'components/ModalEditTask/ModalEditTask.Window';
import { showDeleteConfirm } from 'components/ModalConfirm/ModalConfirm';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

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
const TaskList = (props: TaskListProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const createTaskList = (provided: DroppableProvided) => {
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
                titleTextModal={t('tasks.task')}
                titleForm={t('tasks.title')}
                objField={'taskTitle'}
                boardId={task.boardId}
                columnId={task.columnId}
                taskId={task._id}
                description={task.description}
                usersTeammates={task.users}
                order={task.order}
              />
              <Button
                className="button-delete-task"
                icon={<DeleteOutlined />}
                onClick={(e) =>
                  showDeleteConfirm(
                    e,
                    dispatch,
                    `${t('message.task')}`,
                    props.boardId,
                    t,
                    props.columnId,
                    task._id
                  )
                }
                danger
              ></Button>
            </div>
          )}
        </Draggable>
      );
    });

    return (
      <div>
        {tasksList}
        <div>{provided.placeholder}</div>
      </div>
    );
  };

  return (
    <Droppable droppableId={props.columnId} direction="vertical" type="task">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="task-container">
          {createTaskList(provided)}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
