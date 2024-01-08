const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null  // Return null for an empty array
  }

  return blogs.reduce((maxLikesBlog, currentBlog) => (currentBlog.likes > maxLikesBlog.likes ? currentBlog : maxLikesBlog), blogs[0])
}

const mostBlogs = (blogs) => { // Returns author with the most blogs
  if (blogs.length === 0) {
    return null  // Return null for an empty array
  }

  const blogCountsByAuthor = blogs.reduce((counts, blog) => {
    const author = blog.author
    counts[author] = (counts[author] || 0) + 1
    return counts
  }, {})

  const mostBlogsAuthor = Object.entries(blogCountsByAuthor).reduce((max, [author, count]) => (count > max.blogs ? { author, blogs: count } : max), { author: null, blogs: 0 })

  return mostBlogsAuthor
}

const mostLikes = (blogs) => { // Returns the author with the most likes
  if(blogs.length === 0) {
    return null  // REturn null for an empty array
  }

  const likesPerAuthor = blogs.reduce((likes, blog) => {
    const author = blog.author
    likes[author] = (likes[author] || 0) + blog.likes
    return likes
  }, {})

  const mostLikedAuthor = Object.entries(likesPerAuthor).reduce((max, [author, likes]) => (likes > max.likes ? { author, likes } : max), { author: null, likes: 0 })
  return mostLikedAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}