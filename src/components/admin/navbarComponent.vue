<template>
    <div class="navbar">
      <div class="navbar-content">
        <p class="navbar-title">Salut, bienvenue dans la page admin</p>
        <button class="logout-button">Logout</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {};
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    width: 100%;
    background-color: #333; /* Dark background color */
    color: white; /* Text color */
    padding: 10px 0; /* Add some vertical padding */
  }
  
  .navbar-content {
    max-width: 1200px; /* Limit the content width for better readability */
    margin: 0 auto; /* Center the content horizontally */
    display: flex;
    justify-content: space-between; /* Space elements evenly */
    align-items: center;
  }
  
  .navbar-title {
    font-size: 18px;
  }
  
  .logout-button {
    background-color: #f44336; /* Red color for the logout button */
    color: white; /* Text color */
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s; /* Add a smooth hover effect */
  }
  
  .logout-button:hover {
    background-color: #d32f2f; /* Darker red color on hover */
  }
  </style>
  