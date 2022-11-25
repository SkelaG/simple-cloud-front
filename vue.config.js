const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

const Dotenv = require('dotenv-webpack');


module.exports = {
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  }
}