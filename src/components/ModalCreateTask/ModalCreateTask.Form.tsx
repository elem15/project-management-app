import React from 'react';
import { Button, Cascader, Form, Input, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { createTask } from 'utils/API/create-task';
import { addBoardId } from 'app/reducers/boardSlice';

type Values = {
  teammates: string[][];
  taskTitle: string;
  description: string;
};

type PropsCreateBoardForm = {
  titleForm: string;
  objField: string;
  boardId: string;
  columnId: string;
  onCancel: () => void;
};

type Option = {
  value: string | number;
  label: string;
  children?: Option[];
};

export const AddModalFormCreateTask = (props: PropsCreateBoardForm) => {
  const [form] = Form.useForm();
  const { userId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { usersTeam, isLoading } = useAppSelector((state) => state.board);
  const usersTeamFilter = usersTeam.map((item) => {
    return { label: item.login, value: item.login };
  });

  const options: Option[] = usersTeamFilter;

  const onFinish = async (values: Values) => {
    form.resetFields();
    if (props.objField === 'taskTitle') {
      await dispatch(
        createTask({
          title: values[props.objField],
          order: 1,
          description: values.description ? values.description : ' ',
          userId: userId,
          users: values.teammates ? values.teammates.flat() : [],
          boardId: props.boardId,
          columnId: props.columnId,
        })
      );
      dispatch(addBoardId(props.boardId));
      props.onCancel();
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
          <Form.Item label="Choose teammates" name="teammates">
            <Cascader options={options} multiple />
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
