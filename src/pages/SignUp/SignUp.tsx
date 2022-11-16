import React, { useEffect } from 'react';
import './SignUp.scss';
import { Button, Form, Input, Row, Typography } from 'antd';
import { signUp } from 'utils/API/sign-up';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import { clearErrors } from 'app/reducers/authSlice';

export type UserUp = {
  name: string;
  login: string;
  password: string;
};

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, token, errorMessage } = useAppSelector((state) => state.auth);
  const onFinish = (values: UserUp) => {
    dispatch(signUp(values));
  };
  useEffect(() => {
    name && navigate(ROUTES.SIGN_IN_PAGE);
  }, [navigate, name]);
  useEffect(() => {
    token && navigate(ROUTES.HOME_PAGE);
  }, [navigate, token]);
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 3000);
    }
  }, [errorMessage, dispatch]);
  return (
    <main>
      <Row justify="center">
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Typography.Title level={2}>Sign up</Typography.Title>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please input your name!' },
              { type: 'string', min: 3, message: 'Name must be at least 3 characters' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Login"
            name="login"
            rules={[
              { required: true, message: 'Please input your login!' },
              { type: 'string', min: 3, message: 'Login must be at least 3 characters' },
            ]}
          >
            <Input />
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
    </main>
  );
};

export default SignUp;
