import React, { useState, useEffect } from 'react';
import { Layout, Space, Button } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import './style.css';

const { Header, Content, Footer } = Layout;

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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

      {showScrollTop && (
        <Button
          type="primary"
          shape="circle"
          icon={<UpOutlined />}
          onClick={scrollToTop}
          className="scroll-to-top"
        />
      )}
    </Layout>
  );
};

export default PageWrapper;
