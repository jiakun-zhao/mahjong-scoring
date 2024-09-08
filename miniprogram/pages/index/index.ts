import { getOpenid } from '~/utils/openid'

Page({
  data: {
    avatarUrl: '',
    isAvatarLoaded: false,
    scene: null,
  },
  async onLoad(query) {
    const openid = await getOpenid()
    this.setData({
      // @ts-expect-error
      scene: query.scene,
      avatarUrl: `cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/${openid}`,
    })
    wx.showLoading({ title: '加载中', mask: true })
  },
  async onRoomRoute() {
    if (!this.data.isAvatarLoaded) {
      wx.showToast({ title: '请先加载头像', icon: 'error' })
      return
    }
    this.data.scene
      ? wx.redirectTo({ url: `/pages/room/room?scene=${this.data.scene}` })
      : wx.redirectTo({ url: '/pages/room/room' })
  },
  async onHistoryOpen() {
    wx.navigateTo({ url: '/pages/history/history' })
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
    wx.hideLoading()
    this.setData({ isAvatarLoaded: true })
  },
  async onAvatarError() {
    wx.hideLoading()
    this.setData({ isAvatarLoaded: false })
  },
})
