<template>
  <div class="container">
    <div>

      <div class="header">
        <h1>Voila la page des Newssss</h1>
        <button class="add-article-button" @click="createNews()">Créer une nouvelle news</button>
      </div>
    </div>
    <div id="tableArticles" class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Supprimer</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Image</th>
            <th>Date</th>
            <th>Prive</th>
            <!-- Add more table headers for other attributes as needed -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(neww, index) in news" :key="index">
            <td><button class="button" @click.stop="deleteNews(neww.id)">Supprimer</button></td>
            <td>{{ neww.titre }}</td>
            <td>{{ neww.description }}</td>
            <td>
              <img style="max-width: 100%;" :src="`${baseUrl}/save/newsImage/${neww.id}.png`">
            </td>

            <td>{{ neww.date }}</td>
            <td class="vertical-align-middle">
              <div class="content">
                <p class="private-label">
                  {{ isPrivate(neww.private) }}
                </p> 
                <button class="button" @click.stop="privateNews(neww.id)">privé</button>
              </div>
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
      news: [],
      baseUrl: baseUrl
    }
  },
  mounted() {
    this.setNews()
  },
  methods: {
    isPrivate(bo){
      if(bo){
        return "privé"
      } else {
        return "public"
      }
    },
    privateNews(id) {
      axiosInstance.post('/api/privateNews', { id: id }).then(
        () => {
          this.setNews()
        }
      ).catch(() =>  this.$message({
              message: 'Erreur lors du passage en privé',
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            }))
    },
    modifyNews(id) {
      this.$emit('modifyNews', id)
    },

    deleteNews(id) {
      if (confirm("T'es sûr de vouloir supprimer la news ?\n C'est pas prévu d'être réversible, à tes risques et périls fréro")) {

      axiosInstance.delete(`/api/deleteNews/${id}`).then(() => {
        this.$message({
          message: 'News deleted successfully',
          type: 'success',
          customClass: 'custom-el-message',
          duration: 3000, // Set the duration to 3000 milliseconds (3 seconds)
        });

        this.setNews()
      })
        .catch(() => {
          this.$message({
              message: 'Erreur lors de la suppression de la news',
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            })        });}
    },
    setNews() {
      axiosInstance.get('/api/getAllNews').then(response =>
        this.news = response.data).catch(() =>
        this.$message({
              message: 'Erreur récupération des news',
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            }))
    },
    createNews() {
      this.$emit("componentChanged", "createNews")
    }
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

.header {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  position: relative;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: clamp(1.15rem, 4vw, 1.5rem);
  color: black;
  margin: 0;
  flex: 1 1 160px;
}

.add-article-button {
  background-color: lightgreen;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 8px;
  min-height: 44px;
}

.button {
  background-color: lightgreen;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 8px;
  min-height: 40px;
}

.button:hover {
  background-color: #4caf50;
}

.add-article-button:hover {
  background-color: #4caf50;
}

.table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
}

table {
  width: 100%;
  min-width: 560px;
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

.private-label {
  padding: 0;
  margin: 0 0 0.35rem;
}

@media (max-width: 700px) {
  .container {
    padding: 12px;
    border-radius: 0;
  }

  .header {
    flex-direction: column;
    align-items: stretch;
  }

  .add-article-button {
    width: 100%;
  }
}
</style>