import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { NotificationContextProvider } from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import blogReducer, { setBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'
import userReducer from './reducers/userReducer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import commentReducer from './reducers/commentReducer'

const queryClient = new QueryClient()

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    login: loginReducer,
    users: userReducer,
    comments: commentReducer,
  },
})

blogService.getAll().then(blogs => {
  store.dispatch(setBlogs(blogs))
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
