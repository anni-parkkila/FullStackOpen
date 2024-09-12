import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setLoggedUser } from './reducers/loginReducer'
import blogService from './services/blogs'
import './index.css'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.loggedUser)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPlokiappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const toggleVisibility = () => blogFormRef.current.toggleVisibility()

  const logoutButton = () => {
    window.localStorage.removeItem('loggedPlokiappUser')
    dispatch(setLoggedUser(null))
  }

  if (loggedUser === null) {
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
    <Router>
      <div>
        <h2>Blogs</h2>
        <Notification />
        <div className="user">
          {loggedUser.name} logged in
          <button onClick={logoutButton}>logout</button>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
                  <BlogForm toggle={toggleVisibility} />
                </Togglable>
                <BlogList user={loggedUser} />
              </div>
            }
          />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
