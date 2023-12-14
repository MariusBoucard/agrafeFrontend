<template>
    <div class="baseView">
      <div class="menuGrid">
        <div class="leftColumn">
            <div>

                <div class="banner">
                    <p>Notre idée</p>
                </div>
                <div class="text">
                    L'agrafe est issu de la volonté d'un groupe d'étudiants de faire (re)
                    vivre l'esprit du journal étudiant à Rennes 2, en y ajoutant une dimension collaborative
                    qui nous a parue essentielle pour faire subsister nos convictions au travers de notre projet.
                    Nous avons fait mûrir cette idée d'un journal participatif invitant tous ses lecteurs.ices à en devenir
                    les acteur.ices, selon leurs passions, leur désir de discuter de l'actualité politique, environnementale ou culturelle,
                    de présenter un travail d'investigation plus abouti ou encore de mettre en lumière leurs productions artistiques, 
                    qu'elles soient graphiques, littéraires, photographiques, cinématographiques, etc.

                </div>
                <div class="banner">
                    <p>L'équipe</p>
                </div>
                <div class="text">
                    À l'origine, quatre étudiants en Infocom' avec la volonté de partager un projet associatif avec 
                    la communauté étudiante qui, on le sait, en a - en aura toujours - besoin ! Depuis, l'équipe a bien grandi et 
                    continue de vivre et d'évoluer au quotidien, au gré des parutions, des distributions et des rencontres. Alors si toi 
                    aussi tu veux rejoindre l'aventure, n'hésite pas à nous envoyer un mail, soit pour nous proposer un article, soit pour intégrer l'asso - 
                    et pourquoi pas les deux ! On a hâte de vous retrouver aux présentations d'information, et surtout de lire toutes vos propositions d'articles ! 
                </div>
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
  
  export default {
    name: "ArticleView",
    components: {
    BackcoverWidget,
    ContactComponent},
    mounted() {

     
    },
    data() {
      return {
      };
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
  .menuGrid {
    display: grid;
    grid-template-columns: 70% 30%; /* 70% for the left column, 30% for the right column */
    column-gap: 20px; /* Adjust the gap as needed */
  }
  .banner{
    color: white;
    background-color: black;
    width : 100%;
  }
  </style>