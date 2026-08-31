const configured = process.env.VUE_APP_API_URL;
const baseUrl = configured !== undefined ? configured : 'https://lagrafejournal.com';
export default baseUrl;