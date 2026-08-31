<template>
  <footer class="site-footer">
    <div class="footer-top page-shell">
      <div class="col brand-col">
        <p class="footer-mark">L'Agrafe</p>
        <p class="footer-tag">Le journal qui agrafe les idées — association étudiante, Université Rennes 2.</p>
      </div>
      <div class="col">
        <p class="col-title">Parcourir</p>
        <router-link to="/articles">Articles</router-link>
        <router-link to="/archives">Archives</router-link>
        <router-link to="/actualite">L'actu</router-link>
        <router-link to="/newsletter">Newsletter</router-link>
      </div>
      <div class="col">
        <p class="col-title">Participer</p>
        <router-link to="/proposerArticle">Proposer un article</router-link>
        <router-link to="/apropos">À propos</router-link>
        <router-link to="/mentions-legales">Mentions légales</router-link>
        <a
          href="https://www.lastblei-thibau.fr/"
          target="_blank"
          rel="noopener noreferrer"
          class="dev-credit"
        >Création web — Thibau Lasblei</a>
      </div>
      <div class="col social-col">
        <p class="col-title">Suivre</p>
        <div class="social-row">
          <a href="https://www.instagram.com/lagrafejournal/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="../assets/social/Instagram_white.svg" alt="" />
          </a>
          <a href="mailto:lagrafejournal@protonmail.com?subject=Mail depuis le site de l'agrafe" aria-label="Email">
            <img src="../assets/social/Envelopper_white.svg" alt="" />
          </a>
          <a href="https://www.facebook.com/lagrafejournal" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="../assets/social/Facebook_white.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="page-shell bottom-inner">
        <span>© {{ currentYear }} L'Agrafe</span>
        <a
          class="dev-credit-bottom"
          href="https://www.lastblei-thibau.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >Site réalisé par Thibau Lasblei</a>
        <span class="staples" aria-hidden="true"><i></i><i></i><i></i></span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.site-footer {
  background: var(--ink);
  color: #fff;
  margin-top: var(--space-xl);
}

.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr auto;
  gap: 2rem;
  padding: 3rem 0 2.25rem;
}

.footer-mark {
  margin: 0 0 0.75rem;
  font-family: var(--font-title);
  font-size: 2.4rem;
  line-height: 1;
}

.footer-tag {
  margin: 0;
  max-width: 18rem;
  font-size: 0.92rem;
  line-height: 1.5;
  opacity: 0.7;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.col-title {
  margin: 0 0 0.35rem;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--staple);
  font-weight: 700;
}

.col a {
  color: #fff;
  text-decoration: none;
  font-size: 0.92rem;
  width: fit-content;
  border-bottom: 1px solid transparent;
}

.col a:hover {
  border-bottom-color: rgba(255, 255, 255, 0.45);
}

.dev-credit {
  opacity: 0.55;
  font-size: 0.8rem !important;
  margin-top: 0.35rem;
}

.dev-credit:hover {
  opacity: 1;
}

.dev-credit-bottom {
  color: #fff;
  text-decoration: none;
  opacity: 0.7;
  letter-spacing: 0.04em;
  text-transform: none;
  font-size: 0.78rem;
  border-bottom: 1px solid transparent;
}

.dev-credit-bottom:hover {
  opacity: 1;
  border-bottom-color: rgba(255, 255, 255, 0.45);
}

.social-row {
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
}

.social-row img {
  width: 26px;
  height: 26px;
  opacity: 0.85;
}

.social-row a:hover img {
  opacity: 1;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 0;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.55;
}

.staples {
  display: flex;
  gap: 1.25rem;
}

.staples i {
  display: block;
  width: 12px;
  height: 3px;
  background: linear-gradient(180deg, #bbb, #666);
}

@media (max-width: 860px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 520px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
