<template>
  <div class="issue-panel" v-if="archive?.id">
    <p class="section-kicker">Papier</p>
    <h3 class="issue-title">Dernier numéro</h3>
    <hr class="double-rule" />
    <router-link :to="`/archives/${archive.id}`" class="cover-link">
      <img
        class="cover"
        :src="`${baseUrl}/api/save/saveArchive/cover/${archive.id}.png`"
        :alt="archive.titre || 'Dernier numéro'"
      />
    </router-link>
    <div class="partenaires" aria-label="Partenaires">
      <img src="../assets/partenaires/FSDIE-SVG.svg" alt="FSDIE" />
      <img src="../assets/partenaires/LOGO_RENNES_2.svg" alt="Université Rennes 2" />
      <img src="../assets/partenaires/CVEC-SVG.svg" alt="CVEC" />
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';
import baseUrl from '@/config';

export default {
  data() {
    return { archive: {}, baseUrl };
  },
  mounted() {
    axiosInstance
      .get('/api/lastArchive')
      .then((response) => {
        this.archive = response.data || {};
      })
      .catch(() => {});
  },
};
</script>

<style scoped>
.issue-panel {
  padding-bottom: 1rem;
}

.issue-title {
  margin: 0 0 0.75rem;
  font-family: var(--font-title);
  font-size: 1.35rem;
  letter-spacing: -0.02em;
}

.cover-link {
  display: block;
  margin: 0.85rem 0 1.35rem;
  outline: 1px solid var(--ink);
  box-shadow: 5px 5px 0 var(--ink);
  background: var(--paper-deep);
  transition: transform 0.3s var(--ease-out);
}

.cover-link:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 var(--ink);
}

.cover {
  width: 100%;
}

.partenaires {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  align-items: end;
  padding-top: 0.5rem;
  border-top: 1px solid var(--rule);
}

.partenaires img {
  width: 100%;
  max-height: 42px;
  object-fit: contain;
  opacity: 0.8;
  filter: grayscale(0.3);
}
</style>
