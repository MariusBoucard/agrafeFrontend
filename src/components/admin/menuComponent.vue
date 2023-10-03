<template>
 <div class="menu">
    <h1>Menu des choses à faire</h1>
    <ul>
        <li>
            <div @click="setComponent('dashboard')" class="menu-item" :class="getMenuItemClass('dashboard')"> 
                <i class="el-icon-monitor"></i>
                <span>Dashboard</span>
            </div>
        </li>
        <hr style="margin-bottom: 10px;">
        <li>
            <div @click="setComponent('register')" class="menu-item" :class="getMenuItemClass('register')">
                <i class="el-icon-user"></i>
                <span>Utilisateurs</span>
            </div>
        </li>
        <hr style="margin-bottom: 10px;">

        <li>
            <div @click="setComponent('article')" class="menu-item"  :class="getMenuItemClass('article')"> 
                <i class="el-icon-document"></i>
                <span>Articles</span>
            </div>
        </li>
        <hr style="margin-bottom: 10px;">

        <li>
            <div @click="setComponent('archive')" class="menu-item"  :class="getMenuItemClass('archive')">
                <i class="el-icon-folder"></i>
                <span>Archives</span>
            </div>
        </li>
        <hr style="margin-bottom: 10px;">

        <li>
            <div @click="setComponent('newsletter')" class="menu-item"  :class="getMenuItemClass('newsletter')">
                <i class="el-icon-message"></i>
                <span>Newsletter</span>
            </div>
        </li>
        <hr style="margin-bottom: 10px;">

        <li>
            <div @click="setComponent('news')" class="menu-item"  :class="getMenuItemClass('news')">
                <i class="el-icon-news"></i>
                <span>News</span>
            </div>
        </li>
        <li>
            <div @click="setComponent('rubrique')" class="menu-item"  :class="getMenuItemClass('rubrique')">
                <i class="el-icon-news"></i>
                <span>Rubriques</span>
            </div>
        </li>
    </ul>
</div>

</template>
<script>
export default {
  props : {
    selectedComponent : {
        required : true , type : Object
    }
  },
    methods: {
        getMenuItemClass(classe){
            if(this.selectedComponent[classe]){
                return "activeComponent"
            }
            else if(classe === "article" && this.selectedComponent["createArticle"]){
                return "activeComponent"
            } 
            else if(classe === "article" && this.selectedComponent["modifyArticle"]){
                return "activeComponent"
            } 
            else if(classe === "news" && this.selectedComponent["createNews"]){
                return "activeComponent"
            } 
            else if(classe === "news" && this.selectedComponent["modifyNews"]){
                return "activeComponent"
            } 
            else {
                return ""
            }
        },
        setComponent(compo) {
            this.$emit('componentChanged',compo)
        }

    }
}
</script>
<style scoped>
.activeComponent {
  background-color: #007bff; /* Blue background color for active item */
  color: white;
}
hr{
    border-color: #9e9e9e;
}
.menu {
  background-color: #f8f9fa; /* Light gray background color */
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  height: 100vh; /* Fill available height */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  justify-content: flex-start; /* Align content to the top */
  padding: 20px; /* Add padding for spacing */
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333; /* Darken the title color */
}

ul {
  list-style-type: none;
  padding: 0;
  width: 100%; /* Make the list items take full width */
  max-width: 300px; /* Limit the maximum width of the menu */
}

li {
  margin-bottom: 10px; /* Increase spacing between menu items */
}

.menu-item {
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s; /* Add a smooth hover effect */
  display: flex; /* Center items horizontally */
  align-items: center; /* Vertically align items */
}

.menu-item i {
  font-size: 20px;
  margin-right: 10px;
}

.menu-item span {
  font-size: 16px;
  margin-left: 10px; /* Add spacing between icon and text */
}

.menu-item:hover {
  background-color: #007bff; /* Darken the background color on hover */
  color: white; /* Change text color on hover */
}
</style>