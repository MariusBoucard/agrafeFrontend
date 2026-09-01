import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementPlus from 'element-plus';

import './assets/css/general.css'; // Import your global CSS file here
const app = createApp(App)
.use(store)
.use(ElementPlus)

  
.use(router)
app.config.globalProperties.showNavigationLinks = true; // Default value
app.mount('#app')
