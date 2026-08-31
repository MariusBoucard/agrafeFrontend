<template>
  <header class="site-header">
    <div class="masthead">
      <div class="masthead-inner page-shell">
        <p class="masthead-left">Rennes 2</p>
        <router-link to="/" class="brand" aria-label="L'Agrafe — Accueil">
          <img src="../assets/logos/logo_entier_white.svg" alt="L'Agrafe" />
        </router-link>
        <p class="masthead-right">Journal étudiant</p>
      </div>
    </div>

    <div class="nav-bar">
      <div class="nav-inner page-shell">
        <button
          class="burger"
          type="button"
          :aria-expanded="mobileOpen ? 'true' : 'false'"
          aria-label="Ouvrir le menu"
          @click="mobileOpen = !mobileOpen"
        >
          <span></span><span></span><span></span>
        </button>

        <nav class="nav-list" :class="{ open: mobileOpen }" aria-label="Navigation principale">
          <select
            v-model="selectedRubrique"
            class="nav-select"
            aria-label="Articles par rubrique"
            @change="navigateToRubrique(selectedRubrique)"
          >
            <option disabled value="">Articles</option>
            <option value="">Tous les articles</option>
            <option v-for="rubrique in rubriques" :value="rubrique.id" :key="rubrique.id">
              {{ rubrique.rubrique }}
            </option>
            <option value="focale">Focale</option>
          </select>

          <div class="dropdown" @mouseleave="dossiersOpen = false">
            <button
              type="button"
              class="nav-link dropdown-trigger"
              @click="dossiersOpen = !dossiersOpen"
              @mouseenter="dossiersOpen = true"
            >
              Dossiers
            </button>
            <div class="dropdown-panel" :class="{ open: dossiersOpen }">
              <router-link
                v-for="d in recentDossiers"
                :key="d.id"
                :to="`/dossiers/${d.id}`"
                @click="closeMobile"
              >
                <span>{{ d.titre }}</span>
                <em>{{ d.statut === 'termine' ? 'Terminé' : 'En cours' }}</em>
              </router-link>
              <p v-if="!recentDossiers.length" class="dropdown-empty">Aucun dossier</p>
            </div>
          </div>

          <router-link class="nav-link" to="/archives" @click="closeMobile">Archives</router-link>
          <router-link class="nav-link" to="/actualite" @click="closeMobile">L'actu</router-link>
          <router-link class="nav-link" to="/newsletter" @click="closeMobile">Newsletter</router-link>
          <router-link class="nav-link" to="/apropos" @click="closeMobile">À propos</router-link>
          <router-link class="nav-link nav-cta" to="/proposerArticle" @click="closeMobile">
            Proposer un article
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import axiosInstance from '../axios.js';

export default {
  data() {
    return {
      rubriques: [],
      dossiers: [],
      selectedRubrique: '',
      mobileOpen: false,
      dossiersOpen: false,
    };
  },
  computed: {
    recentDossiers() {
      return [...this.dossiers]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 8);
    },
  },
  mounted() {
    axiosInstance.get('/api/getrubriques').then((r) => { this.rubriques = r.data; }).catch(() => {});
    axiosInstance.get('/api/dossiers').then((r) => { this.dossiers = r.data || []; }).catch(() => {});
  },
  methods: {
    closeMobile() {
      this.mobileOpen = false;
      this.dossiersOpen = false;
    },
    navigateToRubrique(selectedRubrique) {
      this.closeMobile();
      if (selectedRubrique === 'focale') this.$router.push('/focale');
      else if (selectedRubrique === '') this.$router.push('/articles');
      else this.$router.push(`/articles/${selectedRubrique}`);
    },
  },
};
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
}

.masthead {
  background: var(--ink);
  color: #fff;
  position: relative;
}

.masthead-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 0 1rem;
}

.masthead-left,
.masthead-right {
  margin: 0;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.55;
  font-weight: 600;
}

.masthead-right {
  text-align: right;
}

.brand {
  display: block;
  text-decoration: none;
}

.brand img {
  width: min(340px, 58vw);
  margin: 0 auto;
  filter: drop-shadow(0 0 0 transparent);
  transition: transform 0.35s var(--ease-out);
}

.brand:hover img {
  transform: scale(1.015);
}

.nav-bar {
  background: var(--paper-lift);
  border-bottom: 2px solid var(--ink);
  box-shadow: 0 1px 0 var(--rule);
}

.nav-inner {
  display: flex;
  align-items: center;
  min-height: 50px;
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.1rem;
  width: 100%;
}

.nav-link,
.nav-select,
.dropdown-trigger {
  appearance: none;
  background: transparent;
  border: none;
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.75rem 0.8rem;
  min-height: 44px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  position: relative;
}

.nav-link::after,
.dropdown-trigger::after {
  content: '';
  position: absolute;
  left: 0.8rem;
  right: 0.8rem;
  bottom: 0.45rem;
  height: 2px;
  background: var(--staple);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s var(--ease-out);
}

.nav-link:hover::after,
.dropdown-trigger:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
}

.nav-cta {
  margin-left: auto;
  background: var(--ink);
  color: #fff !important;
  padding-inline: 1rem;
}

.nav-cta::after {
  display: none;
}

.nav-cta:hover {
  background: var(--staple);
}

.nav-select {
  max-width: 170px;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 600;
}

.dropdown {
  position: relative;
}

.dropdown-panel {
  display: none;
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  min-width: 260px;
  background: var(--ink);
  z-index: 20;
  padding: 0.4rem 0;
  border-top: 3px solid var(--staple);
}

.dropdown-panel.open,
.dropdown:hover .dropdown-panel {
  display: block;
}

.dropdown-panel a {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  color: #fff;
  text-decoration: none;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-family: var(--font-body);
  text-transform: none;
  letter-spacing: 0;
  font-weight: 500;
}

.dropdown-panel a:hover {
  background: #fff;
  color: var(--ink);
}

.dropdown-panel em {
  font-style: normal;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--staple);
  font-weight: 700;
}

.dropdown-panel a:hover em {
  color: var(--staple);
}

.dropdown-empty {
  margin: 0;
  padding: 0.85rem 1rem;
  color: #aaa;
  font-size: 0.85rem;
}

.burger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  flex-direction: column;
  gap: 5px;
  min-width: 44px;
  min-height: 44px;
  justify-content: center;
}

.burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--ink);
}

@media (max-width: 900px) {
  .masthead-left,
  .masthead-right {
    display: none;
  }

  .masthead-inner {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .burger {
    display: flex;
  }

  .nav-list {
    display: none;
    flex-direction: column;
    align-items: stretch;
    padding: 0.5rem 0 1rem;
  }

  .nav-list.open {
    display: flex;
  }

  .nav-select,
  .nav-link,
  .dropdown-trigger {
    width: 100%;
  }

  .nav-cta {
    margin-left: 0;
    justify-content: center;
  }

  .dropdown-panel {
    position: static;
    display: none;
    background: var(--ink);
  }

  .dropdown-panel.open {
    display: block;
  }
}
</style>
