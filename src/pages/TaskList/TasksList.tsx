import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import keyCreator from 'utils/keyCreator/keyCreator';
import { DeleteOutlined } from '@ant-design/icons';

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
};

function TaskList(props: TaskListProps) {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const createTaskList = (taskId: string) => {
    const tasksList = props.tasks.map((task) => {
      if (task.columnId === taskId) {
        return (
          <div key={keyCreator()}>
            <Button onClick={showModal}>{task.title}</Button>
            <Modal
              destroyOnClose={true}
              title="Example"
              open={open}
              onOk={hideModal}
              onCancel={hideModal}
              footer={null}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
            <Button icon={<DeleteOutlined />} danger></Button>
          </div>
        );
      }
    });
    return <div>{tasksList}</div>;
  };

  return <div>{createTaskList(props.columnId)}</div>;
}

export default TaskList;
