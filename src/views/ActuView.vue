<template>
    <div class="baseView">
      <div class="container">
        <div class="leftColumn">
            <div class="banner">
                    <p class="titleBanner">Retrouvez ici l'actu de L'agrafe</p>
                </div>
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
    width: 80%;
    margin-left: auto;  
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
  .articleWidget{
    width: 100%;
  }}
  .titleBanner{
    width : 80%;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: auto;
    text-align: left;
  }
  .text{
    width : 80%;
    font-family: 'Bahnschrift', sans-serif;
margin-left: auto;
text-align: left;
  }
  .banner{
    font-size: x-large;
    color: white;
    background-color: black;
    width : 100%;
    margin-bottom: 20px;
  }
  </style>