import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: '',
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    logout(state, action) {
      return ''
    },
  },
})

export const loginHandler = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    dispatch(setUser(user))
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
  }
}

export const logoutHandler = () => {
  return async dispatch => {
    dispatch(logout())
    window.localStorage.removeItem('loggedBlogappUser')
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const { setUser, logout } = loginSlice.actions
export default loginSlice.reducer
