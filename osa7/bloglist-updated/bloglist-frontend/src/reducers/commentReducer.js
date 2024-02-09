import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentSlice = createSlice({
  name: 'comments',
  initialState: {},
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    appendComment(state, action) {
      state.push(action.payload)
    }
  },
})

export const initializeComments = (id) => {
  return async dispatch => {
    if (id) {
      const comments = await commentService.getComments(id)
      dispatch(setComments(comments))
    }
  }
}

export const handleAddComment = (id, comment) => {
  return async dispatch => {
    const newComment = await commentService.addComment(id, comment)
    dispatch(appendComment(newComment))
  }
}

export const { setComments, appendComment } = commentSlice.actions
export default commentSlice.reducer
