export async function avatar(openid: string) {
  return await readAvatarFromDisk(openid)
    .catch(() => downloadAvatar(openid))
}

export async function uploadAvatar(openid: string, filePath: string) {
  try {
    await wx.cloud.uploadFile({ cloudPath: `avatar/${openid}`, filePath })
    return true
  } catch {
    return false
  }
}

export async function downloadAvatar(openid: string) {
  try {
    const fileID = `cloud://cloud-dev-2g6a41d99ffcb37a.636c-cloud-dev-2g6a41d99ffcb37a-1329167428/avatar/${openid}`
    const { tempFilePath } = await wx.cloud.downloadFile({ fileID })
    const filePath = getAvatarFilePath(openid)
    await new Promise((success, fail) => {
      wx.getFileSystemManager().saveFile({ tempFilePath, filePath, success, fail })
    })
    return await readAvatarFromDisk(openid)
  } catch {
    return null
  }
}

export async function readAvatarFromDisk(openid: string) {
  try {
    const { path } = await wx.getImageInfo({ src: getAvatarFilePath(openid) })
    return path
  } catch {
    return null
  }
}

function getAvatarFilePath(openid: string) {
  return `${wx.env.USER_DATA_PATH}/avatar-${openid}`
}
