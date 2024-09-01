const cloud = require('wx-server-sdk');

exports.main = async () => {
  const wxContext = cloud.getWXContext();
  return {
    openid: wxContext.OPENID
  };
};
