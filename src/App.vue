<template>
  <EphemeralBanner v-if="showNavigationLinks" />
  <navbar-component v-if="showNavigationLinks"></navbar-component>
  <router-view />
  <footer-component></footer-component>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import NavbarComponent from './components/navbarComponent.vue';
import FooterComponent from './components/footerComponent.vue';
import EphemeralBanner from './components/EphemeralBanner.vue';

export default {
  components: { NavbarComponent, FooterComponent, EphemeralBanner },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('app', ['showNavigationLinks']),
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || "L'Agrafe - Journal";
    },
  },
  methods: {
    ...mapMutations('auth', ['SET_AUTHENTICATED']),
    ...mapActions('auth', ['setUser', 'clearUser', 'setConnection']),
  },
};
</script>

<style>
@font-face {
  font-family: 'agrafe';
  src: url('./assets/font/ELEPHNT.TTF') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Bahnschrift';
  src: local('Bahnschrift'), url('./assets/font/Bahnschrift-Font-Family/BAHNSCHRIFT.TTF') format('truetype');
  font-display: swap;
}

@font-face {
  font-family: 'agrafeit';
  src: url('./assets/font/ELEPHNTI.TTF') format('truetype');
  font-weight: normal;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Berlin Sans FB';
  src: url('./assets/font/berlin-sans-fb-demi-bold-font/BRLNSDB.TTF') format('truetype');
  font-display: swap;
}

.custom-el-message {
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  background-color: #0a0a0a !important;
  color: #fff !important;
  padding: 10px 15px !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  z-index: 80 !important;
}

.custom-el-message.success {
  background-color: #0a0a0a !important;
}
</style>
