import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <ListGroup as="ol" numbered className="bloglist">
      {blogs.map((blog) => (
        <ListGroup.Item as="li" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default BlogList
