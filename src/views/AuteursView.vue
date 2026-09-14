<template>
  <div class="baseView">
    <div class="container">
      <div class="leftColumn">
        <header class="page-head">
          <h1>Nos auteurs</h1>
          <p>Les plumes publiées dans L'Agrafe — cliquez pour ouvrir leur portfolio.</p>
        </header>

        <p v-if="loading" class="state">Chargement…</p>
        <p v-else-if="error" class="state">Impossible de charger la liste des auteurs.</p>
        <p v-else-if="!authors.length" class="state">Aucun auteur pour le moment.</p>

        <ul v-else class="authors-list">
          <li v-for="author in authors" :key="author.slug">
            <router-link :to="`/equipe/${author.slug}`" class="author-card">
              <div class="author-main">
                <h2>{{ author.name }}</h2>
                <p v-if="author.bio" class="bio">{{ truncatedBio(author.bio) }}</p>
                <p v-else class="bio muted">Auteur·ice publié·e dans L'Agrafe</p>
              </div>
              <div class="author-meta">
                <span>{{ author.articleCount }} article{{ author.articleCount > 1 ? 's' : '' }}</span>
                <span class="cta">Voir le portfolio →</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="rightColumn">
        <ContactComponent />
        <BackcoverWidget />
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';
import ContactComponent from '@/widgets/contactComponent.vue';
import BackcoverWidget from '@/widgets/backcoverWidget.vue';

export default {
  name: 'AuteursView',
  components: { ContactComponent, BackcoverWidget },
  data() {
    return {
      authors: [],
      loading: true,
      error: false,
    };
  },
  mounted() {
    axiosInstance
      .get('/api/auteurs')
      .then((r) => {
        this.authors = r.data?.authors || [];
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    truncatedBio(bio) {
      const text = String(bio || '').trim();
      if (text.length <= 140) return text;
      return `${text.slice(0, 137).trim()}…`;
    },
  },
};
</script>

<style scoped>
.baseView { width: 90%; margin: auto; }
.container { display: flex; flex-wrap: wrap; gap: 30px; }
.leftColumn { width: 65%; text-align: left; }
.rightColumn { width: 30%; }
.page-head h1 {
  margin: 0 0 0.35rem;
  font-family: var(--font-title);
  font-size: clamp(1.6rem, 3vw, 2.1rem);
}
.page-head p {
  margin: 0 0 1.5rem;
  font-family: var(--font-body);
  color: #555;
  line-height: 1.5;
}
.state {
  font-family: var(--font-body);
  color: #666;
}
.authors-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid #ddd;
}
.author-card {
  display: flex;
  justify-content: space-between;
  gap: 1.25rem;
  align-items: flex-start;
  padding: 1.1rem 0;
  border-bottom: 1px solid #ddd;
  text-decoration: none;
  color: inherit;
}
.author-card:hover .cta,
.author-card:hover h2 {
  text-decoration: underline;
  text-underline-offset: 3px;
}
.author-main { min-width: 0; flex: 1; }
.author-main h2 {
  margin: 0 0 0.35rem;
  font-family: var(--font-title);
  font-size: 1.25rem;
  font-weight: normal;
}
.bio {
  margin: 0;
  font-family: var(--font-body);
  line-height: 1.5;
  color: #333;
  font-size: 0.95rem;
}
.bio.muted { color: #777; }
.author-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: #555;
  white-space: nowrap;
  flex-shrink: 0;
}
.cta { color: #111; font-weight: 600; }
@media (max-width: 768px) {
  .container { flex-direction: column; }
  .leftColumn, .rightColumn { width: 100%; }
  .author-card {
    flex-direction: column;
    gap: 0.65rem;
  }
  .author-meta { align-items: flex-start; }
}
</style>
