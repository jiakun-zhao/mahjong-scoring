Page({
  onLoad(query) {
    if (query.scene) {
      console.log(query.scene)
    }
  },
  async onCloudFn() {
    const res = await wx.cloud.callFunction({
      name: 'mahjong-scoring-qrcode',
      data: { id: '983e93c466d55319008176200c6f3e6e', envVersion: 'develop' },
    })
    if (res.errMsg.endsWith(':ok')) {
      console.log(res.result)
    } else {
      console.error(res)
    }
  },
  async onRoomCreate() {
    wx.navigateTo({ url: '/pages/room/create/create' })
  },
})
