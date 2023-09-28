
import { createStore } from 'vuex';
import auth from './modules/auth'; // Import the auth module

const store = createStore({
  modules: {
    auth, // Add the auth module to the store
  },
});

export default store;