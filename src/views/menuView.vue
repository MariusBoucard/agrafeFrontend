<template>
    <div class="baseView">
      <ArticleComponent></ArticleComponent>
    </div>
  </template>
  
  <script>
import ArticleComponent from '@/components/articleComponent.vue';

  // @ is an alias to /src
  
  export default {
    name: 'HomeView',
    components: {
    ArticleComponent
}
  }
  </script>
  