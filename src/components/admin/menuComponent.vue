<template>
    <div>
        <h1>Menu des trucs a faire</h1>
        <ul>
            <li>
                <div>
                    <button @click="setComponent('dashBoard')">Dashboard</button>
                </div>
            </li>
            <li>
                <div>
                    <button @click="setComponent('register')">ajouter un compte</button>
                </div>
            </li>
            <li>
                <div>
                    <button @click="setComponent('article')">Articles</button>
                </div>
            </li>
            <li>
                <div>
                    <button @click="setComponent('archive')">Archives</button>

                </div>
            </li>
            <li>
                <div>
                    <button @click="setComponent('newsletter')">newsletter</button>
                </div>
            </li>
            <li>
                <div>
                    <button @click="setComponent('news')">News</button>
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