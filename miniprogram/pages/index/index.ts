const app = getApp<IAppOption>()

interface IndexPageData {
  name: string | null
  avatar: string | null
  openid: string | null
}

interface IndexPageFunctions {
  onTap: () => void,
  loadOpenId: () => Promise<void>
  loadInfo: () => Promise<void>
  onEdit: () => void
}

Page<IndexPageData, IndexPageFunctions>({
  data: {
    name: null,
    avatar: null,
    openid: null,
  },
  async onLoad() {
    await this.loadOpenId()
    if (!this.data.openid)
      wx.exitMiniProgram()
  },
  async onShow() {
    await this.loadInfo()
  },
  onTap() {
    console.log(1)
  },
  async loadOpenId() {
    wx.showNavigationBarLoading()
    try {
      const { data } = await wx.getStorage({ key: 'openid' })
      this.data.openid = data
    } catch {
      const res = await wx.cloud.callFunction({ name: 'mahjong-scoring-openid' })
      this.data.openid = (res.result as { openid: string }).openid
      await wx.setStorage({ key: 'openid', data: this.data.openid })
    } finally {
      wx.hideNavigationBarLoading()
    }
  },
  async loadInfo() {
    try {
      const res = await wx.getStorage({ key: 'info' })
      this.setData(res.data)
    } catch {
      wx.redirectTo({ url: '../login/login?openid=' + this.data.openid })
    }
  },
  onEdit() {
    wx.navigateTo({ url: '../login/login?openid=' + this.data.openid })
  }
})
