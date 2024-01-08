const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {  // Write all the initial blogs to the database
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('Confirm DB initialisation', () => {
  test('blogs are returned as json', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/) // Regex to check for in Header
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'React patterns'
    )
  })
})

describe('Confirm DB operations', () => {
  test('a valid blog can be added', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(helper.newBlog.title)
  })

  test('a blog with likes missing can be added and likes defaults to zero', async () => {
    const result = await api
      .post('/api/blogs')
      .send(helper.newBlog_likesMissing)

    expect(result.body.likes).toBeDefined()
    expect(result.body.likes).toBe(0)
  })

  test('a blog without a title cannot be added and returns status 400', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog_titleMissing)
      .expect(400)
  })

  test('a blog without a url cannot be added and returns status 400', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog_titleMissing)
      .expect(400)
  })
})

describe('Confirm DB value paramaters', () => {
  test('Confirm unique identifier is named id', async () => {
    const blogs = await helper.blogsInDb()
    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

afterAll(async() => {
  await mongoose.connection.close()
})