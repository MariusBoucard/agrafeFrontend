<template>
<div class="container">
  <form @submit.prevent="submitForm" class="article-form">
    <h2 class="form-title">Ajouter une archive</h2>

    <div class="form-columns">
      <!-- Left column -->
      <div class="form-column">
        <div class="form-group">
      <label for="titreFront">Titre de l'archive :</label>
      <input type="text" id="titreFront" v-model="archive.titre" required>
      </div>
          <div class="form-group">
      <label for="description">Description :</label>
      <textarea id="description" v-model="archive.description" required></textarea>
            </div>

        <div class="form-group">
      <label for="imageLogo">Archive en pdf :</label>
      <input type="file" id="articlePdf" accept=".pdf" @change="handlePdfUpload" required>
        </div>
    </div>
    <div class="form-column">
      
        <div class="form-group">

          <label for="numeroParu">Numéro du journal :</label>
          <input type="text" id="numeroParu" v-model="archive.numero" required>
        </div>
        <div class="form-group">
        <label for="date">Date de publication :</label>
        <input type="date" id="date" v-model="archive.date" required>
        </div>
  
        
  
    </div>
      </div>
      <button type="submit" class="submit-button">Submit</button>    </form>
    </div>
  </template>
<script>
import axiosInstance from '@/axios';
export default{
  mounted(){
  
  },
    data(){
        return {
      archive : {
        titre: "sdf",
        description: "fds",
       numero : "",
       date : "",
       archivePdf : ""
        // Initialize other attributes with empty values or default values
        // For example: auteur: "", numeroParu: "", date: "", ...
      },
    };
    },
    methods : {

  
    handlePdfUpload(event) {
      const file = event.target.files[0];

      // Check if a file was selected
      if (file) {
        // Assign the selected file to the article's imageLogo property
        this.archive.archivePdf = file;
      } else {
        // Clear the imagePreview and imageLogo if no file was selected
        this.archive.archivePdf = null;
      }
    },
   
    submitForm() {
  // Create a FormData object to send the article data with the image
  
  axiosInstance.post('/api/addArchive',{ archive : this.archive},)
    .then(response => {
      // Handle the response from the backend

    const id = response.data
    const formData = new FormData();
    formData.append('archivePdf', this.archive.archivePdf);
    formData.append('archiveId', id ); // Add your string data here
    axiosInstance.post('/api/uploadPdfArchive', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      this.$emit('componentChanged','archive')
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
</script>
<style scoped>
/* Container for the form */
.article-form{
  width : 100%;
}
.container {
  width: 100%;
  max-width: 800px; /* Adjust as needed */
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
  width:100%;
  justify-content: space-between; /* Separate columns with space */
  gap: 16px;
}

/* Form column */
.form-column {
  flex-basis: 48%; /* Set column width to 48% for 2 columns with a small gap */
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
  margin : 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #4caf50; /* Darker shade of green on hover */
}

/* Form field required indicator */
input:required::after {
  content: "*";
  color: red;
  margin-left: 4px;
}
</style>