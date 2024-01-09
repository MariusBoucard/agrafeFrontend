<template>
  <div class="baseView">
    <div class="container">
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
.container {
  display: flex;
  flex-wrap: wrap;
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