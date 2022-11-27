import { Button } from 'antd';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'app/hooks';
import './TaskList.scss';
import { AddModalEditTask } from 'components/ModalEditTask/ModalEditTask.Window';
import { showDeleteConfirm } from 'components/ModalConfirm/ModalConfirm';

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

  const createTaskList = (columnId: string) => {
    const tasksList = props.tasks.map((task) => {
      if (task.columnId === columnId) {
        return (
          <div key={task._id}>
            <AddModalEditTask
              titleTextButton={task.title}
              titleTextModal={`Task id: ${task._id}`}
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
        );
      }
    });

    return <div>{tasksList}</div>;
  };

  return <div className="task-container">{createTaskList(props.columnId)}</div>;
}

export default TaskList;
