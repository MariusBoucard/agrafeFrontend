<template>
    <div class="codeDiv">
  
  <nav class="navbar">
    <p style="margin-left: 10px;">Envoi de fichiers</p>
    
    <div style="display: flex;">
        <button @click="reload">Reload</button>

    </div>

  </nav>
  <input type="text" placeholder="path" v-model="foreignPath">
  <div class="fileDisplay">
    <li class="return" @click="returnOne()">../</li>
    <ul>
    <li v-for="file in files" :key="file" @click="file.type === 'directory' && openDirectory(file.name)">
        <img class="listimage" v-if="file.type === 'directory'" src="../../assets/utils/folder.png" alt="Directory Logo">
        <img class="listimage" v-else src="../../assets/utils/document.png" alt="File Logo">
        <p>
            {{ file.name }}

        </p>
        <button class="removebutton" @click.stop="removeFile(file.name)"> X </button>
        <button class="removebutton" @click.stop="downloadFile(file.name)">O</button>
      </li>
    </ul>
  </div>


  <div class="inputDiv">

    
    <input class="inButton" type="file" @change="onFileChange">
    
    
    <button  class="inButton" @click="uploadFile">Upload file</button>
  </div>

</div>

    <div>
        
    </div>
</template>
<script>
import Axiosinstance from '../../axios';
export default{
    name: 'FileUploadComponent',
    data(){
        return{
            files: null,
            foreignPath : "/"
        }
    },
    methods:{
        returnOne(){
            var pat = this.foreignPath
            var pat2 = pat.split("/")
            pat2.pop()
            pat2.pop()
            this.foreignPath = pat2.join("/")+"/"
            this.reload()
        },
        reload(){
            Axiosinstance.post('/fileList',{pathfile : this.foreignPath}).then((response) => {
                console.log(response.data)
                this.files = response.data
            }).catch((err) => {
                console.log(err)
            });
          console.log()
        },

        onFileChange(e){
            this.file = e.target.files[0];
        },
        openDirectory(name){
            this.foreignPath = this.foreignPath + name + "/"
            this.reload()
        },
        uploadFile(){
            let formData = new FormData();
    formData.append('file', this.file);
    formData.append('path', this.foreignPath);

    Axiosinstance.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(() => {
        console.log('File uploaded successfully');
        this.reload()
    }).catch(() => {
        console.log('File upload failed');
    });
        },
        removeFile(name){
        console.log(name)
            var pat = this.foreignPath+name
            Axiosinstance.post('/deletefile',{
                pathfile : pat
            }).then((res) => {
                console.log(res);
                this.reload()
            }).catch((err) => {
                console.log(err);
            });
        },
        downloadFile(name) {
  var path = this.foreignPath + name;
  Axiosinstance.post('/getFile', {
    pathfile: path,
    responseType: 'blob'  // indicates that the server response should be handled as Blob
  })
  .then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name); // or any other extension
    document.body.appendChild(link);
    link.click();
  })
  .catch((error) => {
    console.log(error);
  });
}
    },mounted(){
        this.reload()
    }
}
</script>
<style scoped>
.return{
  height: 30px;
  font-size: xx-large;
  border-bottom: #a0a0a0 1px solid;
  margin: 0px;
  width: 100%;

}

.inputDiv {
  margin-top:20px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

.inButton {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.inButton:hover {
  background-color: #45a049;
}

.listimage {
    width: 20px;
    height: 20px;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
}
.fileDisplay {
    background-color: white;
    min-height: 100px;
}

.fileDisplay ul {
    list-style-type: none;
    padding: 0;
}

.fileDisplay ul li {
    display: flex;
    padding: 10px 0;
}
 h3 {
    margin: 40px 0 0;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
  
  .bas {
    display: flex;
    justify-content: flex-end;
  }
  .removebutton {
    background-color: #282c34;
    /* Dark background */
    color: #32CD32;
    /* Glowy green text */
    border: none;
    /* Glowy green border */
    padding: 10px;
    margin-right: 20px;
    margin-left: auto;
    border-radius: 5px;
  }
  .code-input {
    width: 100%;
    height: 60vh;
    padding: 10px;
    box-sizing: border-box;
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    line-height: 1.6;
    color: #f8f8f8;
    /* Light grey color for the text */
    background-color: #282c34;
    /* Dark grey color for the background */
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    border-radius: 10px;
  }
  
  nav {
    padding: 30px;
    border-radius: 10px;
  }
  
  nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  
  nav a.router-link-exact-active {
    color: #42b983;
  }
  
  .close {
    background-color: #282c34;
    /* Dark background */
    color: #32CD32;
    /* Glowy green text */
    border: none;
    /* Glowy green border */
    padding: 10px;
    margin-right: 20px;
    margin-left: 20px;
    border-radius: 5px;
  }
  
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .codeDiv {
    padding: 20px;
    border: #282c34 1px solid;
    margin: 20px;
    border-radius: 10px;
    background-color: #538a57;
  
  }
  
  .navbar {
    background-color: #282c34;
    /* Dark background */
    padding: 10px;
    color: #32CD32;
    /* Glowy green text */
  }
  
  .navbar a {
    color: #32CD32;
    /* Glowy green links */
    text-decoration: none;
  }
  
  .navbar a:hover {
    color: #7CFC00;
    /* Lighter green on hover */
  }
  
  .navbar select,
  .navbar button {
    background-color: #32CD32;
    /* Dark background */
    color: #282c34;
    /* Glowy green text */
    border: none;
    /* Glowy green border */
    padding: 10px;
    margin-right: 20px;
    margin-left: 20px;
    border-radius: 5px;
  }
  
  .navbar select:hover,
  .navbar button:hover {
    background-color: #282c34;
    /* Glowy green background on hover */
    color: #32CD32;
    /* Dark text on hover */
  }
  </style>