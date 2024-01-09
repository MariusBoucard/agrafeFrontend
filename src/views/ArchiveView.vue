<template>
    <div class="baseView">
      <div class="container">
        <div class="leftColumn"> 
            <ArchiveComponent></ArchiveComponent>
        </div>
        <div class="rightColumn">
          <ContactComponent></ContactComponent>
          <BackcoverWidget></BackcoverWidget>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import BackcoverWidget from '@/widgets/backcoverWidget.vue';
import ContactComponent from '@/widgets/contactComponent.vue';
import ArchiveComponent from '@/components/archiveComponent.vue'
  // @ is an alias to /src
  
  export default {
    name: 'HomeView',
    components: {
    ArchiveComponent,
    ContactComponent,
    BackcoverWidget
}
  }
  </script>
  <style scoped>
.baseView{
  width:90%;
  margin:auto;
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
  .article{
    width: 100%;
  }}
</style>
  