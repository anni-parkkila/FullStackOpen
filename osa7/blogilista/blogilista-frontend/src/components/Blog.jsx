const Blog = ({ blog, updateLikes, removeBlog, user }) => {
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

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog(blog)
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
    </div>
  )
}

export default Blog
