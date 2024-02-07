<template>
  <div class="container">
    <form @submit.prevent="submitForm" class="article-form">
      <h2 class="form-title">Ajouter un article</h2>

      <div class="form-columns">
        <!-- Left column -->
        <div class="form-column">
          <div class="form-group">
            <label for="titreFront">Titre de l'article :</label>
            <input type="text" id="titreFront" v-model="article.titreFront" required>
          </div>
          <div class="form-group">
            <label for="description">Description :</label>
            <textarea id="description" v-model="article.description" required></textarea>
          </div>
          <div class="form-group">
            <label for="imageLogo">Image de couverture:</label>
            <input type="file" id="imageLogo" accept="image/*" @change="handleImageUpload">

          </div>
          <div class="form-group">
            <!-- Add a preview for the uploaded image (optional) -->
            <img v-if="imagePreview" :src="imagePreview" alt="Uploaded Image">
          </div>

        </div>
        <div class="form-column">
          <div class="form-group">
            <label for="auteur">Auteur :</label>
            <input type="text" id="auteur" v-model="article.auteur" required>
          </div>
          <div class="form-group">

            <label for="numeroParu">Numéro du journal :</label>
            <input type="text" id="numeroParu" v-model="article.numeroParu" required>
          </div>
          <div class="form-group">
            <label for="date">Date de publication :</label>
            <input type="date" id="date" v-model="article.date" required>
          </div>

          <div class="form-group">
            <label for="rubrique">Rubrique:</label>
            <!-- Replaced the input with a select -->
            <select id="rubrique" v-model="article.rubrique" required>
              <option v-for="rub in rubriques" :key="rub.id" :value="rub.id">{{ rub.rubrique }}</option>
              <!-- Add more options as needed -->
            </select>

          </div>
        
          
        </div>
      </div>
      <div class="form-columns">
        <!-- Left column -->
        <div class="form-column">

          <draggable class="dragArea list-group w-full" :list="article.contenu" @change="orderChanged">
                            <div class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                                v-for="(element, index) in article.contenu" :key="element.id">
                                <div class="horizontal-card">
                                    <div @click="deleteElement(element.id)" class="deleteDiv"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>

                                    </div>
                                    <div class="number">{{ index }}</div>
                                    <div class="title">{{ element.type }}</div>
                                    <div v-if="element.type === 'image'" class="image">
                                        <img :src="getImageUrl(element.image)" alt="Image Preview">
                                    </div>
                                    <div class="hover-trigger">Voir le texte</div>
                                    <div class="hovered-info">{{ element.text }}
                                      <div v-if="element.type === 'image'">
                                        Infos :
                                        <p>Auteur : {{ element.auteur }}</p>
                                        <p>Copyright : {{ element.copyright }}</p>
                                        </div>
                                    
                                    </div>
                                </div>

                            </div>
                        </draggable>



          <button type="button"  class="button" @click.stop="enableAddPart()">Ajouter une partie</button>
        </div>
        <div class="form-column">
          <div class="form-group">
            <div v-if="enableAdd"> 
              <div class="form-group">

                <label>Partie d'article à rajouter</label>
                <!-- Replaced the input with a select -->
                <select id="type" v-model="partToAdd.type" required>
                  <option value="titre">Titre</option>
                  <option value="sousTitre1">Sous titre 1</option>
                  <option value="sousTitre2">Sous titre 2</option>
                  <option value="Citation">Citation</option>

                  <option value="interTitre">Inter titre</option>
                  <option value="chapeau">Chapeau</option>
                  <option value="paragraphe">Paragraphe</option>
                  <option value="image">Image</option>
                  <option value="Sources">Sources</option>
                  <option value="notesBasPage">Notes de bas de page</option>
                  <!-- Add more options as needed -->
                </select>
              </div>
              <div class="form-group">
                <div v-if="partToAdd.type === 'Sources'">
                  <p>Ajout de sources : mettez bien une source par nouvelle ligne ! </p>
                  
                </div>
                <div v-if="partToAdd.type === 'NotesBasPage'">
                  <p>Ajout de sources : mettez bien une source par nouvelle ligne ! </p>
                  
                </div>
                <label for="texte">Texte à ajouter</label>
                <textarea id="texte" v-model="partToAdd.text" ></textarea>

              </div>
              <div class="form-group">
               
                <div v-if="partToAdd.type === 'image'">
                  <div class="form-group">
                    <label for="img">Image :</label>
                    <input type="file" id="img" accept="image/*" @change="handleImageArticleUpload" required>

                  </div>
                  <div class="form-group">
                    <!-- Add a preview for the uploaded image (optional) -->
                    <img v-if="partToAdd.imagePreview" :src="partToAdd.imagePreview" alt="Uploaded Image">
                  </div>
                  <div class="form-group">

                    <label for="auteurImg" class="label">Auteur</label>
                    <input type="text" id="auteurImg" v-model="partToAdd.auteur" >
                  </div>
                  <div class="form-group">

                    <label for="copyright" class="label">Copyright</label>
                    <input type="text" id="copyright" v-model="partToAdd.copyright" >
                  </div>
                </div>
              </div>
              <button type="button" class="button" style="margin-top: 10px;" @click="addPart()">Ajouter une partie</button>
            </div>
          </div>
</div>
</div>
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>
<script>
import { nanoid } from 'nanoid';
import axiosInstance from '@/axios';
import { VueDraggableNext } from 'vue-draggable-next'
export default {
    components: {
        draggable: VueDraggableNext,
    },
  mounted() {
    axiosInstance.get('api/getrubriques').then(
      response => {
        this.rubriques = response.data
      }
    ).catch(() => this.$message({
      message: 'Erreur récupération rubriques',
      type: 'error',
      customClass: 'custom-el-message',
      duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
    }))
  },
  data() {
    return {
      article: {
        titreFront: "sdf",
        description: "fds",
        imageLogo: "fsd",
        path: "dsf",
        auteur: "sdf",
        rangArticle: 1,
        numeroParu: "fsd",
        date: "fds",
        private: "sfd",
        // Attention, bien save l id de la rubrique
        rubrique: "fds",
        misEnLigne: "dfs",
        contenu : []
      },
      partToAdd: {
        type: "",
        text: "",
        copyright: "",
        image: "",
        auteur: "",
        imagePreview: null
      },
      enableAdd : false,
      rubriques: [],
      imagePreview: null, // Store the image preview URL
    };
  },
  methods: {
    enableAddPart(){
      this.enableAdd = !this.enableAdd
    },  
    getImageUrl(file) {
            if (file) {
                return URL.createObjectURL(file);
            }
            return 'default-image.jpg';
        },
    addPart(){
      this.partToAdd.id = nanoid();
      if(this.partToAdd.type === 'image'){

        // Create a clone of the image File object
        const clonedImage = new File([this.partToAdd.image], this.partToAdd.image.name);
        const part = { ...this.partToAdd, image: clonedImage };
        this.article.contenu.push(part)
      }
      else {
        const part = { ...this.partToAdd };
        this.article.contenu.push(part)
        delete part.auteur;
        delete part.copyright,
        delete part.image
        delete part.imagePreview
      }
      this.cleanTemp()
    },
    cleanTemp(){
      // this.partToAdd.type = ''
      this.partToAdd.text = ''
      this.partToAdd.auteur = ''
      this.partToAdd.copyright = ''
      this.partToAdd.image = null
    },
    deleteElement(id){
      this.article.contenu = this.article.contenu.filter(a =>a.id !== id)
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imagePreview = URL.createObjectURL(file);
        this.article.imageLogo = file;
      } else {
        this.imagePreview = null;
        this.article.imageLogo = null;
      }
    },
    handleImageArticleUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.partToAdd.imagePreview = URL.createObjectURL(file);
        this.partToAdd.image = file;
      } else {
        this.partToAdd.imagePreview = null;
        this.partToAdd.image = null;
      }
    },
    handlePdfUpload(event) {
      const file = event.target.files[0];
      if (file) {
          this.article.articlePdf = file;
      } else {
        this.article.articlePdf = null;
      }
    },

    submitForm() {
      if(confirm("T'es sûr que c'est tout bon ??\nAlleyyy, c'est tipar")){

        axiosInstance.post('/api/addArticle', { article: this.article },)
        .then(response => {
          const id = response.data
          
          // TODO Gestion de flot pour pouvoir lancer ou pas le logo de l'article // les differentes images indépendamment
          const formData = new FormData();
          if (this.article.imageLogo) {
            
            formData.append('imageLogo', this.article.imageLogo);
          }
          formData.append('articleId', id); // Add your string data here
          axiosInstance.post('/api/uploadImage', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            const formData = new FormData();
            // envoi de toutes les img
            
            formData.append(`generalId`, id);
            // Append each JSON object and its associated image to the FormData
            this.article.contenu.forEach((imageObj, index) => {
              // Append the image File objects with unique names, e.g., 'image0', 'image1', etc.
              if(imageObj.type === 'image')
              {
                formData.append(`images`, imageObj.image);
                formData.append(`id${index}`, imageObj.id);
              }
            });
            
            
            // Send the FormData object with JSON objects and images to the backend using Axios
            axiosInstance
            .post('/api/uploadArticleImages', formData)
            .then(response => {
              // Handle the response from the backend if needed
              this.$message({
                message: 'Article Bien ajouté!!',
                type: 'success',
                customClass: 'custom-el-message',
                duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
              })
              this.$emit("componentChanged", "article")
              console.log('Backend response:', response.data);
            })
            .catch(error => {
              // Handle errors if the request fails
              console.error('Error sending data to the backend:', error);
            });
            
            
            // Handle the response from the backend
          })
          .catch(error => {
            // Handle errors if the request fails
            console.error(error);
          });
        },
        )
        .catch(error => {
          // Handle errors if the request fails
          console.error(error);
        });
      }
    }
    
  }
  }
</script>
<style scoped>
/* CSS */
.hovered-info {
  /* display: none; Hide it by default */
  display: block; /* Show it when .hover-trigger is hovered */

  position : absolute;
  left : 30%;
  width:300px;
  border-radius: 8px;
  background-color: #c0c0c0;
  z-index:-1;
  padding:10px;
  opacity: 0; /* Initially, set opacity to 0 */
  transition: opacity 0.3s; /* Smoothly transition opacity */

}

.hover-trigger:hover + .hovered-info{
  background-color: rgb(221, 221, 221);
  z-index: 10;
  opacity: 1; /* Show it when .hover-trigger is hovered by changing opacity */
}
.hovered-info:hover{
  background-color: rgb(221, 221, 221);
  z-index: 10;
  opacity: 1;
}

/* Container for the form */
.article-form {
  width: 100%;
}

.container {
  width: 100%;
  max-width: 800px;
  /* Adjust as needed */
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

/* Form title */
.form-title {
  text-align: center;
  margin-bottom: 20px;
  color: black;
}

/* Form columns */
.form-columns {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px ;
  margin-bottom: 20px;
  /* Separate columns with space */
  gap: 16px;
}

/* Form column */
.form-column {
  flex-basis: 48%;
 
  /* Set column width to 48% for 2 columns with a small gap */
}

/* Form groups (each input + label pair) */
.form-group {
  display: flex;
  flex-direction: column;
}

/* Label styles */
.label {
  font-weight: bold;
  color: black;
}

/* Input and textarea styles */
input[type="text"],
textarea,
input[type="file"],
input[type="date"],
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

/* Checkbox styles */
input[type="checkbox"] {
  margin-right: 8px;
}
input[type="date"],
textarea,
select{
  margin-bottom: 10px;
}
/* Image preview styles */
img {
  max-width: 100%;
  margin-top: 8px;
}

/* Submit button styles */
.submit-button {
  padding: 12px 24px;
  background-color: lightgreen;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 18px;
  margin: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #4caf50;
  /* Darker shade of green on hover */
}

/* Form field required indicator */
input:required::after {
  content: "*";
  color: red;
  margin-left: 4px;
}

.horizontal-card {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 20px;
    /* Adjust spacing between stacked cards */
    border: 1px solid #ccc;
    padding: 10px;
    max-width: 400px;
    /* Set a maximum width for the card */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Add a subtle shadow */
}
.horizontal-card > div {
  margin: 5px; /* Add margin to all inner divs */
}

.number {
    font-size: 24px;
    margin-right: 10px;
}

.image img {
    max-width: 80px;
    /* Adjust the maximum width of the image */
    height: auto;
    object-fit: cover;
    /* Maintain aspect ratio and cover the container */
    /* Make it round if needed */
    margin-right: 10px;
}

.title {
    font-size: 18px;
    font-weight: bold;
}
.deleteDiv{
    width:30px;
    margin: 10px;
}
</style>