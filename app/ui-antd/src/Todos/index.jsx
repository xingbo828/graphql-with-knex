import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Table, Tag, Badge, Button } from 'antd';

import { GET_TODOS, DELETE_TODO, CREATE_TODO } from './graphql';
import {
  ShopOutlined,
  CoffeeOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import NewTodo from './NewTodo';
import SystemNotes from './SystemNotes'

const Todos = () => {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [createTodo] = useMutation(CREATE_TODO);

  const [isModalOpen, setModalOpen] = useState(false)
  const [isSystemNotesVisible, setSystemNotesVisible] = useState(false)

  const handleNewTodoSubmit = async (values) => {
    console.log(values)
    await createTodo({ variables: {values} });
    refetch();
    setModalOpen(false)
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title > b.title,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        if (category === 'Work') {
          return (
            <Tag icon={<ShopOutlined />} color="processing">
              {category}
            </Tag>
          );
        } else if (category === 'Personal') {
          return (
            <Tag icon={<CoffeeOutlined />} color="success">
              {category}
            </Tag>
          );
        }
        return <Tag color="default">{category}</Tag>;
      },
      filters: [
        { text: 'Personal', value: 'Personal' },
        { text: 'Work', value: 'Work' },
        { text: 'No Category', value: 'No Category' },
      ],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
    {
      title: 'Status',
      dataIndex: 'isCompleted',
      key: 'isCompleted',
      render: (isCompleted) => {
        if (!isCompleted) {
          return <Badge status="processing" text="In Progress" />;
        }
        return <Badge status="default" text="Completed" />;
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record) => {
        return (
          <Button
            shape="round"
            danger
            type="primary"
            size="small"
            icon={<DeleteOutlined />}
            onClick={async () => {
              await deleteTodo({ variables: { id: record.id } });
              refetch();
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Button
        type="dashed"
        block
        onClick={() => setModalOpen(true)}
        style={{ marginBottom: '1rem' }}
      >
        <PlusOutlined /> Add todo
      </Button>
      <NewTodo onCancel={() => setModalOpen(false)} visible={isModalOpen} handleSubmit={handleNewTodoSubmit} />
      <Table
        dataSource={loading ? [] : data.todos}
        columns={columns}
        loading={loading}
      />
      <Button
        type="primary"
        onClick={() => setSystemNotesVisible(true)}
      >
        View system notes
      </Button>
      <SystemNotes visible={isSystemNotesVisible} onClose={() => setSystemNotesVisible(false)}/>
    </>
  );
};

export default Todos;
