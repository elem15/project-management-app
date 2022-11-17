import { Button, Form, Input } from 'antd';
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
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  let titleInitial = props.title;
  const handleOnClickSubmit = (values: Values) => {
    console.log(values);
    dispatch(
      updateBoardColumnTitle({
        title: values.title,
        order: props.order,
        columnId: props.columnId,
        boardId: props.boardId,
      })
    );
    titleInitial = values.title;
    setOpen(false);
  };
  const handleOnClickReject = () => {
    setOpen(false);
    form.setFieldValue('title', titleInitial);
  };

  const buttons = (
    <Form.Item>
      <Button type="primary" htmlType="submit">
        V
      </Button>
      <Button type="primary" onClick={handleOnClickReject}>
        X
      </Button>
    </Form.Item>
  );

  const handleOnFocus = () => setOpen(true);
  // const handleOnBlur = () => {
  //   setOpen(false);
  //   form.setFieldValue('title', titleInitial);
  // };

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ title: props.title }}
      onFinish={handleOnClickSubmit}
    >
      <Form.Item name="title">
        <Input className="input-text" onFocus={handleOnFocus} />
      </Form.Item>
      {open && buttons}
    </Form>
  );
};
