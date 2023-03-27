'use strict'

const _ = require('lodash')
const bcrypt = require('bcrypt')
const UserModel = require('../models/user')
const jwt = require('../utils/jwt')
const { LoginValidation, SignupValidation } = require('../utils/validators')

class AuthController {
  async signup (req, res, next) {
    try {
      const data = _.pick(req.body, ['username', 'email', 'password'])
      const { error } = SignupValidation.validate(data)
      if (error) {
        const err = new Error(error.message)
        err.status = 400
        throw err
      }

      data.passwordSalt = await bcrypt.genSalt()
      data.passwordHash = await bcrypt.hash(data.password, data.passwordSalt)

      const user = await UserModel.create(data)
      return res.json(jwt.encode(user._id.toString(), Date.now()))
    } catch (err) {
      next(err)
    }
  }

  async login (req, res, next) {
    try {
      const data = _.pick(req.body, ['username', 'password'])
      const { error } = LoginValidation.validate(data)
      if (error) {
        const err = new Error(error.message)
        err.status = 400
        throw err
      }

      const credErr = new Error('Invalid credentials')
      credErr.status = 403

      const user = await UserModel.findOne({ $or: [{ email: data.username }, { username: data.username }] })
      if (!user) throw credErr

      const valid = await bcrypt.compare(data.password, user.passwordHash)
      if (!valid) throw credErr

      return res.json(jwt.encode(user._id.toString(), Date.now()))
    } catch (err) {
      next(err)
    }
  }

  info (req, res) {
    const info = _.pick(req.user, ['email', 'username'])
    return res.json(info)
  }
}

module.exports = AuthController
