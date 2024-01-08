const logger = require('./logger')

// eslint-disable-next-line no-unused-vars
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}
