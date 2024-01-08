const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

// Get route
blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})

// Create route
blogRouter.post('/', async (req, res) => {
  const body = req.body
  logger.info('received the following body', body)
  try {
    // Get the id from any user
    const users = await User.find({})
    const firstUser = users[0]
    console.log(firstUser)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: firstUser.id
    })

    const savedBlog = await blog.save()
    firstUser.blogs = firstUser.blogs.concat(savedBlog._id)
    await firstUser.save()

    res.status(201).json(savedBlog)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
    return res.status(500).json({ error: 'Internal Sever Error' })
  }
})

// Delete route
blogRouter.delete('/:id', async (req, res) => {
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