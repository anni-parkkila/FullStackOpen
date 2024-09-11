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

// export const addVote = (blog) => {
//   return async (dispatch) => {
//     const id = blog.id
//     const newBlog = {
//       ...blog,
//       votes: blog.votes + 1,
//     }
//     const changedBlog = await blogService.update(id, newBlog)
//     const updatedBlogs = await blogService.getAll()
//     dispatch(
//       setBlogs(
//         updatedBlogs
//           .map((blog) => (blog.id !== id ? blog : changedBlog))
//           .sort((a, b) => b.likes - a.likes)
//       )
//     )
//   }
// }

export default blogSlice.reducer
