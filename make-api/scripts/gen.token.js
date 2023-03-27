'use strict'

const crypto = require('crypto')

const token = crypto.randomBytes(6).toString('hex')
console.log(token)
