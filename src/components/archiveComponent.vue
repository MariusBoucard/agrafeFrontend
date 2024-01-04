<template>
     <div>
   
        <div class="articleWidget" v-for="archive in archives" :key="archive.id">
            <router-link class="routerLink" :to="'/archives/' + archive.id">
                <archiveWidget :archive="archive"></archiveWidget> 
            </router-link>
        </div>
     </div>
</template>
<script>
import axiosInstance from '@/axios';
import archiveWidget from '@/widgets/archiveWidget.vue';
export default {
    components : {
        archiveWidget
    },
    data(){
        return {
            archives : []
        }
    },
    mounted(){
        this.setArchives()
    },
    methods : {
        setArchives(){
            axiosInstance.get('/api/getPublicArchives').then(response => {
                this.archives = response.data
                console.log(response.data)
            }).catch(error => {
                console.log(error)})
            }
        }
    }

</script>
<style>
.articleWidget{
    margin-bottom: 50px;
}
</style>