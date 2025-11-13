import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login/dev`, {
    email,
    password
  });
  return response.data;
};

export const searchInvoices = async (jwt, params) => {

  
  const response = await axios.post(`${API_BASE_URL}/invoice/search`, params, {
    headers: {
      'R-Auth': jwt,
      'Content-Type': 'application/json'
    }
  });
  
  
  return response.data;
};