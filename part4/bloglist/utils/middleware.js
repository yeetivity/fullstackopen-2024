const logger = require('./logger')
const jwt = require('jsonwebtoken')

// eslint-disable-next-line no-unused-vars
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.startsWith('bearer ')) {
    req.token = auth.replace('bearer ', '')
  } else {
    req.token = null
  }
  next()
}

const tokenValidator = (req, res, next) => {
  const token = req.token
  if(!token) { return res.status(401).json({ error: 'missing token' }) }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    req.user = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({ error: 'invalid token' })
  }
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  tokenValidator
}
