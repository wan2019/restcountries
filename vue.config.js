const webpack = require('webpack')
const path = require('path')
let pjson = require('./package.json');
let PACKAGE_VERSION  = "'" + pjson.version + "'"
const Timestamp = new Date().getTime();
console.log(`===================env=======================`)
console.log(process.env.npm_lifecycle_event)
console.log('serve', process.env.NODE_ENV.includes('serve'));
console.log(`===================env=======================`)
module.exports = {
  publicPath: process.env.NODE_ENV.includes('serve')
  ? '/'
  : '/restcountries/',
  outputDir: 'restcountries',
  "transpileDependencies": [
    "vuetify"
  ],
  lintOnSave: process.env.NODE_ENV !== 'development',
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    overlay: {
      warnings: true,
      errors: true
    },
    proxy:{
      '/rest': {
        target: 'https://restcountries.eu/',
        changeOrigin: true,
        logLevel: "debug"
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule("html")            //create a named rule
      // .test(/web-components/)  //define the file test
      // .use("html-loader")      //create a named use
      // .loader("html-loader")   //assign a loader
      .end(); 
      // .rule("eslint")
      // .use("eslint-loader")
      //   .options({
      //       fix: true
      //   });
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $api: ['@/assets/js/api.js', 'default']
    })
    ]
  },
  pluginOptions: {
  }
}