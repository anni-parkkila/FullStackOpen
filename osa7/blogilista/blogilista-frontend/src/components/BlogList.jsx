import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { newNotification } from '../reducers/notificationReducer'

const BlogList = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const addLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(
      newNotification(`You liked blog "${blog.title}" by ${blog.author}`, 5)
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

  return (
    <div className="bloglist">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={addLike}
          removeBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogList
