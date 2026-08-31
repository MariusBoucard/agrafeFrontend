<template>
  <div class="admin-section">
    <div class="editor-header">
      <h2>Éditer : {{ page.title || selectedSlug }}</h2>
      <label class="slug-picker">
        Page
        <select v-model="selectedSlug" @change="loadPage">
          <option v-for="opt in pageOptions" :key="opt.slug" :value="opt.slug">
            {{ opt.label }}
          </option>
        </select>
      </label>
    </div>

    <p class="hint">
      Les sauts de ligne sont conservés. Les e-mails et URL sont transformés en liens sur le site public.
    </p>

    <div v-for="(section, i) in sections" :key="i" class="section-edit">
      <div class="section-top">
        <input v-model="section.title" placeholder="Titre section" />
        <button type="button" class="remove-btn" @click="removeSection(i)" title="Supprimer la section">
          Supprimer
        </button>
      </div>
      <textarea v-model="section.body" rows="8" placeholder="Contenu"></textarea>
    </div>

    <div class="actions">
      <button type="button" @click="addSection">+ Section</button>
      <button type="button" class="save-btn" @click="save">Enregistrer</button>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';

const PAGE_OPTIONS = [
  { slug: 'apropos', label: 'À propos' },
  { slug: 'mentions-legales', label: 'Mentions légales' },
];

export default {
  name: 'PagesEditorComponent',
  props: {
    slug: { type: String, default: 'apropos' },
  },
  data() {
    return {
      selectedSlug: this.slug,
      pageOptions: PAGE_OPTIONS,
      page: { title: '', content: { sections: [] } },
      sections: [],
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      axiosInstance.get(`/api/pages/${this.selectedSlug}`).then((res) => {
        this.page = res.data;
        this.sections = (res.data.content?.sections || []).map((s) => ({
          title: s.title || '',
          body: s.body || '',
        }));
      }).catch(() => {
        this.page = { title: this.selectedSlug, content: { sections: [] } };
        this.sections = [];
      });
    },
    addSection() {
      this.sections.push({ title: '', body: '' });
    },
    removeSection(index) {
      this.sections.splice(index, 1);
    },
    save() {
      axiosInstance.put(`/api/pages/${this.selectedSlug}`, {
        title: this.page.title || this.pageOptions.find((p) => p.slug === this.selectedSlug)?.label,
        content: { sections: this.sections },
      }).then(() => {
        alert('Page enregistrée');
      }).catch(() => {
        alert('Erreur lors de l’enregistrement');
      });
    },
  },
};
</script>

<style scoped>
.admin-section {
  background: #fff;
  padding: 1.25rem;
  border-radius: 8px;
}

.editor-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.editor-header h2 {
  margin: 0;
}

.slug-picker {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
}

.slug-picker select {
  min-width: 12rem;
  padding: 0.45rem 0.6rem;
  min-height: 44px;
}

.hint {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  opacity: 0.7;
}

.section-edit {
  margin-bottom: 16px;
}

.section-top {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 8px;
}

.section-edit input,
.section-edit textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  font-family: inherit;
}

.section-top input {
  flex: 1;
}

.remove-btn {
  background: #eee;
  border: none;
  padding: 0 0.85rem;
  cursor: pointer;
  min-height: 44px;
  white-space: nowrap;
}

.actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.actions button {
  min-height: 44px;
  padding: 10px 16px;
  border: none;
  cursor: pointer;
}

.save-btn {
  background: #4caf50;
  color: #fff;
}
</style>
