<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
    <!-- <button @click="log">fakelog</button>
  <button @click="login">Log in</button>
  <button @click="logout">Log out</button>
  {{ isAuthenticated }}  -->

  <router-view/>
</template>
<script>
import {  mapGetters, mapActions, mapMutations } from 'vuex';
// import { auth0, isAuthenticated } from './router/Auth0.js'; // Adjust the path to your Auth0.js file
 export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    // Use computed property to check if the user is authenticated
    isAuthenticatedComp() {
      return this.$auth0.isAuthenticated
   },
  },
  watch: {
    user : {
      handler : function (newUser){
        if (newUser){
          this.setConnection(true)
          console.log("connect")
        } else {
          console.log("whatt")
          this.setConnection(false)
        }
      }
    }
  },
  data: function () {
      return {
        user:  this.$auth0.user
      };
    },
    methods: {
      ...mapMutations('auth', ['SET_AUTHENTICATED']),
      ...mapActions('auth', ['setUser', 'clearUser','setConnection']),
      log(){
        this.$store.commit('auth/SET_AUTHENTICATED', true); // Set to true
        console.log(this.isAuthenticated)
            },
      login() {
        this.$auth0.loginWithRedirect();
      },
      logout() {
        this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
      }
    },
  
  };

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
