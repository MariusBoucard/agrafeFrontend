<template>
  <div class="baseView">
    <div class="menuGrid">
      <div class="leftColumn">
        <ArticleComponent></ArticleComponent>
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

.leftColumn {
  /* Your styles for the left column here */
}

.rightColumn {
  /* Your styles for the right column here */
}
</style>
  