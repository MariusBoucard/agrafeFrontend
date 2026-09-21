const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        canvas: false
      },
      fallback: {
        canvas: false
      }
    }
  }
})
