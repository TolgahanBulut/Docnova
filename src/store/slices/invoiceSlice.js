import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [],
  selectedInvoice: null,
  loading: false,
  error: null
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setInvoices, setSelectedInvoice, setLoading, setError } = invoiceSlice.actions;
export default invoiceSlice.reducer;