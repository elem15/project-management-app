import { Space, Spin } from 'antd';
import React from 'react';
import './preloader.scss';

export const Preloader: React.FC = () => {
  return (
    <div className="preloader-container">
      <Space size="large" className="preloader">
        <Spin size="large" className="reloader1" />
      </Space>
    </div>
  );
};
