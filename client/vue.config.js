const path = require('path');
module.exports = {
  outputDir: path.resolve(__dirname, '../client/dist'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    },
    //disableHostCheck: true
  },
  "transpileDependencies": [
  "vuetify",
  "vue-tel-input-vuetify"
  ]
}

