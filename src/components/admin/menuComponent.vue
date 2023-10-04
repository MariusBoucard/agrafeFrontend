<template>
 <div class="menu">
    <h1>Menu des choses à faire</h1>
    <el-icon name="el-icon-monitor" style="color:red"></el-icon>
    <ul>
        <li>
            <div @click="setComponent('dashboard')" class="menu-item" :class="getMenuItemClass('dashboard')"> 
                
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-10 h-10 icon">
                    <path d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1zM9.5 6A1.5 1.5 0 008 7.5v9A1.5 1.5 0 009.5 18h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6h-1zM3.5 10A1.5 1.5 0 002 11.5v5A1.5 1.5 0 003.5 18h1A1.5 1.5 0 006 16.5v-5A1.5 1.5 0 004.5 10h-1z" />
                    </svg>
               
                <span>Dashboard</span>
            </div>
        </li>
        <hr style="margin-bottom: 10px;">
        <li>
            <div @click="setComponent('register')" class="menu-item" :class="getMenuItemClass('register')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 icon">
  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
</svg>

                <span>Utilisateurs</span>
            </div>
        </li>
        <hr style="margin-bottom: 10px;">

        <li>
            <div @click="setComponent('article')" class="menu-item"  :class="getMenuItemClass('article')"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 icon">
  <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
  <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
</svg>
                <span>Articles</span>
            </div>
        </li>
        <hr style="margin-bottom: 10px;">

        <li>
            <div @click="setComponent('archive')" class="menu-item"  :class="getMenuItemClass('archive')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 icon">
                <path d="M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2z" />
                <path fill-rule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zM7 11a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
                <span>Archives</span>
            </div>
        </li>
        <hr style="margin-bottom: 10px;">
        <li>
            <div @click="setComponent('focal')" class="menu-item"  :class="getMenuItemClass('focal')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 icon">
  <path fill-rule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
</svg>
                <span>Focal</span>
            </div>
        </li>
        <hr style="margin-bottom: 10px;">

        <li>
            <div @click="setComponent('newsletter')" class="menu-item"  :class="getMenuItemClass('newsletter')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 icon">
  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
</svg>
                <span>Newsletter</span>
            </div>
        </li>
        <hr style="margin-bottom: 10px;">

        <li>
            <div @click="setComponent('news')" class="menu-item"  :class="getMenuItemClass('news')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 icon">
  <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
</svg>
                <span>News</span>
            </div>
        </li>
        <hr style="margin-bottom: 10px;">

        <li>
            <div @click="setComponent('rubrique')" class="menu-item"  :class="getMenuItemClass('rubrique')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 icon">
  <path fill-rule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
</svg>
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
.icon{
    height: 30px;
}
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