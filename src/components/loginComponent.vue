<template>
    <div class="login-container">
      <form @submit.prevent="login" class="login-form">
        <h2>Login</h2>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="formData.username" required>
        </div>
        <div class="form-group">
          <label for="mail">Mail:</label>
          <input type="email" id="mail" v-model="formData.mail" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="formData.password" required>
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>
  </template>
  
<script>
import axiosInstance from '../axios.js';
import router from '../router/index';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            formData: {
                username: '',
                password: '',
                mail: '',
            },
        };
    },
    methods: {
        ...mapActions('auth', ['setUser', 'setConnection']),
        login() {
            axiosInstance.post('/api/login', this.formData)
                .then((response) => {
                    const token = response.data.token;
                    const bearerToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
                    axiosInstance.defaults.headers.common['Authorization'] = bearerToken;
                    sessionStorage.setItem('token', bearerToken);
                    if (response.data.connected === true) {
                        const role = response.data.role || 'contributor';
                        sessionStorage.setItem('role', role);
                        this.setConnection(true);
                        this.setUser({ role });
                        router.push('/admin');
                    } else {
                        alert('Identifiants invalides');
                    }
                })
                .catch(() => {
                    alert('Identifiants invalides');
                });
        },
    },
};

</script>
<style scoped>


  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .login-form {
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    width: 350px; /* Increase the width to avoid input touching the border */
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  button.login-button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  button.login-button:hover {
    background-color: #0056b3;
  }


</style>
