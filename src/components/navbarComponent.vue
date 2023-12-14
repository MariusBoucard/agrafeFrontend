<template>
  <div class="navbar">
    <p class="title">Journal associatif étudiant</p>
    <router-link to="/">
      <div class="imgDiv">
        <img
          src="../assets/logos/logo_entier_white.svg"
          alt="Logo de l'agrafe"
        />
      </div>
    </router-link>
    <div class="innerNav">
      <div class="inner">
        <nav>
          <ul>
            <li >

                <select  v-model="selectedRubrique" @change="navigateToRubrique(selectedRubrique)" class="link-select link">
                  <option :value="tousArticles">Tous les articles</option>
                  <option v-for="rubrique in rubriques" :value="rubrique.id" :key="rubrique.id">
                    {{ rubrique.rubrique }}
                  </option>
                  <option value="focale">Focale</option>
                </select>
              

            </li>
          </ul>
          <ul>
            <li>
              <a class="link" href="/">
                <router-link class="routerLink" to="/archives">Archives</router-link>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a class="link" href="/">
                <router-link class="routerLink" to="/actualite">L'actu</router-link>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a class="link" href="/">
                <router-link class="routerLink" to="/newsletter">Newsletter</router-link>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a class="link" href="/">
                <router-link class="routerLink" to="/apropos">À propos</router-link>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../axios.js";

export default {
  data() {
    return {
      activeMenu: false,
      rubriques: [],
      selectedRubrique: 'Articles'
    };
  },
  mounted() {
    axiosInstance
      .get("/api/getrubriques")
      .then((response) => {
        this.rubriques = response.data;
        this.rubriques.push({id: 'Articles', rubrique: 'Articles'})
      })
      .catch((error) =>
        this.$message({
          message: error,
          type: "error",
          customClass: "custom-el-message",
          duration: 1000,
        })
      );
  },
  methods: {
    toggleArticles() {
      this.activeMenu = !this.activeMenu;
    },
    navigateToRubrique(selectedRubrique){
      if(selectedRubrique === 'focale'){
        this.$router.push('/focale')
      } else {
        this.$router.push(`/articles/${selectedRubrique}`)
      }
    }
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  border: 10px solid white;
  box-sizing: border-box; /* Make the border go inside the div */
  background-color: black;
}

.title {
  color: white;
}

nav {
  display: flex;
  /* Use flexbox to create a horizontal layout */
  justify-content: space-between;
  /* Evenly space the items */
  background-color: #ffffff;
  /* Background color for the navigation bar */
  padding: 10px;
  /* Add some padding for spacing */
}
.link-select{
  border: none;
  background-color: white;
  color: black;
  padding: 10px;
  font: 1em ;
  font-family: "agrafe" !important;
  font-weight: bold !important;
}
.link-select.expanded {
  font-size: 2em; /* Increase the font size when expanded */
}
.link-select:hover{
  background-color: rgb(0, 0, 0);
  color: white;
}

.routerLink {
  color: black;
}
.routerLink:hover {
  color: rgb(255, 255, 255);
}
ul {
  list-style: none;
  /* Remove list bullet points */
}

li {
  color: rgb(0, 0, 0);
  margin: 0;
  /* Remove any default margins */
  padding: 0;
  /* Remove any default padding */
}

a {
  text-decoration: none;
  /* Remove underlines from links */

  /* Text color for links */
  padding: 10px;
  /* Add padding for spacing between links */
}
.imgDiv {
  width: 70%;
  margin: auto;
}
/* Style for when links are hovered over */
.link:hover {
  color: #ffffff !important;
  background-color: #000000;
  border-radius: 5px;
  /* Add rounded corners */
}
.innerNav {
  width: 100%;
  background-color: white;
}
.inner {
  width: 80%;
  margin: auto;
}

/*dropdown styles*/
.link-article:hover {
  color: #000000 !important;
  background-color: #ffffff;
  border-radius: 5px;
  font-family: "agrafe" !important;
  font-weight: bold !important;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #000000;
  min-width: 102px; /*à modif pour que ça fit automatiquement la taille du lien*/
  box-shadow: 0px 8px 16px 0px rgba(12, 12, 12, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ffffff;
  color: black;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>