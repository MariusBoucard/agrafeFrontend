<template>
    <div>
        <ul>
            <li class="listItem">
    <div class="listDiv">
        <p class="listText">Local B302</p>
        <img class="listImg" src="../assets/social/Location.svg" />
    </div>
</li>
<li class="listItem">
    <a href="https://www.instagram.com/lagrafejournal/">
    <div class="listDiv" >
        <p class="listText">@lagrafejournal</p>
        <img class="listImg" src="../assets/social/Instagram.svg" />
    </div>
</a>
</li>
<li class="listItem">
    <a href="mailto:lagrafejournal@protonmail.com?subject=Mail depuis le site de l'agrafe">
    <div class="listDiv">
        <p class="listText">lagrafejournal@protonmail.com</p>
        <img class="listImg" src="../assets/social/Envelopper.svg" />
    </div>
</a>
</li>
<li class="listItem">
    <router-link class="routerLink" to="/proposerArticle">

        
        <div class="listDiv">
            <p class="listText">Proposer un article</p>
            <img class="listImg" src="../assets/social/Location.svg" />
        </div>
    </router-link>
</li>


        </ul>
    </div>

</template>

<style scoped>
ul{
    list-style: none;
}
.listDiv{
    display: flex;
}
.listImg{
    padding: 10px;
    width: 10%;
}
.listText{
    margin: auto;
    margin-right: 0px;
    color : black;
    font-family: "Bahnschrift", sans-serif;
}
</style>