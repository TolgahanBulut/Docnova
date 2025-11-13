import React from 'react';
import { Card, Descriptions, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const InvoiceDetail = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { selectedInvoice } = useSelector((state) => state.invoice);

  if (!selectedInvoice) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <p>{t('invoice.noInvoiceSelected')}</p>
          <Button onClick={() => navigate('/invoices')}>{t('invoice.backToList')}</Button>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={t('invoice.detail')}
        extra={<Button onClick={() => navigate('/invoices')}>{t('invoice.backToList')}</Button>}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label={t('invoice.number')}>
            {selectedInvoice.invoiceNumber}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.issueDate')}>
            {selectedInvoice.issueDate ? new Date(selectedInvoice.issueDate).toLocaleDateString() : '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.dueDate')}>
            {selectedInvoice.dueDate ? new Date(selectedInvoice.dueDate).toLocaleDateString() : '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.payableAmount')}>
            {selectedInvoice.payableAmount ? `${selectedInvoice.payableAmount.toFixed(2)} ${selectedInvoice.currency}` : '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.taxExclusiveAmount')}>
            {selectedInvoice.taxExclusiveAmount ? `${selectedInvoice.taxExclusiveAmount.toFixed(2)} ${selectedInvoice.currency}` : '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.taxInclusiveAmount')}>
            {selectedInvoice.taxInclusiveAmount ? `${selectedInvoice.taxInclusiveAmount.toFixed(2)} ${selectedInvoice.currency}` : '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.status')}>
            {selectedInvoice.status ? selectedInvoice.status.replace(/_/g, ' ') : '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.customerName')}>
            {selectedInvoice.customerName || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.customerVat')}>
            {selectedInvoice.customerVat || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.supplierName')}>
            {selectedInvoice.supplierName || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.supplierVat')}>
            {selectedInvoice.supplierVat || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.documentType')}>
            {selectedInvoice.documentType || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.invoiceType')}>
            {selectedInvoice.type || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.currency')}>
            {selectedInvoice.currency || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.paymentStatus')}>
            {selectedInvoice.paymentDetails?.paymentStatus || '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.remainingAmount')}>
            {selectedInvoice.paymentDetails?.remainingAmount 
              ? `${selectedInvoice.paymentDetails.remainingAmount.toFixed(2)} ${selectedInvoice.currency}` 
              : '-'}
          </Descriptions.Item>
          <Descriptions.Item label={t('invoice.companyId')}>
            {selectedInvoice.companyId}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default InvoiceDetail;