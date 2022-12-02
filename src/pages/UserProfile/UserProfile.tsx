import React, { useEffect, useState } from 'react';
import './UserProfile.scss';
import { Button, Form, Input, Modal, Row, Typography } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import { updateUser } from 'utils/API/update-user';
import { deleteUser } from 'utils/API/delete-user';
import { clearErrors } from 'app/reducers/authSlice';
import { useTranslation } from 'react-i18next';
import { Preloader } from 'components/Preloader/Preloader';
import { LOADING, FAILED } from 'utils/const/status';
import { openNotificationWithIcon } from 'utils/Notification/Notification';
const { confirm } = Modal;

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
  const success = () => {
    openNotificationWithIcon('success', t('message.updateUserSuccess'));
    navigate(ROUTES.HOME_PAGE);
  };
  const onFinish = async (values: UserUp) => {
    await dispatch(updateUser(values));
    status !== FAILED && success();
  };
  const [prevName] = useState(name);
  const [prevLogin] = useState(login);
  const showDeleteModal = () => {
    confirm({
      title: `${t('sign.question')}`,
      icon: <ExclamationCircleFilled />,
      okText: `${t('sign.ok')}`,
      okType: 'danger',
      cancelText: `${t('sign.cancel')}`,
      async onOk() {
        dispatch(deleteUser());
      },
    });
  };
  useEffect(() => {
    const deleteSuccess = () => {
      openNotificationWithIcon('success', t('message.deleteUserSuccess'));
      navigate(ROUTES.WELCOME_PAGE);
    };
    !token && deleteSuccess();
  }, [login, name, navigate, prevLogin, prevName, t, token]);
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
          <br />
          <br />
          <Row justify="center">
            <Button type="primary" danger onClick={() => showDeleteModal()}>
              {t('sign.delete')}
            </Button>
          </Row>
        </Form>
      </Row>
    </main>
  );
};

export default UserProfile;
