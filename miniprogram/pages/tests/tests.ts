import { readAvatarFromDisk, uploadAvatar } from '~/utils/avatar'
import { getOpenid } from '~/utils/openid'

Page({
  data: {
    avatarUrl: '',
  },
  async onAvatarChoose(e: WechatMiniprogram.CustomEvent<{ avatarUrl: string }>) {
    const { avatarUrl } = e.detail
    this.setData({ avatarUrl })
    // eslint-disable-next-line no-console
    console.log({ avatarUrl })
  },
  async uploadAvatarToCloud() {
    const openid = await getOpenid()
    const avatarUrl = this.data.avatarUrl
    if (!avatarUrl) {
      console.error({ openid, avatarUrl, message: 'avatarUrl must not be blank' })
      return
    }
    wx.showLoading({ title: '上传中' })
    await uploadAvatar(openid, avatarUrl)
    wx.hideLoading()
    wx.showToast({ title: '上传成功', icon: 'success' })
  },
  async readAvatarFromDisk() {
    const openid = await getOpenid()
    const res = await readAvatarFromDisk(openid)
    console.log(res)
  },
  async getImageInfo() {
    const openid = await getOpenid()
    const filePath = `${wx.env.USER_DATA_PATH}/avatar-${openid}`
    try {
      const res = await wx.getImageInfo({ src: `${filePath}1` })
      console.log(res)
    } catch {
      console.error('error')
    }
  },
})
