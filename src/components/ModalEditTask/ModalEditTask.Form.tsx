import React, { useState } from 'react';
import { Button, Cascader, Form, Input, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addBoardId } from 'app/reducers/boardSlice';
import { updateTask } from 'utils/API/update-task';
import { useTranslation } from 'react-i18next';

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
  order: number;
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
  const { t } = useTranslation();

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
          order: props.order,
          description: values.description,
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
          rules={[{ required: true, message: `${t('tasks.titleRequired')}` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('tasks.description')}
          name="description"
          rules={[{ required: true, message: `${t('tasks.descriptionRequired')}` }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t('tasks.teammates')} name="teammates">
          <Cascader options={options} multiple />
        </Form.Item>
        <Row justify="end">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={props.loading}>
              {t('sign.submit')}
            </Button>
            <Button onClick={props.onCancel}>{t('sign.cancel')}</Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};
