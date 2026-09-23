<template>
  <div class="container page-shell">
    <div class="left-column">
      <ul class="ull">
        <li v-for="(item,index) in article.contenu" :style="{ display : displayCitation(index) }"  :key="item.id">
          <div v-if="item.type === 'sousTitre1'" class="subtitle-bar"></div>
          
          <div v-if="item.type === 'image'" class="article-image">
            <div class="image-wrap">
              <img
                :src="`${baseUrl}/api/save/saveArticle/images/${article.id}/${item.id}.png`"
                :alt="photoCredit(item) ? `Photo : ${photoCredit(item)}` : ''"
              >
              <span v-if="photoCredit(item)" class="image-credit-hover">{{ photoCredit(item) }}</span>
            </div>
            <p v-if="photoCredit(item)" class="image-credit">Photo : {{ photoCredit(item) }}</p>
            <p class="paragraphe image-caption" v-if="item.text" v-html="processText(item)"></p>
          </div>
          <p v-if="item.type !== 'Sources' && item.type !== 'notesBasPage' && item.type !== 'image'" :class="item.type" :style="{ display : displayCitation(index) }"  v-html="processText(item,index)"></p>
          
        </li>
      </ul>
      <p class="author" v-if="article.auteur">
        <template v-if="article.authorSlug">
          par
          <router-link class="author-link" :to="`/equipe/${article.authorSlug}`">
            {{ article.auteur }}
          </router-link>
          — <router-link class="portfolio-link" :to="`/equipe/${article.authorSlug}`">voir le portfolio</router-link>
        </template>
        <template v-else>par {{ article.auteur }}</template>
      </p>
      <ul class="meta-list">
        <li v-for="item in article.contenu" :key="item.id" class="meta-item">
          <div v-if="item.type === 'Sources'" class="sources-row">
            <p v-for="source in listeSources" :key="source.id" class="source-paragraph Sources">
              <span class="source-span">
                <span class="source-dot"></span>
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
    <aside class="right-column">
      <contactComponent />
      <backcoverWidget />
    </aside>
  </div>
</template>

<script>
import axiosInstance from '@/axios';
import backcoverWidget from '@/widgets/backcoverWidget';
import contactComponent from '@/widgets/contactComponent';
import baseUrl from '../config';
import { photoCredit as creditFromItem } from '@/utils/imageCredit';

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
    photoCredit(item) {
      return creditFromItem(item);
    },
    /* eslint-disable */
    processText(item,index){
        if(index >0 && index < this.article.contenu.length - 2){
          if(item.type === "paragraphe" && this.article.contenu[index + 1]?.type === "Citation" && this.article.contenu[index + 2]?.type === "paragraphe"){
            return null;
          }
          if(item.type === "Citation" && this.article.contenu[index - 1]?.type === "paragraphe" && this.article.contenu[index + 1]?.type === "paragraphe"){
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
          return "none";
        }
        if(this.article.contenu[i].type === "Citation" && this.article.contenu[i - 1]?.type === "paragraphe" && this.article.contenu[i + 1]?.type === "paragraphe"){
          return "none"
        }
        return "block";
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
  gap: clamp(1rem, 3vw, 2rem);
  padding-block: var(--space-lg, 2rem);
  box-sizing: border-box;
  max-width: 100%;
  overflow-x: clip;
}

.left-column {
  flex: 1 1 0;
  min-width: 0;
  max-width: 100%;
}

.right-column {
  flex: 0 0 min(260px, 28%);
  min-width: 0;
  max-width: 100%;
}

.ull,
.meta-list {
  width: 100%;
  max-width: 42rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.meta-item {
  margin: 0;
}

.subtitle-bar {
  flex: 0 0 0.55rem;
  align-self: stretch;
  min-height: 1.5rem;
  margin-right: 0.65rem;
  margin-top: 0.35rem;
  background-color: black;
}

.parentDiv {
  width: 100%;
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

p {
  margin: 5px;
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
}

li {
  display: flex;
  list-style: none;
  text-align: left;
  margin-bottom: 10px;
  min-width: 0;
  max-width: 100%;
}

.sources-row {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
  min-width: 0;
}

.source-paragraph {
  font-size: 10px;
  margin-bottom: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
  min-width: 0;
}

.source-span {
  flex-shrink: 0;
  margin-top: 0.35rem;
}

.source-dot {
  display: block;
  background-color: black;
  height: 5px;
  width: 5px;
}

.rubrique > p {
  font-family: "Bahnschrift", sans-serif;
  color: rgba(0, 0, 0, 0.6);
}

.author {
  font-family: "Bahnschrift", sans-serif;
  color: rgba(0, 0, 0, 1);
  font-weight: 500;
  margin: 1.25rem 0 0.5rem;
  max-width: 42rem;
  overflow-wrap: anywhere;
  word-break: break-word;
  line-height: 1.45;
}

.author-link,
.portfolio-link {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.author-link:hover,
.portfolio-link:hover {
  opacity: 0.7;
}

.article-image {
  width: 100%;
  min-width: 0;
}

.image-wrap {
  position: relative;
  width: min(100%, 28rem);
  margin: 0 auto;
  display: block;
}

.image-wrap img {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
}

.image-credit-hover {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.55rem 0.75rem;
  background: rgba(0, 0, 0, 0.72);
  color: #fff;
  font-family: var(--font-body, Bahnschrift, sans-serif);
  font-size: 0.85rem;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.image-wrap:hover .image-credit-hover {
  opacity: 1;
}

.image-credit {
  width: min(100%, 28rem);
  margin: 0.45rem auto 0;
  font-family: var(--font-body, Bahnschrift, sans-serif);
  font-size: 0.85rem;
  color: #555;
  text-align: left;
}

.image-caption {
  width: min(100%, 28rem);
  margin: 0.35rem auto 0;
}

.title {
  font-family: "Berlin Sans FB", sans-serif;
  color: rgba(0, 0, 0, 1);
  font-weight: bold;
}

.titre {
  font-family: "Berlin Sans FB", sans-serif !important;
  font-weight: 600;
  color: black;
  font-size: clamp(1.75rem, 6vw, 3.125rem);
  line-height: 1.15;
  overflow-wrap: anywhere;
}

.sousTitre1 {
  font-family: "Berlin Sans FB", sans-serif;
  font-weight: 700;
  color: black;
  font-size: clamp(1.1rem, 3.5vw, 1.25rem);
  min-width: 0;
  flex: 1;
}

.sousTitre2 {
  font-family: "Berlin Sans FB", sans-serif;
  font-size: clamp(1.35rem, 4vw, 1.75rem);
  font-weight: bolder;
  color: rgba(0, 0, 0, 0.5);
}

.Citation {
  font-family: "Bahnschrift", sans-serif;
  background-color: black !important;
  color: white !important;
  font-weight: 900;
}

.chapeau {
  font-family: "Bahnschrift", sans-serif;
  color: rgba(0, 0, 0, 1);
  font-weight: 500;
  font-size: clamp(1.1rem, 3.5vw, 1.35rem);
}

.paragraphe {
  font-family: "Bahnschrift", sans-serif;
  font-weight: 300;
  text-align: justify;
  font-size: clamp(1rem, 2.8vw, 1.125rem);
  hyphens: auto;
}

.Sources {
  font-family: "Calibri", sans-serif;
  font-size: 10px;
  font-style: italic;
}

.footnotes-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.footnote-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  min-width: 0;
}

.index-div {
  background-color: black;
  color: white;
  margin-right: 10px;
  width: 20px;
  flex-shrink: 0;
  text-align: right;
}

.footnote-text {
  margin: 0;
  font-family: "Bahnschrift", sans-serif;
  font-size: 13px;
  min-width: 0;
  overflow-wrap: anywhere;
}

@media (max-width: 900px) {
  .container {
    flex-direction: column;
  }

  .left-column,
  .right-column {
    flex: 1 1 auto;
    width: 100%;
    max-width: 100%;
  }

  .image-wrap,
  .image-credit,
  .image-caption {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .container {
    gap: 1.25rem;
    padding-block: 1.25rem;
  }

  .paragraphe {
    text-align: left;
  }

  .ull > li {
    flex-wrap: wrap;
  }

  .subtitle-bar {
    min-height: 1.25rem;
  }
}
</style>