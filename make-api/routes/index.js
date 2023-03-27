'use strict'

const express = require('express')
const PostController = require('../controllers/post.controller')
const { checkAuth } = require('../middlewares/auth')

const post = new PostController()
const router = express.Router()

router.get('/api/v1/posts', checkAuth, post.posts.bind(post))
router.get('/api/v1/posts/:id/likes', checkAuth, post.postLikes.bind(post))

module.exports = router
