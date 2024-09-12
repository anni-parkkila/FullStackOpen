import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import Blog from './Blog'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { newNotification } from '../reducers/notificationReducer'

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div className="bloglist">
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
