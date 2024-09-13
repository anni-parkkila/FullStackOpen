import { useState } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'

const Blog = ({ blog, updateLikes, updateComments, removeBlog, user }) => {
  const [newComment, setNewComment] = useState('')

  const addLike = (event) => {
    event.preventDefault()
    updateLikes({
      ...blog,
      user: blog.user.id,
    })
  }

  const addComment = (event) => {
    event.preventDefault()
    updateComments(blog, newComment)
    setNewComment('')
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }

  const cid = (max) => {
    return Math.floor(Math.random() * max)
  }

  if (!blog) return null

  return (
    <div className="blogStyle">
      <h2>
        {blog.title} by {blog.author}
      </h2>{' '}
      <br />
      Url: {blog.url}
      <br />
      Likes: {blog.likes}{' '}
      <Button variant="info" size="sm" className="likeButton" onClick={addLike}>
        like
      </Button>
      <br />
      Added by: {blog.user.name}
      <br />
      {user.username === blog.user.username && (
        <Button
          variant="danger"
          size="sm"
          className="removeButton"
          onClick={deleteBlog}
        >
          delete
        </Button>
      )}
      <div style={{ marginTop: 10 }}>
        <h3>Comments</h3>
        <Form onSubmit={addComment}>
          <Form.Group>
            <Form.Control
              name="comment"
              value={newComment}
              data-testid="comment"
              placeholder="comment"
              onChange={(event) => setNewComment(event.target.value)}
            />
            <Button
              className="likeButton"
              variant="info"
              size="sm"
              type="submit"
            >
              add comment
            </Button>
          </Form.Group>
        </Form>
        <ListGroup style={{ marginTop: 30 }}>
          {blog.comments.map((comment) => (
            <ListGroup.Item key={cid(10000)}>{comment}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  )
}

export default Blog
