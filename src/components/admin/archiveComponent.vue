<template>
<div class="container">
    <div>

        <div class="header">
            <h1>Voila la page des archives</h1>
            <button class="add-article-button" @click="createArchive()">Add an archive</button>
        </div>
    </div>
  <div id="tableArticles">
    <table>
      <thead>
        <tr>
          <th>Supprimer</th>
          <th>Titre</th>
          <th>Description</th>
          <th>Cover</th>
          <th>Back</th>
          <th>Numero</th>
          <th>Date</th>
          <th>Prive</th>
          <!-- Add more table headers for other attributes as needed -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(archive, index) in archives" :key="index">
          <td><button class="button" @click.stop="deleteArchive(archive.id)">Supprimer</button></td>
          <td>{{ archive.titre }}</td>
          <td>{{ archive.description }}</td>
          <td>
            <img style="max-width: 100%;" :src="`${baseUrl}/save/saveArchive/cover/${archive.id}.png`">
          </td>
          <td>
            <img style="max-width: 100%;" :src="`${baseUrl}/save/saveArchive/back/${archive.id}.png`">
          </td>
          <td>{{ archive.numero}}</td>
          <td>{{ archive.date }}</td>
          <td class="vertical-align-middle">
              <div class="content">
                <p style="padding: 20px;">
                  {{ isPrivate(archive.private) }}
                </p> 
                <button class="button" @click.stop="privateArchive(archive.id)">privé</button>
              </div>
            </td>
          <!-- Add more table cells for other attributes as needed -->
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
            archives : [],
            baseUrl : baseUrl
        }
    },
    mounted(){
        this.setArchives()
    },
    methods : {
      isPrivate(bo){
      if(bo){
        return "privé"
      } else {
        return "public"
      }
    },
      privateArchive(id){
        axiosInstance.post('/api/privateArchive',{ id : id}).then( () =>{
          this.setArchives()
        }
        ).catch(error => console.log(error))

      },

        deleteArchive(id){
          axiosInstance.delete(`/api/deleteArchive/${id}`).then(() => {
            this.$message({
              message: 'Article deleted successfully',
              type: 'success',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            });
            this.setArchives()
          })
          .catch(() => {
            this.$message({
              message: 'Article deleted successfully',
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            });
          });
        },
        setArchives(){
          
            axiosInstance.get('/api/getAllArchives').then(
               response => {
                            this.archives = response.data
                        })
                        .catch(() => {
                          this.$message({
                          message: 'Erreur lors de la recuperation des archives',
                          type: 'error',
                          customClass: 'custom-el-message',
                          duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
                        });                       
                       });
            
        },
        createArchive(){
            this.$emit("componentChanged","createArchive")
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