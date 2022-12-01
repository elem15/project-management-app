import { Button, Form, Input } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'app/hooks';
import React, { useState } from 'react';
import { updateBoardColumnTitle } from 'utils/API/update-board-column-title';
import './EditColumnTitle.scss';

type Props = {
  title: string;
  order: number;
  columnId: string;
  boardId: string;
};

type Values = {
  title: string;
};

export const EditColumnTitle = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const titleInitial = title;
  const handleOnClickSubmit = (values: Values) => {
    dispatch(
      updateBoardColumnTitle({
        title: values.title,
        order: props.order,
        columnId: props.columnId,
        boardId: props.boardId,
        isSwap: false,
      })
    );
    setTitle(values.title);
    setOpen(false);
  };
  const handleOnClickReject = () => {
    setOpen(false);
    form.setFieldValue('title', titleInitial);
  };

  const buttons = (
    <Form.Item>
      <Button htmlType="submit" icon={<CheckOutlined />} className="submit-button"></Button>
      <Button onClick={handleOnClickReject} icon={<CloseOutlined />} danger></Button>
    </Form.Item>
  );

  const handleOnFocus = () => setOpen(true);
  const handleOnClick = () => setOpen(true);

  return (
    <>
      {!open && (
        <>
          <h3 className="text-cut-editable" onClick={handleOnClick}>
            {title}
          </h3>
        </>
      )}

      {open && (
        <Form
          form={form}
          name="basic"
          initialValues={{ title }}
          onFinish={handleOnClickSubmit}
          className="name-column"
        >
          <Form.Item name="title">
            <Input className="input-text" onFocus={handleOnFocus} />
          </Form.Item>
          {buttons}
        </Form>
      )}
    </>
  );
};
