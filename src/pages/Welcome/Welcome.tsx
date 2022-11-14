import { Button, Card, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React from 'react';
import { Link } from 'react-router-dom';
import { EN, RU } from 'utils/const/app';
import { ROUTES } from '../../utils/const/routes';
import './Welcome.scss';

function Welcome() {
  const { Title } = Typography;
  return (
    <>
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
          <Card hoverable bordered={false} className="teammates__item">
            <div className="teammate__item_img">
              <img src="denis.jpg" />
            </div>
            <Meta title={RU.teammate1} />
          </Card>
          <Card hoverable bordered={false} className="teammates__item">
            <div className="teammate__item_img">
              <img src="mikhail.jpg" />
            </div>
            <Meta title={RU.teammate2} />
          </Card>
          <Card hoverable bordered={false} className="teammates__item">
            <div className="teammate__item_img">
              <img src="yuri.jpg" />
            </div>
            <h4 className="teammate__item_name">{RU.teammate3}</h4>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Welcome;
