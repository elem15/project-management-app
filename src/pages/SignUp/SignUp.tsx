import React, { useEffect, useState } from 'react';
import './SignUp.scss';
import { Button, Form, Input, Row, Typography } from 'antd';
import { signUp } from 'utils/API/sign-up';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import { useTranslation } from 'react-i18next';
import { LOADING } from 'utils/const/status';
import { Preloader } from 'components/Preloader/Preloader';

export type UserUp = {
  name: string;
  login: string;
  password: string;
};

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, token, status } = useAppSelector((state) => state.auth);
  const [fixedName] = useState(name);
  const onFinish = (values: UserUp) => {
    dispatch(signUp(values));
  };
  useEffect(() => {
    name !== fixedName && navigate(ROUTES.SIGN_IN_PAGE);
  }, [navigate, name, fixedName]);
  useEffect(() => {
    token && navigate(ROUTES.HOME_PAGE);
  }, [navigate, token]);
  const [nameRequired, setNameRequired] = useState(`${t('formRules.loginRequired')}`);
  useEffect(() => {
    setNameRequired(`${t('formRules.loginRequired')}`);
  }, [nameRequired, setNameRequired, t]);

  const RenderForm = ({ nameRequired }: { nameRequired: string }) => {
    return (
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Row justify="center">
          <Typography.Title level={2}>{t('header.signUp')}</Typography.Title>
        </Row>
        <Form.Item
          label={t('sign.name')}
          name="name"
          rules={[
            { required: true, message: `${t('formRules.nameRequired')}` },
            { type: 'string', min: 3, message: `${t('formRules.nameLength')}` },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('sign.login')}
          name="login"
          rules={[
            { required: true, message: nameRequired },
            { type: 'string', min: 3, message: `${t('formRules.loginLength')}` },
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
          {t('sign.signInQuestion')}
          <Link to={ROUTES.SIGN_IN_PAGE}>&nbsp;{t('header.signIn')}</Link>
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

export default SignUp;
