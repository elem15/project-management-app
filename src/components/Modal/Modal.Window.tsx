import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { AddColumnForm } from './Modal.Form';

export const AddColumnModal = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add column
      </Button>
      <Modal title="Add column" open={open} onOk={hideModal} onCancel={hideModal} footer={null}>
        <AddColumnForm />
      </Modal>
    </>
  );
};
