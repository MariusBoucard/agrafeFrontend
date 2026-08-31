<template>
  <div class="admin-shell">
    <NavbarComponent />
    <div class="admin-layout">
      <button
        type="button"
        class="menu-toggle"
        :aria-expanded="menuOpen ? 'true' : 'false'"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'Fermer le menu' : 'Menu admin' }}
      </button>

      <div class="backdrop" v-if="menuOpen" @click="menuOpen = false"></div>

      <div class="left-column" :class="{ open: menuOpen }">
        <MenuComponent
          :selectedComponent="activeComponent"
          :mobileOpen="menuOpen"
          @componentChanged="onNavigate"
        />
      </div>

      <main class="right-column">
        <DashboardComponent v-if="activeComponent.dashboard" />
        <modifyArticle
          v-if="activeComponent.modifyArticle"
          :id="articleId"
          @componentChanged="setComponent($event)"
        />
        <RegisterComponent v-if="activeComponent.register" />
        <ArticlesComponent
          @componentChanged="setComponent($event)"
          @modifyArticle="modifyArticle($event)"
          v-if="activeComponent.article"
        />
        <CreateArticle v-if="activeComponent.createArticle" @componentChanged="setComponent($event)" />
        <NewsletterComponent v-if="activeComponent.newsletter" />
        <NewsletterCampaignComponent v-if="activeComponent.newsletterCampaign" />
        <DossiersComponent v-if="activeComponent.dossiers" />
        <PagesEditorComponent v-if="activeComponent.pages" />
        <newsComponent
          v-if="activeComponent.news"
          @componentChanged="setComponent($event)"
          @modifyNews="setComponent($event)"
        />
        <CreateNewsComponent @componentChanged="setComponent($event)" v-if="activeComponent.createNews" />
        <rubriquesComponent v-if="activeComponent.rubrique" />
        <ArchiveComponent v-if="activeComponent.archive" @componentChanged="setComponent($event)" />
        <createArchive v-if="activeComponent.createArchive" @componentChanged="setComponent($event)" />
        <FocalComponent v-if="activeComponent.focal" @componentChanged="setComponent($event)" />
        <CreateFocalComponent v-if="activeComponent.createFocal" @componentChanged="setComponent($event)" />
        <propositionArticleComponent
          v-if="activeComponent.propalArticle"
          @componentChanged="setComponent($event)"
        />
        <FileUploadComponent v-if="activeComponent.fichiers" @componentChanged="setComponent($event)" />
      </main>
    </div>
  </div>
</template>

<script>
import ArticlesComponent from './articlesComponent.vue';
import CreateArticle from './createArticle.vue';
import MenuComponent from './menuComponent.vue';
import NavbarComponent from './navbarComponent.vue';
import RegisterComponent from './registerComponent.vue';
import modifyArticle from './modifyArticle.vue';
import NewsletterComponent from './newsletterComponent.vue';
import newsComponent from './newsComponent.vue';
import CreateNewsComponent from './createNewsComponent.vue';
import rubriquesComponent from './rubriquesComponent.vue';
import DashboardComponent from './dashboardComponent.vue';
import ArchiveComponent from './archiveComponent.vue';
import createArchive from './createArchive.vue';
import FocalComponent from './focaleComponent.vue';
import CreateFocalComponent from './createFocaleComponent.vue';
import propositionArticleComponent from './propositionArticleComponent.vue';
import NewsletterCampaignComponent from './newsletterCampaignComponent.vue';
import DossiersComponent from './dossiersComponent.vue';
import PagesEditorComponent from './pagesEditorComponent.vue';
import FileUploadComponent from './FileUploadComponent.vue';
import { mapGetters } from 'vuex';
import { canAccessSection, defaultAdminSection } from '@/utils/permissions';

const EMPTY_ACTIVE = {
  dashboard: false,
  register: false,
  article: false,
  archive: false,
  createArchive: false,
  newsletter: false,
  news: false,
  createArticle: false,
  createNews: false,
  modifyNews: false,
  modifyArticle: false,
  rubrique: false,
  focal: false,
  createFocal: false,
  propalArticle: false,
  fichiers: false,
  dossiers: false,
  pages: false,
  newsletterCampaign: false,
};

export default {
  components: {
    FileUploadComponent,
    propositionArticleComponent,
    createArchive,
    rubriquesComponent,
    newsComponent,
    NavbarComponent,
    MenuComponent,
    RegisterComponent,
    ArticlesComponent,
    CreateArticle,
    modifyArticle,
    NewsletterComponent,
    NewsletterCampaignComponent,
    DossiersComponent,
    PagesEditorComponent,
    CreateNewsComponent,
    DashboardComponent,
    ArchiveComponent,
    FocalComponent,
    CreateFocalComponent,
  },
  computed: {
    ...mapGetters('auth', ['userRole']),
  },
  data() {
    return {
      activeComponent: { ...EMPTY_ACTIVE, dashboard: true },
      articleId: '',
      menuOpen: false,
    };
  },
  mounted() {
    const landing = defaultAdminSection(this.userRole);
    this.setComponent(landing);
  },
  methods: {
    modifyArticle(id) {
      this.articleId = id;
      this.setComponent('modifyArticle');
    },
    onNavigate(compo) {
      this.setComponent(compo);
      this.menuOpen = false;
    },
    setComponent(compo) {
      if (!canAccessSection(this.userRole, compo)) {
        compo = defaultAdminSection(this.userRole);
      }
      this.activeComponent = { ...EMPTY_ACTIVE, [compo]: true };
    },
  },
};
</script>

<style scoped>
.admin-shell {
  min-height: 100vh;
  background: #f4f4f4;
}

.admin-layout {
  display: flex;
  min-height: calc(100vh - 60px);
  position: relative;
}

.menu-toggle {
  display: none;
  position: sticky;
  top: 0;
  z-index: 30;
  width: 100%;
  min-height: 44px;
  border: none;
  background: #111;
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
}

.backdrop {
  display: none;
}

.left-column {
  width: 260px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  align-self: flex-start;
  height: calc(100vh - 60px);
  overflow-y: auto;
}

.right-column {
  flex: 1;
  min-width: 0;
  background: #f4f4f4;
  overflow-x: hidden;
}

@media (max-width: 900px) {
  .admin-layout {
    flex-direction: column;
  }

  .menu-toggle {
    display: block;
  }

  .backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 40;
  }

  .left-column {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: min(300px, 86vw);
    height: 100vh;
    z-index: 50;
    transform: translateX(-105%);
    transition: transform 0.2s ease;
  }

  .left-column.open {
    transform: translateX(0);
  }
}
</style>
