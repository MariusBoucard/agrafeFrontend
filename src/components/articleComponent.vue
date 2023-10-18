<template>
    <div>
        <div v-for="article in articles" :key="article.id">
            <articleWidget ></articleWidget>
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
    mounted(){
        axiosInstance.get('/api/getrecentarticle').then(response => {
            this.articles = response.data
           }
           ).catch(error => 
           this.$message(error)
           )
    },
    data () {
        return {
            articles : []
        }
    }
}

</script>
<style scoped>


</style>