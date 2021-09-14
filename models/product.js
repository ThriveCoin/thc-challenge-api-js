'use strict'

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const schema = new mongoose.Schema(
  {
    title: { type: String, minlength: 2, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    uid: { type: mongoose.Types.ObjectId, ref: 'User' }
  },
  { collection: 'products' }
)
schema.plugin(mongoosePaginate)

const model = mongoose.model('Product', schema)

module.exports = model
