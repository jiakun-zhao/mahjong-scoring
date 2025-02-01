const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event) => {
  try {
    const { buffer: fileContent } = await cloud.openapi.wxacode.getUnlimited({
      page: 'pages/index/index',
      scene: event.scene,
      checkPath: false,
      envVersion: event.envVersion,
    })
    // const cloudPath = `qrcode/${scene}`
    // return await cloud.uploadFile({ cloudPath, fileContent })
    return fileContent
  } catch (err) {
    return err
  }
}
