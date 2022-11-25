import React, { useState } from 'react';
import { Button, Cascader, Form, Input, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addBoardId } from 'app/reducers/boardSlice';
import { updateTask } from 'utils/API/update-task';

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
  taskId: string;
  title: string;
  description: string;
  usersTeammates: string[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
};

type Option = {
  value: string | number;
  label: string;
  children?: Option[];
};

export const AddModalEditTaskForm = (props: PropsCreateBoardForm) => {
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const { userId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { usersTeam } = useAppSelector((state) => state.board);
  const usersTeamFilter = usersTeam.map((item) => {
    return { label: item.login, value: item._id };
  });
  const initialTeammates = props.usersTeammates.reduce(
    (matrix: string[][], item: string, index: number) => {
      matrix.push([]);
      matrix[index].push(item);
      return matrix;
    },
    []
  );

  const options: Option[] = usersTeamFilter;

  const onFinish = async (values: Values) => {
    props.setLoading(true);
    setComponentDisabled(true);
    if (props.objField === 'taskTitle') {
      await dispatch(
        updateTask({
          title: values[props.objField],
          order: 1,
          description: values.description ? values.description : ' ',
          boardId: props.boardId,
          columnId: props.columnId,
          taskId: props.taskId,
          userId: userId,
          users: values.teammates ? values.teammates.flat() : [],
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
        initialValues={{
          taskTitle: props.title,
          description: props.description,
          teammates: initialTeammates,
        }}
        onFinish={onFinish}
        autoComplete="off"
        disabled={componentDisabled}
      >
        <Form.Item
          label={props.titleForm}
          name={props.objField}
          rules={[{ required: true, message: 'Please input task title!' }]}
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
            <Button type="primary" htmlType="submit" loading={props.loading}>
              Submit
            </Button>
            <Button onClick={props.onCancel}>Cancel</Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};
