import React, { useEffect, useState } from 'react';
import './UserProfile.scss';
import { Button, Form, Input, Modal, Row, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import { updateUser } from 'utils/API/update-user';
import { deleteUser } from 'utils/API/delete-user';
import { clearErrors } from 'app/reducers/authSlice';

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
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    (name !== prevName || login !== prevLogin) && navigate(ROUTES.HOME_PAGE);
  }, [name, navigate, prevName, login, prevLogin]);
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
          <Typography.Title level={2}>Edit Profile</Typography.Title>
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
          <Row justify="center">
            <Button type="primary" danger onClick={() => setDeleteModal(true)}>
              Delete account
            </Button>
          </Row>
        </Form>
        <Modal title="Account will be permanently deleted!" open={deleteModal} footer={null}>
          <p>Are you sure?</p>
          <Row justify="end">
            <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
            <Button type="primary" danger onClick={() => dispatch(deleteUser())}>
              Delete account
            </Button>
          </Row>
        </Modal>
      </Row>
    </main>
  );
};

export default UserProfile;
