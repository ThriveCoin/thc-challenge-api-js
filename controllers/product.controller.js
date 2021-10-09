'use strict'

const _ = require('lodash')
const ProductModel = require('../models/product')
const { ObjectId } = require('mongoose').Types
const { ProductValidation } = require('../utils/validators')

const format = (data) => ({ id: data._id.toString(), ..._.pick(data, ['title', 'desc', 'price', 'qty']) })

class ProductController {
  async list (req, res, next) {
    const { page, perPage } = req.query

    const data = await ProductModel.paginate(
      { uid: req.user._id },
      { page: page || 1, limit: perPage || 10, sort: { title: 1 } }
    )

    return res.json({
      page: data.page,
      pages: data.pages,
      perPage: data.limit,
      total: data.total,
      items: data.docs.map(format)
    })
  }

  async create (req, res, next) {
    try {
      const data = _.pick(req.body, ['title', 'desc', 'price', 'qty'])
      const { error } = ProductValidation.validate(data)
      if (error) {
        const err = new Error(error.message)
        err.status = 400
        throw err
      }

      data.uid = req.user._id
      const product = await ProductModel.create(data)
      return res.json(format(product))
    } catch (err) {
      next(err)
    }
  }

  async update (req, res, next) {
    try {
      const product = await ProductModel.findOne({
        _id: ObjectId(req.params.id),
        uid: req.user._id
      })
      if (!product) {
        const err = new Error('Product not found')
        err.status = 404
        throw err
      }

      const data = _.assign(
        _.pick(product, ['title', 'desc', 'price', 'qty']),
        _.pick(req.body, ['title', 'desc', 'price', 'qty'])
      )

      const { error } = ProductValidation.validate(data)
      if (error) {
        const err = new Error(error.message)
        err.status = 400
        throw err
      }

      await ProductModel.updateOne({ _id: ObjectId(req.params.id) }, { $set: data })
      return res.json(format({ _id: product._id, ...data }))
    } catch (err) {
      next(err)
    }
  }

  async find (req, res, next) {
    try {
      const product = await ProductModel.findOne({
        _id: ObjectId(req.params.id),
        uid: req.user._id
      })
      if (!product) {
        const err = new Error('Product not found')
        err.status = 404
        throw err
      }

      return res.json(format(product))
    } catch (err) {
      next(err)
    }
  }

  async remove (req, res, next) {
    try {
      const product = await ProductModel.findOne({
        _id: ObjectId(req.params.id),
        uid: req.user._id
      })
      if (!product) {
        const err = new Error('Product not found')
        err.status = 404
        throw err
      }

      await ProductModel.deleteOne({ _id: ObjectId(req.params.id) })

      return res.json(true)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ProductController
