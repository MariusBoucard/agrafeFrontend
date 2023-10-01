<template>
    <div>
        <h1>Voila la page des articles</h1>

        <div id="tableArticles">
            <table>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Description</th>
          <th>Auteur</th>
          <th>Numero</th>
          <th>Date</th>
          <th>Prive</th>
          <th>Rubrique</th>
          <th>Type</th>

          <!-- Add more table headers for other attributes as needed -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article, index) in articles" :key="index">
          <td>{{ article.titreFront }}</td>
          <td>{{ article.description }}</td>
          <td>{{ article.auteur }}</td>
          <td>{{ article.numero }}</td>
          <td>{{ article.date }}</td>
          <td>{{ article.prive }}</td>
          <td>{{ article.rubrique }}</td>
          <td>{{ article.fileType }}</td>

          <!-- Add more table cells for other attributes as needed -->
        </tr>
      </tbody>
    </table>

        </div>
        <div>
            <button @click="createArticle()">Add an article</button>
        </div>
    </div>
</template>
<style>

</style>
<script>
import axiosInstance from '../../axios.js';
export default{
    data(){
        return {
            articles : []
        }
    },
    mounted(){
        this.setArticles()
    },
    methods : {
        setArticles(){
            //Be carefull different routes admin
            axiosInstance.get('/api/getAllArticles').then(
               response => {
                            // if (response.connected === true){
                            //     this.locals
                            // }
                            console.log("on a recu une reponse",response)
                            this.articles = response.data
                            console.log(this.articles)
                            // Handle the response from the server
                        })
                        .catch(error => {
                            console.log("on a recu une erreur",error)

                            // Handle any errors
                        });
            
        },
        createArticle(){
            this.$emit("componentChanged","createArticle")
        }
    }
}
</script>