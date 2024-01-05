const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

// Get route
blogRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

// Create route
blogRouter.post('/', (req, res, next) => {
  logger.info('received the following body', req.body)
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogRouter