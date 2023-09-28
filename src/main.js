import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createAuth0 } from '@auth0/auth0-vue';
createApp(App)
.use(store)
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
.mount('#app')
