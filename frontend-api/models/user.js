'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    username: { type: String, minlength: 4, unique: true, match: /^[a-zA-Z][a-zA-Z0-9_.-]+$/, required: true },
    email: { type: String, minlength: 6, unique: true, match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/, required: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true }
  },
  { collection: 'users' }
)

const model = mongoose.model('User', schema)

module.exports = model
