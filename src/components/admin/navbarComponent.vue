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
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 0 1rem;
}

.navbar-title {
  font-size: 18px;
  margin: 0;
  flex: 1 1 auto;
  min-width: 0;
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
  flex-shrink: 0;
}

.logout-button:hover {
  background-color: #d32f2f;
}

@media (max-width: 600px) {
  .navbar-title {
    font-size: 0.95rem;
    line-height: 1.3;
  }

  .logout-button {
    padding: 8px 14px;
    font-size: 0.9rem;
  }
}
</style>
