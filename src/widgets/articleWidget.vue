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
            <p class="rubrique">
                {{ getRubrique(article.rubrique) }}
            </p>
            <p class="auteur">
                {{ article.auteur }}
            </p>
            <p class="titre">
                {{ article.titreFront }}
            </p>
      </div>
      <div>
        <p>
            {{ article.description }}
        </p>
          <a>Lire l'article</a>

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
    color:white;
    padding: 10px;
    
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
}

.left-column {
  border: 1px solid #ccc; /* Add a border for separation */
}

.right-column {
      border: 1px solid #ccc; /* Add a border for separation */
}
.haut{
    width:100%;
    display: flex;
}
.rubrique{
    color:grey;
}
.auteur{
    padding-left: 10px;

    color: black;
}
.titre{
    padding-left: 10px;

    color:red
}
</style>