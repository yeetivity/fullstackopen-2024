const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')

// Get route
blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})

// Create route
blogRouter.post('/', middleware.tokenValidator, async (req, res) => {
  const body = req.body
  logger.info('received the following body', body)

  const user = await User.findById(req.user.id)

  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
    return res.status(500).json({ error: 'Internal Sever Error' })
  }
})

// Delete route
blogRouter.delete('/:id', middleware.tokenValidator, async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  // Check if the user making the request is the owner of the blog
  if (blog.user.toString() !== req.user.id) {
    return res.status(403).json({ error: 'permission denied' })
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

// Update route
blogRouter.put('/:id', async(req, res) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog)
})

module.exports = blogRouter