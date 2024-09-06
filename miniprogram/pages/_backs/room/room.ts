interface RoomPageData {
  id: string | null
  users: Array<{ openid: string, name: string, avatar: string, value: number }>
  games: Array<{ createTime: Date, data: Record<string, { avatar: string, value: number }> }>
}

interface RoomPageFunctions {

}

const db = wx.cloud.database()
const _ = db.command

Page<RoomPageData, RoomPageFunctions>({
  data: {
    id: null,
    users: [
      { openid: "o51pv7STQQdZGNoZR0joHfTvfKqs", name: "这..", avatar: "cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/o51pv7STQQdZGNoZR0joHfTvfKqs", value: 0 },
      { openid: "o51pv7STQQdZGNoZR0joHfTvfKqs", name: "这..", avatar: "cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/o51pv7STQQdZGNoZR0joHfTvfKqs", value: 0 },
      { openid: "o51pv7STQQdZGNoZR0joHfTvfKqs", name: "这..", avatar: "cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/o51pv7STQQdZGNoZR0joHfTvfKqs", value: 0 },
      { openid: "o51pv7STQQdZGNoZR0joHfTvfKqs", name: "这..", avatar: "cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/o51pv7STQQdZGNoZR0joHfTvfKqs", value: -10 }
    ],
    games: [
      {
        createTime: new Date(),
        data: {
          "o51pv7STQQdZGNoZR0joHfTvfKqs": {
            avatar: "cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/o51pv7STQQdZGNoZR0joHfTvfKqs",
            value: 10
          },
          "o51pv7STQQdZGNoZR0joHfTvfKqs2": {
            avatar: "cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/o51pv7STQQdZGNoZR0joHfTvfKqs",
            value: 10
          },
          "o51pv7STQQdZGNoZR0joHfTvfKqs3": {
            avatar: "cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/o51pv7STQQdZGNoZR0joHfTvfKqs",
            value: 10
          },
          "o51pv7STQQdZGNoZR0joHfTvfKq4": {
            avatar: "cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/o51pv7STQQdZGNoZR0joHfTvfKqs",
            value: 10
          }
        }
      },
      {
        createTime: new Date(),
        data: {
          "o51pv7STQQdZGNoZR0joHfTvfKqs": {
            avatar: "cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/o51pv7STQQdZGNoZR0joHfTvfKqs",
            value: -50
          },
          "o51pv7STQQdZGNoZR0joHfTvfKqs2": {
            avatar: "cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/o51pv7STQQdZGNoZR0joHfTvfKqs",
            value: 100
          },
          "o51pv7STQQdZGNoZR0joHfTvfKqs3": {
            avatar: "cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/o51pv7STQQdZGNoZR0joHfTvfKqs",
            value: -100
          },
          "o51pv7STQQdZGNoZR0joHfTvfKq4": {
            avatar: "cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/o51pv7STQQdZGNoZR0joHfTvfKqs",
            value: 110
          }
        }
      }
    ]
  },
  async onLoad(options) {
    const id = options.id
    const { data: openid } = await wx.getStorage({ key: 'openid' })
    const { data: info } = await wx.getStorage({ key: 'info' })
    if (!openid) {
      wx.exitMiniProgram()
      return
    }
    let data
    if (id) {
      this.setData({ id: options.id ?? null })
      const res = await db.collection("ROOM").doc(id).get()
      data = res.data
      if (data.users.length >= 4) {
        wx.showToast({ icon: 'error', title: '人数已满' })
        return
      } else if (data.users.find((it: any) => it.openid === openid)) {
        console.log("已加入房间");
      } else {
        await db.collection("ROOM").doc(id).update({
          data: { users: _.push({ openid, ...info }) }
        })
      }
    } else {
      data = { createTime: new Date(), users: [{ openid, ...info }], games: [] }
      const res = await db.collection('ROOM').add({ data })
      console.log(res._id);
    }
    console.log(data);
  },
  onShareAppMessage() {
    console.log('onShare');
    return {
      title: 'Room: ' + this.data.id,
      path: '/pages/room/room?id=' + this.data.id
    }
  }
})