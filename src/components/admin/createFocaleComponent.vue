<template>
    <div>
        <div class="container">
            <form @submit.prevent="sendFocaleToBackend" class="article-form">
                <h2 class="form-title">Créer une focale</h2>
                <div class="form-columns">
                    <!-- Left column -->
                    <div class="form-column">
                        <div class="form-group">
                            <label for="titreFront">Titre de la focale :</label>
                            <input type="text" id="titreFront" v-model="focale.titre" required>
                        </div>
                    </div>
                    <div class="form-column">

                        <div class="form-group">

                            <label for="numeroParu">Numéro du journal :</label>
                            <input type="number" id="numeroParu" v-model="focale.numero" required>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="description">Description :</label>
                    <textarea id="description" v-model="focale.description" required></textarea>
                </div>
                <div class="form-columns">
                    <!-- Left column -->
                    <div class="form-column">
                        <h2>Images :</h2>
                        <draggable class="dragArea list-group w-full" :list="focale.images" @change="orderChanged">
                            <div class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                                v-for="(element, index) in focale.images" :key="element.id">
                                <div class="horizontal-card">
                                    <div @click="deleteImage(element.id)" class="deleteDiv"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>

                                    </div>
                                    <div class="number">{{ index }}</div>
                                    <div class="image">
                                        <img :src="getImageUrl(element.image)" alt="Image Preview">
                                    </div>
                                    <div class="title">{{ element.titre }}</div>
                                    <div @click="editImage(element.id)" class="deleteDiv"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                             <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </div>
                                </div>

                            </div>
                        </draggable>
                        <button class="button" @click="addImage = true">Ajouter une image</button>

                    </div>
                    <div class="form-column">
                        <div v-if="addImage">

                            <div class="form-group">
                                <label for="auteur">Titre :</label>
                                <input type="text" id="auteur" v-model="imgToAdd.titre">
                            </div>
                            <div class="form-group">
                                <label for="imageLogo">Image :</label>
                                <input type="file" id="imageLogo" accept="image/*" @change="handleImageUpload" required>
                            </div>
                            <div class="form-group">
                                <!-- Add a preview for the uploaded image (optional) -->
                                <img v-if="imagePreview" :src="imagePreview" alt="Uploaded Image">
                            </div>
                            <div class="form-group">
                                <label for="auteur">Description :</label>
                                <input type="text" id="auteur" v-model="imgToAdd.description">
                            </div>
                            <div class="form-group">
                                <label for="auteur">Auteur :</label>
                                <input type="text" id="auteur" v-model="imgToAdd.auteur" required>
                            </div>

                            <div class="form-group">
                                <label for="date">Date de publication :</label>
                                <input type="date" id="date" v-model="imgToAdd.date" required>
                            </div>
                            <div class="form-group">
                                <label for="auteur">Copyright :</label>
                                <input type="text" id="auteur" v-model="imgToAdd.copyright" required>
                            </div>
                            <div class="form-group">
                                <button class="button" @click="pushImage()">Ajouter Image</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="submit-button">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
import axiosInstance from '@/axios';
import { nanoid } from 'nanoid'
import { VueDraggableNext } from 'vue-draggable-next'
export default {
    components: {
        draggable: VueDraggableNext,
    },
    data() {
        return {
            focale: {
                titre: '',
                numero: '',
                description: '',
                images: []
            },
            imgToAdd: {
                id: '',
                auteur: 'f',
                titre: 'f',
                description: 'caca',
                date: 'd',
                copyright: 'd',
                image: null
            },
            imagePreview: null,
            addImage: false
        }
    },
    mounted() {
        console.log(axiosInstance)
    },
    methods: {
        editImage(id){
            //TODO
            console.log(id)
        },
        deleteImage(id){
            this.focale.images = this.focale.images.filter(img => img.id !== id)
        },
        getImageUrl(file) {
            if (file) {
                // Create a data URL from the File object
                return URL.createObjectURL(file);
            }
            // Return a default image URL or handle empty image as needed
            return 'default-image.jpg';
        },
        resetAdd() {
            this.imgToAdd.id = ''
            this.imgToAdd.auteur = ''
            this.imgToAdd.titre = ''
            this.imgToAdd.description = ''
            this.imgToAdd.copyright = ''
            this.imgToAdd.date = ''
            this.imgToAdd.image = null
        },
        pushImage() {
            this.imgToAdd.id = nanoid();

            // Create a clone of the image File object
            const clonedImage = new File([this.imgToAdd.image], this.imgToAdd.image.name);

            // Create a copy of imgToAdd without the image property
            const imgToAddCopy = { ...this.imgToAdd, image: clonedImage };

            // Push the copy into focale.images
            this.focale.images.push(imgToAddCopy);

            this.resetAdd()
            this.imagePreview = null
            this.addImage = false

        },
        handleImageUpload(event) {
            const file = event.target.files[0];

            // Check if a file was selected
            if (file) {
                // Display a preview of the selected image (optional)
                this.imagePreview = URL.createObjectURL(file);
                this.imgToAdd.image = file
                // Assign the selected file to the article's imageLogo property
            } else {
                // Clear the imagePreview and imageLogo if no file was selected
                this.imagePreview = null;
                this.imgToAdd.image = null;
            }
        },
        sendFocaleToBackend() {
      // Create a FormData object to send the form data, including images
     
      axiosInstance
        .post('/api/addFocale', this.focale)
        .then(response => {
          // Handle the response from the backend if needed
          console.log('Backend response:', response.data);
          const id = response.data
          this.sendImagesToBackend(id)
        })
        .catch(error => {
          // Handle errors if the request fails
          console.error('Error sending data to the backend:', error);
        });
    },
    sendImagesToBackend(id) {
    const formData = new FormData();

    formData.append(`generalId`, id);
    // Append each JSON object and its associated image to the FormData
    this.focale.images.forEach((imageObj, index) => {
      // Append the image File objects with unique names, e.g., 'image0', 'image1', etc.

      formData.append(`images`, imageObj.image);

      // Append the associated ID for each image
      formData.append(`id${index}`, imageObj.id);
    });


    // Send the FormData object with JSON objects and images to the backend using Axios
    axiosInstance
      .post('/api/uploadFocale', formData)
      .then(response => {
        // Handle the response from the backend if needed
        console.log('Backend response:', response.data);
      })
      .catch(error => {
        // Handle errors if the request fails
        console.error('Error sending data to the backend:', error);
      });
  },
        createFocal() {
            this.$emit('componentChanged', 'focal')
        }
    }
}
</script>
<style scoped>
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
    padding-top: 20px;
    justify-content: space-between;
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



/* Input and textarea styles */
input[type="text"],
textarea,
input[type="file"],
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
    margin-bottom: 20px;
    /* Adjust spacing between stacked cards */
    border: 1px solid #ccc;
    padding: 10px;
    max-width: 400px;
    /* Set a maximum width for the card */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Add a subtle shadow */
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

</style>