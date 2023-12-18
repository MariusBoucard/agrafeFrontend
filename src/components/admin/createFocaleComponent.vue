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
                        <div class="form-group">

<label for="date">Date :</label>
<input type="date" id="date" v-model="focale.date" required>
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
                        <div class="form-group">
                            <label for="titreFront">Auteur</label>
                            <input type="text" id="titreFront" v-model="focale.auteur" required>
                        </div>
                    </div>
                    <div class="form-column">

                        <div class="form-group">

                            <label for="numeroParu">Technique</label>
                            <input type="text" id="numeroParu" v-model="focale.technique" required>
                        </div>
                    </div>
                </div>
                <div class="form-columns">
                    <div class="form-column">

                    <div class="form-group">
                                <label for="imageLogo">PDF 1 :</label>
                                <input type="file" id="imageLogo" accept="pdf/*" @change="handlePdfUpoad" required>
                    </div>
                    </div>
                    <div class="form-column">

                    <div class="form-group">
                                <label for="imageLogo">PDF 2 :</label>
                                <input type="file" id="imageLogo" accept="pdf/*" @change="handlePdfUpoad2" required>
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
export default {

    data() {
        return {
            focale: {
                titre: '',
                numero: '',
                description: '',
                auteur : '',
                technique : '',
                pdf1 : '',
                pdf2:'',
                date : ''
            },
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
        handlePdfUpoad(event) {
            const file = event.target.files[0];

            // Check if a file was selected
            if (file) {
                this.focale.pdf1 = file;
      } else {
        // Clear the imagePreview and imageLogo if no file was selected
            this.focale.pdf1 = null;
      }
        },
        handlePdfUpoad2(event) {
            const file = event.target.files[0];

            // Check if a file was selected
            if (file) {
                this.focale.pdf2 = file;
      } else {
        // Clear the imagePreview and imageLogo if no file was selected
            this.focale.pdf2 = null;
      }
        },
        sendFocaleToBackend() {
      // Create a FormData object to send the form data, including images
     
  axiosInstance.post('/api/addFocale',{ focale : this.focale},)
    .then(response => {
      // Handle the response from the backend

    const id = response.data
    const formData = new FormData();
    formData.append('focalePDF', this.focale.pdf1);
    formData.append('focalePDF', this.focale.pdf2);
    formData.append('focaleID', id ); // Add your string data here
    axiosInstance.post('/api/uploadPDFFocale', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      this.$emit('componentChanged','focal')
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


    //   axiosInstance
    //     .post('/api/addFocale', this.focale)
    //     .then(response => {
    //       // Handle the response from the backend if needed
    //       console.log('Backend response:', response.data);
    //       const id = response.data
    //       this.sendImagesToBackend(id)
    //     })
    //     .catch(error => {
    //       // Handle errors if the request fails
    //       console.error('Error sending data to the backend:', error);
    //     });
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