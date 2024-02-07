import { createSlice } from "@reduxjs/toolkit"

export const setNotification = (notification, isError) => {
  return async dispatch => {
    console.log("in setNotification", notification)
    dispatch(changeNotification({ notification, isError }))

    setTimeout(() => {
      dispatch(changeNotification('', isError))
    }, 5000)
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    changeNotification(state, action) {
      const notification = action.payload
      console.log(notification)
      return notification
    }
  }
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer