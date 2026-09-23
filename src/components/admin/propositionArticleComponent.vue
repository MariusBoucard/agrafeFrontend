<template>
  <div class="container">
    <div class="header">
        <h1>Propositions d'articles</h1>
    </div>

    <div id="tableArticles" class="table-scroll">
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in articles" :key="index">
            <td>{{ article.titre }}</td>
            <td>{{ article.auteur }}</td>
            <td>{{ article.contact }}</td>
            <td>{{ article.commentaire }}</td>
            <td>{{ rubriqueName(article.rubriqueId) }}</td>
            <td><button class="button" @click.stop="telechargerArticle(article.id)">Télécharger</button></td>
            <td><button class="button button-danger" @click.stop="deleteArticle(article.id)">Supprimer</button></td>
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

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.header {
  margin-bottom: 1rem;
}

h1 {
  font-size: clamp(1.15rem, 4vw, 1.5rem);
  margin: 0;
  color: black;
}

.table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
}

table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 10px;
  max-width: 200px;
  text-align: left;
  border-bottom: 1px solid #ccc;
  word-break: break-word;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
  white-space: nowrap;
}

.button {
  background-color: lightgreen;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 8px;
  min-height: 40px;
}

.button-danger {
  background-color: #ef4444;
  color: #fff;
}

@media (max-width: 700px) {
  .container {
    padding: 12px;
    border-radius: 0;
  }
}
</style>
