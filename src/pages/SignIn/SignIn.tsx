import React, { useEffect } from 'react';
import './SignIn.scss';
import { Button, Form, Input, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { signIn } from 'utils/API/sign-in';
import { ROUTES } from 'utils/const/routes';
import { Link, useNavigate } from 'react-router-dom';

export type UserIn = {
  login: string;
  password: string;
};

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, errorMessage } = useAppSelector((state) => state.auth);
  const onFinish = async (values: UserIn) => {
    await dispatch(signIn(values));
  };
  useEffect(() => {
    token && navigate(ROUTES.HOME_PAGE);
  }, [navigate, token]);
  return (
    <main>
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
          <div>
            You are not registered yet?{' '}
            <Link to={ROUTES.SIGN_UP_PAGE} className="page-name">
              SignUp
            </Link>
          </div>
        </Form>
      </Row>
    </main>
  );
};

export default SignIn;
