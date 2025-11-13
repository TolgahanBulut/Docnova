import React from 'react';
import { Layout as AntLayout, Select, Button, Space } from 'antd';
import { TwitterOutlined, YoutubeOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children }) => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: '#fff', 
        padding: '0 24px',
        borderBottom: '3px solid #1890ff',
        height: 'auto',
        lineHeight: 'normal',
        paddingTop: '10px',
        paddingBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <img 
          src="/images/melasoft-logo.png" 
          alt="Melasoft Logo" 
          style={{ height: '50px' }}
        />
        
        <Space>
          <Select
            defaultValue={i18n.language}
            style={{ width: 120 }}
            onChange={changeLanguage}
            options={[
              { value: 'en', label: 'English' },
              { value: 'tr', label: 'Türkçe' }
            ]}
          />
          <Button onClick={handleLogout}>{t('common.logout')}</Button>
        </Space>
      </Header>
      
      <Content style={{ padding: '0', flex: 1 }}>
        {children}
      </Content>
      
      <Footer style={{ 
        textAlign: 'center', 
        background: '#fff',
        borderTop: '3px solid #1890ff',
        padding: '20px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
          <a href="https://twitter.com/melasoft" target="_blank" rel="noopener noreferrer">
            <TwitterOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          </a>
          <a href="https://www.youtube.com/channel/UCIbksG9EjEUh_uWW8tBzy9w" target="_blank" rel="noopener noreferrer">
            <YoutubeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          </a>
          <a href="https://linkedin.com/company/melasoft" target="_blank" rel="noopener noreferrer">
            <LinkedinOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          </a>
          <a href="https://instagram.com/melasoftgmbh" target="_blank" rel="noopener noreferrer">
            <InstagramOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          </a>
        </div>
        <div style={{ color: '#666' }}>
          Docnova ©{new Date().getFullYear()} - Melasoft 
        </div>
      </Footer>
    </AntLayout>
  );
};

export default Layout;