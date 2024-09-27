<template>
  <div class="container">
    <div>

      <div class="header">
        <h1>Voila la page des articles</h1>
        <input type="text" v-model="search" placeholder="Chercher un article..."  style="margin-right:20px ;" class="input-search">

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
            <th>ID</th>
            <!-- Add more table headers for other attributes as needed -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in filteredArticles" :key="index">
            <td><button class="button" style="background-color: red;" @click.stop="deleteArticle(article.id)">Supprimer</button></td>
            <td>{{ article.titreFront }}</td>
            <td>{{ cropText(article.description, article.id) }}
              <button @click="toggleFullDescription(article.id)">
    {{ showFullDescription[article.id] ? 'afficher moins' : 'afficher plus' }}
  </button></td>

            <td>
              <img style="max-width: 100%;" :src="`${baseUrl}/api/save/saveArticle/cover/${article.id}.png`">
            </td>
            <td>{{ article.auteur }}</td>
            <td>{{ article.numeroParu }}</td>
            <td>{{ article.date }}</td>
            <td class="vertical-align-middle">
              <div class="content">
                <p style="padding: 20px;">
                  {{ isPrivate(article.private) }}
                </p>
                <button class="button" @click.stop="privateArticle(article.id)">privé</button>
              </div>
            </td>
            <td>{{ rubriqueNameFromId(article.rubrique) }}</td>
            <td>{{ article.fileType }}</td>
            <td>
              {{ article.id }}
              <!-- <button class="button" @click.stop="modifyArticle(article.id)">Modifier</button> -->
            </td>
            <!-- Add more table cells for other attributes as needed -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style></style>
<script>
import axiosInstance from '../../axios.js';
import baseUrl from '../../config';
export default {
  data() {
    return {
      search: '',

      articles: [],
      rubriques: [],
      baseUrl: baseUrl,
      showFullDescription: {},

    }
  },
  computed: {
  filteredArticles() {
    const searchLower = this.search.toLowerCase();
    return this.articles.filter(article =>
      article.titreFront.toLowerCase().includes(searchLower) ||
      article.description.toLowerCase().includes(searchLower) ||
      article.id.toLowerCase().includes(searchLower)
    ).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  },
},
  mounted() {
    this.setArticles()
  },
  methods: {
    isPrivate(bo) {
      if (bo) {
        return "privé"
      } else {
        return "public"
      }
    },
    privateArticle(id) {
      axiosInstance.post('/api/privateArticle', { id: id }).then(() => {
        this.setArticles()
      }
      ).catch(error => console.log(error))

    },
    modifyArticle(id) {
      this.$emit('modifyArticle', id)
    },
    rubriqueNameFromId(id) {
      var found = this.rubriques.find(rub => rub.id === id)
      if (found) {
        return found.rubrique
      } else {
        return "on a pas"
      }
    },
    deleteArticle(id) {
      if (confirm("T'es sûr de vouloir supprimer l'article ?\n C'est pas prévu d'être réversible, à tes risques et périls fréro")) {

      axiosInstance.delete(`/api/deleteArticle/${id}`).then(() => {
        this.$message({
          message: 'Article deleted successfully',
          type: 'success',
          customClass: 'custom-el-message',
          duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
        });
        this.setArticles()
      })
        .catch(() => {
          this.$message({
            message: 'Erreur lors de la suppression de l\'article',
            type: 'error',
            customClass: 'custom-el-message',
            duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
          });
        });
      }
      },
    setArticles() {
      axiosInstance.get('/api/getrubriques').then(response => {
        this.rubriques = response.data
        console.log("on a get les ruvriques")
      }
      ).catch(() =>
        this.$message({
          message: 'Erreur récuperation des rubriques',
          type: 'error',
          customClass: 'custom-el-message',
          duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
        }))
      //Be carefull different routes admin
      axiosInstance.get('/api/getAllArticles').then(
        response => {
          console.log("on a get les articles",response.data)

          this.articles = response.data
          this.articles = this.articles.reverse()
        })
        .catch(() => {
          this.$message({
            message: 'Erreur lors de la récupération des articles',
            type: 'error',
            customClass: 'custom-el-message',
            duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
          });

          // Handle any errors
        });

    },
    createArticle() {
      this.$emit("componentChanged", "createArticle")
    },
    cropText(text, id) {
    const showFull = this.showFullDescription[id] || false;
    return showFull ? text : text.substring(0, 100) + '...';
  },
  toggleFullDescription(id) {
    this.showFullDescription[id] = !this.showFullDescription[id];
  },
  }
}
</script>
<style scoped>
.vertical-align-middle {

  text-align: center;
  vertical-align: middle;
}

.content {
  display: block;
}

.input-search {
  width: 75%;
  margin: 0 auto 20px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 4px;
  font-size: 16px;
}


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
  position: relative;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* Page title */
h1 {

  font-size: 24px;
  color: black;
  margin: 0;
  /* Remove margin to center the title */
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

.button:hover {
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

th,
td {
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