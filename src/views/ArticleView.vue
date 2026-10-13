<template>
  <div class="page-shell articles-page">
    <div class="page-columns">
      <main class="page-main">
        <p class="section-kicker">Journal</p>
        <h1 class="section-title">Articles</h1>
        <div v-if="normalArticle">
          <input
            type="search"
            v-model="search"
            placeholder="Chercher un article…"
            class="input-search"
            aria-label="Chercher un article"
          />
          <div class="feed">
            <articleWidget
              v-for="article in articles"
              :key="article.id"
              :article="article"
              :rubriques="rubriques"
            />
          </div>
        </div>
        <div v-else>
          <IllustrationComponent />
        </div>
        <PaginationControls
          v-if="normalArticle"
          :current-page="currentPage"
          :page-count="pageCount"
          @update:current-page="currentPage = $event"
        />
      </main>
      <aside class="page-sidebar">
        <ContactComponent />
        <BackcoverWidget />
      </aside>
    </div>
  </div>
</template>

<script>
import articleWidget from "@/widgets/articleWidget.vue";
import BackcoverWidget from "@/widgets/backcoverWidget.vue";
import ContactComponent from "@/widgets/contactComponent.vue";
import axiosInstance from "../axios.js";
import IllustrationComponent from "@/components/IllustrationComponent.vue";
import PaginationControls from "@/components/PaginationControls.vue";
export default {
  name: "ArticleView",
  components: {
    articleWidget,
    BackcoverWidget,
    ContactComponent,
    IllustrationComponent,
    PaginationControls,
  },

  watch: {
    '$route.params.rubriqueID'(newArticleId) {
      this.selectedRubriqueId = newArticleId;
      if (this.currentPage === 1) this.fetchArticles();
      else this.currentPage = 1;
    },
    search() {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        if (this.currentPage === 1) this.fetchArticles();
        else this.currentPage = 1;
      }, 250);
    },
    currentPage() {
      this.fetchArticles();
    },
  },
  computed: {
    normalArticle() {
      return this.selectedRubriqueId !== 'LLwDinc4Uh79PDLxLd9sd';
    },
  },
  methods: {
    fetchArticles() {
      if (!this.normalArticle) return;
      const params = {
        page: this.currentPage,
        pageSize: this.itemsPerPage,
      };
      if (this.selectedRubriqueId) params.rubrique = this.selectedRubriqueId;
      if (this.search.trim()) params.search = this.search.trim();

      axiosInstance
        .get("/api/publicArticles", { params })
        .then((response) => {
          this.articles = response.data.articles || [];
          this.pageCount = response.data.pageCount || 1;
          this.total = response.data.total || 0;
        })
        .catch((error) =>
          this.$message({
            message: error,
            type: "error",
            customClass: "custom-el-message",
            duration: 1000,
          })
        );
    },
  },
  mounted() {
    this.selectedRubriqueId = this.$route.params.rubriqueID;
    this.fetchArticles();
    axiosInstance
      .get("/api/getrubriques")
      .then((response) => {
        this.rubriques = response.data;
      })
      .catch((error) =>
        this.$message({
          message: error,
          type: "error",
          customClass: "custom-el-message",
          duration: 1000,
        })
      );
  },
  beforeUnmount() {
    clearTimeout(this.searchTimer);
  },
  data() {
    return {
      search: "",
      searchTimer: null,
      articles: [],
      rubriques: [],
      selectedRubriqueId: "",
      currentPage: 1,
      itemsPerPage: 5,
      pageCount: 1,
      total: 0,
    };
  },
};
</script>

<style scoped>
.articles-page {
  padding-block: var(--space-lg) var(--space-xl);
}

.input-search {
  width: 100%;
  max-width: 420px;
  margin-bottom: 1.25rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--rule);
  background: var(--surface);
  font-size: 0.95rem;
  min-height: 44px;
}

.feed {
  border-top: 1px solid var(--rule);
}
</style>
