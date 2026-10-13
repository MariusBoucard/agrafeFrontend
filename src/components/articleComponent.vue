<template>
  <div class="article-feed">
    <articleWidget
      v-for="(article, index) in articles"
      :key="article.id"
      :article="article"
      :rubriques="rubriques"
      :reverse="index % 2 === 1"
    />
    <p v-if="!articles.length" class="empty">Aucun article à afficher</p>
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
      currentPage: 1,
      itemsPerPage: 5,
      pageCount: 1,
    };
  },
  watch: {
    excludeId() {
      if (this.currentPage === 1) this.fetchArticles();
      else this.currentPage = 1;
    },
    currentPage() {
      this.fetchArticles();
    },
  },
  methods: {
    fetchArticles() {
      const params = {
        page: this.currentPage,
        pageSize: this.itemsPerPage,
      };
      if (this.excludeId) params.excludeId = this.excludeId;

      axiosInstance
        .get('/api/publicArticles', { params })
        .then((response) => {
          this.articles = response.data.articles || [];
          this.pageCount = response.data.pageCount || 1;
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.fetchArticles();

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
