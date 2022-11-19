import { Button } from 'antd';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { deleteColumnTask } from 'utils/API/delete-column-task';
import { deleteTaskById } from 'app/reducers/boardSlice';
import './TaskList.scss';
import { AddModalEditTask } from 'components/ModalEditTask/ModalEditTask.Window';

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
  const { isLoadingBoardPage } = useAppSelector((state) => state.board);

  const handleClickDeleteTask = async (taskId: string, columnId: string, boardId: string) => {
    await dispatch(deleteColumnTask({ taskId: taskId, columnId: columnId, boardId: boardId }));
    dispatch(deleteTaskById(taskId));
  };

  const createTaskList = (columnId: string) => {
    const tasksList = props.tasks.map((task) => {
      if (task.columnId === columnId) {
        return (
          <div key={task._id}>
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
              onClick={() => handleClickDeleteTask(task._id, props.columnId, props.boardId)}
              danger
            ></Button>
          </div>
        );
      }
    });

    return <div>{tasksList}</div>;
  };

  return isLoadingBoardPage ? (
    <div>Loading...</div>
  ) : (
    <div className="task-container">{createTaskList(props.columnId)}</div>
  );
}

export default TaskList;
