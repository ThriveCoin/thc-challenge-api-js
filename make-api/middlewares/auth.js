'use strict'

const config = require('../config/app.json')

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader !== config.authSecret) {
    const err = new Error('Forbidden')
    err.status = 403
    return next(err)
  }

  return next()
}

module.exports = {
  checkAuth
}
