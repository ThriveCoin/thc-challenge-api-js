'use strict'

const errorMiddleware = (err, req, res, next) => {
  console.error(err)
  const message = err.message || 'Internal Server Error'
  const status = err.status || 500

  return res.status(status).json({ error: message })
}

const notFoundMiddleware = (req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404

  return next(err)
}

module.exports = {
  errorMiddleware,
  notFoundMiddleware
}
