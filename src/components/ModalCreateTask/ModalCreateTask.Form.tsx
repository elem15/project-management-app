import React, { useState } from 'react';
import { Button, Cascader, Form, Input, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { createTask } from 'utils/API/create-task';
import { addBoardId } from 'app/reducers/boardSlice';
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
  loading: boolean;
  tasksLength: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
};

type Option = {
  value: string | number;
  label: string;
  children?: Option[];
};

export const AddModalFormCreateTask = (props: PropsCreateBoardForm) => {
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const { userId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { usersTeam } = useAppSelector((state) => state.board);
  const usersTeamFilter = usersTeam.map((item) => {
    return { label: item.login, value: item._id };
  });

  const options: Option[] = usersTeamFilter;

  const onFinish = async (values: Values) => {
    props.setLoading(true);
    setComponentDisabled(true);
    if (props.objField === 'taskTitle') {
      await dispatch(
        createTask({
          title: values[props.objField],
          order: props.tasksLength,
          description: values.description,
          userId: userId,
          users: values.teammates ? values.teammates.flat() : [],
          boardId: props.boardId,
          columnId: props.columnId,
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
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};
