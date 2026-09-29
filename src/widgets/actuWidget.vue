<template>
  <div class="card">
    <div class="grid-container">
      <div class="left-column">
        <div class="blackDiv">
          {{ formatDate(actu.date) }}
        </div>
        <div class="image-wrap">
          <img
            :src="`${baseUrl}/api/save/newsImage/${actu.id}.png`"
            :alt="actu.titre"
            loading="lazy"
            @error="onImgError"
          >
        </div>
      </div>
      <div class="right-column">
        <div class="haut">
          <p class="titre">
            {{ actu.titre }}
          </p>
        </div>
        <div class="content-block">
          <div class="descriptionDiv">
            <p>
              {{ displayDescription }}
            </p>
          </div>
          <div class="lienDiv">
            <button @click="toggleDescription" class="lienArticle">
              {{ isFullDescription ? 'Cacher' : 'Afficher toute l\'actu' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import baseUrl from '@/config';

export default {
  props: {
    actu: { required: true, type: Object },
  },
  data() {
    return {
      isFullDescription: false,
      baseUrl,
    };
  },
  computed: {
    displayDescription() {
      if (this.isFullDescription || this.actu.description.length <= 400) {
        return this.actu.description;
      }
      return this.actu.description.slice(0, 100) + '...';
    },
  },
  methods: {
    toggleDescription() {
      this.isFullDescription = !this.isFullDescription;
    },
    onImgError(e) {
      e.target.style.display = 'none';
    },
    formatDate(date) {
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      return day + ' ' + this.monthToDate(month) + ' ' + year;
    },
    monthToDate(month) {
      switch (month) {
        case '01': return 'Janvier';
        case '02': return 'Février';
        case '03': return 'Mars';
        case '04': return 'Avril';
        case '05': return 'Mai';
        case '06': return 'Juin';
        case '07': return 'Juillet';
        case '08': return 'Août';
        case '09': return 'Septembre';
        case '10': return 'Octobre';
        case '11': return 'Novembre';
        case '12': return 'Décembre';
        default: return 'Unknown';
      }
    },
  },
};
</script>
<style scoped>
.blackDiv {
  background-color: black;
  width: 90%;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 10px auto 0;
}

.card {
  display: flex;
  justify-content: center;
}

.grid-container {
  display: grid;
  grid-template-columns: 30% 70%;
  width: 100%;
  border: 1px solid rgb(163, 163, 163);
}

.image-wrap {
  width: 90%;
  margin: 0.75rem auto 1rem;
}

.image-wrap img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.haut {
  width: 100%;
  display: flex;
}

.titre {
  font-family: "Berlin Sans FB", sans-serif;
  font-weight: 1000;
  color: black;
  padding: 0;
}

.content-block {
  margin-bottom: 20px;
}

.descriptionDiv {
  width: 90%;
}

.descriptionDiv > p {
  text-align: left;
  font-family: "Bahnschrift", sans-serif;
  color: black;
}

.lienDiv {
  text-align: left;
}

.lienArticle {
  background: none;
  border: none;
  color: grey;
  text-decoration: underline;
  cursor: pointer;
  font-size: 1em;
  padding: 0;
}

@media (max-width: 700px) {
  .grid-container {
    grid-template-columns: 1fr;
  }

  .image-wrap {
    width: min(100% - 1.5rem, 18rem);
  }
}
</style>
