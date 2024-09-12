import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import { likeBlog } from '../reducers/blogReducer'
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

  return (
    <div className="bloglist">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={addLike}
          // removeBlog={() => removeBlog(blog.id)}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogList
