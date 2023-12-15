<template>
    <div class="baseView">
       <div class="header"> 
            <p class="titleHeader">Focale</p>
       </div>

       <div class="centerDiv">
        <div class="horizontalChooser">

                <div v-for="focale in this.focales" :key="focale.id" :class="{ 'selected': focale.id === selectedFocal.id, 'tata': focale.id !== selectedFocal.id }" @click="changeSelectedFocale(focale.id)" class="rond">
                    {{ focale.numero }}
                </div>
        </div>

        <div class="focalInfo">
            <h1>{{ selectedFocal.titre }}</h1>
            {{ focales }}
            <p>Titre de l'oeuvre</p>
            <p>technique</p>
        </div>
        {{ pdfUrl }}
        <div style="display: flex;"> 
            <div class="column" style="width: 10%;" @click="lastFocale()">
            
            <div class="middleIcon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M19.5 5.653c0-1.426-1.529-2.33-2.779-1.643l-11.54 6.348c-1.295.712-1.295 2.573 0 3.285l11.54 6.348c1.25.687 2.779-.217 2.779-1.643V5.653z" clip-rule="evenodd" />
                </svg>
            </div>
            <!-- Content for the first column -->
        </div>
        <div class="column" style="width: 80%;">
            <!-- Content for the second column -->
            <div style="width=50%">
                <pdf :src="`${baseUrl}/save/saveFocale/${selectedFocal.id}/1.pdf`"></pdf>
                </div>
                <div style="width=50%">
                    <pdf :src="`${baseUrl}/save/saveFocale/${selectedFocal.id}/1.pdf`"></pdf>

                </div>

        </div>
        <div class="column" style="width: 10%;">
            <div class="middleIcon" @click="nextFocale()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
                <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
                </svg>

            </div>
            <!-- Content for the third column -->
        </div>
       
            
        </div>

       </div>
    </div>

</template>

<script>
import pdf from 'vue3-pdf';
import baseUrl from '../config';
import axiosInstance from '@/axios';
export default{
    name: "FocaleView",
    components: {
        pdf
    },
    data() {
        return {
            baseUrl : baseUrl,
            pdfUrl: baseUrl+'/save/saveArticle/pdf/4vAAnGg4w3pSlRmOaqn1O.pdf', // Replace with the path to your PDF file
            selectedFocal : { titre : "scooby doo"},
            focales : []
        };
    },
    mounted() {
        this.getFocale()
    },
    methods: {
    changeSelectedFocale(id){
        this.selectedFocal = this.focales.find(focale => focale.id == id)
    },
    
        getFocale(){

       axiosInstance
      .get("/api/getPublicFocale")
      .then((response) => {
        this.focales = response.data;
        console.log(this.focales)
        this.focales.sort((a, b) => (a.numero > b.numero) ? 1 : -1)
        this.selectedFocal = this.focales[this.focales.length-1]
        //this.rubriques.push({id: 'Articles', rubrique: 'Articles'})
      })
      .catch((error) =>
        this.$message({
          message: error,
          type: "error",
          customClass: "custom-el-message",
          duration: 1000,
        })
      );
           
        },
        lastFocale(){
                console.log(this.focales)
                const index = this.focales.findIndex(focale => focale.id === this.selectedFocal.id);
                if (index > 0) {
                    this.selectedFocal = this.focales[index - 1];
                } else {
                    return this.selectedFocal;
                }
            },
        nextFocale(){
            console.log(this.focales)
            const index = this.focales.findIndex(focale => focale.id === this.selectedFocal.id);
            if (index < this.focales.length - 1) {
                this.selectedFocal = this.focales[index + 1];
            } else {
                return this.selectedFocal;
            }
        }
    }
}
</script>
<style scoped>

.horizontalChooser{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.rond{
    border-radius: 50%;
    background-color: white;
    height: 30px;
    width : 30px;
    color : black;
    margin: 10px;
}
.rond:hover{
    background-color: black;
    color : white;
}
.focalInfo{
   padding-top: 5px;
}
.baseView{
    width:90%;
    margin: auto;
}
.column{
    display: flex;
    width: 100%;
    justify-content: center;
    min-height: 70vh;
}

.middleIcon{
    width: 60px;
    height: 60px;
    margin-top: auto;
    margin-bottom: auto;
}
.header{
    background-color: black;
    color : white
}
.titleHeader{
    font-size: x-large;
    font-family: 'Agrafe', sans-serif;
    width: 90%;
    text-align: left;
    margin-left: auto;
}

.centerDiv{
    color : white;
    background-color: black;
    margin-top: 20px;
    margin-bottom: 60px;;
}
.selected{
    background-color: black;
    color : white;
    border: 1px solid white;
}
</style>