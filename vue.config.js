module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  // publicPath:'/app' ,
  outputDir: 'dest',
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  }
}