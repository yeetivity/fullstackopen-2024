const listHelper = require('../utils/list_helper')

const listWithMultipleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const listWithSingleBlog = [{
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
]

const emptyList = []

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of an empty list is zero', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0)
  })

  test('when list has only blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithSingleBlog)).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(listWithMultipleBlogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of an empty list is null', () => {
    expect(listHelper.favoriteBlog(emptyList)).toBe(null)
  })

  test('of list with a single blog to be that blog', () => {
    expect(listHelper.favoriteBlog(listWithSingleBlog)).toEqual({
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    })
  })

  test('of list with multiple blogs to be best blog', () => {
    expect(listHelper.favoriteBlog(listWithMultipleBlogs)).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    })
  })
})

describe('most popular author', () => {
  test('of an empty list is null', () => {
    expect(listHelper.mostBlogs(emptyList)).toBe(null)
  })

  test('of a list with only a single author to be that author with count one', () => {
    expect(listHelper.mostBlogs(listWithSingleBlog)).toEqual({
      author: 'Michael Chan',
      blogs: 1
    })
  })

  test('of a list with multiple blogs to be the best author', () => {
    expect(listHelper.mostBlogs(listWithMultipleBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most liked author', () => {
  test('of an empty list is null', () => {
    expect(listHelper.mostLikes(emptyList)).toBe(null)
  })

  test('of a list with only a single author to be that author with its likes', () => {
    expect(listHelper.mostLikes(listWithSingleBlog)).toEqual({
      author: 'Michael Chan',
      likes: 7
    })
  })

  test('of a list with multiple blogs to be the best author', () => {
    expect(listHelper.mostLikes(listWithMultipleBlogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})

