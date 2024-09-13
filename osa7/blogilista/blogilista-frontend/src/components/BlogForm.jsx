import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
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
  }

  return (
    <div style={{ marginTop: 20, maxWidth: 400 }}>
      <h3>Add a new blog</h3>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            name="title"
            value={newTitle}
            data-testid="title"
            placeholder="blog title"
            onChange={(event) => setNewTitle(event.target.value)}
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            name="author"
            value={newAuthor}
            data-testid="author"
            placeholder="blog author"
            onChange={(event) => setNewAuthor(event.target.value)}
          />
          <Form.Label>Url:</Form.Label>
          <Form.Control
            name="url"
            value={newUrl}
            data-testid="url"
            placeholder="blog url"
            onChange={(event) => setNewUrl(event.target.value)}
          />
          <Button style={{ marginTop: 5 }} type="submit">
            add
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
