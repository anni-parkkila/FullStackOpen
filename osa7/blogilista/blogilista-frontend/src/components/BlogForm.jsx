import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { newNotification } from '../reducers/notificationReducer'

const BlogForm = ({ toggle }) => {
  const dispatch = useDispatch()
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    toggle()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    dispatch(createBlog(blogObject))
    dispatch(
      newNotification(
        `"${blogObject.title}" by ${blogObject.author} was added to list`,
        5
      )
    )
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    // .catch((error) => {
    //   dispatch(
    //     newNotification(
    //       'ERROR: all fields must be filled in and be min. 3 characters long',
    //       5
    //     )
    //   )
    // })
  }

  return (
    <div>
      <h3>Add a new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          <div>
            Title:{' '}
            <input
              name="title"
              value={newTitle}
              data-testid="title"
              placeholder="blog title"
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </div>
          <div>
            Author:{' '}
            <input
              name="author"
              value={newAuthor}
              data-testid="author"
              placeholder="blog author"
              onChange={(event) => setNewAuthor(event.target.value)}
            />
          </div>
          <div>
            Url:{' '}
            <input
              name="url"
              value={newUrl}
              data-testid="url"
              placeholder="blog url"
              onChange={(event) => setNewUrl(event.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
