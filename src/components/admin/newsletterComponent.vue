<template>
  <div class="newsletter-page">
    <header class="page-head">
      <h1>Abonnés newsletter</h1>
      <p>
        {{ verifiedCount }} confirmé{{ verifiedCount > 1 ? 's' : '' }}
        · {{ pendingCount }} en attente
      </p>
    </header>

    <div class="layout">
      <div class="table-card">
        <h2>Liste</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Mail</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.mail }}</td>
                <td>
                  <span class="status" :class="user.pending ? 'pending' : 'ok'">
                    {{ user.pending ? 'En attente' : 'Confirmé' }}
                  </span>
                </td>
                <td class="actions">
                  <button
                    v-if="user.pending"
                    type="button"
                    class="btn-secondary"
                    @click="verify(user.id)"
                  >
                    Confirmer
                  </button>
                  <button type="button" class="btn-danger" @click="deleteNewsletter(user)">
                    Supprimer
                  </button>
                </td>
              </tr>
              <tr v-if="!users.length">
                <td colspan="4" class="empty">Aucun abonné</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <form class="form-card" @submit.prevent="addNewsletter">
        <h2>Ajouter un abonné</h2>
        <label for="username">Nom</label>
        <input type="text" id="username" v-model="formData.username" required />
        <label for="mail">Email</label>
        <input type="email" id="mail" v-model="formData.mail" required />
        <p class="hint">Un email de confirmation sera demandé (sauf confirmation manuelle ici).</p>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';

export default {
  data() {
    return {
      formData: { mail: '', username: '' },
      users: [],
    };
  },
  computed: {
    verifiedCount() {
      return this.users.filter((u) => !u.pending).length;
    },
    pendingCount() {
      return this.users.filter((u) => u.pending).length;
    },
  },
  mounted() {
    this.setNewsletter();
  },
  methods: {
    setNewsletter() {
      axiosInstance
        .get('/api/getNewsletter')
        .then((response) => {
          this.users = response.data || [];
        })
        .catch((error) => console.error(error));
    },
    addNewsletter() {
      axiosInstance
        .post('/api/addNewsletter', { user: this.formData })
        .then(() => {
          this.$message({
            message: 'Abonné ajouté (confirmation requise)',
            type: 'success',
            customClass: 'custom-el-message',
            duration: 2000,
          });
          this.formData = { mail: '', username: '' };
          this.setNewsletter();
        })
        .catch((error) => {
          this.$message({
            message: error.response?.data?.message || 'Erreur',
            type: 'error',
            customClass: 'custom-el-message',
            duration: 2000,
          });
        });
    },
    verify(id) {
      axiosInstance
        .post(`/api/newsletter/subscribers/${id}/verify`)
        .then(() => {
          this.$message({
            message: 'Abonné confirmé',
            type: 'success',
            customClass: 'custom-el-message',
            duration: 1500,
          });
          this.setNewsletter();
        })
        .catch(() => {
          this.$message({
            message: 'Erreur de confirmation',
            type: 'error',
            customClass: 'custom-el-message',
            duration: 2000,
          });
        });
    },
    deleteNewsletter(user) {
      if (!confirm(`Retirer ${user.mail} de la newsletter ?`)) return;
      axiosInstance
        .delete(`/api/deleteNewsletter/${encodeURIComponent(user.mail)}`)
        .then(() => {
          this.$message({
            message: 'Abonné retiré',
            type: 'success',
            customClass: 'custom-el-message',
            duration: 1500,
          });
          this.setNewsletter();
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>

<style scoped>
.newsletter-page {
  padding: 1.25rem 1.5rem 2rem;
  font-family: var(--font-body, Bahnschrift, sans-serif);
  text-align: left;
}
.page-head h1 {
  margin: 0 0 0.25rem;
  font-family: var(--font-title, agrafe, serif);
}
.page-head p { margin: 0 0 1.25rem; color: #555; }
.layout {
  display: grid;
  grid-template-columns: 1.4fr 0.9fr;
  gap: 1rem;
  align-items: start;
}
.table-card, .form-card {
  background: #fff;
  border: 1px solid #e2e2e2;
  padding: 1.1rem 1.25rem;
}
h2 { margin: 0 0 1rem; font-size: 1.1rem; font-family: var(--font-title, agrafe, serif); }
.table-scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
th, td { text-align: left; padding: 0.65rem 0.5rem; border-bottom: 1px solid #eee; }
th { font-size: 0.72rem; text-transform: uppercase; color: #666; }
.status {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.2rem 0.45rem;
  border: 1px solid #ccc;
}
.status.ok { background: #e8f5e9; border-color: #a5d6a7; }
.status.pending { background: #fff8e1; border-color: #ffe082; }
.actions { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.btn-danger {
  background: transparent;
  border: 1px solid #b33;
  color: #b33;
  min-height: 40px;
  padding: 0.4rem 0.65rem;
  cursor: pointer;
}
.btn-secondary {
  background: #fff;
  border: 1px solid #ccc;
  min-height: 40px;
  padding: 0.4rem 0.65rem;
  cursor: pointer;
}
.form-card { display: flex; flex-direction: column; gap: 0.35rem; }
label { font-weight: 600; font-size: 0.85rem; }
input {
  padding: 0.7rem 0.75rem;
  border: 1px solid #ccc;
  min-height: 44px;
}
.hint { font-size: 0.8rem; color: #666; margin: 0.25rem 0 0.5rem; }
button[type='submit'] {
  background: #111;
  color: #fff;
  border: none;
  min-height: 44px;
  padding: 0.85rem 1rem;
  cursor: pointer;
}
.empty { color: #888; text-align: center; padding: 1rem; }
@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
}
</style>
