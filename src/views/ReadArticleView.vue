<template>
    <div>
        <ul>
            <li v-for="item in article.contenu" :key="item.id" :class="item.type">
                {{ item.text }}
            </li>
        </ul>    
    </div>
</template>
<script>
import axiosInstance from '@/axios';

export default {
    name : "ReadArticleView",
    data(){
        return {
            article : {}
        }
    },
    props: ['articleId'],
    mounted(){
        // Get the article from the backend
      axiosInstance.get('/api/getPublicArticle/'+this.articleId)
        .then(response => {
            this.article = response.data
        })
        .catch(error => {
            this.$message({
                message: error,
                type: 'error',
                customClass: 'custom-el-message',
                duration: 1000
            })
        })

    }
}
</script>
<style scoped>
ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
}
li{
    padding: 10px;;
}
.titre{
    font-size: 1.5em;
    font-weight: 100;
    font-family: 'agrafe';
}
.sousTitre1{
    font-size: 1em;
    font-weight: 100;
    font-family: "Bahnschrift", sans-serif;

    color: black;
    font-family: 'agrafe';
}
.sousTitre2{
    font-size: 1em;
    font-weight: 100;
    color: black;
    font-family: "Bahnschrift", sans-serif;

    font-family: 'agrafe';
}
.Citation{

}
.interTitre{

}
.chapeau{

}
.paragraphe{

}
.image{

}
.Sources{

}
.noteBasPage{

}
</style>