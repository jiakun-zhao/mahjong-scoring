const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event) => {
  const { id, envVersion } = event
  try {
    const { buffer } = await cloud.openapi.wxacode.getUnlimited({
      page: 'pages/index/index',
      scene: id,
      checkPath: false,
      envVersion,
    })
    const { fileID } = await cloud.uploadFile({
      cloudPath: `qrcode/${id}`,
      fileContent: buffer,
    })
    return fileID
  } catch (err) {
    return err
  }
}
