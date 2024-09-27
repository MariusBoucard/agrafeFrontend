// axios.js

import axios from 'axios';

// Create a global Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'https://lagrafejournal.com', // Replace with your API base URL
  headers: {
    'Authorization': '', // Set your default header here
    
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(config => {
  // Modify the request configuration here
  config.headers['Authorization'] = sessionStorage.getItem('token'); // Modify the Authorization header
  return config;
}, error => {
  // Handle request errors
  return Promise.reject(error);
});

// Change this to your backend URL
// Export the Axios instance to use it throughout your app
export default axiosInstance;
