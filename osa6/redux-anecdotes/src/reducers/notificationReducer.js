import { createSlice } from "@reduxjs/toolkit"

export const setNotification = (notification, seconds) => {
  return async dispatch => {
    dispatch(changeNotification(notification))

    setTimeout(() => {
      dispatch(changeNotification(''))
    }, seconds * 1000)
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    changeNotification(state, action) {
      const notification = action.payload
      return notification
    }
  }
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer