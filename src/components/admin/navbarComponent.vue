<template>
  <div class="navbar">
    <div class="navbar-content">
      <p class="navbar-title">Salut, bienvenue dans la page admin</p>
      <router-link to="/" class="logout-button" @click="logout">Logout</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('auth', ['clearUser']),
    logout() {
      this.clearUser();
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: #333;
  color: white;
  padding: 10px 0;
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.navbar-title {
  font-size: 18px;
}

.logout-button {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  transition: background-color 0.3s;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}

.logout-button:hover {
  background-color: #d32f2f;
}
</style>
