<template>
    <div class="container">

        <div class="left-column">
            <div class="parentDiv">
  <div class="date">
   <p>saca</p> 
    <!-- Content of the first inner div -->
  </div>
  <div class="rubrique">
    <p>
      dsqdqs
    </p>
    <!-- Content of the second inner div -->
    </div>
  <div class="author">
    <p>
      dsqdqs

    </p>
    <!-- Content of the author div -->
  </div>
  <div class="title">
    dsqdqs
    <!-- Content of the title div -->
  </div>
</div>
            <!-- Content for the left column -->
            <ul>
                <li v-for="item in article.contenu" :key="item.id" >
                  <div v-if="item.type === 'sousTitre1'" style="margin-right: 10px; width: 5%; background-color: black; padding-top: 10px; height: 30%; margin-bottom:0 ;  position: relative;transform: translateY(60%); "></div>
                  <div v-if="item.type === 'Sources'" style="display: flex;">
  <p v-for="source in data.listeSources" :key="source.id" class="source-paragraph Sources">
    <span class="source-span">
      <div class="source-dot"></div>
    </span>
    {{ source }}
  </p>
</div>
                 <div v-if="item.type === 'notesBasPage'" >
                  <ul class="footnotes-list">
  <li v-for="(foot, index) in data.footnotes" :key="foot" class="footnote-item">
    <div class="index-div">{{ index + 1 }}</div>
    <p class="footnote-text">{{ foot }}</p>
  </li>
</ul>
                </div>

                 <p v-if="item.type !== 'Sources' && item.type !== 'notesBasPage'" :class="item.type">  {{ item.text }}</p>
                  
                </li>
            </ul>
        </div>
        <div class="right-column">
            <!-- Widgets for the right column -->
            <contactComponent />
            <backcoverWidget />
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/axios';
import backcoverWidget from '@/widgets/backcoverWidget';
import contactComponent from '@/widgets/contactComponent';

export default {
    name: "ReadArticleView",
    components: {
        backcoverWidget,
        contactComponent
    },
    data() {
        return {
            article: {},
            data : {listeSources : [
              "yecouuuuu","peeettt"
            ]
          ,
        footnotes : [
          "yecouuuuu","peeettt"
        ]}
        };
    },
    props: ['articleId'],
    mounted() {
        // Get the article from the backend
        axiosInstance.get('/api/getPublicArticle/' + this.articleId)
            .then(response => {
                this.article = response.data;
            })
            .catch(error => {
                this.$message({
                    message: error,
                    type: 'error',
                    customClass: 'custom-el-message',
                    duration: 1000
                });
            });
    }
};
</script>

<style scoped>
.container {
    display: flex;
    
    
}

.left-column {
    width: 65%;
    margin-left: 5%;
}

.right-column {
    width: 30%;
}
.parentDiv {
  display: flex;
  align-items: center;
}
.parentDiv > div {
  flex: 0.1;

  text-align: center;
}

.date {
  background-color: black;
  color: white;
}
p{
  margin: 5px;

}
li{
  display: flex;
  list-style: none;
  text-align: left;
  margin-bottom: 10px;
}

.source-paragraph {
  font-size: 10px;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
}

.source-span {
  margin-right: 5px;
}

.source-dot {
  background-color: black;
  height: 5px;
  width: 5px;
  margin: auto;
}
.rubrique > p {
  
  font-family: "Bahnschrift", sans-serif;
  color : rgba(0, 0, 0, 0.6);
  /* Styles for the rubrique class */
}

.author {
  font-family: "Bahnschrift", sans-serif;
  color : rgba(0, 0, 0, 1);
  font-weight: 500;
  /* Styles for the author class */
}

.title {
  /* Styles for the title class */
  font-family: "Berlin Sans FB", sans-serif;
  color : rgba(0, 0, 0, 1);
  font-weight: bold;
}
.titre {

  font-family: "Berlin Sans FB", sans-serif !important;
  font-weight: 600;
  color: black;
  font-size: 70px;
}


.sousTitre1 {
  font-family: "Berlin Sans FB", sans-serif;
  font-weight: bold;
  color: black;

  font-size: 20px;
  font-weight: 700;
  /* Styles for the sousTitre1 type */
}

.sousTitre2 {
  font-family: "Berlin Sans FB", sans-serif;
  font-size: xx-large;
  font-weight: bolder;
  color : rgba(0, 0, 0, 0.5);
  /* Styles for the sousTitre2 type */
}

.Citation {
  font-family: "Bahnschrift", sans-serif;
  background-color: black;
  color: white;
  

  font-weight: 900;
  /* Styles for the Citation type */
}

.interTitre {
  /* Styles for the interTitre type */
}

.chapeau {
  font-family: "Bahnschrift", sans-serif;
  color : rgba(0, 0, 0, 1);
  font-weight: 500;
  /* Styles for the chapeau type */
}

.paragraphe {
  font-family: "Bahnschrift", sans-serif;
  font-weight: light;

  /* Styles for the paragraphe type */
}

.image {
  /* Styles for the image type */
}

.Sources {
  font-family: "Calibri", sans-serif;
  font-size: 10px;
  font-style: italic;
  /* Styles for the Sources type */
}

.notesBasPage {
  /* Styles for the notesBasPage type */
}
.footnotes-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
}

.footnote-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.index-div {
  background-color: black;
  color: white;
  margin-right: 10px;
  width: 20px; /* Adjust the width as needed */
  text-align: right;
}

.footnote-text {
  margin: 0;
  font-family: "Bahnschrift", sans-serif;
  font-size: 13px;
}

</style>