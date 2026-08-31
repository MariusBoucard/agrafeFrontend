<template>
  <div class="users-page">
    <header class="page-head">
      <div>
        <h1>Utilisateurs & rôles</h1>
        <p>Gérez les comptes et leurs autorisations</p>
      </div>
    </header>

    <section class="roles-info">
      <article v-for="role in rolesInfo" :key="role.key" class="role-card" :data-role="role.key">
        <h3>{{ role.label }}</h3>
        <p>{{ role.description }}</p>
        <ul>
          <li v-for="perm in role.perms" :key="perm">{{ perm }}</li>
        </ul>
      </article>
    </section>

    <div class="users-layout">
      <div class="table-card">
        <h2>Comptes existants</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Mail</th>
                <th>Rôle</th>
                <th>Portfolio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.mail }}</td>
                <td>
                  <span class="role-badge" :data-role="normalizeRole(user.role || user.type)">
                    {{ labelFor(user.role || user.type) }}
                  </span>
                </td>
                <td>
                  <router-link
                    v-if="user.profile_slug"
                    :to="`/equipe/${user.profile_slug}`"
                    target="_blank"
                  >Voir</router-link>
                  <span v-else class="muted">—</span>
                </td>
                <td class="row-actions">
                  <button type="button" class="btn-secondary" @click="startEdit(user)">Modifier</button>
                  <button type="button" class="btn-danger" @click="deleteUser(user.id)">Supprimer</button>
                </td>
              </tr>
              <tr v-if="!users || !users.length">
                <td colspan="5" class="empty">Aucun utilisateur</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <form class="form-card" @submit.prevent="submitForm">
        <h2>{{ editingId ? 'Modifier le compte' : 'Nouveau compte' }}</h2>
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" v-model="formData.username" required />

        <label for="mail">Email</label>
        <input type="email" id="mail" v-model="formData.mail" required />

        <label for="password">{{ editingId ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe' }}</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          :required="!editingId"
          minlength="6"
          :placeholder="editingId ? 'Laisser vide pour ne pas changer' : ''"
        />

        <label for="role">Rôle</label>
        <select id="role" v-model="formData.role">
          <option value="contributor">Contributeur</option>
          <option value="editor">Éditeur</option>
          <option value="admin">Admin</option>
        </select>
        <p class="hint">{{ ROLE_DESCRIPTIONS[formData.role] }}</p>

        <label for="profile_slug">Slug portfolio (optionnel)</label>
        <input type="text" id="profile_slug" v-model="formData.profile_slug" placeholder="ex: thibau" />

        <label for="bio">Bio (optionnel)</label>
        <textarea id="bio" v-model="formData.bio" rows="3"></textarea>

        <div class="form-actions">
          <button type="submit">{{ editingId ? 'Enregistrer' : 'Créer le compte' }}</button>
          <button type="button" class="btn-secondary" v-if="editingId" @click="cancelEdit">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../../axios.js';
import { normalizeRole, ROLE_LABELS, ROLE_DESCRIPTIONS } from '@/utils/permissions';

export default {
  mounted() {
    this.loadUsers();
  },
  data() {
    return {
      editingId: null,
      formData: {
        username: '',
        mail: '',
        password: '',
        role: 'editor',
        profile_slug: '',
        bio: '',
      },
      users: [],
      ROLE_DESCRIPTIONS,
      rolesInfo: [
        {
          key: 'contributor',
          label: 'Contributeur',
          description: ROLE_DESCRIPTIONS.contributor,
          perms: ['Créer / modifier articles', 'Créer / modifier news'],
        },
        {
          key: 'editor',
          label: 'Éditeur',
          description: ROLE_DESCRIPTIONS.editor,
          perms: [
            'Tout le contenu contributeur',
            'Archives, Focal, Rubriques',
            'Dossiers, pages, propositions',
            'Liste des abonnés newsletter',
          ],
        },
        {
          key: 'admin',
          label: 'Admin',
          description: ROLE_DESCRIPTIONS.admin,
          perms: [
            'Tout l’accès éditeur',
            'Dashboard & statistiques',
            'Gestion des utilisateurs',
            'Campagnes newsletter',
            'Fichiers',
          ],
        },
      ],
    };
  },
  methods: {
    normalizeRole,
    labelFor(role) {
      return ROLE_LABELS[normalizeRole(role)] || role;
    },
    resetForm() {
      this.editingId = null;
      this.formData = {
        username: '',
        mail: '',
        password: '',
        role: 'editor',
        profile_slug: '',
        bio: '',
      };
    },
    startEdit(user) {
      this.editingId = user.id;
      this.formData = {
        username: user.name || '',
        mail: user.mail || '',
        password: '',
        role: normalizeRole(user.role || user.type),
        profile_slug: user.profile_slug || '',
        bio: user.bio || '',
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    cancelEdit() {
      this.resetForm();
    },
    loadUsers() {
      axiosInstance
        .get('/api/getAllUser')
        .then((response) => {
          this.users = response.data;
        })
        .catch(() => {
          this.users = [];
          this.$message({
            message: 'Impossible de récupérer les utilisateurs',
            type: 'error',
            customClass: 'custom-el-message',
            duration: 2000,
          });
        });
    },
    deleteUser(id) {
      if (!confirm('Supprimer cet utilisateur ? Action irréversible.')) return;
      axiosInstance
        .delete(`/api/deleteUser/${id}`)
        .then(() => {
          this.$message({
            message: 'Utilisateur supprimé',
            type: 'success',
            customClass: 'custom-el-message',
            duration: 1500,
          });
          if (this.editingId === id) this.resetForm();
          this.loadUsers();
        })
        .catch(() =>
          this.$message({
            message: 'Erreur lors de la suppression',
            type: 'error',
            customClass: 'custom-el-message',
            duration: 2000,
          })
        );
    },
    submitForm() {
      if (this.editingId) {
        const payload = {
          id: this.editingId,
          name: this.formData.username,
          mail: this.formData.mail,
          role: this.formData.role,
          profile_slug: this.formData.profile_slug || null,
          bio: this.formData.bio,
        };
        if (this.formData.password) payload.password = this.formData.password;
        axiosInstance
          .post('/api/modifyUser', { user: payload })
          .then(() => {
            this.$message({
              message: 'Utilisateur modifié',
              type: 'success',
              customClass: 'custom-el-message',
              duration: 1500,
            });
            this.resetForm();
            this.loadUsers();
          })
          .catch(() => {
            this.$message({
              message: 'Erreur lors de la modification',
              type: 'error',
              customClass: 'custom-el-message',
              duration: 2000,
            });
          });
        return;
      }
      const endpoint = this.formData.role === 'admin' ? '/api/registerAdmin' : '/api/register';
      axiosInstance
        .post(endpoint, this.formData)
        .then(() => {
          this.$message({
            message: 'Utilisateur ajouté',
            type: 'success',
            customClass: 'custom-el-message',
            duration: 1500,
          });
          this.resetForm();
          this.loadUsers();
        })
        .catch(() => {
          this.$message({
            message: "Erreur lors de l'ajout de l'utilisateur",
            type: 'error',
            customClass: 'custom-el-message',
            duration: 2000,
          });
        });
    },
  },
};
</script>

<style scoped>
.users-page {
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
.roles-info {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
  margin-bottom: 1.25rem;
}
.role-card {
  background: #fff;
  border: 1px solid #e2e2e2;
  padding: 1rem 1.1rem;
}
.role-card h3 { margin: 0 0 0.35rem; font-size: 1rem; }
.role-card p { margin: 0 0 0.65rem; color: #555; font-size: 0.88rem; }
.role-card ul { margin: 0; padding-left: 1.1rem; font-size: 0.82rem; color: #333; }
.role-card[data-role='admin'] { border-color: #111; }
.users-layout {
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
.table-card h2, .form-card h2 {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  font-family: var(--font-title, agrafe, serif);
}
.table-scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
th, td { text-align: left; padding: 0.7rem 0.5rem; border-bottom: 1px solid #eee; vertical-align: middle; }
th { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.03em; color: #666; }
.role-badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border: 1px solid #ccc;
}
.role-badge[data-role='admin'] { background: #111; color: #fff; border-color: #111; }
.role-badge[data-role='editor'] { background: #f3f3f3; }
.muted, .empty { color: #888; }
.row-actions { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.btn-danger {
  background: transparent;
  border: 1px solid #b33;
  color: #b33;
  padding: 0.4rem 0.65rem;
  cursor: pointer;
  min-height: 40px;
  font-size: 0.8rem;
}
.btn-secondary {
  background: #fff;
  border: 1px solid #ccc;
  color: #111;
  padding: 0.4rem 0.65rem;
  cursor: pointer;
  min-height: 40px;
  font-size: 0.8rem;
}
.form-card { display: flex; flex-direction: column; gap: 0.35rem; }
label { font-weight: 600; font-size: 0.85rem; margin-top: 0.35rem; }
input, select, textarea {
  padding: 0.7rem 0.75rem;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  min-height: 44px;
  font-family: inherit;
}
.hint { margin: 0 0 0.5rem; font-size: 0.8rem; color: #666; }
.form-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
button[type='submit'] {
  background: #111;
  color: #fff;
  border: none;
  padding: 0.85rem 1rem;
  cursor: pointer;
  min-height: 44px;
  font-size: 0.95rem;
}
@media (max-width: 1000px) {
  .roles-info, .users-layout { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .users-page { padding: 1rem; }
}
</style>
