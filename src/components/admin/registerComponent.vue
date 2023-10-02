<template>
     <div class="container">
        <div class="tableDiv">
            <h1>Utilisateurs existants</h1>
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
          <td><button class="button" @click.stop="deleteUser(user.id)">Supprimer</button></td>
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
        <div class="registrationDiv">
            <form @submit.prevent="register">
                <h2>Inscrire un nouveau collaborateur admin</h2>
                <div>
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="formData.username" required>
                </div>
                <div>
                    <label for="mail">Mail :</label>
                    <input type="email" id="mail" v-model="formData.mail" required>
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="formData.password" required>
                </div>
                <button type="submit">Enregistrer un utilisateur</button>
            </form>
        </div>
    </div>
</template>
<script>
import axiosInstance from '../../axios.js';
export default{
    mounted() {
        console.log("mounted trigger")
        this.setUser();
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
        setUser(){
            axiosInstance.get("/api/getAllUser").then(response =>
        {
            this.users = response.data
        }).catch(error => 
        {
            this.users = null
            console.log(error)

        })
        },
        deleteUser(id){
            axiosInstance.delete(`/api/deleteUser/${id}`).then(
                response => {
                    console.log(response)
                    this.setUser()
                }
            ).catch(error => console.log(error))
        },

        register() {
                    // Send a POST request with the form data to your backend API
                    // You can use libraries like Axios or the native Fetch API for this
                    // Example with Axios:
                    axiosInstance.post('/api/registerAdmin  ', this.formData)
                        .then(response => {
                            // if (response.connected === true){
                            //     this.locals
                            // }
                            console.log("on a recu une reponse",response)
                                 this.setUser()

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
<style scoped>
     .container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 20px;
        }

        .tableDiv {
            width: 60%;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #f2f2f2;
        }

        .registrationDiv {
            width: 35%;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        h1 {
            font-size: 24px;
            margin-bottom: 20px;
        }

        form {
            display: flex;
            flex-direction: column;
        }

        label {
            font-weight: bold;
            margin-bottom: 5px;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"] {
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button[type="submit"] {
            background-color: #007bff;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button[type="submit"]:hover {
            background-color: #0056b3;
        }
</style>