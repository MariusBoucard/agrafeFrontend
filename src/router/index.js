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
import MentionsLegalesView from '../views/MentionsLegalesView.vue'
import ReadArticleView from '../views/ReadArticleView.vue'
import DossierView from '../views/DossierView.vue'
import EquipeView from '../views/EquipeView.vue'
import axios from 'axios'

import { useStore } from 'vuex'; // Import useStore from Vuex
// import { isAuthenticated } from './Auth0'; // Import the isAuthenticated function
const routes = [
  {
    path: '/',
    name: 'home',
    component: menuView,
    meta: {        hideNavigationLinks: false ,
      title: 'L\'agrafe - Journal'
    },


  },
  {
    path: '/articles',
    name: 'articles',
    component: ArticleView,
    meta: {        hideNavigationLinks: false,
      title: 'L\'agrafe - Articles'

    } // Add a meta field to indicate authentication requirement
  },
  {
    path: '/articles/:rubriqueID',
    name: 'articlesRubrique',
    component: ArticleView,
    meta: { hideNavigationLinks: false,
      title: 'L\'agrafe - Articles'
    } // Add a meta field to indicate authentication requirement
  },
  {
    path: '/mentions-legales',
    name: 'mentionsLegales',
    component: MentionsLegalesView,
    meta: {
      hideNavigationLinks: false,
      title: "L'agrafe - Mentions légales"
    }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: ReadArticleView,
    props: true, // Enable passing route params as props
    meta: { hideNavigationLinks: false,
      title: 'L\'agrafe - Articles'
    } // Add a meta field to indicate authentication requirement
  },
  {
    path: '/focale',
    name: 'focale',
    component: FocaleView,
    meta: { hideNavigationLinks: false, 
      title: 'L\'agrafe - Focale'
    } // Add a meta field to indicate authentication requirement
  },
  {
    path: '/archives',
    name: 'archives',
    component: ArchiveView,
    meta: {        hideNavigationLinks: false,
      title: 'L\'agrafe - Archives'
    } 
  },
  {
    path: '/archives/:id',
    name: 'archiveLecture',
    component: ArchiveLectureView,
    meta: {        hideNavigationLinks: false,
      title: 'L\'agrafe - Archives'
    } 
  },
  {
    path: '/actualite',
    name: 'actualite',
    component: ActuView,
    meta: {        hideNavigationLinks: false,
      title: 'L\'agrafe - Actualité'
    } 
  },
  {
    path: '/apropos',
    name: 'apropos',
    component: AProposView,
    meta: {        hideNavigationLinks: false,
      title: 'L\'agrafe - A propos'
    } 
  },
  {
    path: '/proposerArticle',
    name: 'proposerArticle',
    component: proposerArticleView,
    meta: {        hideNavigationLinks: false,
      title: 'L\'agrafe - Proposer un article'
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
    meta: { requiresAuth: true, requiresAdmin: true, hideNavigationLinks: true },
  },

 

  
  {
    path: '/dossiers/:id',
    name: 'dossier',
    component: DossierView,
    meta: { hideNavigationLinks: false, title: "L'agrafe - Dossier" }
  },
  {
    path: '/equipe/:slug',
    name: 'equipe',
    component: EquipeView,
    meta: { hideNavigationLinks: false, title: "L'agrafe - Équipe" }
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
  const store = useStore();
  store.commit('app/toggleNavigationLinks', !to.meta.hideNavigationLinks);

  const token = sessionStorage.getItem('token');
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth) {
    if (!token) {
      next('/login');
      return;
    }
    axios.defaults.headers.common['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    store.dispatch('auth/hydrateFromSession');
    next();
    return;
  }

  next();
});



export default router
