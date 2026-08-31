<template>
  <div class="page-shell dossier-page">
    <div class="page-columns">
      <main class="page-main" v-if="dossier">
        <p class="section-kicker">{{ statutLabel }}</p>
        <h1 class="section-title">{{ dossier.titre }}</h1>
        <p class="description" v-if="dossier.description">{{ dossier.description }}</p>
        <div class="articles">
          <router-link
            v-for="article in articles"
            :key="article.id"
            :to="`/article/${article.id}`"
            class="article-line"
          >
            <span class="article-title">{{ article.titreFront }}</span>
            <span class="article-date">{{ article.date }}</span>
          </router-link>
          <p v-if="!articles.length" class="empty-articles">
            Aucun article publié dans ce dossier pour le moment.
          </p>
        </div>
      </main>
      <p v-else class="page-main">Chargement…</p>
      <aside class="page-sidebar">
        <ContactComponent />
        <BackcoverWidget />
      </aside>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';
import ContactComponent from '@/widgets/contactComponent.vue';
import BackcoverWidget from '@/widgets/backcoverWidget.vue';

export default {
  name: 'DossierView',
  components: { ContactComponent, BackcoverWidget },
  data() {
    return { dossier: null, articles: [] };
  },
  computed: {
    statutLabel() {
      return this.dossier?.statut === 'termine' ? 'Dossier terminé' : 'Dossier en cours';
    },
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(id) {
        if (id) this.loadDossier(id);
      },
    },
  },
  methods: {
    loadDossier(id) {
      axiosInstance.get(`/api/dossiers/${id}`).then((res) => {
        this.dossier = res.data;
        this.articles = res.data.articles || [];
      });
    },
  },
};
</script>

<style scoped>
.dossier-page {
  padding-block: var(--space-lg) var(--space-xl);
}

.description {
  margin: 0 0 var(--space-lg);
  color: var(--ink-muted);
  max-width: 40rem;
}

.articles {
  border-top: 1px solid var(--rule);
}

.article-line {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--rule);
  text-decoration: none;
  align-items: baseline;
}

.article-title {
  font-family: var(--font-quote);
  font-size: 1.15rem;
  font-weight: 700;
}

.article-date {
  color: var(--ink-muted);
  font-size: 0.85rem;
  white-space: nowrap;
}

.article-line:hover .article-title {
  text-decoration: underline;
}

.empty-articles {
  color: var(--ink-muted);
  font-style: italic;
  padding: 1.5rem 0;
}
</style>
