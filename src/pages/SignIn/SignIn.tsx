import React, { useEffect, useState } from 'react';
import './SignIn.scss';
import { Button, Form, Input, Row, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { signIn } from 'utils/API/sign-in';
import { ROUTES } from 'utils/const/routes';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LOADING } from 'utils/const/status';
import { Preloader } from 'components/Preloader/Preloader';

export type UserIn = {
  login: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, status } = useAppSelector((state) => state.auth);
  const onFinish = async (values: UserIn) => {
    await dispatch(signIn(values));
  };
  useEffect(() => {
    token && navigate(ROUTES.HOME_PAGE);
  }, [navigate, token]);
  const [nameRequired, setNameRequired] = useState(`${t('formRules.loginRequired')}`);
  useEffect(() => {
    setNameRequired(`${t('formRules.nameRequired')}`);
  }, [nameRequired, setNameRequired, t]);

  const RenderForm = ({ nameRequired }: { nameRequired: string }) => {
    return (
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Row justify="center">
          <Typography.Title level={2}>{t('header.signIn')}</Typography.Title>
        </Row>
        <Form.Item
          label={t('sign.login')}
          name="login"
          rules={[
            { required: true, message: nameRequired },
            { type: 'string', min: 3, max: 20, message: `${t('formRules.loginLength')}` },
          ]}
        >
          <Input />
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
        <Row justify="center">
          {t('sign.regQuestion')} <Link to={ROUTES.SIGN_UP_PAGE}>&nbsp;{t('header.signUp')}</Link>
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

export default SignIn;
