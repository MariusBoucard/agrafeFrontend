<template>
    <div>
        <form @submit.prevent="login">
            <h2>Login</h2>
            <div>
                <label for="username">Username :</label>
                <input type="text" id="username" v-model="formData.username" required>
            </div>
            <div>
                <label for="password">Mail :</label>
                <input type="mail" id="mail" v-model="formData.mail" required>
            </div>
            <div>
                <label for="password">Password :</label>
                <input type="password" id="password" v-model="formData.password" required>
            </div>
            <button type="submit">Login</button>
        </form>

    </div>
</template>
<script>
import axiosInstance from '../axios.js';
import router from '../router/index'
export default{
    data(){
        return {
            formData: {
                        username: '',
                        password: '',
                        mail : ''
                    },
        }
    },
    methods : {
        login() {
                    // Send a POST request with the form data to your backend API
                    // You can use libraries like Axios or the native Fetch API for this
                    // Example with Axios:
                    axiosInstance.post('/api/login', this.formData)
                        .then(response => {
                            // Handle the response from the server
                            const token = response.data.token;
                            axiosInstance.defaults.headers.common['Authorization'] = token;
                            sessionStorage.setItem('token', token); // For session-only storage
                            if (response.data.connected === true){
                                 router.push('/admin'); // Replace '/dashboard' with the URL you want to redirect to
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            // Handle any errors
                        });
                },
    }
}

</script>
<style>

</style>