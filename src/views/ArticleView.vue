<template>
  <div class="baseView">
    <div class="container">
      <div class="leftColumn">
<div v-if="normalArticle">

  <div 
  class="articleWidget"
  v-for="article in paginatedArticles"
  :key="article.id"
  >
  
  <articleWidget :article="article" :rubriques="rubriques">
  </articleWidget>
  
</div>

</div>
<div v-if="! normalArticle">
 <IllustrationComponent></IllustrationComponent>
</div>
        <div  v-if=" normalArticle" class="pagination-container">
    <button class="pagination-button" @click="currentPage--" :disabled="currentPage <= 1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
</svg>

    </button>
    <p class="pagination-text">{{ currentPage }}/{{ pageCount }}</p>
    <button class="pagination-button" @click="currentPage++" :disabled="currentPage >= pageCount">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
</svg>

    </button>
  </div>
      </div>
      <div class="rightColumn">
        <ContactComponent></ContactComponent>
        <BackcoverWidget></BackcoverWidget>
      </div>
    </div>
  </div>
</template>

<script>
import articleWidget from "@/widgets/articleWidget.vue";
import BackcoverWidget from "@/widgets/backcoverWidget.vue";
import ContactComponent from "@/widgets/contactComponent.vue";
import axiosInstance from "../axios.js";
import IllustrationComponent from "@/components/IllustrationComponent.vue";
export default {
  name: "ArticleView",
  components: {
    articleWidget,
    BackcoverWidget,
    ContactComponent,
    IllustrationComponent
  },

  watch: {
    '$route.params.rubriqueID'(newArticleId) {
      console.log(newArticleId)
      this.selectedRubriqueId = newArticleId;
      this.filterArticles();
    }
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
    normalArticle() {
      console.log("caca",this.selectedRubriqueId === 'LLwDinc4Uh79PDLxLd9sd' ? false: true)
    return this.selectedRubriqueId === 'LLwDinc4Uh79PDLxLd9sd' ? false: true;
  },
  paginatedArticles() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.selectedArticles.slice(start, end);
  },
  pageCount() {
    return Math.ceil(this.selectedArticles.length / this.itemsPerPage);
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
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.pagination-button {
  width: 5%;
  background-color: rgb(0, 0, 0);
  color: white;
  border: none;
  border-radius: 10px;
  /* Add your styles for the buttons here */
}

.pagination-text {
  /* Add your styles for the text here */
  margin: 0 1em; /* Add some horizontal margin around the text */
}
.articleWidget {
  margin-bottom: 30px;
}

.baseView {
  width: 90%;
  margin: auto;
}
.container {
  display: flex;
  flex-wrap: wrap;
  gap : 30px;
}

.leftColumn {
  width : 65%
  /* Your styles for the left column here */
}

.rightColumn {
  width: 30%;
  /* Your styles for the right column here */
}
.article{
  width: 80%;
  margin-left: auto;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  .leftColumn {
    width: 100%;
  }
  .rightColumn {
    width: 100%;
  }
  .article{
    width: 100%;
  }}
</style>