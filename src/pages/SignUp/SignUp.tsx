import React from 'react';
import './SignUp.scss';
import { Button, Form, Input, Row } from 'antd';
import { signUp } from 'utils/API/sign-up';
import { useAppDispatch } from 'app/hooks';

export type UserUp = {
  name: string;
  login: string;
  password: string;
};

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();

  const onFinish = (values: UserUp) => {
    dispatch(signUp(values));
  };

  return (
    <Row justify="center">
      <Form name="basic" onFinish={onFinish} autoComplete="off">
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

export default SignUp;
