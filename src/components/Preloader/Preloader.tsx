import { Space, Spin } from 'antd';
import React from 'react';
import './preloader.scss';

export const Preloader: React.FC = () => {
  return (
    <Space size="middle" className="preloader">
      <Spin size="default" />
    </Space>
  );
};
