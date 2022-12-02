import React, { useState } from 'react';
import { Button, Form, Input, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { createColumn } from 'utils/API/create-column';
import { addBoardId } from 'app/reducers/boardSlice';
import { useTranslation } from 'react-i18next';

type Values = {
  usersTeam: string[];
  columnTitle: string;
  boardTitle: string;
};

type PropsCreateColumnForm = {
  titleForm: string;
  objField: string;
  boardId: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
};

export const AddModalFormColumn = (props: PropsCreateColumnForm) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.board);
  const onFinish = async (values: Values) => {
    props.setLoading(true);
    setComponentDisabled(true);
    if (props.objField === 'columnTitle') {
      await dispatch(
        createColumn({
          title: values[props.objField],
          order: columns.length,
          boardId: props.boardId,
        })
      );
      dispatch(addBoardId(props.boardId));
      props.onCancel();
      form.resetFields();
    }
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        disabled={componentDisabled}
      >
        <Form.Item
          label={props.titleForm}
          name={props.objField}
          rules={[
            {
              required: true,
              message: `${t(
                'boards.required'
              )}  ${props.titleForm[0].toLowerCase()}${props.titleForm.slice(1)}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Row justify="center">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={props.loading}>
              {t('sign.submit')}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};
