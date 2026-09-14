<template>
  <div class="article-feed">
    <articleWidget
      v-for="(article, index) in paginatedArticles"
      :key="article.id"
      :article="article"
      :rubriques="rubriques"
      :reverse="index % 2 === 1"
    />
    <p v-if="!paginatedArticles.length" class="empty">Aucun article à afficher</p>
    <PaginationControls
      :current-page="currentPage"
      :page-count="pageCount"
      @update:current-page="currentPage = $event"
    />
  </div>
</template>

<script>
import articleWidget from '@/widgets/articleWidget.vue';
import axiosInstance from '../axios.js';
import PaginationControls from '@/components/PaginationControls.vue';

export default {
  components: { articleWidget, PaginationControls },
  props: {
    excludeId: { type: String, default: null },
  },
  data() {
    return {
      articles: [],
      rubriques: [],
      sortedArticles: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    filteredArticles() {
      if (!this.excludeId) return this.sortedArticles;
      return this.sortedArticles.filter((a) => a.id !== this.excludeId);
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredArticles.slice(start, start + this.itemsPerPage);
    },
    pageCount() {
      return Math.max(1, Math.ceil(this.filteredArticles.length / this.itemsPerPage));
    },
  },
  watch: {
    excludeId() {
      this.currentPage = 1;
    },
  },
  mounted() {
    axiosInstance
      .get('/api/getrecentarticle')
      .then((response) => {
        this.articles = response.data || [];
        this.sortedArticles = [...this.articles].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      })
      .catch(() => {});

    axiosInstance
      .get('/api/getrubriques')
      .then((response) => {
        this.rubriques = response.data || [];
      })
      .catch(() => {});
  },
};
</script>

<style scoped>
.article-feed {
  border-top: 1px solid var(--rule);
}

.empty {
  padding: 2rem 0;
  color: var(--ink-muted);
  font-style: italic;
}
</style>
