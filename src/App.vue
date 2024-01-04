<template>
  <navbar-component v-if="showNavigationLinks"></navbar-component>

  <router-view />
  <footer-component></footer-component>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import NavbarComponent from "./components/navbarComponent.vue";
import FooterComponent from "./components/footerComponent.vue";
// import { auth0, isAuthenticated } from './router/Auth0.js'; // Adjust the path to your Auth0.js file
export default {
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("app", ["showNavigationLinks"]),
    // Use computed property to check if the user is authenticated
    isAuthenticatedComp() {
      return this.$auth0.isAuthenticated;
    },
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || 'L\'Agrafe - Journal';
    },
  
    user: {
      handler: function (newUser) {
        if (newUser) {
          this.setConnection(true);
        } else {
          this.setConnection(false);
        }
      },
    },
  },
  data: function () {
    return {
      user: this.$auth0.user,
    };
  },
  methods: {
    ...mapMutations("auth", ["SET_AUTHENTICATED"]),
    ...mapActions("auth", ["setUser", "clearUser", "setConnection"]),
    log() {
      this.$store.commit("auth/SET_AUTHENTICATED", true); // Set to true
    },
    login() {
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({
        logoutParams: { returnTo: window.location.origin },
      });
    },
  },
  components: { NavbarComponent, FooterComponent },
};
</script>
<style>
/* Container for the article page */
.custom-el-message {
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  background-color: #4caf50 !important;
  color: #fff !important;
  padding: 10px 15px !important;
  border-radius: 4px !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
  z-index: 8 !important;
  opacity: 1 !important;
  transition: opacity 0.3s ease-in-out !important;
}
.el-icon {
  /* Set the desired font size for the icon */
  font-size: 5px; /* Adjust the size as needed */
}
.custom-el-message.success {
  background-color: #4caf50 !important;
}

.custom-el-message-enter-active,
.custom-el-message-leave-active {
  opacity: 1 !important;
}

.custom-el-message-enter,
.custom-el-message-leave-to /* .el-message-leave-active in <2.1.8 */ {
  opacity: 0 !important;
}

@font-face {
  font-family: "agrafe";
  src: url("./assets/font/ELEPHNT.TTF") format("truetype");
  /* Add additional formats if necessary */
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "agrafeit";
  src: url("./assets/font/ELEPHNTI.TTF") format("ttf");
  /* Add additional formats if necessary */
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: "agrafe" !important ;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  font-family: "Elephant" !important ;
  margin: 0;
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
