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
                        <!-- <th>Id</th> -->
                    </tr>
                </thead>
                <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td><button  class="button" @click.stop="deleteNewsletter(user.id)">Supprimer</button></td>
          <td>{{ user.name }}</td>
          <td>{{ user.mail }}</td>
          <!-- <td>
            {{ user.id }}
          </td> -->
          
        </tr>
      </tbody>
            </table>
        </div>
        <div class="registrationDiv">
            <form @submit.prevent="addNewsletter">
                <h2>Ajouter mail à la Newsletter</h2>
                <div>
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="formData.username" required>
                </div>
                <div>
                    <label for="mail">Mail :</label>
                    <input type="email" id="mail" v-model="formData.mail" required>
                </div>
                
                <button type="submit">Ajouter à la newsletter</button>
            </form>
        </div>
    </div>
</template>
<script>
import axiosInstance from '@/axios'
export default{
    data(){
        return {
            formData : {
                mail : '',
                username:''
            },
            users : []
        }
    },
    methods : {
        addNewsletter(){
            axiosInstance.post('/api/addNewsletter',{ user : this.formData})
            .then(() =>
            {
                this.$message({
              message: 'Utilisateur ajouté à la newsletter',
              type: 'success',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            });
        } 
        )
            .catch(error => 
            this.$message({
              message: error,
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            }))
        },
        setNewsletter(){
            axiosInstance.get('/api/getNewsletter').then(response => 
            this.users = response.data).catch(error => console.error(error))
            
        },
        deleteNewsletter(id){
            axiosInstance.delete(`/api/deleteNewsletter/${id}`).then(() => {
            this.$message({
              message: 'Utilisateur supprimé de la newsletter',
              type: 'success',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            });
            this.setNewsletter()
          })
          .catch(error => {
            console.error(error)
          });        }
    },
    mounted(){
        this.setNewsletter()
        // Request to get the newsletterState
    }
}
</script>

<style>
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

        .button {
  background-color: lightgreen;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 8px;
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