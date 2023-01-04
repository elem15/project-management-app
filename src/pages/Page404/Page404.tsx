import { Button, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import './Page404.scss';

function Page404() {
  const { t } = useTranslation();
  return (
    <main>
      <div className="code-404">404</div>
      <div className="op">{t('notFound.op')}</div>
      <h2 className="message">{t('notFound.message')}</h2>
      <div className="home-page-link"></div>
      <Row justify="center">
        <Button type="primary" size="large">
          <Link to={ROUTES.WELCOME_PAGE} className="homepage-link">
            {t('notFound.home')}
          </Link>
        </Button>
      </Row>
    </main>
  );
}

export default Page404;
