import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'
import './index.css'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPlokiappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const toggleVisibility = () => blogFormRef.current.toggleVisibility()

  const logoutButton = () => {
    window.localStorage.removeItem('loggedPlokiappUser')
    dispatch(setUser(null))
  }

  if (user === null) {
    return (
      <div>
        <h1>Bloglist</h1>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
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
