'use strict'

const cors = require('cors')
const express = require('express')
const yargs = require('yargs')
  .option('port', { type: 'number', demandOption: true, desc: 'server http port' })
const { errorMiddleware, notFoundMiddleware } = require('./middlewares/error')

const routes = require('./routes')

const main = async () => {
  try {
    const argv = yargs.argv
    const app = express()

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
