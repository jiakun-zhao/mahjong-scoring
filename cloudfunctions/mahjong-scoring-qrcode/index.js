const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  const { id } = event
  try {
    const { buffer } = await cloud.openapi.wxacode.getUnlimited({
      page: 'pages/room/room',
      scene: 'id=' + id,
      checkPath: true,
      envVersion: 'develop'
    })
    const { fileID } = await cloud.uploadFile({
      cloudPath: 'qrcode/' + id,
      fileContent: buffer
    });
    return fileID;
  } catch (err) {
    return err
  }
}