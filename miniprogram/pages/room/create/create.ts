import { getOpenid } from '~/utils/openid'

Page({
  data: {
    avatarUrl: '',
    isAvatarError: false,
  },
  async onLoad() {
    const openid = await getOpenid()
    this.setData({ avatarUrl: `cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/${openid}` })
  },
  async onAvatarError() {
    this.setData({ isAvatarError: true })
  },
  async onAvatarLoad() {
    await this.onRoomCreate()
  },
  async onAvatarChoose(e: WechatMiniprogram.CustomEvent<{ avatarUrl: string }>) {
    const { avatarUrl } = e.detail
    const openid = await getOpenid()
    wx.showLoading({ title: '保存中' })
    try {
      await wx.cloud.uploadFile({ cloudPath: `avatar/${openid}`, filePath: avatarUrl })
      this.setData({ avatarUrl, isAvatarError: false })
    } catch { }
    wx.hideLoading()
    this.data.isAvatarError
      ? wx.showToast({ title: '保存失败', icon: 'error' })
      : wx.showToast({ title: '保存成功', icon: 'success' })
  },
  async onRoomCreate() {
    console.log('onRoomCreate')
  },
})
