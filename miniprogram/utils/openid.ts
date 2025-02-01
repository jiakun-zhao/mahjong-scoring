export async function getOpenid() {
  const app = getApp<IAppOption>()
  const openid = app.globalData.openid
    || (app.globalData.openid = await getOpenidFromStorage())
    || (app.globalData.openid = await getOpenidFromCloud())
  if (!openid)
    wx.exitMiniProgram()
  return openid as string
}

async function getOpenidFromStorage() {
  try {
    const { data } = await wx.getStorage({ key: 'openid' })
    return data as string
  } catch {
    return null
  }
}

async function getOpenidFromCloud() {
  try {
    const res = await wx.cloud.callFunction({ name: 'mahjong-scoring-openid' })
    const openid = (res.result as { openid: string }).openid
    await wx.setStorage({ key: 'openid', data: openid })
    return openid
  } catch {
    return null
  }
}
