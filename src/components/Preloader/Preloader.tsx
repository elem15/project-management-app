import { Space, Spin } from 'antd';
import React from 'react';
import './preloader.scss';

export const Preloader: React.FC = () => {
  return (
    <Space size="large" className="">
      <Spin size="large" className="preloader" />
      <div className="preloader-container"></div>
    </Space>
  );
};
