import React, { useEffect } from 'react';
import './SignIn.scss';
import { Button, Form, Input, Row, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { signIn } from 'utils/API/sign-in';
import { ROUTES } from 'utils/const/routes';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors } from 'app/reducers/authSlice';
import { useTranslation } from 'react-i18next';

export type UserIn = {
  login: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, errorMessage } = useAppSelector((state) => state.auth);
  const onFinish = async (values: UserIn) => {
    await dispatch(signIn(values));
  };
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
          <Typography.Title level={2}>{t('header.signIn')}</Typography.Title>
          <Form.Item
            label={t('sign.login')}
            name="login"
            rules={[
              { required: true, message: `${t('formRules.loginRequired')}` },
              { type: 'string', min: 3, message: `${t('formRules.loginLength')}` },
            ]}
          >
            <Input />
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
          <div>
            {t('sign.regQuestion')} <Link to={ROUTES.SIGN_UP_PAGE}>{t('header.signUp')}</Link>
          </div>
        </Form>
      </Row>
    </main>
  );
};

export default SignIn;
