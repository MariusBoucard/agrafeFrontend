<template>
    <div> 
        <NavbarComponent></NavbarComponent>
        <div class="container">
    <div class="left-column">
        <MenuComponent :selectedComponent="activeComponent" @componentChanged="setComponent($event)"></MenuComponent>
      <!-- Content for the left column -->
    </div>
    <div class="right-column">
      <DashboardComponent  v-if="activeComponent.dashboard"></DashboardComponent>
      <!-- Content for the right column -->
      <modifyArticle v-if="activeComponent.modifyArticle" :id="articleId" @componentChanged="setComponent($event)"></modifyArticle>
      <RegisterComponent v-if="activeComponent.register">   </RegisterComponent>
      <ArticlesComponent @componentChanged="setComponent($event)" @modifyArticle="modifyArticle($event)" v-if="activeComponent.article"></ArticlesComponent>
      <CreateArticle v-if="activeComponent.createArticle" @componentChanged="setComponent($event)"></CreateArticle>
      <NewsletterComponent v-if="activeComponent.newsletter"></NewsletterComponent>
      <newsComponent v-if="activeComponent.news" @componentChanged="setComponent($event)" @modifyNews="setComponent($event)"></newsComponent>
      <CreateNewsComponent @componentChanged="setComponent($event)" v-if="activeComponent.createNews"></CreateNewsComponent>
      <rubriquesComponent v-if="activeComponent.rubrique"></rubriquesComponent>

      <ArchiveComponent v-if="activeComponent.archive" @componentChanged="setComponent($event)"></ArchiveComponent>
      <createArchive v-if="activeComponent.createArchive" @componentChanged="setComponent($event)"></createArchive>
      <FocalComponent v-if="activeComponent.focal" @componentChanged="setComponent($event)"></FocalComponent>
      <CreateFocalComponent v-if="activeComponent.createFocal" @componentChanged="setComponent($event)"></CreateFocalComponent>
      <propositionArticleComponent v-if="activeComponent.propalArticle" @componentChanged="setComponent($event)"></propositionArticleComponent>
    </div>
  </div>
    </div>
</template>
<script>
import ArticlesComponent from './articlesComponent.vue';
import CreateArticle from './createArticle.vue';
import MenuComponent from './menuComponent.vue';
import NavbarComponent from './navbarComponent.vue';
import RegisterComponent from './registerComponent.vue';
import modifyArticle from './modifyArticle.vue';
import NewsletterComponent from './newsletterComponent.vue';
import newsComponent from './newsComponent.vue';
import CreateNewsComponent from './createNewsComponent.vue';
import rubriquesComponent from './rubriquesComponent.vue';
import DashboardComponent from './dashboardComponent.vue';
import ArchiveComponent from './archiveComponent.vue';
import createArchive from './createArchive.vue';
import FocalComponent from './focaleComponent.vue';
import CreateFocalComponent from './createFocaleComponent.vue';
import propositionArticleComponent from './propositionArticleComponent.vue';
export default{
    components: { propositionArticleComponent, createArchive, rubriquesComponent, newsComponent, NavbarComponent, MenuComponent, RegisterComponent, ArticlesComponent, CreateArticle, modifyArticle, NewsletterComponent, CreateNewsComponent, DashboardComponent, ArchiveComponent, FocalComponent, CreateFocalComponent },
   
    data(){
        return {
            activeComponent: {
                dashboard: true,
                register: false,
                article: false,
                archive: false,
                createArchive : false,
                newsletter: false,
                news: false,
                createArticle : false,
                createNews : false,
                modifyNews : false,
                rubrique : false,
                focal : false,
                createFocal : false,
                propalArticle : false
            },
            articleId : ""
        }

    }, methods : {
      modifyArticle(id){
        this.articleId = id
        this.setComponent("modifyArticle")
      },
        setComponent(compo){
            for (const key in this.activeComponent) {
                    this.activeComponent[key] = false;
            }
            this.activeComponent[compo] = true
        
        }
    }
    
}
</script>
<style>
/* Apply CSS reset to remove default padding and margin */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Create a container for the two columns */
.container {
  display: flex;
}

/* Style the left column */
.left-column {
  width: 20%;
  background-color: #ccc; /* Add your desired background color */
  /* You can also add padding, margin, or other styles as needed */
}

/* Style the right column */
.right-column {
  width: 80%;
  background-color: #f0f0f0; /* Add your desired background color */
  /* You can also add padding, margin, or other styles as needed */
}
</style>