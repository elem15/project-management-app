import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Row, Select, Space } from 'antd';
import { SearchOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './Search.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getAllTasksByKeyword } from 'utils/API/get-all-tasks-by-keyword';
import { addBoardId } from 'app/reducers/boardSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import { getAllTasksByIds } from 'utils/API/get-all-tasks-by-ids';
import { deleteTasks } from 'app/reducers/searchReducer';

type Values = {
  select: string;
  keyword: string;
  id: string;
  ids: { idItem: string }[];
};

const Search = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [isSearchById, setIsSearchById] = useState<boolean>(false);
  const { tasksByKeyword } = useAppSelector((state) => state.search);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useNavigate();

  useEffect(() => {
    !token && router(ROUTES.WELCOME_PAGE);
  }, [token, router]);

  useEffect(() => {
    token && dispatch(deleteTasks());
  }, [dispatch, token]);

  const onFinish = async (values: Values) => {
    console.log(values);
    setLoading(true);
    setComponentDisabled(true);
    if (values.select === 'text') {
      await dispatch(getAllTasksByKeyword(values.keyword));
    }
    if (values.select === 'id') {
      await dispatch(getAllTasksByIds(values.id + values.ids.map((el) => el.idItem).join(',')));
    }
    setLoading(false);
    setComponentDisabled(false);
  };

  const handleChange = (typeOfSearch: string) => {
    typeOfSearch === 'id' ? setIsSearchById(true) : setIsSearchById(false);
  };

  const handleClickOpenBoard = async (_id: string) => {
    if (_id) {
      dispatch(addBoardId(_id));
      router(`${ROUTES.YOUR_BOARDS}/${_id}`);
    } else {
      router(`${ROUTES.HOME_PAGE}`);
    }
  };

  const tasksList = tasksByKeyword.map((item) => (
    <div key={item._id}>
      <div className="card-item" onClick={() => handleClickOpenBoard(item.boardId)}>
        <div>
          <h3>Task id:</h3>
          <div className="text-cut">{item._id}</div>
          <h3>Task title:</h3>
          <div className="text-cut">{item.title}</div>
          <h3>Task description:</h3>
          <div className="text-cut">{item.description ? item.description : '-'}</div>
        </div>
      </div>
    </div>
  ));

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
                Search
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Row>
      <div className="list">{tasksList}</div>
    </>
  );
};

export default Search;
