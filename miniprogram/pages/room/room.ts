import { getOpenid } from '~/utils/openid'

const collection = wx.cloud.database().collection('ROOM')

Page({
  data: {
    qrcode: '',
    users: ['', '', '', ''],
  },
  async onLoad(query: { scene?: string }) {
    const openid = await getOpenid()
    wx.showLoading({ title: '加载中' })
    if (query.scene) {
      const { data } = await collection.doc(query.scene).get()
      if (data.users.length >= 4) {
        await this.theRoomIsFull(data.users.includes(openid) ? query.scene : undefined)
        wx.hideLoading()
        return
      }
      await this.joinRoom(openid, query.scene, data.users)
    } else {
      const { _id: id } = await collection.add({ data: { users: [openid] } })
      await wx.cloud.callFunction({ name: 'mahjong-scoring-qrcode', data: { id, envVersion: 'develop' } })
      query.scene = id as string
    }
    wx.hideLoading()
    this.setData({ qrcode: `cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/qrcode/${query.scene}` })
    collection.doc(query.scene)
      .watch({
        onChange: (snapshot) => {
          if (snapshot.type === 'init')
            return
          const users = snapshot.docs[0].users as string[]
          this.updateUsers(users, query.scene!)
        },
        onError: () => {
          wx.showModal({
            content: '数据错误', // BUG 反馈
            showCancel: false,
            success: () => {
              wx.redirectTo({ url: '/pages/index/index' })
            },
          })
        },
      })
  },
  async theRoomIsFull(scene?: string) {
    if (scene) {
      wx.redirectTo({ url: `/pages/scoring/scoring?scene=${scene}` })
      return
    }
    await wx.showModal({ content: '房间已满', showCancel: false })
    wx.redirectTo({ url: '/pages/index/index' })
  },
  async joinRoom(openid: string, scene: string, users: string[]) {
    users = [...new Set([...users, openid])]
    await collection.doc(scene).update({ data: { users } })
    this.updateUsers(users, scene)
  },
  updateUsers(users: string[], scene: string) {
    users = users.map(it => `cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/${it}`)
    for (let i = users.length; i < 4; i++) {
      users.push('')
    }
    this.setData({ users })
    if (users.every(it => it)) {
      wx.redirectTo({ url: `/pages/scoring/scoring?scene=${scene}` })
    }
  },
})
