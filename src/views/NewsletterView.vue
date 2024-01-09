<template>
  <div class="baseView">
    <div class="container">
      <div class="leftColumn">
        <div class="content">
          <div class="title">Abonne-toi à la newsletter !</div>
          <div class="textParution">
            <p>
              Pour être au fait de la parution de notre journal, recevoir nos
              actus directement dans ta boîte, ne pas manquer nos réunions et
              autres événements.
            </p>
            <p>PS : tu peux te désinscrire à tout moment.</p>
          </div>
          <form class="form" >
            <div class="input">
              <label for="name" >Nom</label>
              <input type="text" required v-model="user.name" />
            </div>
            <div class="input">
              <label for="email">Adresse mail</label>
              <input type="email" required v-model="user.mail" />
            </div>
            <span v-if="validateEmail(user.mail) === false">Veuillez entrer une adresse mail valide</span>
            <button @click="inscription">Inscription</button>
            <button @click="desinscription">Désinscription</button>
          </form>
        </div>
      </div>
      <div class="rightColumn">
        <ContactComponent></ContactComponent>
        <BackcoverWidget></BackcoverWidget>
      </div>
    </div>
  </div>
</template>


<script>
import BackcoverWidget from "@/widgets/backcoverWidget.vue";
import ContactComponent from "@/widgets/contactComponent.vue";
import axiosInstance from "../axios.js";

export default {
  name: "NewsletterView",
  components: {
    BackcoverWidget,
    ContactComponent,
  },
  data() {
    return {
      user: {
        name: "",
        mail: "",
      },
    };
  },

  methods: {
    async inscription() {
      try {
        if(this.validateEmail(this.user.mail) === false){
          alert("Veuillez entrer une adresse mail valide");
          return;
        }

        const response = await axiosInstance.post("/api/addNewsletter", {
          user: this.user,
        });
        console.log("Inscription réussie", response.data);
      } catch (error) {
        console.error("Erreur lors de l'inscription", error);
      }
    },

    async desinscription() {
      try {
        const response = await axiosInstance.delete(
          `/api/deleteNewsletter/${this.user.mail}`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la désinscription", error);
      }
    },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  },
};
</script>

<style scoped>
.articleWidget {
  margin-bottom: 30px;
}

.baseView {
  width: 90%;
  margin: auto;
}


.content {
  margin: auto;
  width: 90%;
}

.title {
  color: white;
  background-color: black;
  font-size: 1.5em;
  height: 40px;
  margin: auto;
  display: flex;
  align-items: center;
  padding-left: 15%;
}

.textParution {
  width: 70%;
  margin: auto;
  color: black;
  font-family: "Bahnschrift", sans-serif;
  font-size: 1.5em;
  text-align: start;
}

.form {
  width: 70%;
  margin: auto;
  margin-top: 30px;
  display: flex;
  color: black;
  font-family: "Bahnschrift", sans-serif;
  flex-direction: column;
  font-size: 1.5em;
  align-items: flex-start;
  padding-bottom: 10px;;
}

.input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
  width: 100%;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  border: none;
  /* width: 30%; */
  height: 40px;
  color: rgb(255, 255, 255);
  background-color: black;
  font-family: "agrafe" !important ;
  font-size: 1.1em;
  margin: auto;
  margin-top: 10px;
  border-radius: 2px;
  cursor: pointer;
  transition-duration: 0.4s;
}

button:hover {
  border: 2px solid #000000;
  color: black;
  background-color: #ffffff;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

.leftColumn {
  width : 65%
  /* Your styles for the left column here */
}

.rightColumn {
  width: 30%;
  /* Your styles for the right column here */
}
.article{
  width: 80%;
  margin-left: auto;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  .leftColumn {
    width: 100%;
  }
  .rightColumn {
    width: 100%;
  }
  .article{
    width: 100%;
  }}
</style>