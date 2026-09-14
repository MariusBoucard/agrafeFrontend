<template>
  <div class="dashboard">
    <header class="dash-header">
      <div>
        <h1>Tableau de bord</h1>
        <p class="dash-subtitle">Vue d’ensemble des lectures et du contenu</p>
      </div>
    </header>

    <section class="kpi-grid" aria-label="Indicateurs">
      <article class="kpi">
        <span class="kpi-label">Articles</span>
        <strong class="kpi-value">{{ articles.length }}</strong>
      </article>
      <article class="kpi">
        <span class="kpi-label">Archives</span>
        <strong class="kpi-value">{{ archives.length }}</strong>
      </article>
      <article class="kpi">
        <span class="kpi-label">Lectures articles</span>
        <strong class="kpi-value">{{ totalArticleViews }}</strong>
      </article>
      <article class="kpi">
        <span class="kpi-label">Lectures archives</span>
        <strong class="kpi-value">{{ totalArchiveViews }}</strong>
      </article>
      <article class="kpi kpi-accent">
        <span class="kpi-label">Vues (période)</span>
        <strong class="kpi-value">{{ periodViews }}</strong>
      </article>
    </section>

    <section class="chart-card">
      <h2>Lectures quotidiennes</h2>
      <p class="section-hint">Évolution des vues jour après jour</p>
      <div class="chart-wrap">
        <canvas ref="lineChart"></canvas>
      </div>
    </section>

    <section class="tables-grid">
      <div class="table-card">
        <div class="table-card-head">
          <h2>Top articles</h2>
          <span class="badge">{{ topArticles.length }} affichés</span>
        </div>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th class="hide-sm">Auteur</th>
                <th class="hide-md">Date</th>
                <th>Lectures</th>
                <th class="hide-sm">Rubrique</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="article in topArticles" :key="article.id">
                <td>
                  <div class="cell-title">
                    <img
                      class="thumb"
                      :src="`${baseUrl}/api/save/saveArticle/cover/${article.id}.png`"
                      alt=""
                      @error="onImgError"
                    />
                    <span>{{ article.titreFront }}</span>
                  </div>
                </td>
                <td class="hide-sm">{{ article.auteur }}</td>
                <td class="hide-md">{{ article.date }}</td>
                <td class="num">{{ article.lectures || 0 }}</td>
                <td class="hide-sm">{{ rubriqueNameFromId(article.rubrique) }}</td>
              </tr>
              <tr v-if="!topArticles.length">
                <td colspan="5" class="empty">Aucun article</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-card">
        <div class="table-card-head">
          <h2>Top archives</h2>
          <span class="badge">{{ topArchives.length }} affichées</span>
        </div>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th class="hide-sm">N°</th>
                <th class="hide-md">Date</th>
                <th>Lectures</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="archive in topArchives" :key="archive.id">
                <td>
                  <div class="cell-title">
                    <img
                      class="thumb"
                      :src="`${baseUrl}/api/save/saveArchive/cover/${archive.id}.png`"
                      alt=""
                      @error="onImgError"
                    />
                    <span>{{ archive.titre }}</span>
                  </div>
                </td>
                <td class="hide-sm">{{ archive.numero }}</td>
                <td class="hide-md">{{ archive.date }}</td>
                <td class="num">{{ archive.lectures || 0 }}</td>
              </tr>
              <tr v-if="!topArchives.length">
                <td colspan="4" class="empty">Aucune archive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axiosInstance from '@/axios';
import baseUrl from '@/config';

export default {
  data() {
    return {
      chart: null,
      articles: [],
      archives: [],
      rubriques: [],
      viewData: { labels: [], data: [] },
      baseUrl,
      loading: true,
    };
  },
  computed: {
    totalArticleViews() {
      return this.articles.reduce((sum, a) => sum + (Number(a.lectures) || 0), 0);
    },
    totalArchiveViews() {
      return this.archives.reduce((sum, a) => sum + (Number(a.lectures) || 0), 0);
    },
    periodViews() {
      return this.viewData.data.reduce((sum, n) => sum + (Number(n) || 0), 0);
    },
    topArticles() {
      return [...this.articles]
        .sort((a, b) => (Number(b.lectures) || 0) - (Number(a.lectures) || 0))
        .slice(0, 12);
    },
    topArchives() {
      return [...this.archives]
        .sort((a, b) => (Number(b.lectures) || 0) - (Number(a.lectures) || 0))
        .slice(0, 12);
    },
  },
  async mounted() {
    await Promise.all([this.getChartData(), this.setArticles(), this.setArchives()]);
    this.createChart();
  },
  beforeUnmount() {
    if (this.chart) this.chart.destroy();
  },
  methods: {
    onImgError(e) {
      e.target.style.visibility = 'hidden';
    },
    rubriqueNameFromId(id) {
      const found = this.rubriques.find((rub) => rub.id === id);
      return found ? found.rubrique : '—';
    },
    async getChartData() {
      try {
        const response = await axiosInstance.get('/api/getLectures');
        const lastDays = response.data || [];
        const differences = [];
        for (let i = 1; i < lastDays.length; i++) {
          differences.push({
            date: lastDays[i].date,
            difference: lastDays[i].lectures - lastDays[i - 1].lectures,
          });
        }
        this.viewData.labels = differences.map((item) => item.date);
        this.viewData.data = differences.map((item) => item.difference);
      } catch (error) {
        console.error(error);
      }
    },
    async setArchives() {
      try {
        const response = await axiosInstance.get('/api/getAllArchives');
        this.archives = response.data || [];
      } catch {
        this.$message({
          message: 'Erreur récupération des archives',
          type: 'error',
          customClass: 'custom-el-message',
          duration: 2000,
        });
      }
    },
    async setArticles() {
      try {
        const [rubriquesRes, articlesRes] = await Promise.all([
          axiosInstance.get('api/getrubriques'),
          axiosInstance.get('/api/getAllArticles'),
        ]);
        this.rubriques = rubriquesRes.data || [];
        this.articles = articlesRes.data || [];
      } catch {
        this.$message({
          message: 'Erreur lors de la récupération des articles',
          type: 'error',
          customClass: 'custom-el-message',
          duration: 2000,
        });
      }
    },
    createChart() {
      const canvas = this.$refs.lineChart;
      if (!canvas) return;
      if (this.chart) this.chart.destroy();

      this.chart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: this.viewData.labels,
          datasets: [
            {
              label: 'Vues / jour',
              data: this.viewData.data,
              borderColor: '#1a1a1a',
              backgroundColor: 'rgba(26, 26, 26, 0.08)',
              borderWidth: 2,
              tension: 0.35,
              fill: true,
              pointRadius: 3,
              pointHoverRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { maxRotation: 45, minRotation: 0, font: { size: 11 } },
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0,0,0,0.06)' },
              title: { display: true, text: 'Vues', font: { size: 12 } },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 1.25rem 1.5rem 2rem;
  font-family: var(--font-body, Bahnschrift, sans-serif);
  color: #1a1a1a;
}

.dash-header {
  margin-bottom: 1.25rem;
}

.dash-header h1 {
  font-family: var(--font-title, agrafe, serif);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.dash-subtitle {
  margin: 0;
  color: #555;
  font-size: 0.95rem;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.kpi {
  background: #fff;
  border: 1px solid #e2e2e2;
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.kpi-accent {
  background: #1a1a1a;
  border-color: #1a1a1a;
  color: #fff;
}

.kpi-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.7;
}

.kpi-value {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.1;
}

.chart-card,
.table-card {
  background: #fff;
  border: 1px solid #e2e2e2;
  padding: 1.1rem 1.25rem 1.25rem;
  margin-bottom: 1.25rem;
}

.chart-card h2,
.table-card h2 {
  font-family: var(--font-title, agrafe, serif);
  font-size: 1.15rem;
  margin: 0 0 0.15rem;
}

.section-hint {
  margin: 0 0 1rem;
  color: #666;
  font-size: 0.85rem;
}

.chart-wrap {
  height: min(360px, 50vh);
  position: relative;
}

.tables-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.table-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}

.badge {
  font-size: 0.75rem;
  color: #555;
  background: #f3f3f3;
  padding: 0.25rem 0.55rem;
  white-space: nowrap;
}

.table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th,
td {
  text-align: left;
  padding: 0.65rem 0.5rem;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}

th {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #666;
  font-weight: 600;
  white-space: nowrap;
}

.num {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}

.cell-title {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 140px;
}

.thumb {
  width: 40px;
  height: 40px;
  object-fit: cover;
  flex-shrink: 0;
  background: #f0f0f0;
}

.empty {
  text-align: center;
  color: #888;
  padding: 1.5rem;
}

@media (max-width: 1100px) {
  .kpi-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .tables-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }
  .kpi-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .chart-wrap {
    height: 260px;
  }
  .hide-md {
    display: none;
  }
}

@media (max-width: 480px) {
  .kpi-grid {
    grid-template-columns: 1fr 1fr;
  }
  .kpi-value {
    font-size: 1.35rem;
  }
  .hide-sm {
    display: none;
  }
  .thumb {
    width: 32px;
    height: 32px;
  }
}
</style>
