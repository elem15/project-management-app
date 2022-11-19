import { Button, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/const/routes';
import './Welcome.scss';

function Welcome() {
  const { t } = useTranslation();
  const { Title } = Typography;
  return (
    <main>
      <section className="section section__intro">
        <div className="section__title">
          <Title level={2} className="section__title_heading">
            {t('welcome.appTitle')}
          </Title>
          <p className="section__title_subheading">{t('welcome.appSubtitle')}</p>
          <Link to={ROUTES.HOME_PAGE}>
            <Button type="primary" className="to__main">
              {t('header.main')}
            </Button>
          </Link>
        </div>
        <div className="section__image"></div>
      </section>
      <section className="section section__team">
        <div className="section__title">
          <Title level={2} className="section__title_heading" style={{ textAlign: 'center' }}>
            {t('welcome.team')}
          </Title>
        </div>
        <div className="teammates">
          <div className="teammates__item">
            <h4 className="teammates__item_name">
              {t('welcome.teammate1')}
              <a
                href="http://github.com/dab10"
                className="teammates__item_github"
                target="__blank"
              ></a>
            </h4>
            <ul>
              <li>{t('welcome.appTitle')}</li>
              <li>{t('welcome.api')}</li>
            </ul>
          </div>
          <div className="teammates__item">
            <h4 className="teammates__item_name">
              {t('welcome.teammate2')}
              <a
                href="http://github.com/elem15"
                className="teammates__item_github"
                target="__blank"
              ></a>
            </h4>
            <ul>
              <li>{t('welcome.auth')}</li>
              <li>{t('welcome.api')}</li>
            </ul>
          </div>
          <div className="teammates__item">
            <h4 className="teammates__item_name">
              {t('welcome.teammate3')}
              <a
                href="http://github.com/labatsevich"
                className="teammates__item_github"
                target="__blank"
              ></a>
            </h4>
            <ul>
              <li>{t('welcome.main')}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Welcome;
