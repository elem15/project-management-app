import React, { useEffect } from 'react';
import { Button, Cascader, Form, Input, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { createBoard } from 'utils/API/create-board';
import { ROUTES } from 'utils/const/routes';
import { useNavigate } from 'react-router-dom';
import { getUsersBoardSlice } from 'utils/API/get-users-boardSlice';
import { getBoards } from 'utils/API/get-boards';

type Values = {
  usersTeam: string[];
  boardTitle: string;
};

type PropsCreateBoardForm = {
  titleForm: string;
  objField: string;
  onCancel: () => void;
};

type Option = {
  value: string | number;
  label: string;
  children?: Option[];
};

export const AddModalFormBoard = (props: PropsCreateBoardForm) => {
  const [form] = Form.useForm();
  const { login } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsersBoardSlice());
  }, [dispatch]);

  const { usersTeam, isLoading } = useAppSelector((state) => state.board);
  const usersTeamFilter = usersTeam.map((item) => {
    return { label: item.name, value: item.login };
  });

  const options: Option[] = usersTeamFilter;

  const onFinish = async (values: Values) => {
    form.resetFields();
    if (props.objField === 'boardTitle') {
      await dispatch(
        createBoard({
          title: values[props.objField],
          owner: login,
          users: values.usersTeam ? values.usersTeam.flat() : [],
        })
      );
      await dispatch(getBoards());
      props.onCancel();
      navigate(ROUTES.YOUR_BOARDS);
    }
    console.log('Success:', values.usersTeam ? values.usersTeam.flat() : []);
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
          <Form.Item label="Choose teammates" name="usersTeam">
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
