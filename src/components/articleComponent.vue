<template>
    <div>
        <div v-for="article in articles" :key="article.id">
            <articleWidget 
                :article="article"
                :rubriques="rubriques"
            ></articleWidget>
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
            console.log("got")
           }
           ).catch(error => 
           this.$message(error)
           )

        axiosInstance.get('/api/getrubriques').then(response => {
            this.rubriques = response.data
        }).catch(error => 
           this.$message(error)
           )
    },
    data () {
        return {
            articles : [],
            rubriques : []
        }
    }
}

</script>
<style scoped>


</style>