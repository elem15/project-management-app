import React from 'react';
import './SignIn.scss';
import { Button, Form, Input, Row } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { signIn } from 'utils/API/sign-in';

type User = {
  login: string;
  password: string;
};

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();

  const onFinish = (values: User) => {
    dispatch(signIn(values));
  };

  return (
    <Row justify="center">
      <Form name="basic" onFinish={onFinish} autoComplete="off">
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

export default SignIn;