import { Space, Spin } from 'antd';
import React from 'react';

export const Preloader: React.FC = () => {
  return (
    <Space size="middle">
      <Spin size="default" />
    </Space>
  );
};
