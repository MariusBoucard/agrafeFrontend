<template>
    <div class="card">
     <div class="grid-container">
       <div class="left-column">
         <div class="blackDiv">
            {{ formatDate(actu.date) }}
         </div>
       
       </div>
       <div class="right-column"> 
           <div class="haut">
              
            
               <p class="titre">
                   {{ actu.titre}}
               </p>
         </div>
         <div style="margin-bottom: 20px;">
           <div class="descriptionDiv">
               <p>
                {{ displayDescription }}
               </p>
           </div>
           <div class="lienDiv">
            <button @click="toggleDescription" class="lienArticle">
        {{ isFullDescription ? 'Cacher' : 'Afficher toute l\'actu' }}
      </button>  
    
    </div>
         </div>
       </div>
     </div>
   </div>
   
   </template>
   <script>
   export default {
       props : {
           actu : {required : true, type : Object},
       },
       data(){
              return {
                isFullDescription: false,

              }
         },
         computed: {
    displayDescription() {
      if (this.isFullDescription || this.actu.description.length <= 400) {
        return this.actu.description;
      } else {
        return this.actu.description.slice(0, 100) + '...';
      }
    },
  },
       methods : {
        toggleDescription() {
      this.isFullDescription = !this.isFullDescription;
    },
           formatDate(date){
               const year = date.slice(0,4)
               const month = date.slice(5,7)
               const day = date.slice(8,10)
               const ret = this.monthToDate(month)
               return day+" "+ret+" "+year
           },
           monthToDate(month){
               console.log(typeof month)
   
               switch (month) {
               case '1':
               return 'Janvier';
               case '2':
               return 'Février';
               case '3':
               return 'Mars';
               case '4':
               return 'Avril';
               case '5':
               return 'Mai';
               case '6':
               return 'Juin';
               case '7':
               return 'Juillet';
               case '8':
               return 'Août';
               case '9':
               return 'Septembre';
               case '10':
               return 'Octobre';
               case '11':
               return 'Novembre';
               case '12':
               return 'Décembre';
               default:
               return 'Unknown';
           }
           }
       }
   }
   </script>
   <style>
   .blackDiv{
       background-color: black;
       width:90%;
       color:white;
       padding-top: 10px;
       padding-bottom: 10px;
   
       margin-top: 10px;
   }
   .card {
     display: flex;
     justify-content: center; /* Center the content horizontally */
   }
   
   .grid-container {
     display: grid;
     grid-template-columns: 30% 70%; /* Define the grid columns */
     width: 100%; /* Ensure it takes up the full width of the card */
     border:1px solid rgb(163, 163, 163);
   }
   
   .left-column {
   }
   
   .right-column {
    
   }
   .haut{
       width:100%;
       display: flex;
   }
   .rubrique{
       color:rgb(153, 153, 153);
       font-family: "Bahnschrift", sans-serif;
   
   }
   .auteur{
       padding-left: 10px;
       font-family: "Bahnschrift", sans-serif;
   
       color: black;
   }
   .titre{
       font-family: "Berlin Sans FB", sans-serif;
       font-weight: 1000;
       color: black;
       padding: 0px;
   }
   .descriptionDiv{
       width:90%;
   }
   .descriptionDiv > p {
       text-align: left;
       font-family: "Bahnschrift", sans-serif;
       color:black;
   
   }
   .lienDiv{
       text-align: left;
   }
   .lienArticle {
    background: none;
  border: none;
  color: grey;
  text-decoration: underline;
  cursor: pointer;
  font-size: 1em;
  padding: 0;
     /* Additional styles for your links (e.g., color, text-decoration, etc.) */
   }
   </style>