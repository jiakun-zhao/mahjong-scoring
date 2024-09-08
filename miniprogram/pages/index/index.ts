import { getOpenid } from '~/utils/openid'

Page({
  data: {
    avatarUrl: '',
    isAvatarLoaded: false,
  },
  async onLoad(query) {
    const openid = await getOpenid()
    this.setData({
      avatarUrl: `cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/${openid}`,
    })
    if (query.scene) {
      // eslint-disable-next-line no-console
      console.log(query.scene)
    }
  },
  // async onCloudFn() {
  //   const res = await wx.cloud.callFunction({
  //     name: 'mahjong-scoring-qrcode',
  //     data: { id: '983e93c466d55319008176200c6f3e6e', envVersion: 'develop' },
  //   })
  //   if (res.errMsg.endsWith(':ok')) {
  //     console.log(res.result)
  //   } else {
  //     console.error(res)
  //   }
  // },
  async onRoomCreate() {
    if (!this.data.isAvatarLoaded) {
      wx.showToast({ title: '请先加载头像', icon: 'error' })
      return
    }
    // wx.navigateTo({ url: '/pages/room/create/create' })
    // eslint-disable-next-line no-console
    console.log('onRoomCreate')
  },
  async onHistoryOpen() {
    // eslint-disable-next-line no-console
    console.log('onHistoryOpen')
  },
  async onAvatarChoose(e: WechatMiniprogram.CustomEvent<{ avatarUrl: string }>) {
    try {
      wx.showLoading({ title: '上传头像中' })
      const openid = await getOpenid()
      const filePath = e.detail.avatarUrl
      await wx.cloud.uploadFile({ cloudPath: `avatar/${openid}`, filePath })
      this.setData({ avatarUrl: filePath, isAvatarLoaded: true })
    } catch {
      this.setData({ isAvatarLoaded: false })
    }
    wx.hideLoading()
    this.data.isAvatarLoaded
      ? wx.showToast({ title: '上传成功', icon: 'success' })
      : wx.showToast({ title: '上传失败', icon: 'error' })
  },
  async onAvatarLoaded() {
    this.setData({ isAvatarLoaded: true })
  },
  async onAvatarError() {
    this.setData({ isAvatarLoaded: false })
  },
})
