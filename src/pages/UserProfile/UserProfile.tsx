import React, { useEffect, useState } from 'react';
import './UserProfile.scss';
import { Button, Form, Input, Row, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import { updateUser } from 'utils/API/update-user';
import { useTranslation } from 'react-i18next';
import { Preloader } from 'components/Preloader/Preloader';
import { LOADING, FAILED } from 'utils/const/status';
import { showDeleteConfirm } from 'components/ModalConfirm/ModalConfirm';

export type UserUp = {
  name: string;
  login: string;
  password: string;
};

const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, login, token, status } = useAppSelector((state) => state.auth);
  const success = () => {
    navigate(ROUTES.HOME_PAGE);
  };
  const onFinish = async (values: UserUp) => {
    await dispatch(updateUser(values));
    status !== FAILED && success();
  };
  useEffect(() => {
    const deleteSuccess = () => {
      navigate(ROUTES.WELCOME_PAGE);
    };
    !token && deleteSuccess();
  }, [login, name, navigate, t, token]);
  const [nameRequired, setNameRequired] = useState(`${t('formRules.nameRequired')}`);
  useEffect(() => {
    setNameRequired(`${t('formRules.nameRequired')}`);
  }, [nameRequired, setNameRequired, t]);
  const RenderForm = ({ nameRequired }: { nameRequired: string }) => {
    return (
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Row justify="center">
          <Typography.Title level={2}>{t('sign.editProfile')}</Typography.Title>
        </Row>
        <Form.Item
          label={t('sign.name')}
          name="name"
          rules={[
            { required: true, message: nameRequired },
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
          <Button
            type="primary"
            danger
            onClick={(e) =>
              showDeleteConfirm(e, dispatch, 'user', `${t('message.account')}`, '', t)
            }
          >
            {t('sign.delete')}
          </Button>
        </Row>
      </Form>
    );
  };

  return (
    <main>
      {status === LOADING && <Preloader />}
      <Row justify="center">
        <RenderForm nameRequired={nameRequired} />
      </Row>
    </main>
  );
};

export default UserProfile;
