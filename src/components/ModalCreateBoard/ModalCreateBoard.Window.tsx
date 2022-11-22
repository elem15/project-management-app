import React, { useState } from 'react';
import { Modal } from 'antd';
import { AddModalFormBoard } from './ModalCreateBoard.Form';
import newBoard from '../../media/new-board.svg';

type PropsModal = {
  typeButton: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
  titleTextButton: string;
  titleTextModal: string;
  titleForm: string;
  objField: string;
  setIsMenu: (isMenu: boolean) => void;
  isMenu: boolean;
};

export const AddModalCreateBoard = (props: PropsModal) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setIsMenu, isMenu } = props;
  const showModal = () => {
    setIsMenu(!isMenu);
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
    setLoading(false);
  };

  return (
    <>
      <>
        <img className="icon" src={newBoard} alt="boards list" onClick={showModal} />
        <span className="menu-item-title" onClick={showModal}>
          {props.titleTextButton}
        </span>
      </>
      <Modal
        destroyOnClose={true}
        title={props.titleTextModal}
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        footer={null}
      >
        <AddModalFormBoard
          titleForm={props.titleForm}
          objField={props.objField}
          loading={loading}
          setLoading={setLoading}
          onCancel={hideModal}
        />
      </Modal>
    </>
  );
};
