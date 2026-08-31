<template>
  <div v-if="banner" class="ephemeral-banner">
    <router-link to="/actualite" class="banner-link">
      {{ banner.banner_text || banner.titre }}
    </router-link>
    <button type="button" class="banner-close" @click="dismiss" aria-label="Fermer">×</button>
  </div>
</template>

<script>
import axiosInstance from '@/axios';

export default {
  name: 'EphemeralBanner',
  data() {
    return {
      banner: null,
      dismissed: false,
    };
  },
  mounted() {
    axiosInstance.get('/api/activeBanner')
      .then((res) => {
        if (res.data && !sessionStorage.getItem(`banner-dismiss-${res.data.id}`)) {
          this.banner = res.data;
        }
      })
      .catch(() => {});
  },
  methods: {
    dismiss() {
      if (this.banner) {
        sessionStorage.setItem(`banner-dismiss-${this.banner.id}`, '1');
      }
      this.banner = null;
    },
  },
};
</script>

<style scoped>
.ephemeral-banner {
  background: var(--ink, #0a0a0a);
  color: #fff;
  padding: 0.65rem 2.75rem 0.65rem 1.25rem;
  text-align: center;
  position: relative;
  font-family: var(--font-body, "Bahnschrift", sans-serif);
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255,255,255,0.12);
}

.banner-link {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.banner-link:hover {
  text-decoration: underline;
}

.banner-close {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
}
</style>
