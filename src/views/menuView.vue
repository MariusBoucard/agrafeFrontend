<template>
  <div class="baseView">
    <div class="container">
      <div class="leftColumn">
        <div class="article">
          <ArticleComponent></ArticleComponent>
          
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
import ArticleComponent from "@/components/articleComponent.vue";
import BackcoverWidget from "@/widgets/backcoverWidget.vue";
import ContactComponent from "@/widgets/contactComponent.vue";

// @ is an alias to /src

export default {
  name: "HomeView",
  components: {
    ArticleComponent,
    ContactComponent,
    BackcoverWidget,
  },
};
</script>
  <style scoped>
.baseView {
  width: 90%;
  margin: auto;
}
.menuGrid {
  display: grid;
  grid-template-columns: 70% 30%; /* 70% for the left column, 30% for the right column */
  column-gap: 20px; /* Adjust the gap as needed */
}
.container {
  gap : 30px;

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
  