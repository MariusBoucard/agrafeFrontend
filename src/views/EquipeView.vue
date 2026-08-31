<template>
  <div class="baseView">
    <div class="container">
      <div class="leftColumn">
        <div v-if="user" class="profile">
          <h1 class="name">{{ user.name }}</h1>
          <p class="bio">{{ user.bio || (articles.length ? 'Auteur·ice publié·e dans L\'Agrafe' : 'Membre de l\'équipe L\'Agrafe') }}</p>
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

export default {
  name: 'EquipeView',
  components: { ContactComponent },
  data() {
    return { user: null, articles: [], notFound: false };
  },
  watch: {
    '$route.params.slug': {
      immediate: true,
      handler(slug) { if (slug) this.loadProfile(slug); },
    },
  },
  methods: {
    loadProfile(slug) {
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
.article-item { margin: 12px 0; }
@media (max-width: 768px) {
  .container { flex-direction: column; }
  .leftColumn, .rightColumn { width: 100%; }
}
</style>
