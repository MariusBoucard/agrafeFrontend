<template>
  <div class="baseView">
    <div class="centerDiv">
      <p class="subText">N° {{ currentArchive.numero }}. {{ formatDate(currentArchive.date) }}</p>

      <div class="reader-row">
        <button
          class="nav-btn"
          type="button"
          aria-label="Page précédente"
          @click="lastPage"
          :disabled="currentPage <= 1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="nav-icon">
            <path fill-rule="evenodd"
              d="M19.5 5.653c0-1.426-1.529-2.33-2.779-1.643l-11.54 6.348c-1.295.712-1.295 2.573 0 3.285l11.54 6.348c1.25.687 2.779-.217 2.779-1.643V5.653z"
              clip-rule="evenodd" />
          </svg>
        </button>

        <div class="pages" :class="{ spread: isSpread }">
          <div v-if="showCover" class="page-slot single">
            <pdf
              :src="pdfSrc"
              :page="1"
              :key="`cover-${archiveId}`"
            />
          </div>

          <template v-else-if="showBack">
            <div class="page-slot single">
              <img
                class="back-cover"
                :src="`${baseUrl}/api/save/saveArchive/back/${archiveId}.png`"
                alt="Quatrième de couverture"
              />
            </div>
          </template>

          <template v-else>
            <div class="page-slot">
              <pdf :src="pdfSrc" :page="currentPage" :key="`p-${currentPage}`" />
            </div>
            <div v-if="rightPage <= nbPages" class="page-slot">
              <pdf :src="pdfSrc" :page="rightPage" :key="`p-${rightPage}`" />
            </div>
          </template>
        </div>

        <div class="nav-side">
          <button
            class="nav-btn"
            type="button"
            aria-label="Page suivante"
            @click="nextPage"
            :disabled="currentPage >= nbPages"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="nav-icon">
              <path fill-rule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clip-rule="evenodd" />
            </svg>
          </button>
          <button class="download-button" type="button" @click="downloadArchive">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="download-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
            </svg>
            Télécharger
          </button>
        </div>
      </div>

      <p class="subText">Page {{ currentPage }} / {{ nbPages }}</p>
    </div>
  </div>
</template>

<script>
import pdf from '@/components/PdfViewer.vue';
import { PDFDocument } from 'pdf-lib';
import baseUrl from '../config';
import axiosInstance from '@/axios';

export default {
  name: 'ArchiveLectureView',
  components: { pdf },
  data() {
    return {
      baseUrl,
      archiveId: '',
      currentPage: 1,
      nbPages: 1,
      currentArchive: {},
    };
  },
  computed: {
    pdfSrc() {
      if (!this.archiveId) return '';
      return `${this.baseUrl}/api/save/saveArchive/pdf/${this.archiveId}.pdf`;
    },
    showCover() {
      return this.currentPage === 1;
    },
    showBack() {
      return this.nbPages > 1 && this.currentPage >= this.nbPages;
    },
    isSpread() {
      return !this.showCover && !this.showBack;
    },
    rightPage() {
      return this.currentPage + 1;
    },
  },
  watch: {
    '$route.params.id'() {
      this.getArchive();
      this.fetchPdf();
    },
  },
  mounted() {
    this.getArchive();
    this.fetchPdf();
  },
  methods: {
    downloadArchive() {
      const url = `${this.baseUrl}/api/save/saveArchive/pdf/${this.archiveId}.pdf`;
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${this.archiveId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    async fetchPdf() {
      if (!this.archiveId) return;

      axiosInstance
        .get(`/api/getArchivePublic/${this.archiveId}`)
        .then((response) => {
          this.currentArchive = response.data || {};
        })
        .catch((error) => {
          console.log(error);
        });

      try {
        const response = await fetch(this.pdfSrc);
        if (!response.ok) throw new Error(`PDF HTTP ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        this.nbPages = Math.max(1, pdfDoc.getPageCount());
        this.currentPage = 1;
      } catch (error) {
        console.log(error);
        this.nbPages = 1;
      }
    },
    getArchive() {
      this.archiveId = this.$route.params.id || '';
      this.currentPage = 1;
    },
    lastPage() {
      if (this.currentPage === 2) this.currentPage = 1;
      else if (this.currentPage > 2) this.currentPage -= 2;
    },
    nextPage() {
      if (this.currentPage === 1) this.currentPage = Math.min(2, this.nbPages);
      else if (this.currentPage < this.nbPages) {
        this.currentPage = Math.min(this.currentPage + 2, this.nbPages);
      }
    },
    formatDate(date) {
      if (!date) return '';
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      return `${this.monthToDate(month)}. ${year}`;
    },
    monthToDate(month) {
      switch (month) {
        case '01': return 'Jan';
        case '02': return 'Fév';
        case '03': return 'Mars';
        case '04': return 'Avr';
        case '05': return 'Mai';
        case '06': return 'Juin';
        case '07': return 'Juil';
        case '08': return 'Août';
        case '09': return 'Sept';
        case '10': return 'Oct';
        case '11': return 'Nov';
        case '12': return 'Déc';
        default: return '';
      }
    },
  },
};
</script>

<style scoped>
.baseView {
  width: min(96%, 1100px);
  margin: 0 auto;
}

.centerDiv {
  color: white;
  background-color: black;
  margin-top: 1.25rem;
  margin-bottom: 3rem;
  padding: 0.75rem 0.5rem 1rem;
}

.subText {
  margin: 0.75rem 0;
  font-size: 1.05rem;
  font-weight: 400;
  color: white;
  text-align: center;
}

.reader-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 0.5rem;
  align-items: center;
}

.pages {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
  min-width: 0;
  width: 100%;
}

.pages.spread .page-slot {
  flex: 1 1 0;
  max-width: 50%;
}

.page-slot {
  min-width: 0;
  width: 100%;
  background: #111;
}

.page-slot.single {
  max-width: min(100%, 640px);
  margin: 0 auto;
}

.back-cover {
  display: block;
  width: 100%;
  height: auto;
}

.nav-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  min-height: 48px;
  padding: 0.35rem;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
}

.nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.nav-icon {
  width: 2.5rem;
  height: 2.5rem;
}

.download-button {
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 0.55rem 0.7rem;
  text-align: center;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.download-button:hover {
  background-color: white;
  color: black;
}

.download-icon {
  width: 2rem;
  height: 2rem;
}

@media (max-width: 768px) {
  .reader-row {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .nav-side {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }

  .pages.spread {
    flex-direction: column;
  }

  .pages.spread .page-slot {
    max-width: 100%;
  }

  .page-slot.single {
    max-width: 100%;
  }
}
</style>
