// axios.js

import axios from 'axios';

function getAuthHeader() {
  const token = sessionStorage.getItem('token');
  if (!token) return '';
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
}

const configuredApiUrl = process.env.VUE_APP_API_URL;
const axiosInstance = axios.create({
  baseURL: configuredApiUrl !== undefined ? configuredApiUrl : 'https://lagrafejournal.com',
});

axiosInstance.interceptors.request.use((config) => {
  config.headers['Authorization'] = getAuthHeader();
  return config;
}, (error) => Promise.reject(error));

export default axiosInstance;
