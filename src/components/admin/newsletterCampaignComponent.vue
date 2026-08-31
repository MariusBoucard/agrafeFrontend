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
      <form @submit.prevent="saveCampaign">
        <label for="subject">Sujet</label>
        <input id="subject" v-model="subject" placeholder="Sujet de la newsletter" required />

        <label for="htmlBody">Contenu HTML</label>
        <textarea id="htmlBody" v-model="htmlBody" rows="12" placeholder="<p>Bonjour…</p>" required></textarea>

        <div class="actions">
          <button type="submit">{{ editingId ? 'Enregistrer les modifications' : 'Créer le brouillon' }}</button>
          <button type="button" class="btn-secondary" v-if="editingId" @click="cancelEdit">Annuler</button>
          <button type="button" class="btn-secondary" @click="showPreview = !showPreview">
            {{ showPreview ? 'Masquer l’aperçu' : 'Aperçu' }}
          </button>
        </div>
      </form>

      <div v-if="showPreview" class="preview">
        <h3>Aperçu — {{ subject || '(sans sujet)' }}</h3>
        <div class="preview-body" v-html="htmlBody"></div>
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

export default {
  name: 'NewsletterCampaignComponent',
  data() {
    return {
      subject: '',
      htmlBody: '',
      campaigns: [],
      editingId: null,
      showPreview: false,
      previewModal: null,
      verifiedCount: 0,
    };
  },
  computed: {
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
      this.subject = c.subject;
      this.htmlBody = c.html_body;
      this.showPreview = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    cancelEdit() {
      this.editingId = null;
      this.subject = '';
      this.htmlBody = '';
      this.showPreview = false;
    },
    previewCampaign(c) {
      this.previewModal = c;
    },
    saveCampaign() {
      if (this.editingId) {
        axiosInstance
          .put(`/api/newsletter/campaigns/${this.editingId}`, {
            subject: this.subject,
            html_body: this.htmlBody,
          })
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
        .post('/api/newsletter/campaigns', { subject: this.subject, html_body: this.htmlBody })
        .then(() => {
          this.cancelEdit();
          this.loadCampaigns();
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
label { display: block; font-weight: 600; font-size: 0.85rem; margin: 0.5rem 0 0.25rem; }
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
  padding: 1rem;
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
