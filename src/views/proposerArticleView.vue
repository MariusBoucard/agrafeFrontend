<template>
    <div class="baseView">
        <div class="menuGrid">
            <div class="leftColumn">
                <div id="titre">
                    <p class="titre">Proposer un article</p>
                </div>
                <div class="tout">
                    <div class="innerTout">
                        <p class="rub">Rubrique</p>
                        <select id="rubrique" class="rubriqueSelect" v-model="newArticle.rubriqueId"
                            @change="rubriquesShown = false" required>
                            <option v-for="rub in rubriques" :key="rub.id" :value="rub.id">{{ rub.rubrique }}</option>
                        </select>
                        <p class="text">Sélectionne la rubrique pour laquelle tu veux écrire un article.</p>
                        <p class="text"> sec = signes espaces compris. <a href="https://pornhub.com">Télécharger la charte
                                de rédation.</a></p>
                        <p class="text" @click="rubriquesShown = !rubriquesShown">
                            Détail des rubriques

                            <span class="svg-icon" v-if="!rubriquesShown">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-2 h-2">
                                    <path fill-rule="evenodd"
                                        d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                            <span class="svg-icon" v-if="rubriquesShown">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-6 h-6">
                                    <path fill-rule="evenodd"
                                        d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                        clip-rule="evenodd" />
                                </svg>

                            </span>
                        </p>




                        <div v-if="rubriquesShown">
                            <ul class="rubriqueInfoList">
                                <li v-for="rub in rubriques" :key="rub.id">
                                    <div>
                                        <p class="rubriqueTitre">{{ rub.rubrique }} ({{ getSecText(rub.id) }}):</p>
                                        <p class="infos">
                                            {{ rub.information }}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div v-if="!rubriquesShown && newArticle.rubriqueId">
                            <form>
                                <div class="form-group">
                                    <label class="form-label" for="author">Auteur</label>
                                    <input type="text" class="form-control form-input" id="author"
                                        v-model="newArticle.auteur" placeholder="Auteur">
                                    <small class="form-text text-muted form-helper">Indique le nom sous lequel tu souhaites
                                        signer cet article</small>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="title">Titre</label>
                                    <input type="text" v-model="newArticle.titre" class="form-control form-input" id="title"
                                        placeholder="Titre de l'article">
                                    <small class="form-text text-muted form-helper">Pour faciliter la mise en page, le titre
                                        ne doit pas excéder 60 signes espaces compris.</small>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="content">Sous-titre</label>
                                    <input type="text" class="form-control form-input" v-model="newArticle['sous-titre']"
                                        id="content" placeholder="Sous-titre">
                                    <small class="form-text text-muted form-helper">Pour faciliter la mise en page, le titre
                                        ne doit pas excéder 60 signes espaces compris.</small>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="content">Article</label>
                                    <ul>
                                        <li>Insérer votre article dans ce champ. Il doit faire {{
                                            getNbCaract(newArticle.rubriqueId) }} signes espaces compris (notes
                                            de bas de page et sources comprises).</li>
                                        <li>Précéder les sous-titres de la mension entre crochets, comme ceci : [sous-titre
                                            1], [sous-titre 2] etc.</li>
                                        <li>Formaliser les notres de bas de pages dans le texte entre crochets comme ceci :
                                            [1]</li>
                                        <li>Mettre en gras les citations que vous voudres valoriser dans l'article.</li>
                                    </ul>
                                    <textarea class="form-control form-textarea" v-model="newArticle.article"
                                        @input="limitTextArea" id="content" rows="3"></textarea>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="content">Notes de bas de page</label>
                                    <ul>
                                        <li>Formaliser chaque note de bas de page par sa mention entre crochet : [1], [2],
                                            etc.</li>
                                        <li>Le texte de l'article, notes de bas de page et sources comprises ne doit pas
                                            depasser {{
                                                getNbCaract(newArticle.rubriqueId) }} signes.</li>
                                        <li>Formaliser les notres de bas de pages dans le texte entre crochets comme ceci :
                                            [1]</li>
                                    </ul>
                                    <textarea class="form-control form-textarea" v-model="newArticle.notesBasPage"
                                        @input="limitTextArea" id="content" rows="3"></textarea>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="content">Sources</label>
                                    <ul>
                                        <li>Nom Prénom, titre de l'ouvrage, date de parution, n° de page éventuel</li>
                                        <li>Nom Prénom, "titre de l'article", titre du journal, site web, média, date de
                                            parution, n° de page éventuel</li>
                                        <li>Pour les sites web, mettre seulement la base du lien et non tout le lien. Par
                                            exemple, mettre lemonde.fr et non https://www.lemonde.fr/</li>
                                    </ul>
                                    <textarea class="form-control form-textarea" v-model="newArticle.sources"
                                        @input="limitTextArea" id="content" rows="3"></textarea>
                                </div>
                                <button type="button" @click="sendArticle()" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightColumn">
                <ContactComponent></ContactComponent>
                <BackcoverWidget></BackcoverWidget>
            </div>

        </div>
        <!-- Your component's HTML goes here -->
    </div>
</template>

<script>
import ContactComponent from '@/widgets/contactComponent.vue'
import BackcoverWidget from '@/widgets/backcoverWidget.vue'
import axiosInstance from '@/axios'

export default {
    components: {
        ContactComponent,
        BackcoverWidget,


    },
    name: 'ComponentName',
    data() {
        return {
            rubriques: [],
            newArticle: {
                rubriqueId: "",
                auteur: "",
                titre: "",
                "sous-titre": "",
                article: "caca",
                notesBasPage: "",
                sources: "",
            },
            YOUR_SECRET_KEY: "6LdFZPQoAAAAAPRETSD9-IuqspvBnx0dVTOs2tvM",
            SITE_KEY: "6LdFZPQoAAAAACJCmlbaF62tWu6dMkkiJgNV4pPk",
            captchaResponse: "",
            rubriquesShown: true
            // Your component's data goes here
        }
    },
    methods: {
        async recaptcha() {
            // (optional) Wait until recaptcha has been loaded.
            await this.$recaptchaLoaded()

            // Execute reCAPTCHA with action "login".
            const token = await this.$recaptcha('login')
            console.log(token)
            this.captchaResponse = token
            // Now you can send `token` to your server for verification
            // and proceed with the form submission if the verification is successful
        },
        async sendArticle() {

            this.testCaptcha()
        },

        async testCaptcha() {
            await this.recaptcha()
            await axiosInstance.post('/verifyRecaptcha', { captcha : this.captchaResponse })
    .then(response => {
      if (response.data.success) {
        console.log('Success!')
        // The reCAPTCHA was verified successfully. Continue processing the form.
      } else {
        console.log('Failed!')
        // The reCAPTCHA verification failed. Send an error response.
      }
    })
    .catch(error => {
      console.error('Error verifying reCAPTCHA:', error);
    });
           
        },
        setRubriques() {
            axiosInstance.get('/api/getRubriques').then(response => {
                this.rubriques = response.data
            }
            ).catch(error =>
                this.$message(error)
            )
        },
        getSecText(id) {
            const rubrique = this.rubriques.find(a => a.id === id)
            if (rubrique.nombreSecMin === rubrique.nombreSecMax) {
                return rubrique.nombreSecMin + " sec"
            }
            return rubrique.nombreSecMin + " sec à " + rubrique.nombreSecMax + " sec"
        },
        getNbCaract(id) {
            const rubrique = this.rubriques.find(a => a.id === id)
            if (rubrique.nombreSecMin === rubrique.nombreSecMax) {
                return rubrique.nombreSecMin + " sec"
            }
            return rubrique.nombreSecMin + " sec à " + rubrique.nombreSecMax + " sec"
        },
        limitTextArea() {
            const rubrique = this.rubriques.find(a => a.id === this.newArticle.rubriqueId)
            if (this.newArticle.article.length +this.newArticle.sources.length + this.newArticle.notesBasPage.length > rubrique.nombreSecMax) {
                // ON prend le plus long et le charcut psk c'est marrant
                if (this.newArticle.article.length > this.newArticle.sources.length && this.newArticle.article.length > this.newArticle.notesBasPage.length) {
                    this.newArticle.article = this.newArticle.article.substring(0, rubrique.nombreSecMax- this.newArticle.sources.length - this.newArticle.notesBasPage.length)
                } else if (this.newArticle.sources.length > this.newArticle.article.length && this.newArticle.sources.length > this.newArticle.notesBasPage.length) {
                    this.newArticle.sources = this.newArticle.sources.substring(0, rubrique.nombreSecMax-this.newArticle.article.length - this.newArticle.notesBasPage.length)
                } else {
                    this.newArticle.notesBasPage = this.newArticle.notesBasPage.substring(0, rubrique.nombreSecMax-this.newArticle.article.length - this.newArticle.sources.length)
                }
            }
        }

    },
    computed: {
        // Your component's computed properties go here
    },
    props: {
        // Your component's props go here
    },
    mounted() {
        this.setRubriques()
        // Your component's mounted hook goes here
    }
}
</script>

<style scoped>
p {
    color: #afafaf;
    font-family: "Berlin Sans FB", sans-serif;
    margin-top: 10px;
    margin-bottom: 10px;
}

.rub {
    font-weight: 700;
}

.tout {
    width: 100%
}

.innerTout {
    width: 90%;
    margin-left: 10%;
    text-align: left;
}

.titre {
    width: 100%;
    background-color: black;
    color: white;
    padding: 10px;
    text-align: left;
    text-indent: 10%;
}

a {
    color: #afafaf;
}

.svg-icon {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
    margin-bottom: 2px;
}

.svg-icon svg {
    height: 1em;
    width: 1em;
}

.rubriqueSelect {
    padding: 10px;
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
}

.baseView {
    width: 90%;
    margin: auto;
}

.menuGrid {
    display: grid;
    grid-template-columns: 70% 30%;
    /* 70% for the left column, 30% for the right column */
    column-gap: 20px;
    /* Adjust the gap as needed */
}

.rubriqueInfoList {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.infos {}

.rubriqueTitre {
    color: black;
    font-family: agrafe;
}

.form-group {
    margin-bottom: 3rem;
}

.form-label {
    display: inline-block;
    margin-bottom: 0.5rem;
    color: #afafaf;
    font-family: "Berlin Sans FB", sans-serif;
    font-weight: 700;
}

.form-input {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #afafaf;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-top: 10px;
    margin-bottom: 10px;
}

.form-input::placeholder {
    color: #afafaf
}

.form-helper {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #afafaf;
    font-family: "Berlin Sans FB", sans-serif;
}

.form-group>ul {
    color: #afafaf;
    font-family: "Berlin Sans FB", sans-serif;
}

.form-textarea {
    width: 100%;
    border: 1px solid #ced4da;
    min-height: 100px;
}

/* Your component's styles go here */</style>
