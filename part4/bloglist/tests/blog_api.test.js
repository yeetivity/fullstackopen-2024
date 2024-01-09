const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  // Save some initial blogs
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }

  // Save some initial user
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(helper.testUser.password, 10)
  const user = new User({
    username: helper.testUser.username,
    name: helper.testUser.name,
    passwordHash
  })

  await user.save()
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
  let authToken

  beforeEach(async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })

    authToken = response.body.token
  })

  test('addition succeeds with valid data', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .set({ Authorization: `bearer ${authToken}` })
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
      .set({ Authorization: `bearer ${authToken}` })


    expect(result.body.likes).toBeDefined()
    expect(result.body.likes).toBe(0)
  })

  test('fails with status code 400 if title invalid', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog_titleMissing)
      .set({ Authorization: `bearer ${authToken}` })
      .expect(400)
  })

  test('fails with status code 400 if url invalid', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog_titleMissing)
      .set({ Authorization: `bearer ${authToken}` })
      .expect(400)
  })

  test('addition fails with 401 unauthorized, if token is not provided', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(401)
  })
})

describe('deletion of a blog', () => {
  let authToken
  let blogToDeleteId

  beforeEach(async () => {
    // Get the token
    const authResponse = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })

    authToken = authResponse.body.token

    // Create new blog for root user
    const blogResponse = await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${authToken}` })
      .send(helper.newBlog)

    blogToDeleteId = blogResponse.body.id
  })

  test('deletion succeeds with 204 if id and token is valid', async () => {
    await api
      .delete(`/api/blogs/${blogToDeleteId}`)
      .set({ Authorization: `bearer ${authToken}` })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(helper.newBlog.title)
  })

  test('deletion fails with 401 if token is not valid', async () => {
    await api
      .delete(`/api/blogs/${blogToDeleteId}`)
      .expect(401)
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

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'yeetivity',
      name: 'Jitse van Esch',
      password: 'escher'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with status 400 and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: '123456'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with status 400 and message if username too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'rt',
      name: 'Superuser',
      password: '123456'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)
    expect(result.body.error).toContain('User validation failed: username:')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with status 400 and message if password too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: '12'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password not long enough (min length = 3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('login succeeds with 200', async () => {
    await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })
      .expect(200)
  })
})

afterAll(async() => {
  await mongoose.connection.close()
})