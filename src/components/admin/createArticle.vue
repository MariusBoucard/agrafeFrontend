<template>
<div class="container">
  <form @submit.prevent="submitForm" class="article-form">
    <h2 class="form-title">Add an Article</h2>

    <div class="form-columns">
      <!-- Left column -->
      <div class="form-column">
        <div class="form-group">
      <label for="titreFront">Title:</label>
      <input type="text" id="titreFront" v-model="article.titreFront" required>
          </div>

      <label for="description">Description:</label>
      <textarea id="description" v-model="article.description" required></textarea>

      <label for="imageLogo">Image Upload:</label>
      <input type="file" id="imageLogo" accept="image/*" @change="handleImageUpload" required>

      <!-- Add a preview for the uploaded image (optional) -->
      <img v-if="imagePreview" :src="imagePreview" alt="Uploaded Image">

      <label for="imageLogo">Pdf Article Upload:</label>
      <input type="file" id="articlePdf" accept="pdf/*" @change="handlePdfUpload" required>
      
      <!-- Add input fields for other attributes as needed -->
      <label for="path">Article Path:</label>
      <input type="text" id="path" v-model="article.path" required>

      <label for="auteur">Author:</label>
      <input type="text" id="auteur" v-model="article.auteur" required>

      <label for="numeroParu">Publication Number:</label>
      <input type="text" id="numeroParu" v-model="article.numeroParu" required>
      </div>
      <div class="form-column">

        <label for="date">Publication Date:</label>
        <input type="date" id="date" v-model="article.date" required>
        
        <label for="private">Is Private:</label>
        <input type="checkbox" id="private" v-model="article.private">
        
      <label for="rubrique">Rubrique:</label>
      <input type="text" id="rubrique" v-model="article.rubrique" required>

      <label for="misEnLigne">Publication Status:</label>
      <select id="misEnLigne" v-model="article.misEnLigne" required>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>
      
      <label for="fileType">File Type:</label>
      <input type="text" id="fileType" v-model="article.fileType" required>
    </div>
      </div>
      <button type="submit" class="submit-button">Submit</button>    </form>
    </div>
  </template>
<script>
import axiosInstance from '@/axios';
export default{
    data(){
        return {
      article: {
        titreFront: "sdf",
        description: "fds",
        imageLogo: "fsd",
        path : "dsf",
        auteur  :"sdf",
        numeroParu :"fsd",
        date : "fds",
        private : "sfd",
        // Attention, bien save l id de la rubrique
        rubrique : "fds",
        misEnLigne : "dfs",
        articlePdf : "",
        fileType : "fds",
        // Initialize other attributes with empty values or default values
        // For example: auteur: "", numeroParu: "", date: "", ...
      },
      imagePreview: null, // Store the image preview URL
    };
    },
    methods : {

    handleImageUpload(event) {
      const file = event.target.files[0];

      // Check if a file was selected
      if (file) {
        // Display a preview of the selected image (optional)
        this.imagePreview = URL.createObjectURL(file);

        // Assign the selected file to the article's imageLogo property
        this.article.imageLogo = file;
      } else {
        // Clear the imagePreview and imageLogo if no file was selected
        this.imagePreview = null;
        this.article.imageLogo = null;
      }
    },
    handlePdfUpload(event) {
      const file = event.target.files[0];

      // Check if a file was selected
      if (file) {
 

        // Assign the selected file to the article's imageLogo property
        this.article.articlePdf = file;
      } else {
        // Clear the imagePreview and imageLogo if no file was selected
        this.article.articlePdf = null;
      }
    },
   
    submitForm() {
  // Create a FormData object to send the article data with the image
  
  axiosInstance.post('/api/addArticle',{ article : this.article},)
    .then(response => {
      // Handle the response from the backend
      console.log(response.data);

    const id = response.data
    const formData = new FormData();
    console.log(response.data)
    formData.append('imageLogo', this.article.imageLogo);
    formData.append('articleId', id ); // Add your string data here
    axiosInstance.post('/api/uploadImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      const formData = new FormData();
        console.log(response.data)
        formData.append('articlePdf', this.article.articlePdf);
        formData.append('articleId', id ); // Add your string data here
        axiosInstance.post('/api/uploadPdfArticle', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
      },
    }).then(response => console.log(response)).catch(error => console.log(error))
      // Handle the response from the backend
      console.log(response.data);
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
  justify-content: space-between; /* Separate columns with space */
  gap: 16px; /* Gap between columns */
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