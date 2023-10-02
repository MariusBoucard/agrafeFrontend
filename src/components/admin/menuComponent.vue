<template>
 <div class="menu">
    <h1>Menu des choses à faire</h1>
    <ul>
        <li>
            <div @click="setComponent('dashboard')" class="menu-item">
                <i class="el-icon-monitor"></i>
                <span>Dashboard</span>
            </div>
        </li>
        <li>
            <div @click="setComponent('register')" class="menu-item">
                <i class="el-icon-user"></i>
                <span>Ajouter un compte</span>
            </div>
        </li>
        <li>
            <div @click="setComponent('article')" class="menu-item">
                <i class="el-icon-document"></i>
                <span>Articles</span>
            </div>
        </li>
        <li>
            <div @click="setComponent('archive')" class="menu-item">
                <i class="el-icon-folder"></i>
                <span>Archives</span>
            </div>
        </li>
        <li>
            <div @click="setComponent('newsletter')" class="menu-item">
                <i class="el-icon-message"></i>
                <span>Newsletter</span>
            </div>
        </li>
        <li>
            <div @click="setComponent('news')" class="menu-item">
                <i class="el-icon-news"></i>
                <span>News</span>
            </div>
        </li>
    </ul>
</div>

</template>
<script>
export default {
  
    methods: {
        setComponent(compo) {
            this.$emit('componentChanged',compo)
        }

    }
}
</script>
<style scoped>
 .menu {
        background-color: #f4f4f4;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
    }

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin-bottom: 5px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 5px;
    }

    .menu-item {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .menu-item i {
        font-size: 20px;
        margin-right: 10px;
    }

    .menu-item span {
        font-size: 16px;
    }

    .menu-item:hover {
        background-color: #f0f0f0;
    }
</style>