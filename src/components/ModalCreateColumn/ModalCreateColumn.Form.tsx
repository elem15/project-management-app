import React, { useState } from 'react';
import { Button, Form, Input, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { createColumn } from 'utils/API/create-column';
import { addBoardId } from 'app/reducers/boardSlice';

type Values = {
  usersTeam: string[];
  columnTitle: string;
  boardTitle: string;
};

type PropsCreateColumnForm = {
  titleForm: string;
  objField: string;
  boardId: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
};

export const AddModalFormColumn = (props: PropsCreateColumnForm) => {
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const { columns } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  console.log(columns);

  const onFinish = async (values: Values) => {
    props.setLoading(true);
    setComponentDisabled(true);
    if (props.objField === 'columnTitle') {
      await dispatch(
        createColumn({
          title: values[props.objField],
          order:
            columns.length === 0
              ? 0
              : columns.reduce((prev, current) => (prev.order > current.order ? prev : current))
                  .order + 1,
          boardId: props.boardId,
        })
      );
      dispatch(addBoardId(props.boardId));
      props.onCancel();
      form.resetFields();
    }
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        disabled={componentDisabled}
      >
        <Form.Item
          label={props.titleForm}
          name={props.objField}
          rules={[
            {
              required: true,
              message: `Please input ${props.titleForm[0].toLowerCase()}${props.titleForm.slice(
                1
              )}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Row justify="center">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={props.loading}>
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};
