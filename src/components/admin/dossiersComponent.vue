<template>
  <div class="dossiers-page">
    <header class="page-head">
      <h1>Gestion des dossiers</h1>
      <p>Séries thématiques affichées dans le menu du site</p>
    </header>

    <form class="form-card" @submit.prevent="save">
      <h2>{{ editingId ? 'Modifier le dossier' : 'Nouveau dossier' }}</h2>

      <label for="titre">Titre</label>
      <input id="titre" v-model="form.titre" placeholder="Titre du dossier" required />

      <label for="description">Description</label>
      <input id="description" v-model="form.description" placeholder="Courte description" />

      <label for="statut">Statut</label>
      <select id="statut" v-model="form.statut">
        <option value="en_cours">En cours</option>
        <option value="termine">Terminé</option>
      </select>
      <p class="hint">
        {{ form.statut === 'termine'
          ? 'Le dossier est clôturé (badge vert sur le site).'
          : 'La série continue (badge jaune sur le site).' }}
      </p>

      <div class="actions">
        <button type="submit">{{ editingId ? 'Enregistrer' : 'Ajouter' }}</button>
        <button type="button" class="btn-secondary" v-if="editingId" @click="cancelEdit">Annuler</button>
      </div>
    </form>

    <section class="list-card">
      <h2>Dossiers existants</h2>
      <div v-if="!dossiers.length" class="empty">Aucun dossier</div>
      <article v-for="d in dossiers" :key="d.id" class="dossier-row">
        <div class="info">
          <h3>{{ d.titre }}</h3>
          <p v-if="d.description" class="desc">{{ d.description }}</p>
          <span class="badge" :class="d.statut">
            {{ d.statut === 'termine' ? 'Terminé' : 'En cours' }}
          </span>
        </div>
        <div class="row-actions">
          <button type="button" class="btn-secondary" @click="startEdit(d)">Modifier</button>
          <button
            type="button"
            class="btn-secondary"
            @click="toggleStatut(d)"
          >
            {{ d.statut === 'termine' ? 'Remettre en cours' : 'Marquer terminé' }}
          </button>
          <button type="button" class="btn-danger" @click="remove(d)">Supprimer</button>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import axiosInstance from '@/axios';

export default {
  name: 'DossiersComponent',
  data() {
    return {
      dossiers: [],
      editingId: null,
      form: { titre: '', description: '', statut: 'en_cours' },
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      axiosInstance.get('/api/dossiers').then((r) => {
        this.dossiers = r.data || [];
      });
    },
    resetForm() {
      this.editingId = null;
      this.form = { titre: '', description: '', statut: 'en_cours' };
    },
    startEdit(d) {
      this.editingId = d.id;
      this.form = {
        titre: d.titre || '',
        description: d.description || '',
        statut: d.statut || 'en_cours',
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    cancelEdit() {
      this.resetForm();
    },
    save() {
      if (this.editingId) {
        axiosInstance
          .put(`/api/dossiers/${this.editingId}`, {
            dossier: { ...this.form, id: this.editingId },
          })
          .then(() => {
            this.resetForm();
            this.load();
          })
          .catch(() => alert('Erreur lors de la modification'));
        return;
      }
      axiosInstance
        .post('/api/dossiers', { dossier: this.form })
        .then(() => {
          this.resetForm();
          this.load();
        })
        .catch(() => alert('Erreur lors de la création'));
    },
    toggleStatut(d) {
      const next = d.statut === 'termine' ? 'en_cours' : 'termine';
      axiosInstance
        .put(`/api/dossiers/${d.id}`, {
          dossier: { ...d, statut: next },
        })
        .then(() => this.load())
        .catch(() => alert('Erreur lors du changement de statut'));
    },
    remove(d) {
      if (!confirm(`Supprimer le dossier « ${d.titre} » ?`)) return;
      axiosInstance
        .delete(`/api/dossiers/${d.id}`)
        .then(() => {
          if (this.editingId === d.id) this.resetForm();
          this.load();
        })
        .catch(() => alert('Erreur lors de la suppression'));
    },
  },
};
</script>

<style scoped>
.dossiers-page {
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
.form-card, .list-card {
  background: #fff;
  border: 1px solid #e2e2e2;
  padding: 1.1rem 1.25rem;
  margin-bottom: 1rem;
}
h2 {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  font-family: var(--font-title, agrafe, serif);
}
label {
  display: block;
  font-weight: 600;
  font-size: 0.85rem;
  margin: 0.5rem 0 0.25rem;
}
input, select {
  width: 100%;
  max-width: 480px;
  padding: 0.7rem 0.75rem;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  min-height: 44px;
  box-sizing: border-box;
}
.hint { margin: 0.35rem 0 0.5rem; font-size: 0.8rem; color: #666; }
.actions { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; }
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
.btn-danger {
  background: transparent;
  color: #b33;
  border: 1px solid #b33;
}
.dossier-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
  align-items: center;
}
.info h3 { margin: 0 0 0.25rem; font-size: 1rem; }
.desc { margin: 0 0 0.45rem; color: #555; font-size: 0.9rem; }
.badge {
  display: inline-block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.2rem 0.5rem;
}
.badge.en_cours { background: #ffc107; color: #000; }
.badge.termine { background: #4caf50; color: #fff; }
.row-actions { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.empty { color: #888; padding: 0.5rem 0; }
@media (max-width: 600px) {
  .dossiers-page { padding: 1rem; }
  input, select { max-width: none; }
}
</style>
