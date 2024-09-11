import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
//import { addVote } from '../reducers/blogReducer'
import { newNotification } from '../reducers/notificationReducer'

const BlogList = ({ user }) => {
  //const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  // const vote = (blog) => {
  //   dispatch(addVote(blog))
  //   dispatch(newNotification(`You voted "${blog.content}"`, 10))
  // }

  return (
    <div className="bloglist">
      {blogs
        // .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            // updateLikes={addLike}
            // removeBlog={() => removeBlog(blog.id)}
            user={user}
          />
        ))}
    </div>
  )
}

export default BlogList
