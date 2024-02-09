import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    voteBlog(state, action) {
      const votedBlog = action.payload
      const id = votedBlog.id
      return state.map(blog => (blog.id !== id ? blog : votedBlog))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const changedBlog = blog => {
  return async dispatch => {
    const changedBlog = {
      ...blog,
      votes: blog.votes,
    }
    const newBlog = await blogService.update(blog.id, changedBlog)
    dispatch(voteBlog(newBlog))
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export const { voteBlog, appendBlog, setBlogs, deleteBlog } = blogSlice.actions
export default blogSlice.reducer
