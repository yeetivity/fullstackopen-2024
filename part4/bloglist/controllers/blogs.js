const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

// Get route
blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

// Create route
blogRouter.post('/', async (req, res) => {
  logger.info('received the following body', req.body)
  try {
    const blog = new Blog(req.body)
    const result = await blog.save()

    res.status(201).json(result)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
    return res.status(500).json({ error: 'Internal Sever Error' })
  }
})

module.exports = blogRouter