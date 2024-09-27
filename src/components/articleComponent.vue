<template>
    <div>
        <div class="articleWidget" v-for="article in paginatedArticles" :key="article.id">
            <articleWidget 
                :article="article"
                :rubriques="rubriques"
            ></articleWidget>
        </div>
        <div class="pagination-container">
    <button class="pagination-button" @click="currentPage--" :disabled="currentPage <= 1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
</svg>

    </button>
    <p class="pagination-text">{{ currentPage }}/{{ pageCount }}</p>
    <button class="pagination-button" @click="currentPage++" :disabled="currentPage >= pageCount">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
</svg>

    </button>
  </div>
    </div>
</template>
<script>
import articleWidget from '@/widgets/articleWidget.vue';
import axiosInstance from '../axios.js';
export default{
    components : {
        articleWidget
    },
 
    methods : {
        sortArticles() {
      this.sortedArticles = this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log(this.sortedArticles)
    }
    },
    mounted(){
        axiosInstance.get('/api/getrecentarticle').then(response => {
            this.articles = response.data
            this.sortArticles();

            console.log("got")
           }
           ).catch(error => 
           this.$message({
              message: error,
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            })
           )

        axiosInstance.get('/api/getrubriques').then(response => {
            this.rubriques = response.data
        }).catch(error => 
        this.$message({
              message: error,
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            })           )
    },
    data () {
        return {
            articles : [],
            rubriques : [],
            sortedArticles : [],
      currentPage: 1,
    itemsPerPage: 5,
        }
    },
    computed: {
  paginatedArticles() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.sortedArticles.slice(start, end);
  },
  pageCount() {
    return Math.ceil(this.sortedArticles.length / this.itemsPerPage);
  },
},
}

</script>
<style scoped>

.articleWidget{
    margin-bottom: 30px;
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.pagination-button {
  width: 5%;
  background-color: rgb(0, 0, 0);
  color: white;
  border: none;
  border-radius: 10px;
  /* Add your styles for the buttons here */
}
.articleWidget {
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.7); /* Adjust color as needed */
}

.articleWidget:hover {
  transform: scale(1.05); /* Grow the element slightly */
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.pagination-text {
  /* Add your styles for the text here */
  margin: 0 1em; /* Add some horizontal margin around the text */
}
</style>