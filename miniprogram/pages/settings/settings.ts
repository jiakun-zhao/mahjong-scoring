import { getOpenid } from '~/utils/openid'

Page({
  data: {
    avatarUrl: '',
    filePath: '',
    openType: '',
  },
  async onChooseAvatar(e: WechatMiniprogram.CustomEvent<{ avatarUrl: string }>) {
    const { avatarUrl } = e.detail
    this.setData({ avatarUrl, filePath: avatarUrl })
  },
  async onSave() {
    const filePath = this.data.filePath
    if (!filePath)
      return
    const openid = await getOpenid()
    wx.showLoading({ title: '保存中' })
    await wx.cloud.uploadFile({ cloudPath: `avatar/${openid}`, filePath })
    wx.hideLoading()
    wx.showToast({ title: '保存成功', icon: 'success' })
    wx.navigateBack()
  },
})
