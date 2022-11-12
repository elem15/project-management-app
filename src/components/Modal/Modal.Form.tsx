import React from 'react';
import { Button, Form, Input, Row } from 'antd';

type ColumnTitle = {
  columnTitle: string;
};

export const AddColumnForm: React.FC = () => {
  const onFinish = (values: ColumnTitle) => {
    console.log('Success:', values.columnTitle);
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Column title"
        name="columnTitle"
        rules={[{ required: true, message: 'Please input column title!' }]}
      >
        <Input />
      </Form.Item>

      <Row justify="center">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};
