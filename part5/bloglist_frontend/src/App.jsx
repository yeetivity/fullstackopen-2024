import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'

import { Header, SubHeader } from './components/Headers'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('localBlogAppUser')
    setUser(null)
    console.log('Logged out')
  }

  return (
    <div>
      <Header text={'Blogg App'}/>
      { user === null 
        ? <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} setUser={setUser}/>
        : <div>
        <UserInfo user={user} logout={logout}/>
        <BlogList blogs={blogs} />
        </div>
      }
    </div>
  )
}

export default App