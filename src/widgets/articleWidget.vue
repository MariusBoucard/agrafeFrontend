<template>
  <article class="story" :class="{ reverse: reverse }" @click="go">
    <div class="media">
      <img
        :src="`${baseUrl}/api/save/saveArticle/cover/${article.id}.png`"
        :alt="article.titreFront"
        loading="lazy"
        @error="onImgError"
      />
    </div>
    <div class="body">
      <p class="meta">
        <span class="rub" v-if="rubriqueLabel">{{ rubriqueLabel }}</span>
        <span v-if="article.numeroParu">N° {{ article.numeroParu }}</span>
        <span v-if="article.date">{{ formatDate(article.date) }}</span>
      </p>
      <h3 class="title">{{ article.titreFront }}</h3>
      <p class="author" v-if="article.auteur">
        par
        <router-link
          v-if="article.authorSlug"
          class="author-link"
          :to="`/equipe/${article.authorSlug}`"
          @click.stop
        >{{ article.auteur }}</router-link>
        <span v-else>{{ article.auteur }}</span>
      </p>
      <p class="excerpt"><span class="drop" aria-hidden="true">{{ dropLetter }}</span>{{ excerptRest }}</p>
      <router-link class="read-link" :to="`/article/${article.id}`" @click.stop>
        Lire
      </router-link>
    </div>
  </article>
</template>

<script>
import baseUrl from '../config.js';

export default {
  props: {
    article: { required: true, type: Object },
    rubriques: { required: true, type: [Object, Array] },
    reverse: { type: Boolean, default: false },
  },
  data() {
    return { baseUrl };
  },
  computed: {
    rubriqueLabel() {
      const found = this.rubriques.find((rub) => rub.id === this.article.rubrique);
      return found ? found.rubrique : '';
    },
    fullExcerpt() {
      const text = (this.article.description || '').trim();
      if (text.length <= 190) return text;
      return `${text.slice(0, 190).trim()}…`;
    },
    dropLetter() {
      return (this.fullExcerpt[0] || '').toUpperCase();
    },
    excerptRest() {
      return this.fullExcerpt.slice(1);
    },
  },
  methods: {
    go() {
      this.$router.push(`/article/${this.article.id}`);
    },
    onImgError(e) {
      e.target.style.visibility = 'hidden';
    },
    formatDate(date) {
      if (!date || date.length < 7) return '';
      const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
      return `${months[Number(date.slice(5, 7)) - 1] || ''} ${date.slice(0, 4)}`;
    },
  },
};
</script>

<style scoped>
.story {
  display: grid;
  grid-template-columns: minmax(140px, 38%) minmax(0, 1fr);
  gap: clamp(1rem, 3vw, 1.75rem);
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--rule);
  cursor: pointer;
}

.story.reverse {
  grid-template-columns: minmax(0, 1fr) minmax(140px, 38%);
}

.story.reverse .media {
  order: 2;
}

.media {
  position: relative;
  background: var(--paper-deep);
  outline: 1px solid var(--ink);
  outline-offset: 0;
  overflow: hidden;
}

.media::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
  pointer-events: none;
}

.media img {
  width: 100%;
  height: 100%;
  min-height: 170px;
  max-height: 240px;
  object-fit: cover;
  filter: contrast(1.04) saturate(0.92);
  transition: transform 0.65s var(--ease-out), filter 0.35s ease;
}

.story:hover .media img {
  transform: scale(1.045);
  filter: contrast(1.08) saturate(1);
}

.body {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding-top: 0.15rem;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem 0.85rem;
  margin: 0 0 0.65rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.rub {
  color: var(--staple);
}

.title {
  margin: 0 0 0.45rem;
  font-family: var(--font-title);
  font-size: clamp(1.25rem, 2.6vw, 1.7rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
}

.author {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  font-style: italic;
  color: var(--ink-muted);
}

.author-link {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}

.author-link:hover {
  color: var(--staple);
}

.excerpt {
  margin: 0 0 1rem;
  font-size: 0.98rem;
  line-height: 1.55;
  color: var(--ink-soft);
}

.drop {
  float: left;
  font-family: var(--font-title);
  font-size: 2.6rem;
  line-height: 0.85;
  padding-right: 0.35rem;
  color: var(--ink);
}

.read-link {
  margin-top: auto;
  width: fit-content;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink);
  border-bottom: 2px solid var(--staple);
  padding-bottom: 2px;
}

.read-link:hover {
  color: var(--staple);
}

@media (max-width: 700px) {
  .story,
  .story.reverse {
    grid-template-columns: 1fr;
  }

  .story.reverse .media {
    order: 0;
  }

  .media img {
    max-height: 220px;
    min-height: 180px;
  }
}
</style>
