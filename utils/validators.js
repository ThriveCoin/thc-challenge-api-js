'use strict'

const Joi = require('joi')

const PasswordValidation = Joi.string().min(8).custom((value, helpers) => {
  if (!/[A-Z]/.test(value)) {
    return helpers.message(`"${helpers.state.path}" must contain at least one uppercase letter`)
  }

  if (!/[a-z]/.test(value)) {
    return helpers.message(`"${helpers.state.path}" must contain at least one lowercase letter`)
  }

  if (!/[0-9]/.test(value)) {
    return helpers.message(`"${helpers.state.path}" must contain at least one digit`)
  }

  return value
}).required()

const LoginValidation = Joi.object({
  username: Joi.string().min(4).required(),
  password: PasswordValidation
})

const SignupValidation = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: PasswordValidation
})

const ProductValidation = Joi.object({
  title: Joi.string().min(2).required(),
  desc: Joi.string().required(),
  price: Joi.number().positive().required(),
  qty: Joi.number().positive().required()
})

module.exports = {
  LoginValidation,
  SignupValidation,
  ProductValidation
}
