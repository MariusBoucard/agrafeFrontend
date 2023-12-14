<template>
    <div class="baseView">
      <div class="menuGrid">
        <div class="leftColumn">
            <div class="banner">
                <p>Retrouvez ici l'actu de L'agrafe</p>
            </div>
            {{ this.actus }}
          <div
            class="articleWidget"
            v-for="article in actus"
            :key="article.id"
        >
                 <ActuWidget :actu="article" >
                 </ActuWidget>
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
  import BackcoverWidget from "@/widgets/backcoverWidget.vue";
  import ContactComponent from "@/widgets/contactComponent.vue";
  import axiosInstance from "../axios.js";
import ActuWidget from "@/widgets/actuWidget.vue";
  
  export default {
    name: "ArticleView",
    components: {
    BackcoverWidget,
    ContactComponent,
    ActuWidget
},
    mounted() {
      axiosInstance
        .get("/api/getPublicNews")
        .then((response) => {
          this.actus = response.data;
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
     
    },
    data() {
      return {
        actus: [],
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
  .banner{
    color: white;
    background-color: black;
    width : 100%;
  }
  </style>