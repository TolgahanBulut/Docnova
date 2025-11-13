import React, { useEffect, useState, useMemo } from 'react';
import { Table, Button, message, Card, Space, Spin, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setInvoices, setSelectedInvoice, setLoading, setError } from '../store/slices/invoiceSlice';
import { searchInvoices } from '../services/api';
import { useTranslation } from 'react-i18next';

const InvoiceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const { invoices, loading, error } = useSelector((state) => state.invoice);
  const [searchText, setSearchText] = useState('');

  const filteredInvoices = useMemo(() => {
    if (!searchText) return invoices;
    
    return invoices.filter(invoice =>
      invoice.invoiceNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
      invoice.customerName?.toLowerCase().includes(searchText.toLowerCase()) ||
      invoice.status?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, invoices]);

  useEffect(() => {
    if (user && user.jwt) {
      fetchInvoices();
    }
  }, []);

  const fetchInvoices = async () => {
    dispatch(setLoading(true));
    try {
      let companyId = null;
      
      if (user.companies && user.companies.length > 0) {
        companyId = user.companies[0].id;

      } else if (user.lastCompanyId) {
        try {
          const parsed = JSON.parse(user.lastCompanyId);
          companyId = parsed.companyID || parsed.companyId;

        } catch (e) {

        }
      }
      
      if (!companyId) {
        message.error(t('invoice.companyIdNotFound'));
        dispatch(setLoading(false));
        return;
      }
      
      
      const params = {
        companyId: companyId,
        documentType: "OUTGOING",
        endDate: "2025-07-04T08:31:10.422Z",
        page: 0,
        size: 20,
        startDate: "2025-06-27T00:00:00.000Z",
        referenceDocument: "",
        type: null,
        status: null,
        paymentStatus: null,
        isDeleted: false
      };
      

      
      const response = await searchInvoices(user.jwt, params);
      
      const invoiceList = response?.invoices?.content || [];
      dispatch(setInvoices(invoiceList));
      
      if (invoiceList.length > 0) {
        message.success(`${invoiceList.length} ${t('invoice.invoicesLoaded')}`);
      } else {
        message.warning(t('invoice.noInvoiceFound'));
      }
    } catch (error) {
      message.error(t('invoice.error') + ': ' + (error.response?.data?.errorMessage || error.message));
      dispatch(setError(error.message));
    }
  };

  const handleDetail = (record) => {
    dispatch(setSelectedInvoice(record));
    navigate(`/invoice/${record.id}`);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const columns = [
    {
      title: t('invoice.number'),
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      sorter: (a, b) => a.invoiceNumber?.localeCompare(b.invoiceNumber),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('invoice.date'),
      dataIndex: 'issueDate',
      key: 'issueDate',
      render: (date) => date ? new Date(date).toLocaleDateString() : '-',
      sorter: (a, b) => new Date(a.issueDate) - new Date(b.issueDate),
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'descend',
    },
    {
      title: t('invoice.amount'),
      dataIndex: 'payableAmount',
      key: 'payableAmount',
      render: (amount, record) => amount ? `${amount.toFixed(2)} ${record.currency || 'EUR'}` : '-',
      sorter: (a, b) => a.payableAmount - b.payableAmount,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('invoice.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => status ? status.replace(/_/g, ' ') : '-',
      sorter: (a, b) => a.status?.localeCompare(b.status),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: t('invoice.customer'),
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName?.localeCompare(b.customerName),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: '',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Button type="primary" onClick={() => handleDetail(record)}>
          {t('invoice.detailButton')}
        </Button>
      ),
    },
  ];

  if (!user || !user.jwt) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
        <p>{t('invoice.loading')}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Space 
          style={{ 
            marginBottom: 16, 
            width: '100%', 
            flexWrap: 'wrap',
            gap: '16px'
          }}
          direction="vertical"
          size="middle"
        >
          <Space 
            style={{ 
              justifyContent: 'space-between', 
              width: '100%',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ flex: '1 1 auto', minWidth: '300px', maxWidth: '100%' }}>
              <Input
                placeholder={t('invoice.searchPlaceholder')}
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
                size="large"
                style={{ width: '100%', maxWidth: '500px' }}
              />
            </div>
          </Space>

          <Space>
            <h2 style={{ margin: 0 }}>{t('invoice.list')}</h2>
            <span style={{ color: '#666' }}>
              ({filteredInvoices.length} {t('invoice.results')})
            </span>
          </Space>
        </Space>
        
        {error && <p style={{ color: 'red', marginBottom: 16 }}>{error}</p>}

        <div style={{ overflowX: 'auto' }}>
          <Table
            columns={columns}
            dataSource={filteredInvoices}
            loading={loading}
            rowKey="id"
            scroll={{ x: 800 }}
            pagination={{ 
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `${t('invoice.total')} ${total} ${t('invoice.invoices')}`,
              pageSizeOptions: ['10', '20', '50', '100'],
              responsive: true
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceList;