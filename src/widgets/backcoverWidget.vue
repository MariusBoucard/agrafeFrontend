<template>
    <div>
        <p >Dernier numéro</p>
        <div class="backCoverImg">
            <img class="innerImage" :src="`${baseUrl}/save/saveArchive/back/${archive.id}.png`"/>
        </div>
        <div class="partenaires">
                <div class="logoPartenaire">
                    <img class="partenaireImage" src="../assets/partenaires/FSDIE-SVG.svg"/>
                </div>
                <div class="logoPartenaire">
                    <img class="partenaireImage" src="../assets/partenaires/LOGO_RENNES_2.svg"/>
                </div>
                <div class="logoPartenaire">
                    <img class="partenaireImage" src="../assets/partenaires/CVEC-SVG.svg"/>

                </div>
        </div>
    </div>

</template>
<script>
import axiosInstance from '@/axios';
import baseUrl from '@/config';

export default{
    data(){
        return {
            archive : {},
            baseUrl : baseUrl
        }
    },
    mounted(){
            axiosInstance.get('/api/lastArchive').then(response =>{
                this.archive = response.data
                console.log(this.archive)
            }).catch((error)=>
            this.$message({
              message: error,
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000, // Set the duration to 3000 milliseconds (3 seconds)
            })
            )
    }

}
</script>
<style scoped>

.innerImage{
    width: 100%;
}
.backCoverImg{
    width:100%;
}
.partenaires {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px; /* Adjust the gap as needed */
  margin-top: 20px;
  margin-bottom: 20px;
}

.logoPartenaire {
  display: flex; /* Use flexbox for vertical alignment */
  flex-direction: column;
  justify-content: flex-end;
  align-items: center; /* Align items to the bottom */
}

.partenaireImage {
  margin-bottom: 0px;
}
</style>