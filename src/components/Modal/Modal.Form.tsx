import React from 'react';
import { Button, Form, Input, Row } from 'antd';

type Values = {
  [key: string]: string;
  // columnTitle: string;
  // boardTitle: string;
};

type PropsCreateBoardForm = {
  titleForm: string;
  objField: string;
};

export const AddModalForm = (props: PropsCreateBoardForm) => {
  const [form] = Form.useForm();

  const onFinish = (values: Values) => {
    form.resetFields();
    console.log('Success:', values[props.objField]);
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label={props.titleForm}
        name={props.objField}
        rules={[
          {
            required: true,
            message: `Please input ${props.titleForm[0].toLowerCase()}${props.titleForm.slice(1)}!`,
          },
        ]}
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
