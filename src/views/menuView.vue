<template>
  <div class="home">
    <div class="page-shell home-body">
      <header class="home-intro anim-fade-up">
        <p class="section-kicker">Journal associatif · Rennes 2</p>
        <h1 class="home-title">L'Agrafe</h1>
        <p class="home-lead">Le journal qui agrafe les idées</p>
        <hr class="double-rule" />
      </header>

      <div class="page-columns">
        <main class="page-main">
          <p class="section-kicker">À lire</p>
          <h2 class="section-title">Derniers articles</h2>
          <ArticleComponent />
        </main>
        <aside class="page-sidebar">
          <ContactComponent />
          <BackcoverWidget />
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleComponent from '@/components/articleComponent.vue';
import BackcoverWidget from '@/widgets/backcoverWidget.vue';
import ContactComponent from '@/widgets/contactComponent.vue';

export default {
  name: 'HomeView',
  components: { ArticleComponent, ContactComponent, BackcoverWidget },
};
</script>

<style scoped>
.home {
  padding-bottom: var(--space-xl);
}

.home-body {
  padding-top: clamp(1.75rem, 4vw, 3rem);
}

.home-intro {
  margin-bottom: clamp(1.75rem, 4vw, 2.75rem);
  max-width: 40rem;
}

.home-title {
  margin: 0 0 0.4rem;
  font-family: var(--font-title);
  font-size: clamp(3rem, 10vw, 5.5rem);
  line-height: 0.92;
  letter-spacing: -0.03em;
}

.home-lead {
  margin: 1rem 0 1.25rem;
  font-size: clamp(1.25rem, 2vw, 1.25rem);
  color: var(--ink-muted);
  font-weight: 600;
}

.section-title {
  margin-bottom: 0.75rem;
}
</style>
