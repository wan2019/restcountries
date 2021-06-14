const webpack = require('webpack')
const path = require('path')
let pjson = require('./package.json');
let PACKAGE_VERSION  = "'" + pjson.version + "'"
const Timestamp = new Date().getTime();
console.log(`===================env=======================`)
console.log(process.env.npm_lifecycle_event)
console.log('env',process.env.NODE_ENV)
console.log('serve', process.env.NODE_ENV.includes('development'));
console.log(`PACKAGE_VERSION ${PACKAGE_VERSION}`)
console.log(`===================env=======================`)
module.exports = {
  publicPath: process.env.NODE_ENV.includes('development')
  ? '/'
  : '/restcountries/',
  outputDir: 'restcountries',
  "transpileDependencies": [
    "vuetify"
  ],
  lintOnSave: process.env.NODE_ENV !== 'production',
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
      .rule("eslint")
      .use("eslint-loader")
        .options({
            fix: true
        });
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        moment: 'moment',
        $api: ['@/assets/js/api.js', 'default']
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    output: {
      filename: `[name].${PACKAGE_VERSION}.${Timestamp}.js`,
      chunkFilename: `[name].${PACKAGE_VERSION}.${Timestamp}.js`
    },
  },
  pluginOptions: {
    moment: {
      locales: ['en']
    }
  },
  // css:{
  //   loaderOptions:{
  //     scss:{
  //       prependData: `@import "@/assets/css/app.scss";`
  //     }
  //   }
  // }
}