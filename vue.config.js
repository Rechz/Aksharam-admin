const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
//  devServer: {
//         allowedHosts:"all",
//         port: process.env.VUE_APP_PORT || 8080, 
//   },
 publicPath: '/admin-spot/',
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
