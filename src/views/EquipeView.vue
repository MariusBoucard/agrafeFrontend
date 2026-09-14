<template>
  <div class="baseView">
    <div class="container">
      <div class="leftColumn">
        <div v-if="user" class="profile">
          <h1 class="name">{{ user.name }}</h1>
          <p class="bio">{{ user.bio || (articles.length ? 'Auteur·ice publié·e dans L\'Agrafe' : 'Membre de l\'équipe L\'Agrafe') }}</p>
          <div v-if="socialLinks.length" class="socials">
            <a
              v-for="link in socialLinks"
              :key="link.key"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >{{ link.label }}</a>
          </div>
          <h2>Articles</h2>
          <div v-for="article in articles" :key="article.id" class="article-item">
            <router-link :to="`/article/${article.id}`">{{ article.titreFront }}</router-link>
            <span class="date">{{ article.date }}</span>
          </div>
          <p v-if="!articles.length">Aucun article publié pour le moment.</p>
        </div>
        <p v-else-if="notFound">Membre introuvable.</p>
      </div>
      <div class="rightColumn">
        <ContactComponent />
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';
import ContactComponent from '@/widgets/contactComponent.vue';
import { socialLinksList } from '@/utils/socials';

export default {
  name: 'EquipeView',
  components: { ContactComponent },
  data() {
    return { user: null, articles: [], notFound: false };
  },
  computed: {
    socialLinks() {
      return socialLinksList(this.user?.socials);
    },
  },
  watch: {
    '$route.params.slug': {
      immediate: true,
      handler(slug) { if (slug) this.loadProfile(slug); },
    },
  },
  methods: {
    loadProfile(slug) {
      this.notFound = false;
      this.user = null;
      axiosInstance.get(`/api/equipe/${slug}`)
        .then((res) => {
          this.user = res.data.user;
          this.articles = res.data.articles;
        })
        .catch(() => { this.notFound = true; });
    },
  },
};
</script>

<style scoped>
.baseView { width: 90%; margin: auto; }
.container { display: flex; flex-wrap: wrap; gap: 30px; }
.leftColumn { width: 65%; }
.rightColumn { width: 30%; }
.name { font-family: var(--font-title); }
.bio { font-family: var(--font-body); line-height: 1.6; }
.socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 1rem;
  margin: 0.75rem 0 1.25rem;
}
.social-link {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: #111;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.social-link:hover { opacity: 0.7; }
.article-item { margin: 12px 0; }
@media (max-width: 768px) {
  .container { flex-direction: column; }
  .leftColumn, .rightColumn { width: 100%; }
}
</style>
