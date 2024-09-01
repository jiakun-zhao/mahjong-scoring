interface LoginPageData {
  name: string,
  avatar: string | null
  openid: string | null
  isChanged: boolean
  beforeName: string | null
}

interface LoginPageFunctions {
  onSubmit: () => Promise<void>
  onChooseAvatar: (e: WechatMiniprogram.CustomEvent<{ avatarUrl: string }>) => void
  uploadAvatarToCloud: (avatar: string) => Promise<string>
  getDatabaseId: () => Promise<string | undefined>
}

Page<LoginPageData, LoginPageFunctions>({
  data: {
    name: '微信用户',
    avatar: null,
    openid: null,
    isChanged: false,
    beforeName: null
  },
  async onLoad(options) {
    wx.hideHomeButton()
    this.data.openid = options.openid ?? null
    try {
      const res = await wx.getStorage({ key: 'info' })
      this.setData({
        name: res.data.name,
        avatar: res.data.avatar,
        beforeName: res.data.name
      })
    } catch { }
  },
  onChooseAvatar(e) {
    this.setData({ avatar: e.detail.avatarUrl, isChanged: true })
  },
  async onSubmit() {
    if (!this.data.isChanged && this.data.name === this.data.beforeName) {
      wx.navigateBack()
      return
    }

    const { name, avatar } = this.data

    if (!avatar) {
      wx.showToast({ title: "请设置头像", icon: 'error' })
      return
    }

    try {
      if (!this.data.openid)
        throw Error()

      wx.showToast({ title: '上传中...', icon: 'loading' })

      const fileId = await this.uploadAvatarToCloud(avatar)
      const dbId = await this.getDatabaseId()
      const collection = wx.cloud.database().collection("USER")
      const data = { name, avatar: fileId }
      if (dbId)
        await collection.doc(dbId).update({ data })
      else
        await collection.add({ data })

      await wx.setStorage({ key: 'info', data })
      await wx.showToast({ title: '上传成功', icon: 'success' })
      wx.navigateBack()
    } catch (e) {
      console.error(e);
      wx.showToast({ title: "保存失败", icon: 'error' })
    }
  },
  async uploadAvatarToCloud(avatar: string) {
    const name = avatar.slice(avatar.lastIndexOf('/') + 1)
    const { fileID } = await wx.cloud.uploadFile({
      cloudPath: 'avatar/' + name,
      filePath: avatar
    })
    return fileID
  },
  async getDatabaseId() {
    let item: DB.IQueryResult | undefined
    try {
      item = await wx.cloud.database().collection('USER').where({ _openid: this.data.openid }).get()
    } catch { }
    return item?.data?.[0]?._id as string
  }
})