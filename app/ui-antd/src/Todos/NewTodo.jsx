import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const NewTodo = ({ visible, handleSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const handleCategoryChange = (value) => {
    form.setFieldsValue({
      categoryId: value
    });
    return;
  };

  const onFinish = (values) => {
    handleSubmit(values)
    form.resetFields()
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  return (
    <Modal
      title="Create new todo"
      onCancel={onCancel}
      visible={visible}
      footer={null}
    >
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: 'required!' }]}
        >
          <Select onChange={handleCategoryChange}>
            <Option value={6}>Personal</Option>
            <Option value={7}>Work</Option>
            <Option value={8}>Life</Option>
            <Option value={9}>Travel</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'required!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Notes"
          name="notes"
          rules={[{ required: true, message: 'required!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewTodo;
