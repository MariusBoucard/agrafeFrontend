<template>
  <div class="campaign-page">
    <header class="page-head">
      <h1>Envoi newsletter</h1>
      <p>
        <strong>{{ verifiedCount }}</strong> abonné{{ verifiedCount > 1 ? 's' : '' }} confirmé{{ verifiedCount > 1 ? 's' : '' }}
        recevront l’envoi
      </p>
    </header>

    <section class="editor-card">
      <h2>{{ editingId ? 'Modifier le brouillon' : 'Nouveau brouillon' }}</h2>

      <div class="mode-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          :class="{ active: mode === 'template' }"
          :aria-selected="mode === 'template'"
          @click="setMode('template')"
        >
          Modèle
        </button>
        <button
          type="button"
          role="tab"
          :class="{ active: mode === 'html' }"
          :aria-selected="mode === 'html'"
          @click="setMode('html')"
        >
          HTML libre
        </button>
      </div>

      <form @submit.prevent="saveCampaign">
        <template v-if="mode === 'template'">
          <p class="hint">Choisissez un modèle, remplissez les champs — le HTML est généré automatiquement.</p>

          <div class="template-grid">
            <button
              v-for="tpl in templates"
              :key="tpl.id"
              type="button"
              class="template-card"
              :class="{ selected: selectedTemplateId === tpl.id }"
              @click="selectTemplate(tpl.id)"
            >
              <strong>{{ tpl.label }}</strong>
              <span>{{ tpl.description }}</span>
            </button>
          </div>

          <template v-if="selectedTemplate">
            <div v-for="field in selectedTemplate.fields" :key="field.key" class="field">
              <label :for="'f-' + field.key">
                {{ field.label }}
                <span v-if="!field.required" class="opt">optionnel</span>
              </label>
              <textarea
                v-if="field.type === 'textarea'"
                :id="'f-' + field.key"
                v-model="templateFields[field.key]"
                rows="5"
                :placeholder="field.placeholder"
                :required="field.required"
              />
              <input
                v-else
                :id="'f-' + field.key"
                v-model="templateFields[field.key]"
                :type="field.type === 'url' ? 'url' : 'text'"
                :placeholder="field.placeholder"
                :required="field.required"
              />
            </div>
          </template>
        </template>

        <template v-else>
          <label for="subject">Sujet</label>
          <input id="subject" v-model="subject" placeholder="Sujet de la newsletter" required />

          <label for="htmlBody">Contenu HTML</label>
          <textarea id="htmlBody" v-model="htmlBody" rows="12" placeholder="<p>Bonjour…</p>" required></textarea>
        </template>

        <div class="actions">
          <button type="submit">{{ editingId ? 'Enregistrer les modifications' : 'Créer le brouillon' }}</button>
          <button type="button" class="btn-secondary" v-if="editingId" @click="cancelEdit">Annuler</button>
          <button type="button" class="btn-secondary" @click="showPreview = !showPreview">
            {{ showPreview ? 'Masquer l’aperçu' : 'Aperçu' }}
          </button>
        </div>
      </form>

      <div v-if="showPreview" class="preview">
        <h3>Aperçu — {{ previewSubject || '(sans sujet)' }}</h3>
        <div class="preview-body" v-html="previewHtml"></div>
      </div>
    </section>

    <section class="list-card">
      <h2>Campagnes</h2>
      <div v-if="!campaigns.length" class="empty">Aucune campagne pour l’instant</div>
      <article v-for="c in sortedCampaigns" :key="c.id" class="campaign-row">
        <div class="campaign-info">
          <h3>{{ c.subject }}</h3>
          <p v-if="c.sent_at" class="meta sent">
            Envoyée le {{ formatDate(c.sent_at) }} · {{ c.recipient_count || 0 }} destinataire{{ (c.recipient_count || 0) > 1 ? 's' : '' }}
          </p>
          <p v-else class="meta draft">
            Brouillon · créé le {{ formatDate(c.created_at) }}
            <span v-if="c.updated_at && c.updated_at !== c.created_at"> · modifié le {{ formatDate(c.updated_at) }}</span>
          </p>
        </div>
        <div class="campaign-actions">
          <button type="button" class="btn-secondary" @click="loadCampaign(c)" v-if="!c.sent_at">Modifier</button>
          <button type="button" class="btn-secondary" @click="previewCampaign(c)">Voir</button>
          <button type="button" v-if="!c.sent_at" @click="sendCampaign(c)">Envoyer</button>
        </div>
      </article>
    </section>

    <div v-if="previewModal" class="modal" @click.self="previewModal = null">
      <div class="modal-card">
        <header>
          <h3>{{ previewModal.subject }}</h3>
          <button type="button" class="btn-secondary" @click="previewModal = null">Fermer</button>
        </header>
        <div class="preview-body" v-html="previewModal.html_body"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';
import { EMAIL_TEMPLATES, getTemplateById, renderTemplate } from '@/utils/emailTemplates';

export default {
  name: 'NewsletterCampaignComponent',
  data() {
    return {
      mode: 'template',
      templates: EMAIL_TEMPLATES,
      selectedTemplateId: EMAIL_TEMPLATES[0].id,
      templateFields: { ...EMAIL_TEMPLATES[0].defaults },
      subject: '',
      htmlBody: '',
      campaigns: [],
      editingId: null,
      showPreview: true,
      previewModal: null,
      verifiedCount: 0,
    };
  },
  computed: {
    selectedTemplate() {
      return getTemplateById(this.selectedTemplateId);
    },
    previewSubject() {
      if (this.mode === 'template') return this.templateFields.subject || '';
      return this.subject;
    },
    previewHtml() {
      if (this.mode === 'template' && this.selectedTemplate) {
        return renderTemplate(this.selectedTemplateId, this.templateFields);
      }
      return this.htmlBody;
    },
    sortedCampaigns() {
      return [...this.campaigns].sort((a, b) => {
        const da = new Date(a.created_at || 0).getTime();
        const db = new Date(b.created_at || 0).getTime();
        return db - da;
      });
    },
  },
  mounted() {
    this.loadCampaigns();
    this.loadVerifiedCount();
  },
  methods: {
    setMode(mode) {
      this.mode = mode;
      if (mode === 'html' && this.selectedTemplate && !this.htmlBody) {
        this.subject = this.templateFields.subject || '';
        this.htmlBody = renderTemplate(this.selectedTemplateId, this.templateFields);
      }
    },
    selectTemplate(id) {
      const tpl = getTemplateById(id);
      if (!tpl) return;
      this.selectedTemplateId = id;
      this.templateFields = { ...tpl.defaults };
    },
    buildPayload() {
      if (this.mode === 'template') {
        const tpl = this.selectedTemplate;
        if (!tpl) return null;
        for (const field of tpl.fields) {
          if (field.required && !String(this.templateFields[field.key] || '').trim()) {
            alert(`Champ requis : ${field.label}`);
            return null;
          }
        }
        return {
          subject: this.templateFields.subject.trim(),
          html_body: renderTemplate(this.selectedTemplateId, this.templateFields),
        };
      }
      return {
        subject: this.subject,
        html_body: this.htmlBody,
      };
    },
    formatDate(iso) {
      if (!iso) return '—';
      try {
        return new Date(iso).toLocaleString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      } catch {
        return iso;
      }
    },
    loadVerifiedCount() {
      axiosInstance.get('/api/newsletter/subscribers/count').then((r) => {
        this.verifiedCount = r.data?.verified || 0;
      }).catch(() => { this.verifiedCount = 0; });
    },
    loadCampaigns() {
      axiosInstance.get('/api/newsletter/campaigns').then((r) => {
        this.campaigns = r.data || [];
      });
    },
    loadCampaign(c) {
      this.editingId = c.id;
      this.mode = 'html';
      this.subject = c.subject;
      this.htmlBody = c.html_body;
      this.showPreview = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    cancelEdit() {
      this.editingId = null;
      this.subject = '';
      this.htmlBody = '';
      this.mode = 'template';
      this.selectTemplate(EMAIL_TEMPLATES[0].id);
      this.showPreview = true;
    },
    previewCampaign(c) {
      this.previewModal = c;
    },
    saveCampaign() {
      const payload = this.buildPayload();
      if (!payload) return;

      if (this.editingId) {
        axiosInstance
          .put(`/api/newsletter/campaigns/${this.editingId}`, payload)
          .then(() => {
            this.$message?.({ message: 'Brouillon mis à jour', type: 'success', duration: 1500 });
            this.cancelEdit();
            this.loadCampaigns();
          })
          .catch((err) => {
            alert(err.response?.data?.message || 'Erreur lors de la sauvegarde');
          });
        return;
      }
      axiosInstance
        .post('/api/newsletter/campaigns', payload)
        .then(() => {
          this.cancelEdit();
          this.loadCampaigns();
        })
        .catch((err) => {
          alert(err.response?.data?.message || 'Erreur lors de la création');
        });
    },
    sendCampaign(c) {
      if (this.verifiedCount === 0) {
        alert('Aucun abonné confirmé. Allez dans « Abonnés newsletter » pour confirmer les inscriptions en attente.');
        return;
      }
      if (!confirm(`Envoyer « ${c.subject} » à ${this.verifiedCount} abonné(s) confirmé(s) ?`)) return;
      axiosInstance
        .post(`/api/newsletter/campaigns/${c.id}/send`)
        .then((r) => {
          const sent = r.data.results?.sent || 0;
          const msg = r.data.message;
          if (r.status === 200 || r.data.code === 200) {
            alert(msg || `Envoyée à ${sent} personne(s)`);
          } else {
            alert(msg || `Résultat : ${sent} envoi(s)`);
          }
          this.loadCampaigns();
          this.loadVerifiedCount();
        })
        .catch((err) => {
          alert(err.response?.data?.message || 'Erreur lors de l’envoi');
          this.loadCampaigns();
        });
    },
  },
};
</script>

<style scoped>
.campaign-page {
  padding: 1.25rem 1.5rem 2rem;
  font-family: var(--font-body, Bahnschrift, sans-serif);
  text-align: left;
}
.page-head h1 {
  margin: 0 0 0.25rem;
  font-family: var(--font-title, agrafe, serif);
  font-size: clamp(1.4rem, 3vw, 1.85rem);
}
.page-head p { margin: 0 0 1.25rem; color: #555; }
.editor-card, .list-card {
  background: #fff;
  border: 1px solid #e2e2e2;
  padding: 1.1rem 1.25rem;
  margin-bottom: 1rem;
}
h2 { margin: 0 0 1rem; font-size: 1.1rem; font-family: var(--font-title, agrafe, serif); }
.mode-tabs {
  display: flex;
  gap: 0.35rem;
  margin-bottom: 1rem;
}
.mode-tabs button {
  background: #fff;
  color: #111;
  border: 1px solid #ccc;
  min-height: 40px;
  padding: 0.5rem 1rem;
}
.mode-tabs button.active {
  background: #111;
  color: #fff;
  border-color: #111;
}
.hint {
  margin: 0 0 0.85rem;
  color: #666;
  font-size: 0.9rem;
}
.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.6rem;
  margin-bottom: 1rem;
}
.template-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  text-align: left;
  background: #fafafa;
  color: #111;
  border: 1px solid #ddd;
  padding: 0.85rem 0.9rem;
  min-height: auto;
  height: 100%;
}
.template-card.selected {
  border-color: #111;
  background: #fff;
  box-shadow: inset 0 0 0 1px #111;
}
.template-card strong {
  font-family: var(--font-title, agrafe, serif);
  font-size: 0.95rem;
}
.template-card span {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.35;
  font-weight: normal;
}
.field { margin-bottom: 0.35rem; }
label { display: block; font-weight: 600; font-size: 0.85rem; margin: 0.5rem 0 0.25rem; }
.opt { font-weight: 400; color: #888; font-size: 0.8rem; margin-left: 0.35rem; }
input, textarea {
  width: 100%;
  padding: 0.7rem 0.75rem;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  box-sizing: border-box;
  font-family: inherit;
}
.actions { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.85rem; }
button {
  min-height: 44px;
  padding: 0.65rem 1rem;
  background: #111;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}
.btn-secondary {
  background: #fff;
  color: #111;
  border: 1px solid #ccc;
}
.preview {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}
.preview-body {
  border: 1px solid #eee;
  padding: 0;
  background: #fafafa;
  overflow-x: auto;
}
.campaign-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
  align-items: center;
}
.campaign-info h3 { margin: 0 0 0.25rem; font-size: 1rem; }
.meta { margin: 0; font-size: 0.85rem; color: #666; }
.meta.sent { color: #1a7a3a; }
.meta.draft { color: #888; }
.campaign-actions { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.empty { color: #888; padding: 1rem 0; }
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.modal-card {
  background: #fff;
  max-width: 720px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  padding: 1.25rem;
}
.modal-card header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
@media (max-width: 600px) {
  .campaign-page { padding: 1rem; }
}
</style>
