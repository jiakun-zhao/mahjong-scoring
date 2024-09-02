App<IAppOption>({
  globalData: {
    openid: null,
  },
  async onLaunch() {
    wx.cloud.init();
    wx.loadFontFace({
      family: 'Geist Sans',
      global: true,
      source: 'https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/files/geist-sans-latin-400-normal.woff2',
    });
    wx.loadFontFace({
      family: 'Geist Mono',
      global: true,
      source: 'https://cdn.jsdelivr.net/npm/@fontsource/geist-mono@5.0.3/files/geist-mono-latin-400-normal.woff2',
    });
    this.globalData.openid = (await getOpenidFromStorage()) || (await getOpenidFromCloud());
  },
});

async function getOpenidFromStorage() {
  try {
    const { data } = await wx.getStorage({ key: 'openid' });
    return data as string;
  } catch {
    return null;
  }
}

async function getOpenidFromCloud() {
  try {
    const res = await wx.cloud.callFunction({ name: 'mahjong-scoring-openid' });
    const openid = (res.result as { openid: string }).openid;
    await wx.setStorage({ key: 'openid', data: openid });
    return openid;
  } catch {
    return null;
  }
}
