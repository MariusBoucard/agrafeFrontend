<template>
    <div class="card">
     <div class="grid-container">
       <div class="left-column">
         <div class="blackDiv">
            {{ actu.date }}
         </div>
       
       </div>
       <div class="right-column"> 
           <div class="haut">
              
            
               <p class="titre">
                   {{ formatDate(actu.titre) }}
               </p>
         </div>
         <div style="margin-bottom: 20px;">
           <div class="descriptionDiv">
               <p>
               {{ actu.description }}
               </p>
           </div>
           <div class="lienDiv">
               <a href="caca" class="lienArticle">Lire l'actu</a>
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
       methods : {
           formatDate(date){
               const year = date.slice(0,4)
               const month = date.slice(5,7)
               
               const ret = this.monthToDate(month)
               return ret+". "+year
           },
           monthToDate(month){
               console.log(typeof month)
   
               switch (month) {
               case '1':
               return 'Jan';
               case '2':
               return 'Fev';
               case '3':
               return 'Mar';
               case '4':
               return 'Avr';
               case '5':
               return 'Mai';
               case '6':
               return 'Juin';
               case '7':
               return 'Juil';
               case '8':
               return 'Août';
               case '9':
               return 'Sep';
               case '10':
               return 'Oct';
               case '11':
               return 'Nov';
               case '12':
               return 'Dec';
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
       padding-left: 10px;
       font-weight: 1000;
       color: black;
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
     font-family: "Bahnschrift", sans-serif;
     color:grey;
     /* Additional styles for your links (e.g., color, text-decoration, etc.) */
   }
   </style>