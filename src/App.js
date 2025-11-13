import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, message } from 'antd';
import trTR from 'antd/locale/tr_TR';
import enUS from 'antd/locale/en_US';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Login from './pages/Login';
import InvoiceList from './pages/InvoiceList';
import InvoiceDetail from './pages/InvoiceDetail';
import Layout from './components/Layout';

message.config({
  top: 70,
  duration: 4,
  maxCount: 3,
  prefixCls: 'ant-message',
});

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return !isAuthenticated ? children : <Navigate to="/invoices" />;
};

function App() {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'tr' ? trTR : enUS;

  return (
    <ConfigProvider 
      locale={locale}
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route
            path="/invoices"
            element={
              <PrivateRoute>
                <Layout>
                  <InvoiceList />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <InvoiceDetail />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;