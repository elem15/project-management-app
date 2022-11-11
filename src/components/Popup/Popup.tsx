import React from 'react';
import './Popup.scss';
import classNames from 'classnames';
import { useAppSelector } from 'app/hooks';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

type PopupProps = {
  togglePopup: () => { payload: undefined; type: 'auth/togglePopup' };
};

const Popup = (props: PopupProps) => {
  const { isPopup } = useAppSelector((state) => state.board);

  const popupClass = classNames({
    popup: true,
    active: isPopup,
  });

  const popupContentClass = classNames({
    popup__content: true,
    active: isPopup,
  });

  return (
    <div className={popupClass} onClick={props.togglePopup}>
      <div className={popupContentClass} onClick={(e) => e.stopPropagation()}>
        <Button type="text" icon={<CloseOutlined />} onClick={props.togglePopup}></Button>
        {/* <img src={props.card.image} alt={props.card.name} className="popup__image" />
        <div className="popup__text">
          <div>Base ID: {props.card.id}</div>
          <div>Name: {props.card.name}</div>
          <div>Status: {props.card.status}</div>
          <div>Species: {props.card.species}</div>
          <div>Type: {props.card.type}</div>
          <div>Gender: {props.card.gender}</div>
          <div>Location: {props.card.location.name}</div>
        </div> */}
      </div>
    </div>
  );
};

export default Popup;
