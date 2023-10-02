<template>
    <div> 
        <NavbarComponent></NavbarComponent>
        <div class="container">
    <div class="left-column">
        <MenuComponent :selectedComponent="activeComponent" @componentChanged="setComponent($event)"></MenuComponent>
      <!-- Content for the left column -->
    </div>
    <div class="right-column">
    <ModifyArticle></ModifyArticle>
      <!-- Content for the right column -->
      <modifyArticle v-if="activeComponent.modifyArticle" :id="articleId"></modifyArticle>
      <RegisterComponent v-if="activeComponent.register">   </RegisterComponent>
      <ArticlesComponent @componentChanged="setComponent($event)" @modifyArticle="modifyArticle($event)" v-if="activeComponent.article"></ArticlesComponent>
      <CreateArticle v-if="activeComponent.createArticle"></CreateArticle>
      <NewsletterComponent v-if="activeComponent.newsletter"></NewsletterComponent>
      <newsComponent v-if="activeComponent.news" @componentChanged="setComponent($event)" @modifyNews="setComponent($event)"></newsComponent>
      <CreateNewsComponent  v-if="activeComponent.createNews"></CreateNewsComponent>
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

export default{
    components: { newsComponent, NavbarComponent, MenuComponent, RegisterComponent, ArticlesComponent, CreateArticle, modifyArticle, NewsletterComponent, CreateNewsComponent },
    data(){
        return {
            activeComponent: {
                dashBoard: false,
                register: false,
                article: false,
                archive: false,
                newsletter: false,
                news: false,
                createArticle : false,
                createNews : false,
                modifyNews : false
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
  width: 10%;
  background-color: #ccc; /* Add your desired background color */
  /* You can also add padding, margin, or other styles as needed */
}

/* Style the right column */
.right-column {
  width: 90%;
  background-color: #f0f0f0; /* Add your desired background color */
  /* You can also add padding, margin, or other styles as needed */
}
</style>