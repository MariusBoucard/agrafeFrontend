<template>
    <div class="baseView">
       <div class="header"> 
            <p class="titleHeader">Focale</p>
       </div>

       <div class="centerDiv">
        <div class="focalInfo">
            <h1>{{ selectedFocal }}</h1>
            <p>Titre de l'oeuvre</p>
            <p>technique</p>
        </div>
        {{ pdfUrl }}
        <div style="display: flex;"> 
            <div class="column" style="width: 10%;" @click="lastFocale()">
            
               <div class="middleIcon">
                prout
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
                <path fill-rule="evenodd" d="M19.5 5.653c0-1.426-1.529-2.33-2.779-1.643l-11.54 6.348c-1.295.712-1.295 2.573 0 3.285l11.54 6.348c1.25.687 2.779-.217 2.779-1.643V5.653z" clip-rule="evenodd" />
                </svg>
               </div>
            <!-- Content for the first column -->
        </div>
        <div class="column" style="width: 80%;">
            <!-- Content for the second column -->
            <div style="width=50%">
                <pdf :src="pdfUrl"></pdf>

                </div>
                <div style="width=50%">
                    <pdf :src="pdfUrl"></pdf>

                </div>

        </div>
        <div class="column" style="width: 10%;">
            <div class="middleIcon" @click="nextFocale()">
                queue
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

export default{
    name: "FocaleView",
    components: {
        pdf
    },
    data() {
        return {
            baseUrl : baseUrl,
            pdfUrl: baseUrl+'/save/saveArticle/pdf/4vAAnGg4w3pSlRmOaqn1O.pdf', // Replace with the path to your PDF file
            selectedFocal : "Focale 1",
            focales : []
        };
    },
    mounted() {
        this.getFocale()
    },
    methods: {
        getFocale(){},
        lastFocale(){

        },
        nextFocale(){

        }
    }
}
</script>
<style scoped>
.focalInfo{
   padding-top: 5px;
}
.baseView{
    width:90%;
    margin: auto;
}
.column{
    display: flex;
    justify-content: center;
    min-height: 70vh;
}

.middleIcon{
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
</style>