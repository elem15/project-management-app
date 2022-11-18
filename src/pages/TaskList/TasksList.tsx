import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import keyCreator from 'utils/keyCreator/keyCreator';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'app/hooks';
import { deleteColumnTask } from 'utils/API/delete-column-task';
import { deleteTaskById } from 'app/reducers/boardSlice';
import { AddModalEditTask } from 'components/ModalEditTask/ModalEditTask.Form';

type Task = {
  _id: string;
  title: string;
  order: string;
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
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleClickDeleteTask = async (taskId: string, columnId: string, boardId: string) => {
    await dispatch(deleteColumnTask({ taskId: taskId, columnId: columnId, boardId: boardId }));
    dispatch(deleteTaskById(taskId));
  };

  const createTaskList = (taskId: string) => {
    const tasksList = props.tasks.map((task) => {
      if (task.columnId === taskId) {
        return (
          <div key={keyCreator()}>
            <Button onClick={showModal}>{task.title}</Button>
            <Modal
              destroyOnClose={true}
              title="Task"
              open={open}
              onOk={hideModal}
              onCancel={hideModal}
              footer={null}
            >
              <AddModalEditTask
                titleForm={'Task title'}
                objField={'taskTitle'}
                onCancel={hideModal}
                boardId={props.boardId}
                columnId={props.columnId}
                taskId={task._id}
                title={task.title}
                description={task.description}
              />
            </Modal>
            <Button
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

  return <div>{createTaskList(props.columnId)}</div>;
}

export default TaskList;
