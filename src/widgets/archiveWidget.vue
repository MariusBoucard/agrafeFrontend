<template>
    <div class="outsideDiv">
        <p>N° {{ archive.numero }}. {{ formatDate(archive.date) }}</p>
        <img class="innerImage" :src="`${baseUrl}/save/saveArchive/back/${archive.id}.png`"/>
        
    </div>

</template>
<script>
import baseUrl from '@/config';

export default{
    name: 'ArchiveWidget',
    props : {
        archive : {
            type : Object,
            required : true,
            
        }
    },
    data(){
        return{
            baseUrl : baseUrl,
        }
    },
    mounted(){
        console.log(baseUrl)
        this.baseUrl2 = baseUrl
    },
    methods : {
        formatDate(date){
            let dateObject = new Date(date)
            let month = dateObject.getMonth() + 1
            let day = dateObject.getDate()
            let year = dateObject.getFullYear()
            return day + '/' + month + '/' + year
    }
        }}
</script>
<style scoped>
.outsideDiv{
    width: 60%;
    height: 100%;
    margin: auto;
    display: flex;
    background-color: black;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 20px;
}
.outsideDiv > p {
    color: white;
}
.innerImage{
    width: 90%;
    margin: auto;
}
</style>