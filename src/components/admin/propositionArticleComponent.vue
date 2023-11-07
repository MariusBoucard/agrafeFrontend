<template>
  <div>
    <div>
        <h1>Propositions d'articles</h1>

    </div>

    <div id="tableArticles">
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Contact</th>
            <th>Commentaire</th>
            <th>Rubrique</th>
            <th>Télécharger</th>
            <th>Supprimer</th>
            <!-- Add more table headers for other attributes as needed -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in articles" :key="index">
            <td>{{ article.titre }}</td>
            <td>{{ article.auteur }}</td>
            <td>{{ article.contact }}</td>
            <td>{{ article.commentaire }}</td>
            <th>{{ rubriqueName(article.rubriqueId) }}</th>
            <td><button class="button" @click.stop="telechargerArticle(article.id)">Télécharger</button></td>
            <td><button class="button" @click.stop="deleteArticle(article.id)">Supprimer</button></td>

            <!-- Add more table cells for other attributes as needed -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios'
export default {
  name: 'propositionArticleComponent',
  data() {
    return {
        articles : [],
        rubriques : [],
      message: 'This is a Vue 3 starter code!'
    }
  },
  mounted(){
    this.setArticles()
    this.setRubriques()
  },
  methods : {
    rubriqueName(id){
        const find =this.rubriques.find(rub => rub.id === id)
        
        if(find === undefined){
            return "Aucune rubrique"
        }
        return find.rubrique
    },
    setRubriques(){
           axiosInstance.get('/api/getRubriques').then(response => {
            this.rubriques = response.data
           }
           ).catch(error => 
           this.$message(error)
           )
        },
    setArticles(){
        axiosInstance.get('/api/getPropalArticles').then(
            (response) => {
                this.articles = response.data
                console.log(this.articles)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
  },
  deleteArticle(id){
    axiosInstance.delete(`/api/deletePropalArticle/${id}`).then(
        () => {
            this.setArticles()
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )
  },
  telechargerArticle(id){
    console.log("telechargement")
    axiosInstance.get(`/api/downloadPropal/${id}`, { responseType: 'blob' })
      .then(response => {

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Article.zip'); // or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error('Error downloading the file:', error);
      });
  }
}}
</script>

<style>
/* Add your styles here */
</style>
