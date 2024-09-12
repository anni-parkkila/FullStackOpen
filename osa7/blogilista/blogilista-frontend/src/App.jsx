import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { newNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPlokiappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedPlokiappUser', JSON.stringify(user))
      dispatch(newNotification('Login successful', 5))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(newNotification('ERROR: Wrong username or password', 5))
    }
  }

  const toggleVisibility = () => blogFormRef.current.toggleVisibility()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const logoutButton = () => {
    window.localStorage.removeItem('loggedPlokiappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h1>Bloglist</h1>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <div className="user">
        {user.name} logged in
        <button onClick={logoutButton}>logout</button>
      </div>
      <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
        <BlogForm toggle={toggleVisibility} />
      </Togglable>
      <BlogList user={user} />
    </div>
  )
}

export default App
