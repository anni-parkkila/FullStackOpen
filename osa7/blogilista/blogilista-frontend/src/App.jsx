import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch, Navigate, Link } from 'react-router-dom'

import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'
import UserList from './components/UserList'
import {
  initializeBlogs,
  likeBlog,
  commentBlog,
  removeBlog,
} from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setLoggedUser } from './reducers/loginReducer'
import { newNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import './index.css'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.loggedUser)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  console.log('app blogs', blogs)

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

  const addLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(
      newNotification(`You liked blog "${blog.title}" by ${blog.author}`, 5)
    )
  }

  const addComment = (blog, newComment) => {
    dispatch(commentBlog(blog, newComment))
    dispatch(
      newNotification(
        `Comment added to blog "${blog.title}" by ${blog.author}`,
        5
      )
    )
  }

  const deleteBlog = (blog) => {
    const id = blog.id
    const blogToRemove = blogs.find((b) => b.id === id)

    if (
      window.confirm(
        `Remove blog "${blogToRemove.title}" by ${blogToRemove.author}?`
      )
    ) {
      dispatch(removeBlog(blog))
      dispatch(newNotification(`Blog "${blogToRemove.title}" was removed`, 5))
    }
  }

  const toggleVisibility = () => blogFormRef.current.toggleVisibility()

  const matchUser = useMatch('/users/:id')
  const user = matchUser
    ? users.find((user) => user.id === String(matchUser.params.id))
    : null

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === String(matchBlog.params.id))
    : null

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
    <div>
      <div className="navBar">
        <Link style={{ padding: 5 }} to="/">
          Blogs
        </Link>
        <Link style={{ padding: 5, marginRight: 30 }} to="/users">
          Users
        </Link>
        {loggedUser.name} logged in
        <button style={{ marginLeft: 5 }} onClick={logoutButton}>
          logout
        </button>
      </div>

      <h1>Blog App</h1>
      <Notification />

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
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route
          path="/blogs/:id"
          element={
            //blog ? (
            <Blog
              blog={blog}
              updateLikes={addLike}
              updateComments={addComment}
              removeBlog={deleteBlog}
              user={loggedUser}
            />
            //) : (
            //<Navigate replace to="/" />
            //)
          }
        />
      </Routes>
    </div>
  )
}

export default App
