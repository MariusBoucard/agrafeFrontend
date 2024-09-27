<template>
  <div class="container">
    <div class="left-column">
    
      <!-- Content for the left column -->
      <ul style="width:80%">
        // eslint-disable-next-line
        <li v-for="(item,index) in filteredContenu"   :key="item.id">
          <div v-if="item.type === 'sousTitre1'"
            style="margin-right: 10px; width: 5%; background-color: black; padding-top: 10px; height: 30%; margin-bottom:0 ;  position: relative;transform: translateY(60%); ">
          </div>
          
          <div v-if="item.type === 'image'">
            <img style="width: 70%; margin: auto; display: block;" :title="`photographe : ${item.auteur}`" :src="`${baseUrl}/api/save/saveArticle/images/${article.id}/${item.id}.png`">
            <p class="paragraphe" style="margin-top:10px" v-html="processText(item)"></p>
          </div>
          <p v-if="item.type !== 'Sources' && item.type !== 'notesBasPage' && item.type !== 'image'" :class="item.type"  :style="displayCitation(index)" v-html="processText(item,index)"></p>
          
        </li>
      </ul>
        {{ article.auteur }}
      <ul style=" width: 80%;">
        <li v-for="item in article.contenu" :key="item.id" style="margin: 0px;">
          <div v-if="item.type === 'Sources'" style="display: flex;">
            <p v-for="source in listeSources" :key="source.id" class="source-paragraph Sources">
              <span class="source-span">
                <div class="source-dot"></div>
              </span>
              {{ source }}
            </p>
          </div>
          <div v-if="item.type === 'notesBasPage'">
            <ul class="footnotes-list">
              <li v-for="(foot, index) in footnotes" :key="foot" class="footnote-item">
                <div class="index-div">{{ index + 1 }}</div>
                <p class="footnote-text">{{ foot }}</p>
              </li>
            </ul>
          </div>
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
import baseUrl from '../config';

export default {
  name: "ReadArticleView",
  components: {
    backcoverWidget,
    contactComponent
  },
  computed: {
    filteredContenu() {
      if(this.article.contenu === undefined){
        return [];
      }
      return this.article.contenu.filter((item, index) => !this.displayCitation(index));
    },
  
    listeSources() {
      const found = this.article.contenu.find(item => item.type === 'Sources');
      if (found) {
        var list = found.text.split('\n\n').map(item => item.trim());
        return list;
      }
      return []
    },
    footnotes() {
      const found = this.article.contenu.find(item => item.type === 'notesBasPage');
      if (found) {
        var list = found.text.split('\n\n').map(item => item.trim());
        return list;
      }
      return []
    }
  },
  data() {
    return {
      article: {},
      rubriques: [],
      baseUrl : baseUrl

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
      axiosInstance.get('/api/getrubriques').then(response => {
            this.rubriques = response.data
        }).catch(error => 
        this.$message({
              message: error,
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            })      )
  },
  methods : {
    processText(item,index){
        if(index >0 && index < this.article.contenu.length - 2){
          if(item.type === "paragraphe" && this.article.contenu[index + 1]?.type === "Citation" && this.article.contenu[index + 2]?.type === "paragraphe"){
            return null;
            // return item.text
          }
          if(item.type === "Citation" && this.article.contenu[index - 1]?.type === "paragraphe" && this.article.contenu[index + 1]?.type === "paragraphe"){
            // return item.text

            return null;

          }
          if(item.type === "paragraphe" && this.article.contenu[index - 1]?.type === "Citation" && this.article.contenu[index - 2]?.type === "paragraphe"){
            // Return catenation of the three text with their styles applied;
            return `<span class="${this.article.contenu[index - 2].type}" >${this.article.contenu[index - 2].text}</span>` +
       `<span class="${this.article.contenu[index - 1].type}" style="color: white; background-color: black;">${this.article.contenu[index - 1].text}</span>` +
       `<span class="${item.type}" >${item.text}</span>`;      }

          // return item.text;
        }
        let text = item.text;
        text = text.replace(/\*(\d+)\*/g, '<sup>$1</sup>');
        return text;
      
    
    },
    displayCitation(i){
      console.log(i);
      if(i < this.article.contenu.length - 2 && i > 0){
        if(this.article.contenu[i].type === "paragraphe" && this.article.contenu[i + 1]?.type === "Citation" && this.article.contenu[i + 2]?.type === "paragraphe"){
          console.log("display: none");
          return true
          // return "display: none !important";
        }
        if(this.article.contenu[i].type === "Citation" && this.article.contenu[i - 1]?.type === "paragraphe" && this.article.contenu[i + 1]?.type === "paragraphe"){
          return true
          // return "display: none !important";
        }
        return false
      }
    
      // Doit dire si on se display ou non : return css
    },
    // parseCitations(i){
    //   // Si fin display tarba
    //   // Doit dire si on se display ou non : return css
    //   this.article.contenu[i].type = "paragraph";

    //   this.article.contenu[i].text = this.article.contenu[i].text.replace(/\*(\d+)\*/g, '<sup>$1</sup>');
    // },
    rubriqueFromId(id){
      const found = this.rubriques.find(rubrique => rubrique.id === id);
      if(found){
        return found.rubrique;
      }
      return "";
    }
  
  }
};
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;

}

.left-column {
  width: 65%;
  margin-left: 5%;
}

.right-column {
  width: 25%;
}

.parentDiv {
  width: 80%;
  display: flex;
  align-items: center;
}

.parentDiv>div {
  flex: 0.1;

  text-align: center;
}

.date {
  background-color: black;
  color: white;
}

p {
  margin: 5px;

}

li {
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

.rubrique>p {

  font-family: "Bahnschrift", sans-serif;
  color: rgba(0, 0, 0, 0.6);
  /* Styles for the rubrique class */
}

.author {
  font-family: "Bahnschrift", sans-serif;
  color: rgba(0, 0, 0, 1);
  font-weight: 500;
  /* Styles for the author class */
}

.title {
  /* Styles for the title class */
  font-family: "Berlin Sans FB", sans-serif;
  color: rgba(0, 0, 0, 1);
  font-weight: bold;
}

.titre {
  font-family: "Berlin Sans FB", sans-serif !important;
  font-weight: 600;
  color: black;
  font-size: 50px;
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
  color: rgba(0, 0, 0, 0.5);
  /* Styles for the sousTitre2 type */
}

.Citation {
  font-family: "Bahnschrift", sans-serif;
  background-color: black !important;
  color: white !important;


  font-weight: 900;
  /* Styles for the Citation type */
}

.interTitre {
  /* Styles for the interTitre type */
}

.chapeau {
  font-family: "Bahnschrift", sans-serif;
  color: rgba(0, 0, 0, 1);
  font-weight: 500;
  font-size: x-large;
  /* Styles for the chapeau type */
}

.paragraphe {
  font-family: "Bahnschrift", sans-serif;
  font-weight: light;
  text-align: justify; /* Justify the text */
  font-size: large;
  /* color : black !important;
  background-color: white !important; */
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
  width: 20px;
  /* Adjust the width as needed */
  text-align: right;
}

.footnote-text {
  margin: 0;
  font-family: "Bahnschrift", sans-serif;
  font-size: 13px;
}</style>