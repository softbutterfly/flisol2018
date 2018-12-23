module.exports = {
  baseUrl: '/',
  assetsDir: 'static',
  productionSourceMap: false,
  css: {
    extract: true
  },
  pwa: {
    name: 'FLISoL 2018',
    themeColor: '#4a3a6f',
    msTileColor: '#4a3a6f',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW'
  }
}
