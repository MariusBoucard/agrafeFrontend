<template>
  <div class="baseView">
    <div class="container">
      <div class="leftColumn">
        <div class="parentDiv">
          <div class="banner">
            <p class="titleBanner">{{ pageTitle }}</p>
          </div>
          <div class="text legal-content">
            <section v-for="(section, i) in sections" :key="i" class="legal-section">
              <h2>{{ section.title }}</h2>
              <p class="legal-body" v-html="formatBody(section.body)"></p>
            </section>
          </div>
        </div>
      </div>
      <div class="rightColumn">
        <ContactComponent />
        <BackcoverWidget />
      </div>
    </div>
  </div>
</template>

<script>
import ContactComponent from '@/widgets/contactComponent.vue';
import BackcoverWidget from '@/widgets/backcoverWidget.vue';
import axiosInstance from '@/axios';

const FALLBACK_SECTIONS = [
  {
    title: 'Éditeur du site',
    body: "Le site lagrafejournal.com est édité par l'association étudiante L'Agrafe, journal associatif de l'Université Rennes 2.\n\nContact : lagrafejournal@protonmail.com",
  },
];

export default {
  name: 'MentionsLegalesView',
  components: { ContactComponent, BackcoverWidget },
  data() {
    return {
      pageTitle: 'Mentions légales',
      sections: FALLBACK_SECTIONS,
    };
  },
  mounted() {
    axiosInstance
      .get('/api/pages/mentions-legales')
      .then((res) => {
        if (res.data?.title) this.pageTitle = res.data.title;
        if (res.data?.content?.sections?.length) {
          this.sections = res.data.content.sections;
        }
      })
      .catch(() => {});
  },
  methods: {
    escapeHtml(text) {
      return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },
    formatBody(body) {
      let html = this.escapeHtml(body);
      html = html.replace(
        /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
        '<a href="mailto:$1">$1</a>',
      );
      html = html.replace(
        /(https?:\/\/[^\s<]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
      );
      html = html.replace(/\n/g, '<br />');
      return html;
    },
  },
};
</script>

<style scoped>
.baseView {
  width: 90%;
  margin: auto;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.leftColumn {
  width: 65%;
}

.rightColumn {
  width: 30%;
}

.banner {
  background-color: var(--ink, #111);
  color: #fff;
  padding: 10px 20px;
  margin-bottom: 20px;
}

.titleBanner {
  font-family: var(--font-title, "agrafe", serif);
  font-size: 1.5em;
  margin: 0;
}

.text {
  font-family: var(--font-body, "Bahnschrift", sans-serif);
  line-height: 1.65;
  margin-bottom: 30px;
}

.legal-section + .legal-section {
  margin-top: 1.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.legal-content h2 {
  font-family: var(--font-title, "agrafe", serif);
  font-size: 1.2em;
  margin: 0 0 0.65em;
}

.legal-body {
  margin: 0;
}

.legal-content :deep(a) {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  .leftColumn,
  .rightColumn {
    width: 100%;
  }
}
</style>
