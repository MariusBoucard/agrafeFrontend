<template>
    <div> 
        <h1>Gestion des rubriques</h1>

        <div class="container">
        <div class="column">
            <!-- Content for the left column goes here -->
            <h2>Rubriques existantes</h2>
            <table>
        <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Rubroute</th>
            <th>nombreArticles</th>
        </tr>
        <tr v-for="rub in rubriques" :key="rub.id">
            <td>{{ rub.rubrique }}</td>
            <td>{{ rub.description }}</td>
            <td>{{ rub.rubRoute }}</td>
            <td>{{ rub.nombreArticles }}</td>
        </tr>
    </table>
          
        </div>
        <div class="column">
            <div>
                <h2>Ajouter une rubrique</h2>
                <form @submit.prevent="addRubrique">
            <label for="rubrique">Rubrique:</label>
            <input type="text" id="rubrique" v-model="rubrique.rubrique" required>

            <label for="description">Description:</label>
            <input type="text" id="description" v-model="rubrique.description" required>

            <label for="rubRoute">Rubrique Route:</label>
            <input type="text" id="rubRoute" v-model="rubrique.rubRoute" required>

            <button type="submit">Ajouter la rubrique</button>
        </form>
            </div>
            <div> 
                <h2>Modifier une rubrique</h2>
                <form @submit.prevent="modifyRubrique">
            <label for="rubrique">Rubrique:</label>
            <select id="rubrique" v-model="rubrique.id" required>
                <option v-for="rub in rubriques" :key="rub.id" :value="rub.id">{{ rub.rubrique }}</option>
                
                <!-- Add more options as needed -->
            </select>

            <label for="description">Description:</label>
            <input type="text" id="description" v-model="rubrique.description" required>

            <label for="rubRoute">Rubrique Route:</label>
            <input type="text" id="rubRoute" v-model="rubrique.rubRoute" required>

            <button type="submit">Modifier la rubrique</button>
        </form>
            </div>
            <!-- Content for the right column goes here -->
        </div>
    </div>
    </div>
</template>
<script>
import axiosInstance from '@/axios'


export default {
    mounted(){
        this.setRubriques()
    },
    data(){
        return {
            rubriques : [],
            rubrique : {
                "id" : "",
                "rubrique" : "",
                "description" : "",
                "rubRoute" : ""
            }
        }
    },
    methods : {
        modifyRubrique(){
            const name = this.rubriques.find(a => a.id === this.rubrique.id)
            this.rubrique.rubrique = name.rubrique
            axiosInstance.post('/api/modifyRubrique',{rubrique : this.rubrique}).then(
                () => {this.$message(
                    {message : "Rubrique modifiée"}
                )
                this.setRubriques()
            }
            ). catch(error => console.error(error))
        },
        setRubriques(){
           axiosInstance.get('/api/getRubriques').then(response => {
            this.rubriques = response.data
           }
           ).catch(error => 
           this.$message(error)
           )
        },
        addRubrique(){
            axiosInstance.post('/api/addRubrique', { rubrique : this.rubrique}).then(
                () => {
                    this.$message({
                    message: 'Rubrique ajoutée !!',
                    type: 'success',
                    customClass: 'custom-el-message',
                    duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
                    })
                    this.setRubriques()
                } 
            ).catch(() => this.$message({
              message: 'Erreur lors de l`ajout de la rubrique',
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            }))
        //On va pas supprimer de rubrique sinon ça risque de foutre la merde avec la retrocompatibilité

    }
    }
}
</script>
<style>
  /* Style for the container div */
.container {
    display: flex;
    flex-wrap: wrap; /* Allow columns to wrap to the next line */
    justify-content: space-between;
    padding: 20px;
}

/* Style for the individual columns */
.column {
    flex: 1 1 calc(50% - 20px); /* 50% width minus padding */
    margin-right: 20px; /* Add spacing between columns */
    padding: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

/* Remove margin for the last column to prevent overflow */
.column:last-child {
    margin-right: 0;
}

</style>