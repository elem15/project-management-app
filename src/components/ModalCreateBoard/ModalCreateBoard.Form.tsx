import React from 'react';
import { Button, Form, Input, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { createBoard } from 'utils/API/create-board';
import { ROUTES } from 'utils/const/routes';
import { useNavigate } from 'react-router-dom';

type Values = {
  boardTitle: string;
  description: string;
};

type PropsCreateBoardForm = {
  titleForm: string;
  objField: string;
  onCancel: () => void;
};

export const AddModalFormBoard = (props: PropsCreateBoardForm) => {
  const [form] = Form.useForm();
  const { login } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useAppSelector((state) => state.board);

  const onFinish = async (values: Values) => {
    form.resetFields();
    if (props.objField === 'boardTitle') {
      await dispatch(
        createBoard({
          title: JSON.stringify({ title: values[props.objField], description: values.description }),
          owner: login,
          users: [],
        })
      );
      props.onCancel();
      navigate(ROUTES.YOUR_BOARDS);
    }
  };

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
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
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Row justify="center">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Row>
        </Form>
      )}
    </>
  );
};
