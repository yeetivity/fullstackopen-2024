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

describe('when there is initially some blogs saved', () => {
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

describe('checking database parameters', () => {
  test('Confirm unique identifier is named id', async () => {
    const blogs = await helper.blogsInDb()
    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
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

  test('succeeds with missing likes, but likes defaults to zero', async () => {
    const result = await api
      .post('/api/blogs')
      .send(helper.newBlog_likesMissing)

    expect(result.body.likes).toBeDefined()
    expect(result.body.likes).toBe(0)
  })

  test('fails with status code 400 if title invalid', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog_titleMissing)
      .expect(400)
  })

  test('fails with status code 400 if url invalid', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog_titleMissing)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating of a blog', () => {
  test('succeeds with status code 200 if id is valid', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(helper.updatedBlogData)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]

    expect(updatedBlog.title).toBe(helper.updatedBlogData.title)
    expect(updatedBlog.author).toBe(helper.updatedBlogData.author)
    expect(updatedBlog.url).toBe(helper.updatedBlogData.url)
    expect(updatedBlog.likes).toBe(helper.updatedBlogData.likes)
  })
})



afterAll(async() => {
  await mongoose.connection.close()
})