import React, { useEffect, useState } from 'react';
import './UserProfile.scss';
import { Button, Form, Input, Modal, Row, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import { updateUser } from 'utils/API/update-user';
import { deleteUser } from 'utils/API/delete-user';
import { clearErrors } from 'app/reducers/authSlice';
import { useTranslation } from 'react-i18next';
import { Preloader } from 'components/Preloader/Preloader';
import { LOADING } from 'utils/const/status';

export type UserUp = {
  name: string;
  login: string;
  password: string;
};

const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, login, errorMessage, token, status } = useAppSelector((state) => state.auth);
  const onFinish = (values: UserUp) => {
    dispatch(updateUser(values));
  };
  const [prevName] = useState(name);
  const [prevLogin] = useState(login);
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    !token && navigate(ROUTES.WELCOME_PAGE);
  }, [token, navigate]);
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
      {status === LOADING && <Preloader />}
      <Row justify="center">
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Typography.Title level={2}>{t('sign.editProfile')}</Typography.Title>
          <Form.Item
            label={t('sign.name')}
            name="name"
            rules={[
              { required: true, message: `${t('formRules.nameRequired')}` },
              { type: 'string', min: 3, message: `${t('formRules.nameLength')}` },
            ]}
          >
            <Input placeholder={name} />
          </Form.Item>
          <Form.Item
            label={t('sign.login')}
            name="login"
            rules={[
              { required: true, message: `${t('formRules.loginRequired')}` },
              { type: 'string', min: 3, message: `${t('formRules.loginLength')}` },
            ]}
          >
            <Input placeholder={login} />
          </Form.Item>
          <Form.Item
            {...(errorMessage && {
              help: errorMessage,
              validateStatus: 'error',
            })}
            label={t('sign.password')}
            name="password"
            rules={[
              { required: true, message: `${t('formRules.passwordRequired')}` },
              { type: 'string', min: 8, message: `${t('formRules.passwordLength')}` },
              {
                message: `${t('formRules.passwordPattern')}`,
                pattern: /^[A-Za-z0-9_]+$/,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Row justify="center">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t('sign.submit')}
              </Button>
            </Form.Item>
          </Row>
          <Row justify="center">
            <Button type="primary" danger onClick={() => setDeleteModal(true)}>
              {t('sign.delete')}
            </Button>
          </Row>
        </Form>
        <Modal
          title={t('sign.danger')}
          open={deleteModal}
          footer={null}
          onCancel={() => setDeleteModal(false)}
          maskClosable={true}
        >
          <p>{t('sign.question')}</p>
          <Row justify="end">
            <Button onClick={() => setDeleteModal(false)}>{t('sign.cancel')}</Button>
            <Button type="primary" danger onClick={() => dispatch(deleteUser())}>
              {t('sign.ok')}
            </Button>
          </Row>
        </Modal>
      </Row>
    </main>
  );
};

export default UserProfile;
