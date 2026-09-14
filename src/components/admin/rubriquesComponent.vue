<template>
  <div class="rubriques-admin">
    <h1>Gestion des rubriques</h1>

    <div class="grid">
      <div class="list">
        <h2>Rubriques existantes</h2>
        <div class="cards">
          <div class="card" v-for="rub in rubriques" :key="rub.id">
            <div class="card-main">
              <div>
                <div class="card-title">{{ rub.rubrique }}</div>
                <div class="card-desc">{{ rub.description }}</div>
                <div class="card-meta">Route: <code>{{ rub.rubRoute }}</code> • <span class="count">{{ rub.nombreArticles || 0 }}</span> articles</div>
              </div>
              <div class="card-actions">
                <button class="btn btn-edit" @click="prefillModify(rub)">Éditer</button>
                <button class="btn btn-delete" @click="removeRubrique(rub.id)" :disabled="(rub.nombreArticles || 0) > 0">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="forms">
        <div class="form-card">
          <h2>Ajouter une rubrique</h2>
          <form @submit.prevent="addRubrique" class="form">
            <label>Rubrique</label>
            <input type="text" v-model="rubrique.rubrique" required />

            <label>Description</label>
            <input type="text" v-model="rubrique.description" required />

            <label>Rubrique Route <small>(pas d'espace ni d'accent)</small></label>
            <input type="text" v-model="rubrique.rubRoute" required />

            <label>Informations</label>
            <input type="text" v-model="rubrique.information" />

            <div class="two-cols">
              <div>
                <label>Nombre sec min</label>
                <input type="number" v-model.number="rubrique.nombreSecMin" />
              </div>
              <div>
                <label>Nombre sec max</label>
                <input type="number" v-model.number="rubrique.nombreSecMax" />
              </div>
            </div>

            <div class="form-actions">
              <button class="btn btn-primary" type="submit">Ajouter</button>
            </div>
          </form>
        </div>

        <div class="form-card">
          <h2>Modifier une rubrique</h2>
          <form @submit.prevent="modifyRubrique" class="form">
            <label>Choisir</label>
            <select v-model="rubrique.id" @change="onSelectRubrique">
              <option value="">-- Sélectionner --</option>
              <option v-for="r in rubriques" :key="r.id" :value="r.id">{{ r.rubrique }}</option>
            </select>

            <label>Nom</label>
            <input type="text" v-model="rubrique.rubrique" />

            <label>Description</label>
            <input type="text" v-model="rubrique.description" />

            <label>Route</label>
            <input type="text" v-model="rubrique.rubRoute" />

            <div class="two-cols">
              <div>
                <label>Nombre sec min</label>
                <input type="number" v-model.number="rubrique.nombreSecMin" />
              </div>
              <div>
                <label>Nombre sec max</label>
                <input type="number" v-model.number="rubrique.nombreSecMax" />
              </div>
            </div>

            <div class="form-actions">
              <button class="btn btn-primary" type="submit">Modifier</button>
              <button class="btn" type="button" @click="clearModify">Réinitialiser</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios'

export default {
  mounted() {
    this.setRubriques()
  },
  data() {
    return {
      rubriques: [],
      rubrique: {
        id: '',
        rubrique: '',
        description: '',
        rubRoute: '',
        information: '',
        nombreSecMin: 0,
        nombreSecMax: 10000,
      },
    }
  },
  methods: {
    async setRubriques() {
      try {
        const response = await axiosInstance.get('/api/getrubriques')
        this.rubriques = response.data || []
      } catch (e) {
        this.$message({ message: 'Erreur récupération rubriques', type: 'error' })
      }
    },
    async addRubrique() {
      try {
        await axiosInstance.post('/api/addRubrique', { rubrique: this.rubrique })
        this.$message({ message: 'Rubrique ajoutée', type: 'success', customClass: 'custom-el-message', duration: 1000 })
        this.clearAdd()
        this.setRubriques()
      } catch (e) {
        console.error(e)
        this.$message({ message: "Erreur lors de l'ajout", type: 'error', customClass: 'custom-el-message', duration: 1500 })
      }
    },
    prefillModify(rub) {
      this.rubrique = Object.assign({}, rub)
    },
    onSelectRubrique() {
      if (!this.rubrique.id) return this.clearModify()
      const found = this.rubriques.find(r => r.id === this.rubrique.id)
      if (found) this.rubrique = Object.assign({}, found)
    },
    clearAdd() {
      this.rubrique = { id: '', rubrique: '', description: '', rubRoute: '', information: '', nombreSecMin: 0, nombreSecMax: 10000 }
    },
    clearModify() {
      this.rubrique.id = ''
      this.rubrique.rubrique = ''
      this.rubrique.description = ''
      this.rubrique.rubRoute = ''
      this.rubrique.nombreSecMin = 0
      this.rubrique.nombreSecMax = 10000
    },
    async modifyRubrique() {
      try {
        if (!this.rubrique.id) return this.$message({ message: 'Sélectionner une rubrique', type: 'warning' })
        await axiosInstance.post('/api/modifyRubrique', { rubrique: this.rubrique })
        this.$message({ message: 'Rubrique modifiée', type: 'success', customClass: 'custom-el-message', duration: 1000 })
        this.setRubriques()
      } catch (e) {
        console.error(e)
        this.$message({ message: 'Erreur lors de la modification', type: 'error' })
      }
    },
    async removeRubrique(id) {
      if (!confirm('Confirmer suppression (seulement si vide) ?')) return
      try {
        await axiosInstance.delete('/api/deleteRubrique/' + id)
        this.$message({ message: 'Rubrique supprimée', type: 'success' })
        this.setRubriques()
      } catch (e) {
        console.error(e)
        const msg = e?.response?.data || 'Erreur suppression'
        this.$message({ message: msg, type: 'error' })
      }
    },
  },
}
</script>

<style scoped>
.rubriques-admin { padding: 20px; }
.grid { display: grid; grid-template-columns: 1fr 420px; gap: 20px; align-items: start; }
.list h2 { margin-top: 0; }
.cards { display: flex; flex-direction: column; gap: 10px; }
.card { background: #fff; border: 1px solid #e6eef9; padding: 12px; border-radius: 8px; }
.card-main { display:flex; justify-content:space-between; gap:12px; }
.card-title { font-weight:700; color:#0f172a; }
.card-desc { color:#475569; margin-top:6px; }
.card-meta { color:#64748b; font-size:0.85rem; margin-top:8px }
.card-actions { display:flex; gap:8px; align-items:center }
.btn { padding:6px 10px; border-radius:6px; border:none; cursor:pointer }
.btn-edit { background:#3b82f6; color:white }
.btn-delete { background:#ef4444; color:white }
.btn[disabled] { opacity:0.5; cursor:not-allowed }
.forms { display:flex; flex-direction:column; gap:12px }
.form-card { background:#fff; border:1px solid #e6eef9; padding:12px; border-radius:8px }
.form { display:flex; flex-direction:column; gap:8px }
label { font-weight:600; color:#0f172a }
  input, select { padding:8px; border-radius:6px; border:1px solid #cbd5e1; width:100%; box-sizing:border-box; max-width:100%; }
  .two-cols { display:flex; gap:8px; flex-wrap:wrap }
  .two-cols > div { flex:1 1 0; min-width:0 }
  /* Prevent numeric input from overflowing its container */
  input[type="number"] { -moz-appearance: textfield; }
  input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.form-actions { display:flex; gap:8px; margin-top:8px }
.btn-primary { background:#10b981; color:white; border:none; padding:8px 12px; border-radius:6px }
code { background:#f1f5f9; padding:2px 6px; border-radius:4px }
</style>
