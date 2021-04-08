'use strict'
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 部署应用的基本URL
  outputDir: `dist/${process.env.VUE_APP_VERSION}`, // 打包输出的目录
  assetsDir: 'assets', // 静态资源的目录
  filenameHashing: true, // 是否生成文件名称哈希
  pages: {
    index: {
      entry: 'src/main.js', // page 的入口
      template: 'src/public/index.html', // 模板来源
      filename: 'index.html', // 在 dist/index.html 的输出
      title: process.env.VUE_APP_TITLE, // 当使用 title 选项时， template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含 提取出来的通用 chunk 和 vendor chunk。
    }
  },
  devServer: {
    port: 2001,
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production', // 是否启动保存时lint代码
  productionSourceMap: false, // 打包是否生成 source map文件
  integrity: true // CDN 防止篡改js和css,提供额外的安全性
}
