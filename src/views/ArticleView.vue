<template>
  <div class="baseView">
    <div class="menuGrid">
      <div class="leftColumn">
        <div
          class="articleWidget"
          v-for="article in articles"
          :key="article.id"
        >
        
          <articleWidget :article="article" :rubriques="rubriques">
          </articleWidget>
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

export default {
  name: "ArticleView",
  components: {
    articleWidget,
    BackcoverWidget,
    ContactComponent,
  },
  mounted() {
    axiosInstance
      .get("/api/getrecentarticle")
      .then((response) => {
        this.articles = response.data;
        console.log("Got the articles");
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
    };
  },
};
</script>

<style scoped>
.articleWidget {
  margin-bottom: 30px;
}

.baseView {
  width: 90%;
  margin: auto;
}
.menuGrid {
  display: grid;
  grid-template-columns: 70% 30%; /* 70% for the left column, 30% for the right column */
  column-gap: 20px; /* Adjust the gap as needed */
}
</style>