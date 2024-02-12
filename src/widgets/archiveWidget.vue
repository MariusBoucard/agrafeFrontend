<template>
    <div class="outsideDiv">
        <p>N° {{ archive.numero }}. {{ formatDate(archive.date) }}</p>
        <img class="innerImage" :src="`${baseUrl}/save/saveArchive/cover/${archive.id}.png`"/>
        
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
            const year = date.slice(0,4)
            const month = date.slice(5,7)
            
            const ret = this.monthToDate(month)
            return ret+". "+year
        },
        getRubrique(rubId){
            const found = this.rubriques.find(rub => rub.id === rubId)
            if(found){
                return found.rubrique
            }
        },
        monthToDate(month){
            console.log(typeof month)

            switch (month) {
            case '01':
            return 'Jan';
            case '02':
            return 'Fev';
            case '03':
            return 'Mar';
            case '04':
            return 'Avr';
            case '05':
            return 'Mai';
            case '06':
            return 'Juin';
            case '07':
            return 'Juil';
            case '08':
            return 'Août';
            case '09':
            return 'Sep';
            case '10':
            return 'Oct';
            case '11':
            return 'Nov';
            case '12':
            return 'Dec';
            default:
            return 'Unknown';
        }
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