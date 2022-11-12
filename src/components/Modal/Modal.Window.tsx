import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { AddModalForm } from './Modal.Form';
import { useAppDispatch } from 'app/hooks';
import { getUsersBoard } from 'utils/API/get-users-board';

type PropsModal = {
  typeButton: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
  titleTextButton: string;
  titleTextModal: string;
  titleForm: string;
  objField: string;
};

export const AddModal = (props: PropsModal) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const showModal = async () => {
    await dispatch(getUsersBoard());
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type={props.typeButton} icon={<PlusOutlined />} onClick={showModal}>
        {props.titleTextButton}
      </Button>
      <Modal
        destroyOnClose={true}
        title={props.titleTextModal}
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        footer={null}
      >
        <AddModalForm titleForm={props.titleForm} objField={props.objField} onCancel={hideModal} />
      </Modal>
    </>
  );
};
