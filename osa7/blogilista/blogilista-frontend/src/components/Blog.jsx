import { useState } from 'react'

const Blog = ({ blog, updateLikes, updateComments, removeBlog, user }) => {
  const [newComment, setNewComment] = useState('')

  const blogStyle = {
    marginLeft: 5,
    maxWidth: 500,
  }

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
    <div style={blogStyle}>
      <h2>
        {blog.title} by {blog.author}
      </h2>{' '}
      <br />
      Url: {blog.url}
      <br />
      Likes: {blog.likes}{' '}
      <button className="likeButton" onClick={addLike}>
        like
      </button>
      <br />
      Added by: {blog.user.name}
      <br />
      {user.username === blog.user.username && (
        <button className="removeButton" onClick={deleteBlog}>
          delete
        </button>
      )}
      <div style={{ marginTop: 10 }}>
        <h3>Comments</h3>
        <form onSubmit={addComment}>
          <input
            name="comment"
            value={newComment}
            data-testid="comment"
            placeholder="comment"
            onChange={(event) => setNewComment(event.target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={cid(1000)}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
