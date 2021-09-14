'use strict'

const jwt = require('jwt-simple')
const appConf = require('../config/app.config.json')

const encode = (id, ts) => {
  return {
    token: jwt.encode({ iat: ts, sub: id }, appConf.jwtSecret, appConf.jwtAlgo),
    expire: appConf.jwtExpire
  }
}

const verify = (token) => {
  const data = jwt.decode(token, appConf.jwtSecret, false, appConf.jwtAlgo)
  if (!data.sub) return false
  if (Date.now() - data.iat > (appConf.jwtExpire * 1000)) return false
  return data.sub
}

module.exports = {
  encode,
  verify
}
