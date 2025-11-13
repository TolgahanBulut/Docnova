import React, { useState } from 'react';
import { Form, Input, Button, Card, notification, Alert, Select } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, GlobalOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/authSlice';
import { login } from '../services/api';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorKey, setErrorKey] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const backgroundImage = i18n.language === 'tr' 
    ? 'url(/images/login_bg1.png)' 
    : 'url(/images/login_bg2.png)';

  const onFinish = async (values) => {
    setLoading(true);
    setErrorKey('');
    
    try {
      const response = await login(values.email, values.password);
      
      dispatch(setUser(response));
      
      notification.success({
        message: t('login.success'),
        description: t('login.successDesc'),
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        placement: 'topRight',
        duration: 3,
      });
      
      setTimeout(() => {
        navigate('/invoices');
      }, 500);
      
    } catch (error) {
      
      let errorDescKey = 'login.invalidCredentialsDesc';
      
      if (error.response) {
        const status = error.response.status;
        
        if (status === 400 || status === 401 || status === 403 || status === 404) {
          errorDescKey = 'login.invalidCredentialsDesc';
        } else if (status === 500) {
          errorDescKey = 'login.serverErrorDesc';
        }
      } else if (error.request) {
        errorDescKey = 'login.networkErrorDesc';
      } else {
        errorDescKey = 'login.errorDesc';
      }
      
      notification.error({
        message: t('login.loginFailed'),
        description: t(errorDescKey),
        icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
        placement: 'topRight',
        duration: 6,
      });
      
      setErrorKey(errorDescKey);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      minHeight: '100vh',
      position: 'relative'
    }}>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="login-left-panel"
      >

        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.3s ease-in-out'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          zIndex: 1,
          textAlign: 'left',
          color: 'white'
        }}>
          <img 
            src="/images/melasoft-logo.png" 
            alt="Melasoft Logo" 
            style={{ height: '60px', marginBottom: '20px', filter: 'brightness(0) invert(1)' }}
          />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          color: 'white',
          padding: '30px',
          fontSize: '16px',
          fontWeight: '500',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Docnova ©2025 - Melasoft
        </div>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f2f5',
        padding: '40px',
        position: 'relative'
      }}
      className="login-right-panel"
      >
        <div className="mobile-background" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="mobile-logo" style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          zIndex: 1000,
          display: 'none'
        }}>
          <img 
            src="/images/melasoft-logo.png" 
            alt="Melasoft Logo" 
            style={{ height: '40px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          />
        </div>

        <div style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          zIndex: 1000
        }}>
          <Select
            value={i18n.language}
            style={{ width: 120 }}
            onChange={changeLanguage}
            suffixIcon={<GlobalOutlined />}
            size="large"
            options={[
              { value: 'en', label: '🇬🇧 English' },
              { value: 'tr', label: '🇹🇷 Türkçe' }
            ]}
          />
        </div>

        <div style={{ width: '100%', maxWidth: '450px', position: 'relative', zIndex: 10 }}>
          <Card 
            style={{ 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '8px'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '32px', color: '#1890ff', margin: 0 }}>
                {t('login.title')}
              </h2>
            </div>
            
            {errorKey && (
              <Alert
                message={t('login.loginFailed')}
                description={t(errorKey)}
                type="error"
                showIcon
                closable
                onClose={() => setErrorKey('')}
                style={{ marginBottom: 16 }}
              />
            )}
            
            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              initialValues={{
                email: 'devmelauser@yopmail.com',
                password: 'Work123???'
              }}
            >
              <Form.Item
                label={t('login.email')}
                name="email"
                rules={[
                  { required: true, message: t('login.emailRequired') },
                  { type: 'email', message: t('login.emailInvalid') }
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label={t('login.password')}
                name="password"
                rules={[{ required: true, message: t('login.passwordRequired') }]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading} 
                  block 
                  size="large"
                >
                  {loading ? t('login.loggingIn') : t('login.loginButton')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .login-left-panel {
            display: none !important;
          }
          
          .login-right-panel {
            flex: 1 !important;
            min-width: 100% !important;
          }
          
          .mobile-background {
            opacity: 0.7 !important;
          }
          
          .mobile-logo {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;