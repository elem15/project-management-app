import React, { useState } from 'react';
import { Button, Form, Input, Row, Select, Space } from 'antd';
import { SearchOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './Search.scss';

type Values = {
  select: string;
  keyword: string;
  id: string;
};

const Search = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [isSearchById, setIsSearchById] = useState<boolean>(false);

  const onFinish = async (values: Values) => {
    console.log(values);
  };

  const handleChange = (typeOfSearch: string) => {
    typeOfSearch === 'id' ? setIsSearchById(true) : setIsSearchById(false);
  };

  return (
    <>
      <Row justify="center">
        <h2>Search tasks</h2>
      </Row>
      <Row justify="center">
        <Form
          form={form}
          name="basic"
          initialValues={{
            select: 'text',
          }}
          onFinish={onFinish}
          autoComplete="off"
          disabled={componentDisabled}
          className="form-search"
        >
          <Form.Item label="Search" name="select">
            <Select onChange={handleChange}>
              <Select.Option value="text">by keyword</Select.Option>
              <Select.Option value="id">by id task</Select.Option>
            </Select>
          </Form.Item>
          {!isSearchById && (
            <Form.Item
              name="keyword"
              rules={[{ required: true, message: 'Please input attempt!' }]}
            >
              <Input prefix={<SearchOutlined />} />
            </Form.Item>
          )}
          {isSearchById && (
            <>
              <Form.Item
                name="id"
                rules={[
                  { required: true, message: 'Please input task id!' },
                  { type: 'string', min: 24, max: 24, message: 'Id must contain 24 characters' },
                  {
                    message: 'Only numbers and letters',
                    pattern: /^[A-Za-z0-9_]+$/,
                  },
                ]}
              >
                <Input prefix={<SearchOutlined />} />
              </Form.Item>
              <Form.List name="ids">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'idItem']}
                          rules={[
                            { required: true, message: 'Please input task id!' },
                            {
                              type: 'string',
                              min: 24,
                              max: 24,
                              message: 'Id must contain 24 characters',
                            },
                            {
                              message: 'Only numbers and letters',
                              pattern: /^[A-Za-z0-9_]+$/,
                            },
                          ]}
                        >
                          <Input prefix={<SearchOutlined />} />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </>
          )}
          <Row justify="center">
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Row>
    </>
  );
};

export default Search;
