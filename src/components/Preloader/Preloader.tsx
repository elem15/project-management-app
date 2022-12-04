import { Space, Spin } from 'antd';
import React from 'react';
import './preloader.scss';

export const Preloader: React.FC = () => {
  return (
    <Space size="large" className="preloader">
      <Spin size="large" className="reloader1" />
      <div className="preloader-container"></div>
    </Space>
  );
};
