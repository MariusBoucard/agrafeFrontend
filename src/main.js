import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementPlus from 'element-plus';
import { createAuth0 } from '@auth0/auth0-vue';
import { VueReCaptcha } from 'vue-recaptcha-v3';

import './assets/css/general.css'; // Import your global CSS file here
const app = createApp(App)
.use(store)
.use(VueReCaptcha, { siteKey: '6LdFZPQoAAAAACJCmlbaF62tWu6dMkkiJgNV4pPk' })
.use(ElementPlus)
.use(
    createAuth0({
  domain: "dev-8xiktvmsg08in3i3.us.auth0.com",
  clientId: "XwBGatuPl1T2S4oy5vh2I2Pcb7UDKzjJ",
  authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  )
  
.use(router)
app.config.globalProperties.showNavigationLinks = true; // Default value
app.mount('#app')
