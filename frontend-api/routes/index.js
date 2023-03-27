'use strict'

const express = require('express')
const AuthController = require('../controllers/auth.controller')
const ProductController = require('../controllers/product.controller')
const { checkAuth } = require('../middlewares/auth')

const authController = new AuthController()
const productController = new ProductController()
const router = express.Router()

router.post('/v1/auth/signup', authController.signup.bind(authController))
router.post('/v1/auth/login', authController.login.bind(authController))
router.get('/v1/auth/info', checkAuth, authController.info.bind(authController))

router.get('/v1/products', checkAuth, productController.list.bind(productController))
router.post('/v1/products', checkAuth, productController.create.bind(productController))
router.get('/v1/products/:id', checkAuth, productController.find.bind(productController))
router.patch('/v1/products/:id', checkAuth, productController.update.bind(productController))
router.put('/v1/products/:id', checkAuth, productController.update.bind(productController))
router.delete('/v1/products/:id', checkAuth, productController.remove.bind(productController))

module.exports = router
