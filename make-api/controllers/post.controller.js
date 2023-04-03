'use strict'

const _ = require('lodash')
const db = require('../db')

class PostController {
  posts (req, res, next) {
    try {
      const now = Date.now()
      const since = +req.query.since
      const limit = +(req.query.limit || 20)
      const posts = _.cloneDeep(db.posts)
        .filter(p => now - p.ts >= since).slice(0, limit)
        .map(p => ({ ...p, ts: now - p.ts }))
      return res.status(200).json(posts)
    } catch (err) {
      return next(err)
    }
  }

  postLikes (req, res, next) {
    try {
      const postId = req.params.id
      const users = _.cloneDeep(db.users)
        .filter(u => u.postLikes?.includes(+postId))
        .map(u => _.omit(u, 'postLikes'))

      return res.status(200).json(users)
    } catch (err) {
      return next(err)
    }
  }

}

module.exports = PostController
