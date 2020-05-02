import React, { useState } from 'react';
import { Layout, Menu, Avatar, Badge, Dropdown } from 'antd';

import {
  UserOutlined,
  DatabaseOutlined,
  ReadOutlined,
  UserSwitchOutlined,
  KeyOutlined,
  BarChartOutlined,
} from '@ant-design/icons'

import Todos from './Todos'

const { Header, Sider, Content } = Layout


function App() {
  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <Layout hasSider style={{ minHeight: '100%' }}>
        <Sider theme="dark" width={256}>
          <div style={{ margin: 16, height: '31px' }}>
            <img
              alt="logo"
              src="//images.ctfassets.net/fikanzmkdlqn/1LW10x1QLC2esi6YgAAKia/56e4e0773a6922432919cec5dbe7a87e/Logo_TELUS_white.svg"
            />
          </div>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
          >
            <Menu.Item key="1">
              <DatabaseOutlined style={{ fontSize: 16 }} />
              <span>All orders</span>
            </Menu.Item>
            <Menu.Item key="2">
              <ReadOutlined style={{ fontSize: 16 }} />
              <span>Open orders</span>
            </Menu.Item>
            <Menu.Item key="3">
              <UserSwitchOutlined style={{ fontSize: 16 }} />
              <span>Agent activity</span>
            </Menu.Item>
            <Menu.Item key="4">
              <KeyOutlined style={{ fontSize: 16 }} />
              <span>Access keys</span>
            </Menu.Item>
            <Menu.Item key="5">
              <BarChartOutlined style={{ fontSize: 16 }} />
              <span>Reports</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: '0 1.5rem',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Dropdown
              trigger={['hover']}
              overlay={
                <Menu>
                  <Menu.Item key="0">
                    <a href="#">Change store front</a>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="1">
                    <a href="#">Change my language</a>
                  </Menu.Item>
                </Menu>
              }
            >
              <Badge count={1}>
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#66CC00' }}/>
              </Badge>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              minHeight: 280,
            }}
          >
            <Todos />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
