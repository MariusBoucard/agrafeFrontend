import { createRouter, createWebHistory } from 'vue-router'
import menuView from '../views/menuView.vue'
import ArticleView from '../views/ArticleView.vue'
import ArchiveView from '../views/ArchiveView.vue'
import ActuView from '../views/ActuView.vue'
import AProposView from '../views/AProposView.vue'
import proposerArticleView from '../views/proposerArticleView.vue'
import FocaleView from '../views/FocaleView.vue'
import ArchiveLectureView from '../views/ArchiveLectureView.vue'
import NewsletterView from '../views/NewsletterView.vue'
import axios from 'axios'

import { useStore } from 'vuex'; // Import useStore from Vuex
// import { isAuthenticated } from './Auth0'; // Import the isAuthenticated function
const routes = [
  {
    path: '/',
    name: 'home',
    component: menuView,
    meta: {        hideNavigationLinks: false ,
      title: 'L\'Agrafe - Journal'
    },


  },
  {
    path: '/articles',
    name: 'articles',
    component: ArticleView,
    meta: {        hideNavigationLinks: false,
      title: 'L\'Agrafe - Articles'

    } // Add a meta field to indicate authentication requirement
  },
  {
    path: '/articles/:rubriqueID',
    name: 'articlesRubrique',
    component: ArticleView,
    meta: { hideNavigationLinks: false,
      title: 'L\'Agrafe - Articles'
    } // Add a meta field to indicate authentication requirement
  },
  {
    path: '/focale',
    name: 'focale',
    component: FocaleView,
    meta: { hideNavigationLinks: false,
      title: 'L\'Agrafe - Focale'
    } // Add a meta field to indicate authentication requirement
  },
  {
    path: '/archives',
    name: 'archives',
    component: ArchiveView,
    meta: {        hideNavigationLinks: false,
      title: 'L\'Agrafe - Archives'
    } 
  },
  {
    path: '/archives/:id',
    name: 'archiveLecture',
    component: ArchiveLectureView,
    meta: {        hideNavigationLinks: false,
      title: 'L\'Agrafe - Archives'
    } 
  },
  {
    path: '/actualite',
    name: 'actualite',
    component: ActuView,
    meta: {        hideNavigationLinks: false,
      title: 'L\'Agrafe - Actualité'
    } 
  },
  {
    path: '/apropos',
    name: 'apropos',
    component: AProposView,
    meta: {        hideNavigationLinks: false,
      title: 'L\'Agrafe - A propos'
    } 
  },
  {
    path: '/proposerArticle',
    name: 'proposerArticle',
    component: proposerArticleView,
    meta: {        hideNavigationLinks: false,
      title: 'L\'Agrafe - Proposer un article'
    } 
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "admin" */ '../components/loginComponent.vue'),
    // meta: { requiresAuth: true } // Add a meta field to indicate authentication requirement
  },

  
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../components/admin/adminHome.vue'),
    meta: { requiresAuth: true,       hideNavigationLinks: true } // Add a meta field to indicate authentication requirement
  },
  {
    path: '/admin/register',
    name: 'admin/register',
    component: () => import(/* webpackChunkName: "admin" */ '../components/admin/registerComponent.vue'),
    // meta: { requiresAuth: true } // Add a meta field to indicate authentication requirement
  },

 

  
  {
    path: '/newsletter',
    name: 'newsletter',
    component: NewsletterView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// Global navigation guard
router.beforeEach((to, from, next) => {
  const store = useStore(); // Access the Vuex store
  console.log(store)
  // Set showNavigationLinks based on the hideNavigationLinks meta field
  console.log(to.meta.hideNavigationLinks)
  store.commit('app/toggleNavigationLinks', !to.meta.hideNavigationLinks);
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Retrieve the token from localStorage or sessionStorage
    const token = sessionStorage.getItem('token');

    // Check if the token exists
    if (!token) {
      // Redirect to the login page or handle unauthorized access as needed
      next('/login');
    } else {
      // Include the token in the request headers using Axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      next();
    }
  } else {
    // If the route does not require authentication, proceed to the route
    next();
  }
});



export default router
