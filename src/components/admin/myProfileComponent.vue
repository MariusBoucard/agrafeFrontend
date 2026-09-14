<template>
  <div class="profile-page">
    <header class="page-head">
      <h1>Mon profil</h1>
      <p>Bio, slug portfolio et liens vers vos réseaux sociaux</p>
    </header>

    <form class="form-card" @submit.prevent="save" v-if="!loading">
      <label for="name">Nom</label>
      <input id="name" type="text" :value="name" disabled />

      <label for="mail">Email</label>
      <input id="mail" type="email" :value="mail" disabled />

      <label for="profile_slug">Slug portfolio</label>
      <input
        id="profile_slug"
        type="text"
        v-model="form.profile_slug"
        placeholder="ex: thibau"
      />
      <p class="hint" v-if="form.profile_slug">
        Portfolio public :
        <router-link :to="`/equipe/${form.profile_slug}`" target="_blank">
          /equipe/{{ form.profile_slug }}
        </router-link>
      </p>

      <label for="bio">Bio</label>
      <textarea id="bio" v-model="form.bio" rows="4" placeholder="Quelques mots sur vous…"></textarea>

      <h2>Réseaux sociaux</h2>
      <p class="hint">URLs complètes uniquement. Les champs vides ne s’affichent pas.</p>
      <div v-for="field in socialFields" :key="field.key" class="field">
        <label :for="'social-' + field.key">{{ field.label }}</label>
        <input
          :id="'social-' + field.key"
          type="url"
          v-model="form.socials[field.key]"
          :placeholder="field.placeholder"
        />
      </div>

      <label for="password">Nouveau mot de passe (optionnel)</label>
      <input
        id="password"
        type="password"
        v-model="form.password"
        minlength="6"
        placeholder="Laisser vide pour ne pas changer"
      />

      <div class="actions">
        <button type="submit" :disabled="saving">{{ saving ? 'Enregistrement…' : 'Enregistrer' }}</button>
      </div>
    </form>
    <p v-else class="loading">Chargement…</p>
  </div>
</template>

<script>
import axiosInstance from '@/axios';
import { SOCIAL_FIELDS, emptySocials, socialsFromUser } from '@/utils/socials';

export default {
  name: 'MyProfileComponent',
  data() {
    return {
      loading: true,
      saving: false,
      name: '',
      mail: '',
      socialFields: SOCIAL_FIELDS,
      form: {
        profile_slug: '',
        bio: '',
        socials: emptySocials(),
        password: '',
      },
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.loading = true;
      axiosInstance
        .get('/api/me')
        .then((r) => {
          const u = r.data || {};
          this.name = u.name || '';
          this.mail = u.mail || '';
          this.form = {
            profile_slug: u.profile_slug || '',
            bio: u.bio || '',
            socials: socialsFromUser(u),
            password: '',
          };
        })
        .catch(() => {
          alert('Impossible de charger le profil');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    save() {
      this.saving = true;
      const payload = {
        profile_slug: this.form.profile_slug || null,
        bio: this.form.bio,
        socials: this.form.socials,
      };
      if (this.form.password) payload.password = this.form.password;
      axiosInstance
        .put('/api/me/profile', payload)
        .then(() => {
          this.$message?.({ message: 'Profil mis à jour', type: 'success', duration: 1500 });
          this.form.password = '';
          this.load();
        })
        .catch((err) => {
          alert(err.response?.data?.message || 'Erreur lors de l’enregistrement');
        })
        .finally(() => {
          this.saving = false;
        });
    },
  },
};
</script>

<style scoped>
.profile-page {
  padding: 1.25rem 1.5rem 2rem;
  font-family: var(--font-body, Bahnschrift, sans-serif);
  text-align: left;
  max-width: 560px;
}
.page-head h1 {
  margin: 0 0 0.25rem;
  font-family: var(--font-title, agrafe, serif);
  font-size: clamp(1.4rem, 3vw, 1.85rem);
}
.page-head p { margin: 0 0 1.25rem; color: #555; }
.form-card {
  background: #fff;
  border: 1px solid #e2e2e2;
  padding: 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
h2 {
  margin: 1rem 0 0.25rem;
  font-size: 1.05rem;
  font-family: var(--font-title, agrafe, serif);
}
label { font-weight: 600; font-size: 0.85rem; margin-top: 0.35rem; }
input, textarea {
  padding: 0.7rem 0.75rem;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  min-height: 44px;
  font-family: inherit;
}
input:disabled { background: #f5f5f5; color: #666; }
.hint { margin: 0 0 0.35rem; font-size: 0.8rem; color: #666; }
.actions { margin-top: 0.75rem; }
button[type='submit'] {
  background: #111;
  color: #fff;
  border: none;
  padding: 0.85rem 1rem;
  cursor: pointer;
  min-height: 44px;
  font-size: 0.95rem;
}
button:disabled { opacity: 0.6; cursor: wait; }
.loading { color: #666; }
@media (max-width: 600px) {
  .profile-page { padding: 1rem; }
}
</style>
