<template>
    <div class="footer">
        <div class="innerFooter">
            <div class ="bandeau">
                <p>© 2023</p>
                <p class="agrafe">l'agrafe.</p>
                <p>Journal étudiant associatif à l'université de Rennes 2</p>
            </div>
            <div class="bandeau">
                <a href="MentionsLegales">Mentions légales</a>
            </div>
            <div class="social">
                <p>Suis-nous sur les réseaux sociaux :</p>
                <img  src="../assets/social/Instagram_white.svg"/>
                <img src="../assets/social/Envelopper_white.svg"/>
                <img src="../assets/social/Facebook_white.svg"/>

            </div>
        </div>
    </div>
</template>
<style scoped>
.agrafe{
    font-family: "Bahnschrift", sans-serif;
  font-style: italic; /* Italic font style */
  font-weight: 501; /* Bold (or use a specific font-weight value) */
  /* Additional styles for your links (e.g., color, text-decoration, etc.) */}
.innerFooter{
    margin-left: 10%;
    width: 70%;
    font-family: "Bahnschrift", sans-serif;
}
.bandeau>p {
    margin-right: 10px;
}
.footer{
    width : 100%;
    background-color: black;
    color:white;
}
.bandeau{
    text-align: left;
    display: flex;

}
.bandeau >a{
    color:white;
    font-weight: 300;
}
.social{
    display: flex;
}
.social > img{
    width : 30px;
    margin-left: 20px ;
}
</style>