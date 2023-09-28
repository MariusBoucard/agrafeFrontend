import { createRouter, createWebHistory } from 'vue-router'
import HomePute from '../components/HomePute.vue'
// import { isAuthenticated } from './Auth0'; // Import the isAuthenticated function
import store from '../store/index.js'; // Import your Vuex store
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePute
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/AboutPute.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../components/AdminPute.vue'),
    meta: { requiresAuth: true } // Add a meta field to indicate authentication requirement
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
    console.log(isAuthenticated)
    console.log("ta mere")
      if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    // Redirect unauthenticated users to a login page or another route
    next('/login');
  } else {
    console.log("ca pass ezzz")
    next();
  }
});


export default router
