import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { useAppDispatch } from 'app/hooks';
import { togglePopup } from 'app/reducers/boardSlice';
import Popup from 'components/Popup/Popup';

export const Board = () => {
  const dispatch = useAppDispatch();

  const handleTogglePopup = () => dispatch(togglePopup());

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleTogglePopup}>
        Add column
      </Button>
      <Popup togglePopup={handleTogglePopup} />
    </div>
  );
};
