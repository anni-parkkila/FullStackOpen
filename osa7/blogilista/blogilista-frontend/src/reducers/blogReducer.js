import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const id = blog.id
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const changedBlog = await blogService.update(id, newBlog)
    const updatedBlogs = await blogService.getAll()
    dispatch(
      setBlogs(
        updatedBlogs
          .map((blog) => (blog.id !== id ? blog : changedBlog))
          .sort((a, b) => b.likes - a.likes)
      )
    )
  }
}

export const commentBlog = (blog, newComment) => {
  console.log('redu blog', blog)
  console.log('new', newComment)
  return async (dispatch) => {
    const id = blog.id
    console.log('id', id)
    //   const newBlog = {
    //     ...blog,
    //     likes: blog.likes + 1,
    //   }
    //   const changedBlog = await blogService.update(id, newBlog)
    //   const updatedBlogs = await blogService.getAll()
    //   dispatch(
    //     setBlogs(
    //       updatedBlogs
    //         .map((blog) => (blog.id !== id ? blog : changedBlog))
    //         .sort((a, b) => b.likes - a.likes)
    //     )
    //   )
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    const id = blog.id
    await blogService.remove(id)
    const updatedBlogs = await blogService.getAll()
    dispatch(
      setBlogs(
        updatedBlogs
          .map((b) => (b.id !== id ? b : changedBlog))
          .sort((a, b) => b.likes - a.likes)
      )
    )
  }
}

export default blogSlice.reducer
