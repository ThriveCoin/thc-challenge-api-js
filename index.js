'use strict'

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const yargs = require('yargs')
  .option('port', { type: 'number', demandOption: true, desc: 'server http port' })
const { format } = require('util')
const { errorMiddleware, notFoundMiddleware } = require('./middlewares/error')

const confDb = require('./config/mongo.config.json')
const routes = require('./routes')

const main = async () => {
  try {
    const argv = yargs.argv
    const app = express()

    const connStr = format(
      'mongodb://%s:%s@%s:%s/%s?authMechanism=DEFAULT',
      confDb.user, confDb.password, confDb.host, confDb.port, confDb.database
    )
    await mongoose.connect(connStr)

    app.use(cors())
    app.use(express.json({ strict: true }))
    app.use(routes)
    app.use(notFoundMiddleware)
    app.use(errorMiddleware)

    app.listen(argv.port, '0.0.0.0', () => {
      console.log('Server started listening on port %d', argv.port)
    })
  } catch (err) {
    console.error(err)
  }
}

main()
