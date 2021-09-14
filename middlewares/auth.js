'use strict'

const _ = require('lodash')
const jwt = require('../utils/jwt')
const UserModel = require('../models/user')
const { ObjectId } = require('mongoose').Types

const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const authErr = new Error('Forbidden')
    authErr.status = 403

    if (!_.isString(authHeader) || !authHeader.toLowerCase().startsWith('bearer ')) {
      throw authErr
    }

    const id = jwt.verify(authHeader.split(' ')[1])
    if (!id) throw authErr

    const user = await UserModel.findById(ObjectId(id))
    if (!user) throw authErr
    req.user = user

    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  checkAuth
}
