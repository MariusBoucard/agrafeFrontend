<template>
  <div class="contact-panel">
    <p class="section-kicker">La rédaction</p>
    <hr class="double-rule" />
    <ul>
      <li><span class="label">Local</span> B302</li>
      <li>
        <span class="label">Instagram</span>
        <a href="https://www.instagram.com/lagrafejournal/" target="_blank" rel="noopener noreferrer">@lagrafejournal</a>
      </li>
      <li>
        <span class="label">Mail</span>
        <a href="mailto:lagrafejournal@protonmail.com?subject=Mail depuis le site de l'agrafe">
          lagrafejournal@protonmail.com
        </a>
      </li>
    </ul>
    <router-link to="/proposerArticle" class="propose">Proposer un article →</router-link>
  </div>
</template>

<style scoped>
.contact-panel {
  padding: 0 0 1.5rem;
  margin-bottom: 1.75rem;
}

ul {
  list-style: none;
  margin: 0 0 1.15rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

li {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.95rem;
}

.label {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-muted);
  font-weight: 700;
}

a {
  text-decoration: none;
  border-bottom: 1px solid transparent;
  width: fit-content;
}

a:hover {
  border-bottom-color: var(--staple);
  color: var(--staple);
}

.propose {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  background: var(--ink);
  color: #fff;
  padding: 0.75rem 1rem;
  min-height: 44px;
}

.propose:hover {
  background: var(--staple);
  color: #fff;
  border-bottom: none;
}
</style>
