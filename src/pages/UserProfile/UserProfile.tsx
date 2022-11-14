import React, { useEffect, useState } from 'react';
import './UserProfile.scss';
import { Button, Form, Input, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import { updateUser } from 'utils/API/update-user';

export type UserUp = {
  name: string;
  login: string;
  password: string;
};

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, login, errorMessage } = useAppSelector((state) => state.auth);
  const onFinish = (values: UserUp) => {
    dispatch(updateUser(values));
  };
  const [prevName] = useState(name);
  const [prevLogin] = useState(login);
  useEffect(() => {
    (name !== prevName || login !== prevLogin) && navigate(ROUTES.HOME_PAGE);
  }, [name, navigate, prevName, login, prevLogin]);
  return (
    <Row justify="center">
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <h2>Edit Profile</h2>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please input your name!' },
            { type: 'string', min: 3, message: 'Name must be at least 3 characters' },
          ]}
        >
          <Input placeholder={name} />
        </Form.Item>
        <Form.Item
          label="Login"
          name="login"
          rules={[
            { required: true, message: 'Please input your login!' },
            { type: 'string', min: 3, message: 'Login must be at least 3 characters' },
          ]}
        >
          <Input placeholder={login} />
        </Form.Item>
        <Form.Item
          {...(errorMessage && {
            help: errorMessage,
            validateStatus: 'error',
          })}
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { type: 'string', min: 8, message: 'Password must be at least 8 characters' },
            {
              message: 'Only numbers and english characters without space can be entered',
              pattern: /^[A-Za-z0-9_]+$/,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Row justify="center">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Row>
  );
};

export default UserProfile;
