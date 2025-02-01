import { getOpenid } from '~/utils/openid'

function toTempFilePath(arrayBuffer: ArrayBuffer): Promise<string> {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: wx.createBufferURL(arrayBuffer),
      success: res => resolve(res.tempFilePath),
      fail: reject,
    })
  })
}

function uploadFile(id: string, filePath: string) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: 'https://mahjong-scoring.welostyou.host/api/mahjong-scoring',
      filePath,
      name: 'file',
      formData: { id },
      success: resolve,
      fail: reject,
    })
  })
}

export async function uploadAvatar(src: string) {
  const openid = await getOpenid()
  try {
    await uploadFile(`avatar-${openid}`, src)
    return true
  } catch {
    return false
  }
}

export async function createQrCode(scene: string) {
  try {
    const { result } = await wx.cloud.callFunction({ name: 'mahjong-scoring-qrcode', data: { scene, envVersion: 'develop' } })
    if (result instanceof ArrayBuffer) {
      await uploadFile(`qrcode-${scene}`, await toTempFilePath(result))
      return true
    } else {
      return false
    }
  } catch {
    return false
  }
}
