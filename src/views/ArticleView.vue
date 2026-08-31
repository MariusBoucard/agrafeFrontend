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
              v-for="article in paginatedArticles"
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
      this.filterArticles();
    },
    search() {
      this.currentPage = 1;
    },
  },
  methods : {
    filterArticles(){
      this.selectedArticles = this.articles.filter(
          (article) => article.rubrique == this.selectedRubriqueId
        );
        this.selectedArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log("Selected articles",this.selectedRubriqueId);
        if(!this.selectedRubriqueId){
            this.selectedArticles = this.articles;
            this.selectedArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

          }
          this.currentPage = 1;
          }

         
  },
  computed: {
    filteredArticles() {
    const searchLower = this.search.toLowerCase();
    return this.selectedArticles.filter(article =>
      article.titreFront.toLowerCase().includes(searchLower) ||
      article.description.toLowerCase().includes(searchLower)
    );
  },
    normalArticle() {
    return this.selectedRubriqueId !== 'LLwDinc4Uh79PDLxLd9sd';
  },
  paginatedArticles() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredArticles.slice(start, end);
  },
  pageCount() {
    return Math.max(1, Math.ceil(this.filteredArticles.length / this.itemsPerPage));
  },
},
  mounted() {
    this.selectedRubriqueId = this.$route.params.rubriqueID;
    axiosInstance
      .get("/api/getrecentarticle")
      .then((response) => {
        this.articles = response.data;
        console.log("Got the articles",this.articles);
       this.filterArticles()
      })
      .catch((error) =>
        this.$message({
          message: error,
          type: "error",
          customClass: "custom-el-message",
          duration: 1000,
        })
      );
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
  data() {
    return {
      search : "",
      articles: [],
      rubriques: [],
      selectedRubriqueId : "",
      selectedArticles : [],
      currentPage: 1,
    itemsPerPage: 5,
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