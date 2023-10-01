// axios.js

import axios from 'axios';

// Create a global Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/', // Replace with your API base URL
});

// Export the Axios instance to use it throughout your app
export default axiosInstance;