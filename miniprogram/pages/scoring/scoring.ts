// eslint-disable-next-line unused-imports/no-unused-vars
const collection = wx.cloud.database().collection('ROOM')

Page({
  onLoad(query: { scene: string }) {
    // eslint-disable-next-line no-console
    console.log(query)
    // collection.doc(query.scene)
    //   .watch({
    //     onChange: (snapshot) => {
    //       if (snapshot.type === 'init')
    //         return
    //       console.log(snapshot)
    //     },
    //     onError: () => {},
    //   })
  },
})
