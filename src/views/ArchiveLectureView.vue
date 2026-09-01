<template>
    <div class="baseView">
     
        <div class="centerDiv">
           

            <div class="focalInfo">
              
            </div>
            <p class="subText"> N° {{ currentArchive.numero }}. {{ formatDate(currentArchive.date) }}</p>
            <div style="display: flex;">
                <div class="column" style="width: 10%;" @click="lastPage()">

                    <div class="middleIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
                            <path fill-rule="evenodd"
                                d="M19.5 5.653c0-1.426-1.529-2.33-2.779-1.643l-11.54 6.348c-1.295.712-1.295 2.573 0 3.285l11.54 6.348c1.25.687 2.779-.217 2.779-1.643V5.653z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <!-- Content for the first column -->
                </div>
                <div class="column" style="width: 80%;">
                    
                    <div v-if="currentPage==1" style="width:50%; margin: auto; height: 100%;">
                        
                        <pdf :src="`${baseUrl}/api/save/saveArchive/pdf/${archiveId}.pdf`" :page="currentPage" :key="currentPage" ref="pdfViewer"></pdf>
                    </div>
                    <div v-if="currentPage == nbPages" style="width:50%; margin: auto;height: 100%;">
                        <img :src="`${baseUrl}/api/save/saveArchive/back/${archiveId}.png`" style="width: 100%; ">
                    </div>
                    <!-- Content for the second column -->
                    <div v-if="currentPage!=1 && currentPage != nbPages" style="width:50%">
                        <pdf :src="`${baseUrl}/api/save/saveArchive/pdf/${archiveId}.pdf`" :page="currentPage" ref="pdfViewer"></pdf>
                    </div>
                    <div v-if="currentPage!=1 && currentPage != nbPages" style="width:50%">
                        <pdf :src="`${baseUrl}/api/save/saveArchive/pdf/${archiveId}.pdf`" :page="currentPage+1"></pdf>
                    </div>
                    
                </div>
                <div class="column" style="width: 10%;">
                    <div class="middleIcon" @click="nextPage()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
                            <path fill-rule="evenodd"
                                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <!-- Content for the third column -->
                    <a  class="bottomLink" style="position: absolute; bottom: 10px;right: 20px;">
                        <button class="download-button" @click="downloadArchive()">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2 h-2" style="height: 50px;width: 50px;;">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
</svg>

                            Télécharger
                        </button>
                    </a>
                </div>
                
            </div>
            <p class="subText"> Page {{currentPage}} / {{ nbPages }}</p>

        </div>
    </div>
</template>

<script>
import pdf from 'vue3-pdf';
import { PDFDocument } from 'pdf-lib';
import baseUrl from '../config';
import axiosInstance from '@/axios';
// import { $route } from 'vue-router';
export default {
    name: "FocaleView",
    components: {
        pdf
    },
    data() {
        return {
            
            baseUrl: baseUrl,
            archiveId: "",
            currentPage : 1,
            nbPages :10,
            currentArchive: {}
        };
    },
    mounted() {
        this.getArchive()
        this.fetchPdf()
    },
    watch: {
        pdfUrl: function () {
            this.fetchPdf()
        },
        currentPage() {
          try{
                this.$refs.pdfBack.renderPage(this.currentPage);
            } catch(error){
                console.log(error)
            }
        },
    },
    methods: {
    downloadArchive() {
        let url = this.baseUrl + "/api/save/saveArchive/pdf/" + this.archiveId + ".pdf";
let link = document.createElement('a');
link.href = url;
link.setAttribute('download', this.archiveId + '.pdf'); // provide a default filename
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
    },
        async fetchPdf() {
            let url = this.baseUrl+"/api/save/saveArchive/pdf/"+this.archiveId+".pdf"

            axiosInstance.get('/api/getArchivePublic/'+this.archiveId).then((response) => {
                this.currentArchive = response.data
            }).catch((error) => {
                console.log(error)
            })
      try{

          const response = await fetch(url);
          const arrayBuffer = await response.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          console.log(pdfDoc)
         const numPages = pdfDoc.getPageCount();
          
           this.nbPages = numPages;
        } catch(error){
            console.log(error)
        }
    },
 

        getArchive() {
            const id = this.$route.params.id;
            this.archiveId = id;
            

        },
        lastPage() {
            if (this.currentPage == 2) {
                this.currentPage -= 1
            } else if(this.currentPage > 2){
               this.currentPage -= 2
           }
        },
        nextPage() {
            if(this.currentPage == 1){
                this.currentPage += 1
            } else if(this.currentPage < this.nbPages){
               this.currentPage += 2
           }
        },
        formatDate(date){
            if(date == undefined){
                return ""}
               const year = date.slice(0,4)
               const month = date.slice(5,7)
               const ret = this.monthToDate(month)
               return ret+". "+year
           },
           monthToDate(month){
               console.log(typeof month)
   
               switch (month) {
               case '01':
               return 'Jan';
               case '02':
               return 'Fév';
               case '03':
               return 'Mars';
               case '04':
               return 'Avr';
               case '05':
               return 'Mai';
               case '06':
               return 'Juin';
               case '07':
               return 'Juil';
               case '08':
               return 'Août';
               case '09':
               return 'Sept';
               case '10':
               return 'Oct';
               case '11':
               return 'Nov';
               case '12':
               return 'Déc';
               default:
               return 'Unknown';
           }
           }
       
    }
}
</script>
<style scoped>
.download-button {
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.download-button:hover {
  background-color: white;
  color: black;
}
.subText {
    font-size: larger;
    margin-top: 20px;
    font-weight: 100  ;
    padding-bottom: 20px;
    color: white;
    text-align: center;
}
.horizontalChooser {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.artiste{
font-size: normal;
font-weight: 30;
letter-spacing: 2px; /* Adjust the value to change the space between letters */

}
.oeuvre{
    font-family: 'bahnschrift', sans-serif;
    margin-bottom: 8px;
    font-style: italic;    
}
.technique{
    margin-top: 0px;
    font-family: 'bahnschrift', sans-serif;

}
.rond {
    border-radius: 50%;
    background-color: white;
    height: 30px;
    width: 30px;
    color: black;
    margin: 10px;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
}

.rond:hover {
    background-color: black;
    color: white;
}

.focalInfo {
    padding-top: 5px;
}

.baseView {
    width: 90%;
    margin: auto;
}

.column {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    min-height: 70vh;
    margin-bottom: 20px;;
}

.middleIcon {
    width: 60px;
    height: 60px;
    margin-top: auto;
    margin-bottom: auto;
}

.header {
    background-color: black;
    color: white
}

.titleHeader {
    font-size: x-large;
    font-family: 'Agrafe', sans-serif;
    width: 90%;
    text-align: left;
    margin-left: auto;
}

.centerDiv {
    color: white;
    background-color: black;
    margin-top: 20px;
    margin-bottom: 60px;
    ;
}

.selected {
    background-color: black;
    color: white;
    border: 1px solid white;
}</style>