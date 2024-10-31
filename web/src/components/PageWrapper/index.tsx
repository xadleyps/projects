import React from 'react';
import { Layout, Menu, Typography, Space } from 'antd';
import { HomeOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import './style.css'; // Importing the CSS file

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <Layout className="page-wrapper">
      <Header className="header">
        <div className="brand">
          <h1 className="brand-title">Demo</h1>
        </div>
      </Header>

      <Content className="content">
        <div className="content-container">
          <Space direction="vertical" style={{ width: '100%' }}>
            {children}
          </Space>
        </div>
      </Content>

      <Footer className="footer">Demo ©2024</Footer>
    </Layout>
  );
};

export default PageWrapper;
