<template>
 <div class="card">
  <div class="grid-container">
    <div class="left-column">
      <div class="blackDiv">
        N° {{ article.numeroParu }}. {{ formatDate(article.date) }}
      </div>
    
    </div>
    <div class="right-column"> 
        <div class="haut">
            <div class="highDiv">

                <p class="rubrique">
                    {{ getRubrique(article.rubrique) }}
                </p>
            </div>
            <div class="highDivTitle">
                
                <p class="titre">
                    {{ article.titreFront }}
                </p>
            </div>
            <div class="highDiv">

                <p class="auteur">
                    {{ article.auteur }}
                </p>
            </div>
      </div>
      <div style="margin-bottom: 20px;">
        <div class="descriptionDiv">
            <p>
            {{ truncatedDescription }}
            </p>
            <span v-if="isTruncated" class="readMore" @click="expandDescription">...lire plus</span>
            <span v-if="!isTruncated" class="readMore" @click="expandDescription">...lire moins</span>


        </div>
        <div class="lienDiv">
            <a :href="`/article/${article.id}`" class="lienArticle">Lire l'article</a>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
<script>
export default {
    props : {
        article : {required : true, type : Object},
        rubriques : { required : true, type : [Object]}
    },
    data(){
        return{
            isTruncated: true,
        }
    },
    computed : {
        truncatedDescription(){
            if(this.isTruncated){
                return this.article.description.slice(0, 200)+"..."
            }
            return this.article.description
        }
    },
    methods : {
     
        formatDate(date){
            const year = date.slice(0,4)
            const month = date.slice(5,7)
            
            const ret = this.monthToDate(month)
            return ret+". "+year
        },
        getRubrique(rubId){
            const found = this.rubriques.find(rub => rub.id === rubId)
            if(found){
                return found.rubrique
            }
        },
        monthToDate(month){
            console.log(typeof month)

            switch (month) {
            case '01':
            return 'Jan';
            case '02':
            return 'Fev';
            case '03':
            return 'Mar';
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
        },
        expandDescription() {
      this.isTruncated = !this.isTruncated;
    },
    }
}
</script>
<style>
.highDivTitle{
    width: 45%;
   margin-left:10px;
    text-align: center;
}
.highDiv{
    width:25%
}


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
    margin-top: 10px;
    padding-right: 20px; ;
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
.readMore {
  color: rgb(124, 124, 124);
  font-family: "Bahnschrift", sans-serif;
  text-decoration: underline;

  cursor: pointer;
}

.lienDiv{
    text-align: left;
}
.lienArticle {
  font-family: "Bahnschrift", sans-serif;
  color:grey;
  /* Additional styles for your links (e.g., color, text-decoration, etc.) */
}







.highDiv, .highDivTitle {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.rubrique, .titre, .auteur {
  margin: 0;
  padding: 0;
}

@media (max-width: 600px) {
  .haut {
    align-items: center;
    flex-direction: column;
  }

  .rubrique, .titre, .auteur {
    font-size: 14px; /* adjust as needed */
  }
}
</style>