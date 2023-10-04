<template>
    <div class="container">

        <div>

            <div class="header">
                <h1>Voila la page des focales</h1>
                <button class="add-article-button" @click="createFocale()">Ajouter focale</button>
            </div>
        </div>
        <div id="tableArticles">
            <table>
                <thead>
                    <tr>
                        <th>Supprimer</th>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Images</th>
                        <th>Numero</th>
                        <th>Prive</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(foc, index) in focales" :key="index">
                        <td>
                            <button class="button" @click.stop="deleteFocale(foc.id)">Supprimer</button></td>
                        <td>{{ foc.titre }}</td>
                        <td>{{ foc.description }}</td>
                        <td class="image-container">
                            <img style="max-width: 100%;"
                                :src="`${baseUrl}/save/saveFocale/${foc.id}/${foc.images[0].id}.png`">
                            <div class="image-popup" @mouseleave="changeShowInfo(-1)">
                                <div v-for="(image,index) in foc.images" :key="image.id">
                                    <img class="innerImage" :src="`${baseUrl}/save/saveFocale/${foc.id}/${image.id}.png`"
                                        alt="Image">
                                        <div @click="changeShowInfo(index)">
                                            Infos
                                        </div>
                                        <div v-show="showInfo === index">
                                            <p>Titre : {{ image.titre }}</p>
                                            <p>Description : {{ image.description }}</p>
                                            <p>Auteur : {{ image.auteur }}  </p>
                                            <p>Date : {{ image.date }}</p>
                                            <p>Copyright : {{ image.copyright }}</p>
                                        </div>
                                   
                                </div>
                            </div>
                        </td>

                        <td>{{ foc.numero }}</td>
                        <td class="vertical-align-middle">
                            <div class="content">
                                <p style="padding: 20px;">
                                    {{ isPrivate(foc.private) }}
                                </p>
                                <button class="button" @click.stop="privateFocale(foc.id)">privé</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axiosInstance from '@/axios';
import baseUrl from '@/config';
export default {
    data() {
        return {
            focales: [],
            baseUrl: baseUrl,
            showInfo :-1
        }
    },
    mounted() {
        this.setFocale()
    },
    methods: {
        changeShowInfo(index){
            this.showInfo = index
        },
        isPrivate(bo) {
            if (bo) {
                return "privé"
            } else {
                return "public"
            }
        },
        privateFocale(id) {
            axiosInstance.post('/api/publicFocale', { id: id }).then(() => {
                this.setFocale()
            }
            ).catch(error => console.log(error))

        },
        // modifyArticle(id) {
        //   this.$emit('modifyArticle', id)
        // },

        deleteFocale(id) {
            axiosInstance.delete(`/api/deleteFocale/${id}`).then(() => {
                this.$message({
                    message: 'Article deleted successfully',
                    type: 'success',
                    customClass: 'custom-el-message',
                    duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
                });
                this.setArticles()
            })
                .catch(() => {
                    this.$message({
                        message: 'Erreur lors de la suppression de l\'article',
                        type: 'error',
                        customClass: 'custom-el-message',
                        duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
                    });
                });
        },
        setFocale() {

            axiosInstance.get('/api/getFocale').then(
                response => {

                    this.focales = response.data
                })
                .catch(() => {
                    this.$message({
                        message: 'Erreur lors de la récupération des focales',
                        type: 'error',
                        customClass: 'custom-el-message',
                        duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
                    });

                    // Handle any errors
                });

        },
        createFocale() {
            this.$emit('componentChanged', 'createFocal')
        }
    }
}
</script>
<style scoped>
.vertical-align-middle {

    text-align: center;
    vertical-align: middle;
}

.content {
    display: block;
}

.image-container {
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s;
    /* Add a transition for smooth hover effect */
}

/* Set a background overlay color */
.image-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    /* Transparent initially */
    transition: background-color 0.3s;
    /* Add a transition for smooth hover effect */
    pointer-events: none;
    /* Allows the hover effect to be triggered through the overlay */
}

/* Style the overlay to become darker on hover */
.image-container:hover::before {
    background-color: rgba(0, 0, 0, 0.5);
    /* Adjust the alpha value for darkness */
}

.image-popup {
    position: absolute;
    top: 20%;
    left: 10%;
    width: 220px;
    display: none;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 1;
}

.innerImage {
    width: 200px
}

.image-container:hover .image-popup {
    display: block;
}

.container {
    width: 100%;
    display: block;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
}

/* Header styles */
.header {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

/* Page title */
h1 {

    font-size: 24px;
    color: black;
    margin: 0;
    /* Remove margin to center the title */
}


/* Page title */
h1 {
    font-size: 24px;
    color: black;
}

/* Button styles */
.add-article-button {
    background-color: lightgreen;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 8px;
}

/* Button styles */
.button {
    background-color: lightgreen;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 8px;
}

.button:hover {
    background-color: #4caf50;
}

.add-article-button:hover {
    background-color: #4caf50;
}

/* Table styles */
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    padding: 10px;
    max-width: 200px;
    text-align: left;
    border-bottom: 1px solid #ccc;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}
</style>