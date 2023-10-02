<template>
<div class="container">
    <div>

        <div class="header">
            <h1>Voila la page des articles</h1>
            <button class="add-article-button" @click="createArticle()">Add an article</button>
        </div>
    </div>
  <div id="tableArticles">
    <table>
      <thead>
        <tr>
          <th>Supprimer</th>
          <th>Titre</th>
          <th>Description</th>
          <th>Image</th>
          <th>Auteur</th>
          <th>Numero</th>
          <th>Date</th>
          <th>Prive</th>
          <th>Rubrique</th>
          <th>Type</th>
          <th>Modifier</th>
          <!-- Add more table headers for other attributes as needed -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article, index) in articles" :key="index">
          <td><button class="button" @click.stop="deleteArticle(article.id)">Supprimer</button></td>
          <td>{{ article.titreFront }}</td>
          <td>{{ article.description }}</td>
          <td>
            <img style="max-width: 100%;" :src="`${baseUrl}/save/saveArticle/cover/${article.id}.png`">
          </td>
          <td>{{ article.auteur }}</td>
          <td>{{ article.numeroParu }}</td>
          <td>{{ article.date }}</td>
          <td>{{ article.private }}</td>
          <td>{{ rubriqueNameFromId(article.rubrique) }}</td>
          <td>{{ article.fileType }}</td>
          <td><button class="button" @click.stop="modifyArticle(article.id)">Modifier</button></td>
          <!-- Add more table cells for other attributes as needed -->
        </tr>
      </tbody>
    </table>
  </div>
</div>


</template>
<style>

</style>
<script>
import axiosInstance from '../../axios.js';
import baseUrl from '../../config';
export default{
    data(){
        return {
            articles : [],
            rubriques : [],
            baseUrl : baseUrl
        }
    },
    mounted(){
        this.setArticles()
    },
    methods : {
      modifyArticle(id){
        this.$emit('modifyArticle',id)
      },
        rubriqueNameFromId(id){
            var found = this.rubriques.find(rub => rub.id === id)
            if(found){
                return found.rubrique
            } else {
                return "on a pas"
            }
        },
        deleteArticle(id){
          console.log(id)
          axiosInstance.delete(`/api/deleteArticle/${id}`).then(response => {
            console.log(response)
            this.$message({
              message: 'Article deleted successfully',
              type: 'success',
              customClass: 'custom-el-message',
              duration: 100000, // Set the duration to 3000 milliseconds (3 seconds)
            });
            this.setArticles()
          })
          .catch(error => {
            console.log(error)
            this.$message.error('Error deleting article');
          });
        },
        setArticles(){
            axiosInstance.get('/api/getrubriques').then(response => 
            this.rubriques = response.data).catch(error => console.log(error))
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
<style scoped>

.container {
  width: 100%;
  display: block;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

/* Header styles */
.header {
  display: flex;
  position:relative;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* Page title */
h1 {
 
  font-size: 24px;
  color: black;
  margin: 0; /* Remove margin to center the title */
}


/* Page title */
h1 {
  font-size: 24px;
  color: black;
}

/* Button styles */
.add-article-button {
  background-color: lightgreen;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 8px;
}
/* Button styles */
.button {
  background-color: lightgreen;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 8px;
}
.button:hover{
  background-color: #4caf50;
}

.add-article-button:hover {
  background-color: #4caf50;
}

/* Table styles */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 10px;
  max-width: 200px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>