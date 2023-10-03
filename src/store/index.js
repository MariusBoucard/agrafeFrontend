
import { createStore } from 'vuex';
import auth from './modules/auth'; // Import the auth module
import app from './modules/app'
const store = createStore({
  modules: {
    auth, app // Add the auth module to the store
  },
});

export default store;