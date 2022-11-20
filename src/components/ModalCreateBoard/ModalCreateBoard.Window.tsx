import React, { useState } from 'react';
import { Button, Modal, Tooltip } from 'antd';
import { AddModalFormBoard } from './ModalCreateBoard.Form';
import newBoard from '../../media/new-board.svg';

type PropsModal = {
  typeButton: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
  titleTextButton: string;
  titleTextModal: string;
  titleForm: string;
  objField: string;
};

export const AddModalCreateBoard = (props: PropsModal) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip mouseEnterDelay={0.2} placement="bottomRight" title={`${props.titleTextButton}`}>
        <img className="icon" src={newBoard} alt="boards list" onClick={showModal} />
      </Tooltip>
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
          onCancel={hideModal}
        />
      </Modal>
    </>
  );
};
