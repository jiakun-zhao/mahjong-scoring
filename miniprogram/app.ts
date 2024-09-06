App<IAppOption>({
  globalData: {
    openid: null,
  },
  async onLaunch() {
    wx.cloud.init()
    wx.loadFontFace({
      family: 'Geist Sans',
      global: true,
      source: 'https://registry.npmmirror.com/@fontsource/geist-sans/5.0.3/files/files/geist-sans-latin-400-normal.woff2',
    })
    wx.loadFontFace({
      family: 'Geist Mono',
      global: true,
      source: 'https://registry.npmmirror.com/@fontsource/geist-mono/5.0.3/files/files/geist-mono-latin-400-normal.woff2',
    })
  },
})
