<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <button @click="login">Log in</button>
  <button @click="logout">Log out</button>
  {{ user }}
  <pre>
      <code>{{ user }}</code>
    </pre>
  <router-view/>
</template>
<script>
 export default {

  data: function () {
      return {
        user:  this.$auth0.user
      };
    },
    methods: {
      login() {
        this.$auth0.loginWithRedirect();
      },
      logout() {
        this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
      }
    }
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
