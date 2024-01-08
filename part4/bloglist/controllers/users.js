const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const logger = require('../utils/logger')

// Create path
userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.json(users)
})

// Create path
userRouter.post('/', async (req, res) => {
  logger.info('received the following body', req.body)
  const { username, name, password } = req.body

  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'Password not long enough (min length = 3)' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = userRouter