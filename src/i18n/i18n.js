import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      login: {
        title: 'Login',
        email: 'Email',
        password: 'Password',
        loginButton: 'Login',
        loggingIn: 'Logging in...',
        success: 'Login Successful!',
        successDesc: 'Redirecting to invoices...',
        error: 'Login Failed',
        errorDesc: 'Please check your credentials and try again.',
        loginFailed: 'Login Failed!',
        invalidCredentials: 'Invalid Credentials',
        invalidCredentialsDesc: 'Email or password is incorrect. Please check your credentials.',
        serverError: 'Server Error',
        serverErrorDesc: 'A server error occurred. Please try again later.',
        networkError: 'Connection Error',
        networkErrorDesc: 'Please check your internet connection.',
        emailRequired: 'Please enter your email!',
        emailInvalid: 'Please enter a valid email!',
        passwordRequired: 'Please enter your password!'
      },
      invoice: {
        list: 'Invoice List',
        detail: 'Invoice Detail',
        detailButton: 'Details',
        number: 'Invoice Number',
        date: 'Date',
        amount: 'Amount',
        status: 'Status',
        customer: 'Customer',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        backToList: 'Back to List',
        noInvoiceSelected: 'No invoice selected',
        issueDate: 'Issue Date',
        dueDate: 'Due Date',
        payableAmount: 'Payable Amount',
        taxExclusiveAmount: 'Tax Exclusive Amount',
        taxInclusiveAmount: 'Tax Inclusive Amount',
        customerName: 'Customer Name',
        customerVat: 'Customer VAT Number',
        supplierName: 'Supplier Name',
        supplierVat: 'Supplier VAT Number',
        documentType: 'Document Type',
        invoiceType: 'Invoice Type',
        currency: 'Currency',
        paymentStatus: 'Payment Status',
        remainingAmount: 'Remaining Amount',
        companyId: 'Company ID',
        invoicesLoaded: 'invoices loaded',
        noInvoiceFound: 'No invoice found',
        companyIdNotFound: 'Company ID not found!',
        searchPlaceholder: 'Search by invoice number, customer or status...',
        results: 'results',
        total: 'Total',
        invoices: 'invoices'
      },
      common: {
        logout: 'Logout',
        language: 'Language'
      }
    }
  },
  tr: {
    translation: {
      login: {
        title: 'Giriş',
        email: 'E-posta',
        password: 'Şifre',
        loginButton: 'Giriş Yap',
        loggingIn: 'Giriş yapılıyor...',
        success: 'Giriş Başarılı!',
        successDesc: 'Fatura sayfasına yönlendiriliyorsunuz...',
        error: 'Giriş Başarısız',
        errorDesc: 'Lütfen bilgilerinizi kontrol edip tekrar deneyin.',
        loginFailed: 'Giriş Başarısız!',
        invalidCredentials: 'Geçersiz Bilgiler',
        invalidCredentialsDesc: 'E-posta veya şifre hatalı. Lütfen bilgilerinizi kontrol edin.',
        serverError: 'Sunucu Hatası',
        serverErrorDesc: 'Sunucuda bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        networkError: 'Bağlantı Hatası',
        networkErrorDesc: 'Lütfen internet bağlantınızı kontrol edin.',
        emailRequired: 'Lütfen e-posta adresinizi girin!',
        emailInvalid: 'Lütfen geçerli bir e-posta adresi girin!',
        passwordRequired: 'Lütfen şifrenizi girin!'
      },
      invoice: {
        list: 'Fatura Listesi',
        detail: 'Fatura Detayı',
        detailButton: 'Detay',
        number: 'Fatura Numarası',
        date: 'Tarih',
        amount: 'Tutar',
        status: 'Durum',
        customer: 'Müşteri',
        loading: 'Yükleniyor...',
        error: 'Hata',
        success: 'Başarılı',
        warning: 'Uyarı',
        backToList: 'Listeye Dön',
        noInvoiceSelected: 'Fatura seçilmedi',
        issueDate: 'Düzenlenme Tarihi',
        dueDate: 'Vade Tarihi',
        payableAmount: 'Ödenecek Tutar',
        taxExclusiveAmount: 'Vergi Hariç Tutar',
        taxInclusiveAmount: 'Vergi Dahil Tutar',
        customerName: 'Müşteri Adı',
        customerVat: 'Müşteri Vergi No',
        supplierName: 'Tedarikçi Adı',
        supplierVat: 'Tedarikçi Vergi No',
        documentType: 'Belge Tipi',
        invoiceType: 'Fatura Tipi',
        currency: 'Para Birimi',
        paymentStatus: 'Ödeme Durumu',
        remainingAmount: 'Kalan Tutar',
        companyId: 'Şirket ID',
        invoicesLoaded: 'fatura yüklendi',
        noInvoiceFound: 'Fatura bulunamadı',
        companyIdNotFound: 'Şirket ID bulunamadı!',
        searchPlaceholder: 'Fatura no, müşteri veya duruma göre ara...',
        results: 'sonuç',
        total: 'Toplam',
        invoices: 'fatura'
      },
      common: {
        logout: 'Çıkış',
        language: 'Dil'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;