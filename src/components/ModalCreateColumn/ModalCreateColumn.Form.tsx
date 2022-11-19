import React from 'react';
import { Button, Form, Input, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ROUTES } from 'utils/const/routes';
import { useNavigate } from 'react-router-dom';
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
  onCancel: () => void;
};

export const AddModalFormColumn = (props: PropsCreateColumnForm) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const { isLoading } = useAppSelector((state) => state.board);

  const onFinish = async (values: Values) => {
    form.resetFields();
    if (props.objField === 'columnTitle') {
      await dispatch(
        createColumn({
          title: values[props.objField],
          order: 1,
          boardId: props.boardId,
        })
      );
      dispatch(addBoardId(props.boardId));
      props.onCancel();
      router(`${ROUTES.YOUR_BOARDS}/${props.boardId}`);
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
