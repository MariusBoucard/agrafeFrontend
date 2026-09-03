<template>
    <div class="container">
      <form @submit.prevent="submitForm" class="article-form">
        <h2 class="form-title">Modifier un article</h2>

        <div class="form-columns">
          <div class="form-column">
            <div class="form-group">
          <label for="titreFront">Titre de l'article :</label>
          <input type="text" id="titreFront" v-model="article.titreFront" required>
              </div>
              <div class="form-group">
          <label for="description">Description :</label>
          <textarea id="description" v-model="article.description" required></textarea>
                </div>
                <div class="form-group">
          <label for="imageLogo">Image de couverture:</label>
          <input type="file" id="imageLogo" accept="image/*" @change="handleImageUpload">
          </div>
          <div class="form-group">
          <img v-if="imagePreview" :src="imagePreview" alt="Uploaded Image">
          <img style="max-width: 100%;" v-if="notModifiedImage" :src="`${baseUrl}/api/save/saveArticle/cover/${article.id}.png`">
        </div>
        </div>
        <div class="form-column">
          <div class="form-group">
          <label for="auteur">Auteur :</label>
          <input type="text" id="auteur" v-model="article.auteur" required>
            </div>
            <div class="form-group">
              <label for="numeroParu">Numéro du journal :</label>
              <input type="text" id="numeroParu" v-model="article.numeroParu" required>
            </div>
            <div class="form-group">
            <label for="date">Date de publication :</label>
            <input type="date" id="date" v-model="article.date" required>
            </div>
            <div class="form-group" v-if="article.created_at">
              <label>Date de création (non modifiable) :</label>
              <input type="text" :value="article.created_at" disabled>
            </div>

            <div class="form-group">
              <label for="rubrique" class="label">Rubrique:</label>
              <select id="rubrique" v-model="article.rubrique" required>
                <option v-for="rub in rubriques" :key="rub.id" :value="rub.id">{{rub.rubrique}}</option>
              </select>
              <div class="rubriques-list">
                <h4>Rubriques</h4>
                <div class="rubrique-card" v-for="rub in rubriques" :key="rub.id">
                  <div class="rubrique-main">
                    <div class="rubrique-name">
                      <template v-if="editingRubriqueId === rub.id">
                        <input v-model="editingRubriqueName" />
                      </template>
                      <template v-else>
                        <strong>{{ rub.rubrique }}</strong>
                      </template>
                      <small class="rub-count">({{ rub.nombreArticles || 0 }} articles)</small>
                    </div>
                    <div class="rub-actions">
                      <button v-if="editingRubriqueId !== rub.id" type="button" class="button btn-edit-rub" @click="startEditRubrique(rub)">Modifier</button>
                      <button v-else type="button" class="button btn-save-rub" @click="saveRubriqueEdit">Enregistrer</button>
                      <button v-if="editingRubriqueId === rub.id" type="button" class="button btn-cancel-rub" @click="cancelRubriqueEdit">Annuler</button>
                      <button type="button" class="button btn-delete-rub" @click="deleteRubrique(rub.id)" :disabled="(rub.nombreArticles || 0) > 0">Supprimer</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="dossier">Dossier (optionnel) :</label>
              <select id="dossier" v-model="article.dossier_id">
                <option :value="null">Aucun dossier</option>
                <option v-for="d in dossiers" :key="d.id" :value="d.id">
                  {{ d.titre }} — {{ d.statut === 'termine' ? 'Terminé' : 'En cours' }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="fileType">Type de fichier (optionnel) :</label>
              <input type="text" id="fileType" v-model="article.fileType" placeholder="ex: article">
            </div>
        </div>
      </div>

      <div class="form-columns">
        <div class="form-column">
          <draggable class="dragArea list-group w-full" :list="article.contenu" @change="orderChanged">
            <div class="list-group-item clickable-item"
                v-for="(element, index) in article.contenu" :key="element.id || index"
                @click="editElement(element, index)"
                :class="{active: editingIndex === index}">
                <div class="item-content">
                  <div class="item-header">
                    <div class="item-type">{{ element.type }}</div>
                    <div class="item-preview">{{ element.text.substring(0, 50) }}{{ element.text.length > 50 ? '...' : '' }}</div>
                  </div>
                  <div class="item-actions" @click.stop>
                    <button @click="deleteElement(element.id || index)" class="btn-delete" title="Supprimer">
                      Supprimer
                    </button>
                  </div>
                </div>
                <div v-if="element.type === 'image'" class="item-image">
                    <img :src="getImageUrl(element.image)" alt="Image Preview">
                </div>
            </div>
          </draggable>
          <button type="button" class="button" @click.stop="enableAddPart()">Ajouter une partie</button>
        </div>
        <div class="form-column">
          <div class="form-group">
            <div v-if="enableAdd">
              <div class="form-group">
                <label>Partie d'article à rajouter</label>
                <select id="type" v-model="partToAdd.type" required>
                  <option value="titre">Titre</option>
                  <option value="sousTitre1">Sous titre 1</option>
                  <option value="sousTitre2">Sous titre 2</option>
                  <option value="Citation">Citation</option>
                  <option value="interTitre">Inter titre</option>
                  <option value="chapeau">Chapeau</option>
                  <option value="paragraphe">Paragraphe</option>
                  <option value="image">Image</option>
                  <option value="Sources">Sources</option>
                  <option value="notesBasPage">Notes de bas de page</option>
                </select>
              </div>
              <div class="form-group">
                <label for="texte">Texte à ajouter</label>
                <textarea id="texte" v-model="partToAdd.text"></textarea>
              </div>
              <div class="form-group">
                <div v-if="partToAdd.type === 'image'">
                  <div class="form-group">
                    <label for="img">Image :</label>
                    <input type="file" id="img" accept="image/*" @change="handleImageArticleUpload" required>
                  </div>
                  <div class="form-group">
                    <img v-if="partToAdd.imagePreview" :src="partToAdd.imagePreview" alt="Uploaded Image">
                  </div>
                  <div class="form-group">
                    <label for="auteurImg" class="label">Auteur</label>
                    <input type="text" id="auteurImg" v-model="partToAdd.auteur">
                  </div>
                  <div class="form-group">
                    <label for="copyright" class="label">Copyright</label>
                    <input type="text" id="copyright" v-model="partToAdd.copyright">
                  </div>
                </div>
              </div>
              <button type="button" class="button" style="margin-top: 10px;" @click="addPart()">Ajouter une partie</button>
            </div>
            <div v-if="editingIndex !== null" class="edit-form-container">
              <div class="edit-form-header">
                <h3>Modifier : <strong>{{ editingPart.type }}</strong></h3>
              </div>
              <div class="form-group">
                <label for="editType">Type (non modifiable) :</label>
                <input type="text" id="editType" :value="editingPart.type" disabled>
              </div>
              <div class="form-group">
                <label for="editTexte">Contenu du texte</label>
                <textarea id="editTexte" v-model="editingPart.text" placeholder="Entrez le texte ici..."></textarea>
              </div>
              <div v-if="editingPart.type === 'image'" class="image-section">
                <h4>Infos de l'image</h4>
                <div class="form-group">
                  <label for="editAuteur">Auteur de l'image</label>
                  <input type="text" id="editAuteur" v-model="editingPart.auteur" placeholder="Nom de l'auteur...">
                </div>
                <div class="form-group">
                  <label for="editCopyright">Copyright</label>
                  <input type="text" id="editCopyright" v-model="editingPart.copyright" placeholder="Infos copyright...">
                </div>
                <div class="form-group" v-if="editingPart.image">
                  <img :src="getImageUrl(editingPart.image)" alt="Image Preview" class="image-preview-edit">
                </div>
              </div>
              <div class="button-group">
                <button type="button" class="btn-save" @click="saveEdit()">✓ Sauvegarder les modifications</button>
                <button type="button" class="btn-cancel" @click="cancelEdit()">✕ Annuler</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>
    <script>
    import { nanoid } from 'nanoid';
    import { VueDraggableNext } from 'vue-draggable-next';
    import baseUrl from '../../config.js'
    import axiosInstance from '@/axios';
    export default{
      components: {
        draggable: VueDraggableNext,
      },
      mounted(){
        axiosInstance.get('api/getrubriques').then(
          response => {
            this.rubriques = response.data
          }
        ).catch(() =>  this.$message({
              message: 'Erreur lors de la récupération des rubriques',
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000,
            }))
        axiosInstance.get('/api/dossiers').then((r) => {
          this.dossiers = r.data || []
        }).catch(() => {})
        axiosInstance.get('/api/getArticle?id=' + this.id).then(
            response => 
            {
              this.article = response.data
              if (!this.article.contenu) this.article.contenu = []
              if (this.article.dossier_id === undefined) this.article.dossier_id = null
              if (!this.article.fileType) this.article.fileType = ''
            }

        ).catch(() => 
        this.$message({
              message: 'Erreur lors de la récupération des l\'article souhaité',
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000,
            }))
      }, 
      props : {
        id : {required : true , type : String}
      },
        data(){
            return {
          article: {
            titreFront: "",
            description: "",
            imageLogo: "",
            path : "",
            auteur  : "",
            numeroParu : "",
            date : "",
            private : "",
            rubrique : "",
            misEnLigne : "",
            articlePdf : "",
            fileType : "",
            dossier_id: null,
            contenu : []
          },
          notModifiedImage : true,
          rubriques : [],
          dossiers: [],
          editingRubriqueId: null,
          editingRubriqueName: '',
          editingRubriqueObj: null,
          imagePreview: null,
          partToAdd: {
            type: "",
            text: "",
            copyright: "",
            image: "",
            auteur: "",
            imagePreview: null
          },
          enableAdd : false,
          baseUrl : baseUrl,
          editingIndex: null,
          editingPart: {}
        };
        },
        methods : {
        enableAddPart(){
          this.enableAdd = !this.enableAdd
        },
        getImageUrl(file) {
          if (!file) return 'default-image.jpg';
          if (typeof file === 'string') {
            return `${this.baseUrl}/api/save/saveArticle/images/${this.article.id}/${file}.png`;
          }
          return URL.createObjectURL(file);
        },
        addPart(){
          this.partToAdd.id = nanoid();
          if(this.partToAdd.type === 'image'){
            const clonedImage = new File([this.partToAdd.image], this.partToAdd.image.name);
            const part = { ...this.partToAdd, image: clonedImage };
            this.article.contenu.push(part)
          }
          else {
            const part = { ...this.partToAdd };
            this.article.contenu.push(part)
            delete part.auteur;
            delete part.copyright;
            delete part.image;
            delete part.imagePreview;
          }
          this.cleanTemp()
        },
        cleanTemp(){
          this.partToAdd.text = ''
          this.partToAdd.auteur = ''
          this.partToAdd.copyright = ''
          this.partToAdd.image = null
          this.partToAdd.imagePreview = null
          this.partToAdd.type = ''
        },
        deleteElement(id){
          this.article.contenu = this.article.contenu.filter((a, index) => (a.id || index) !== id)
        },
        handleImageUpload(event) {
          const file = event.target.files[0];

          if (file) {
            this.imagePreview = URL.createObjectURL(file);
            this.article.imageLogo = file;
            this.notModifiedImage = false
          } else {
            this.imagePreview = null;
            this.article.imageLogo = null;
            this.notModifiedImage = true
          }
        },
        handleImageArticleUpload(event) {
          const file = event.target.files[0];
          if (file) {
            this.partToAdd.imagePreview = URL.createObjectURL(file);
            this.partToAdd.image = file;
          } else {
            this.partToAdd.imagePreview = null;
            this.partToAdd.image = null;
          }
        },

        async submitForm() {
          if(!confirm("T'es sûr que c'est tout bon ??\nAlleyyy, c'est tipar")) return;

          try {
            await axiosInstance.post('/api/modifyArticle',{ article : this.article});

            const formData = new FormData();
            if(!this.notModifiedImage && this.article.imageLogo instanceof File){
              formData.append('imageLogo', this.article.imageLogo);
              formData.append('articleId', this.article.id );
              await axiosInstance.post('/api/uploadImage', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
            }

            const contentFormData = new FormData();
            contentFormData.append('generalId', this.article.id);
            let imageIndex = 0;
            this.article.contenu.forEach((item) => {
              if (item.type === 'image' && item.image instanceof File) {
                contentFormData.append('images', item.image);
                contentFormData.append(`id${imageIndex}`, item.id || item.image.name || `img-${imageIndex}`);
                imageIndex++;
              }
            });

            if (imageIndex > 0) {
              await axiosInstance.post('/api/uploadArticleImages', contentFormData);
            }

            this.$message({
              message: 'Article modifié mon sang',
              type: 'success',
              customClass: 'custom-el-message',
              duration: 1000,
            });
            this.$emit("componentChanged","article")
          } catch (error) {
            console.error(error);
            this.$message({
              message: 'Une erreur s`est produite',
              type: 'error',
              customClass: 'custom-el-message',
              duration: 1000,
            })
          }
        },
        editElement(element, index) {
          this.editingIndex = index;
          this.editingPart = JSON.parse(JSON.stringify(element));
        },
        saveEdit() {
          if (this.editingIndex !== null) {
            this.article.contenu[this.editingIndex] = this.editingPart;
            this.editingIndex = null;
            this.editingPart = {};
          }
        },
        cancelEdit() {
          this.editingIndex = null;
          this.editingPart = {};
        }
        ,
        // Rubrique management helpers
        startEditRubrique(rub) {
          this.editingRubriqueId = rub.id;
          this.editingRubriqueName = rub.rubrique;
          this.editingRubriqueObj = Object.assign({}, rub);
        },
        async saveRubriqueEdit() {
          if (!this.editingRubriqueObj) return;
          this.editingRubriqueObj.rubrique = this.editingRubriqueName;
          try {
            await axiosInstance.post('/api/modifyRubrique', { rubrique: this.editingRubriqueObj });
            this.$message({ message: 'Rubrique modifiée', type: 'success', customClass: 'custom-el-message', duration: 1000 });
            this.editingRubriqueId = null;
            this.editingRubriqueName = '';
            this.editingRubriqueObj = null;
            // refresh
            axiosInstance.get('/api/getrubriques').then(r => { this.rubriques = r.data }).catch(() => {});
          } catch (e) {
            console.error(e);
            this.$message({ message: 'Erreur lors de la modification', type: 'error', customClass: 'custom-el-message', duration: 1000 });
          }
        },
        cancelRubriqueEdit() {
          this.editingRubriqueId = null;
          this.editingRubriqueName = '';
          this.editingRubriqueObj = null;
        },
        async deleteRubrique(id) {
          if (!confirm('Supprimer cette rubrique ? Cela ne fonctionnera que si elle est vide.')) return;
          try {
            await axiosInstance.delete('/api/deleteRubrique/' + id);
            this.$message({ message: 'Rubrique supprimée', type: 'success', customClass: 'custom-el-message', duration: 1000 });
            axiosInstance.get('/api/getrubriques').then(r => { this.rubriques = r.data }).catch(() => {});
          } catch (err) {
            console.error(err);
            const msg = err?.response?.data || 'Erreur suppression rubrique';
            this.$message({ message: msg, type: 'error', customClass: 'custom-el-message', duration: 2000 });
          }
        }
      }}
    </script>
    <style scoped>
    /* Container for the form */
    .article-form{
      width : 100%;
    }
    .container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
    }

    .form-title {
      text-align: center;
      margin-bottom: 20px;
      color: black;
    }

    .form-columns {
      display: flex;
      width:100%;
      justify-content: space-between;
      gap: 16px;
    }

    .form-column { width: 48%; }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 6px;
      color: black;
    }

    input, textarea, select, button {
      width: 100%;
      box-sizing: border-box;
    }

    input, textarea, select {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }

    .submit-button {
      background: #1d4ed8;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 12px 16px;
      cursor: pointer;
      margin-top: 16px;
    }

    .button {
      background: #e2e8f0;
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
    }

    .dragArea {
      min-height: 80px;
      border: 2px solid #cbd5e1;
      border-radius: 8px;
      padding: 12px;
      background: #f8fafc;
    }
    .list-group-item {
      position: relative;
      margin-bottom: 12px;
      padding: 16px;
      border-radius: 8px;
      background: white;
      border: 2px solid #e2e8f0;
      transition: all 0.2s ease;
    }
    .clickable-item {
      cursor: pointer;
    }
    .clickable-item:hover {
      border-color: #1d4ed8;
      box-shadow: 0 4px 12px rgba(29, 78, 216, 0.15);
      background: #f0f4ff;
    }
    .clickable-item.active {
      border-color: #1d4ed8;
      background: #f0f4ff;
      box-shadow: 0 4px 12px rgba(29, 78, 216, 0.2);
    }
    .item-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
    }
    .item-header {
      flex: 1;
    }
    .item-type {
      font-weight: bold;
      font-size: 1rem;
      color: #1d4ed8;
      margin-bottom: 4px;
    }
    .item-preview {
      font-size: 0.9rem;
      color: #475569;
      margin-top: 4px;
    }
    .item-actions {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    .btn-edit, .btn-delete {
      padding: 8px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .btn-edit {
      background: #3b82f6;
      color: white;
    }
    .btn-edit:hover {
      background: #1d4ed8;
    }
    .btn-delete {
      background: #ef4444;
      color: white;
    }
    .btn-delete:hover {
      background: #dc2626;
    }
    .item-image {
      margin-top: 12px;
      max-height: 150px;
    }
    .item-image img {
      max-width: 100%;
      max-height: 150px;
      border-radius: 6px;
    }
    .edit-form-container {
      background: #f0f4ff;
      border: 2px solid #1d4ed8;
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
    }
    .edit-form-header {
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px solid #1d4ed8;
    }
    .edit-form-header h3 {
      margin: 0;
      color: #1d4ed8;
    }
    .image-section {
      background: white;
      padding: 12px;
      border-radius: 6px;
      margin-top: 12px;
    }
    .image-section h4 {
      margin: 0 0 12px 0;
      color: #374151;
    }
    .image-preview-edit {
      max-width: 100%;
      max-height: 250px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }
    .button-group {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }
    .btn-save, .btn-cancel {
      flex: 1;
      padding: 12px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    .btn-save {
      background: #10b981;
      color: white;
    }
    .btn-save:hover {
      background: #059669;
    }
    .btn-cancel {
      background: #6b7280;
      color: white;
    }
    .btn-cancel:hover {
      background: #4b5563;
    }
    .number {
      font-weight: bold;
      margin-bottom: 4px;
    }
    .hover-trigger {
      color: #374151;
      font-size: 0.85rem;
      margin-top: 8px;
    }
    .hovered-info {
      display: block;
      position: absolute;
      left: 30%;
      width: 300px;
      border-radius: 8px;
      background: #dbeafe;
      z-index: -1;
      padding: 10px;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .hover-trigger:hover + .hovered-info,
    .hovered-info:hover {
      z-index: 10;
      opacity: 1;
    }
    .horizontal-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    .rubriques-list {
      margin-top: 10px;
      border-top: 1px dashed #e2e8f0;
      padding-top: 10px;
    }
    .rubrique-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      border: 1px solid #e6edf8;
      padding: 8px;
      border-radius: 6px;
      margin-bottom: 8px;
    }
    .rubrique-name { display:flex; align-items:center; gap:8px; }
    .rub-count { color: #64748b; font-size: 0.85rem; margin-left: 6px; }
    .rub-actions { display:flex; gap:8px; }
    .btn-delete-rub { background:#ef4444; color:white; border:none; padding:6px 8px; border-radius:6px }
    .btn-delete-rub[disabled] { opacity:0.5; cursor:not-allowed }
    .btn-edit-rub { background:#3b82f6; color:white; border:none; padding:6px 8px; border-radius:6px }
    .btn-save-rub { background:#10b981; color:white; border:none; padding:6px 8px; border-radius:6px }
    .btn-cancel-rub { background:#6b7280; color:white; border:none; padding:6px 8px; border-radius:6px }
    img {
      max-width: 100%;
      border-radius: 6px;
    }
    </style>