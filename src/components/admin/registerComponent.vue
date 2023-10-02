<template>
    <div>
        <div>
            <div> 
                <h1>Utilisateurs existant</h1>
                <div class="tableDiv">
                    <table>
      <thead>
        <tr>
            <th>Supprimer</th>
          <th>Nom utilisateur</th>
          <th>Mail</th>
          <th>Id</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td><button @click.stop="deleteUser(user.id)">Supprimer</button></td>
          <td>{{ user.name }}</td>
          <td>{{ user.mail }}</td>
          <td>
            {{ user.id }}
          </td>
          <td>{{ user.type }}</td>
          
        </tr>
      </tbody>
    </table>
                </div>
            </div>
            <div>

                <form @submit.prevent="register">
            <h2>Inscrire un nouveau collaborateur</h2>
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="formData.username" required>
            </div>
            <div>
                <label for="password">Mail :</label>
                <input type="mail" id="mail" v-model="formData.mail" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="formData.password" required>
            </div>
            <button type="submit">Enregistrer un utilisateur</button>
        </form>

            </div>
        </div>

        
    </div>
</template>
<script>
import axiosInstance from '../../axios.js';
export default{
    mounted(){
        axiosInstance.get("/api/getAllUser").then(response =>
        {
            this.users = response.data
        }).catch(error => 
        {
            this.users = null
            console.log(error)

        })
    },
    data(){
        return {
            formData: {
                        username: '',
                        mail : '',
                        password: '',
                    },
                    users : []
        }
    },
    methods : {
        register() {
                    // Send a POST request with the form data to your backend API
                    // You can use libraries like Axios or the native Fetch API for this
                    // Example with Axios:
                    axiosInstance.post('/api/register', this.formData)
                        .then(response => {
                            // if (response.connected === true){
                            //     this.locals
                            // }
                            console.log("on a recu une reponse",response)
                            // Handle the response from the server
                        })
                        .catch(error => {
                            console.log("on a recu une erreur",error)

                            // Handle any errors
                        });
                    console.log('Form data:', this.formData);
                },
    }
}

</script>
<style>

</style>