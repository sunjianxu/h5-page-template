'use strict'
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  outputDir: `dist/${process.env.VUE_APP_VERSION}`,
  publicPath: './',
  productionSourceMap: false,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'src/public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: process.env.VUE_GAME_PACKAGE_NAME,
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
}
