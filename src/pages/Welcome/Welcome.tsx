import { Button, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { EN, RU } from 'utils/const/app';
import { ROUTES } from '../../utils/const/routes';
import './Welcome.scss';

function Welcome() {
  const { Title } = Typography;
  return (
    <main>
      <section className="section section__intro">
        <div className="section__title">
          <Title level={2} className="section__title_heading">
            {RU.app_title}
          </Title>
          <p className="section__title_subheading">{RU.app_subtitle}</p>
          <Link to={ROUTES.HOME_PAGE}>
            <Button type="primary" className="to__main">
              На главную
            </Button>
          </Link>
        </div>
        <div className="section__image"></div>
      </section>
      <section className="section section__team">
        <div className="section__title">
          <Title level={2} className="section__title_heading" style={{ textAlign: 'center' }}>
            {RU.team}
          </Title>
        </div>
        <div className="teammates">
          <div className="teammates__item">
            <h4 className="teammates__item_name">
              {RU.teammate1}
              <a
                href="http://github.com/dab10"
                className="teammates__item_github"
                target="__blank"
              ></a>
            </h4>
            <ul>
              <li>Канбан-доска</li>
              <li>Взаимодействие с api</li>
            </ul>
          </div>
          <div className="teammates__item">
            <h4 className="teammates__item_name">
              {RU.teammate2}
              <a
                href="http://github.com/elem15"
                className="teammates__item_github"
                target="__blank"
              ></a>
            </h4>
            <ul>
              <li>Регистрация/авторизация</li>
              <li>Взаимодействие с api</li>
            </ul>
          </div>
          <div className="teammates__item">
            <h4 className="teammates__item_name">
              {RU.teammate3}
              <a
                href="http://github.com/labatsevich"
                className="teammates__item_github"
                target="__blank"
              ></a>
            </h4>
            <ul>
              <li>Страницы - главная</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Welcome;
