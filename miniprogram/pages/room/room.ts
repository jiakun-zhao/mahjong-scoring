import { createRoom, getRoomInfo } from '~/utils/database'
import { getOpenid } from '~/utils/openid'
import { routeToHome } from '~/utils/view'

let watcher: DB.RealtimeListener | null = null
const db = wx.cloud.database().collection('ROOM')

interface DataOption {
  qrcode?: string
  info?: any
}

Page<DataOption, WechatMiniprogram.Page.CustomOption>({
  data: {
    info: undefined,
    qrcode: undefined,
  },
  async onLoad(query: { scene?: string }) {
    wx.showLoading({ title: '加载中' })
    const openid = await getOpenid()
    const scene = query.scene ?? await createRoom(db, openid)
    const info = await getRoomInfo(db, scene)
    if (info.users.every((it: string) => it !== openid)) {
      info.users.push(openid)
      await db.doc(scene).update({ data: { users: info.users } })
    }
    this.setData({ info, qrcode: `https://blob.zhaojiakun.com/program/mahjong-scoring/qrcode-${scene}` })
    wx.hideLoading()
    watcher = this.createRoomWatcher(db, scene)
  },
  onShow() {

  },
  onHide() {
    watcher?.close()
    watcher = null
  },
  createRoomWatcher(db: DB.CollectionReference, scene: string) {
    return db.doc(scene).watch({
      onChange: snapshot => snapshot.type !== 'init' && this.setData({ info: snapshot.docs[0] }),
      onError: () => wx.showModal({ content: '数据错误', showCancel: false, success: routeToHome }),
    })
  },
})
