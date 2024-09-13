import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div className="bloglist">
      <h2>{user.name}</h2>
      <h3 style={{ marginTop: 20 }}>Added blogs</h3>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
