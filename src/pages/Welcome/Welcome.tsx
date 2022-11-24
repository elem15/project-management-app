import { Button, Typography } from 'antd';
import { useAppSelector } from 'app/hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/const/routes';
import './Welcome.scss';
import signIn from '../../media/sign-in.svg';
import signUp from '../../media/sign-up.png';

function Welcome() {
  const { t } = useTranslation();
  const { Title } = Typography;
  const { token } = useAppSelector((state) => state.auth);
  return (
    <>
      <section className="section section__intro">
        <div className="section__title">
          <Title level={2} className="section__title_heading">
            {t('welcome.appTitle')}
          </Title>
          <p className="section__title_subheading">{t('welcome.appSubtitle')}</p>
          {token ? (
            <Link to={ROUTES.HOME_PAGE}>
              <Button type="primary" className="to__main">
                {t('header.main')}
              </Button>
            </Link>
          ) : (
            <ul className="welcome-nav">
              <li>
                <Link to={ROUTES.SIGN_IN_PAGE} className="nav__link">
                  <img className="icon" src={signIn} alt="user profile" />
                  <span className="sign-title"> {t('header.signIn')}</span>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SIGN_UP_PAGE} className="nav__link">
                  <img className="icon" src={signUp} alt="user profile" />
                  <span className="sign-title"> {t('header.signUp')}</span>
                </Link>
              </li>
            </ul>
          )}
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
    </>
  );
}

export default Welcome;
