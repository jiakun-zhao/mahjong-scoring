App<IAppOption>({
  globalData: {},
  onLaunch() {
    wx.cloud.init()
  }
})