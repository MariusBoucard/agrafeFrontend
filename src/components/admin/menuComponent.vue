<template>
  <aside class="menu" :class="{ open: mobileOpen }">
    <div class="menu-top">
      <div>
        <p class="menu-kicker">Administration</p>
        <h1>L'Agrafe</h1>
      </div>
      <span class="role-pill" :data-role="normalizedRole">{{ roleLabel }}</span>
    </div>

    <nav class="menu-nav">
      <template v-for="group in visibleGroups" :key="group.title">
        <p class="menu-group">{{ group.title }}</p>
        <ul>
          <li v-for="item in group.items" :key="item.key">
            <button
              type="button"
              class="menu-item"
              :class="{ active: isActive(item.key) }"
              @click="setComponent(item.key)"
            >
              <span>{{ item.label }}</span>
            </button>
          </li>
        </ul>
      </template>
    </nav>

    <div class="menu-legend">
      <p class="menu-group">Rôles</p>
      <ul class="legend-list">
        <li v-for="(desc, key) in roleDescriptions" :key="key">
          <strong>{{ roleLabels[key] }}</strong>
          <span>{{ desc }}</span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  canAccessSection,
  normalizeRole,
  ROLE_LABELS,
  ROLE_DESCRIPTIONS,
} from '@/utils/permissions';

const MENU_GROUPS = [
  {
    title: 'Pilotage',
    items: [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'register', label: 'Utilisateurs' },
    ],
  },
  {
    title: 'Contenu',
    items: [
      { key: 'article', label: 'Articles' },
      { key: 'news', label: 'News' },
      { key: 'archive', label: 'Archives' },
      { key: 'focal', label: 'Focal' },
      { key: 'dossiers', label: 'Dossiers' },
      { key: 'rubrique', label: 'Rubriques' },
      { key: 'pages', label: 'Pages' },
      { key: 'propalArticle', label: "Propositions d'articles" },
    ],
  },
  {
    title: 'Diffusion',
    items: [
      { key: 'newsletter', label: 'Abonnés newsletter' },
      { key: 'newsletterCampaign', label: 'Envoi newsletter' },
      { key: 'fichiers', label: 'Fichiers' },
    ],
  },
];

const ACTIVE_ALIASES = {
  article: ['createArticle', 'modifyArticle'],
  news: ['createNews', 'modifyNews'],
  archive: ['createArchive'],
  focal: ['createFocal'],
};

export default {
  props: {
    selectedComponent: { required: true, type: Object },
    mobileOpen: { type: Boolean, default: false },
  },
  computed: {
    ...mapGetters('auth', ['userRole']),
    normalizedRole() {
      return normalizeRole(this.userRole);
    },
    roleLabel() {
      return ROLE_LABELS[this.normalizedRole] || this.normalizedRole;
    },
    roleLabels() {
      return ROLE_LABELS;
    },
    roleDescriptions() {
      return ROLE_DESCRIPTIONS;
    },
    visibleGroups() {
      return MENU_GROUPS.map((group) => ({
        ...group,
        items: group.items.filter((item) => canAccessSection(this.userRole, item.key)),
      })).filter((group) => group.items.length > 0);
    },
  },
  methods: {
    isActive(key) {
      if (this.selectedComponent[key]) return true;
      const aliases = ACTIVE_ALIASES[key] || [];
      return aliases.some((alias) => this.selectedComponent[alias]);
    },
    setComponent(compo) {
      this.$emit('componentChanged', compo);
    },
  },
};
</script>

<style scoped>
.menu {
  background: #111;
  color: #f5f5f5;
  width: 100%;
  min-height: 100%;
  padding: 1.25rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: var(--font-body, Bahnschrift, sans-serif);
}

.menu-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0 0.35rem;
}

.menu-kicker {
  margin: 0;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.55;
}

.menu-top h1 {
  margin: 0.15rem 0 0;
  font-family: var(--font-title, agrafe, serif);
  font-size: 1.35rem;
  color: #fff;
}

.role-pill {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.35rem 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  white-space: nowrap;
}

.role-pill[data-role='admin'] {
  background: #fff;
  color: #111;
  border-color: #fff;
}

.role-pill[data-role='editor'] {
  border-color: rgba(255, 255, 255, 0.55);
}

.menu-group {
  margin: 0.85rem 0 0.35rem;
  padding: 0 0.45rem;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.45;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0.7rem 0.75rem;
  font-size: 0.95rem;
  min-height: 44px;
  border-left: 3px solid transparent;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.menu-item.active {
  background: rgba(255, 255, 255, 0.12);
  border-left-color: #fff;
  font-weight: 600;
}

.menu-legend {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.legend-list li {
  padding: 0.45rem 0.45rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.78rem;
  opacity: 0.75;
}

.legend-list strong {
  font-size: 0.8rem;
  opacity: 1;
}
</style>
