<template>
    <div class="mam">
        <ul>
            <li class="listItem">
                <div class="listDiv">
                    <p class="listText">Local B302</p>
                    <img class="listImg" src="../assets/social/Location.svg" />
                </div>
            </li>
            <li class="listItem">
                <a href="https://www.instagram.com/lagrafejournal/">
                    <div class="listDiv">
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
                        <div style="    padding: 7px;
    width: 12%;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="w-8 h-8">
                                <path
                                    d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                <path
                                    d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                            </svg>

                        </div>
                    </div>
                </router-link>
            </li>


        </ul>
    </div>
</template>

<style scoped>
ul {
    list-style: none;
}
.mam {
  margin: 0;
  padding: 0;
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Blur the background */
  border-radius: 10px; /* Optional: round corners */
  transition: all 0.3s ease-in-out; /* Smooth transition */
}
.listDiv {
    display: flex;
}

.listImg {
    padding: 10px;
    width: 10%;
}

.listText {
    margin: auto;
    margin-right: 0px;
    color: black;
    font-family: "Bahnschrift", sans-serif;
}</style>