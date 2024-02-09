import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeComments } from './reducers/commentReducer'

import NavigationMenu from './components/NavigationMenu'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import SingleBlogView from './components/SingleBlogView'
import AllUsersViews from './components/AllUsers'
import SingleUserView from './components/SingleUserView'


const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => [...state.users])
  const blogs = useSelector(state => [...state.blogs])
  const user = useSelector(state => (state.login ? state.login : null))

  const matchUser = useMatch('users/:id')
  const selectedUser = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('blogs/:id')
  const selectedBlog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  useEffect(() => {
    if (selectedBlog) {
      dispatch(initializeComments(selectedBlog.id))
    }
  }, [dispatch, selectedBlog])

  const comments = useSelector(state => state.comments ? state.comments : null)

  const blogForm = () => (
    <>
      <Togglable buttonLabel='Create a new blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
    </>
  )

  const MainView = () => {
    return (
      <div>
        {user && blogForm()}
        <BlogList blogs={blogs} user={user} />
      </div>
    )
  }

  return (
    <div className="container">
      <NavigationMenu user={user} />
      <Notification />
      <Routes>
        <Route path='/' element={<MainView />} />
        <Route
          path='/blogs/:id'
          element={<SingleBlogView blog={selectedBlog} user={user} comments={comments} />}
        />
        <Route path='/users' element={<AllUsersViews users={users} />} />
        <Route
          path='/users/:id'
          element={<SingleUserView user={selectedUser} />}
        />
      </Routes>
    </div>
  )
}

export default App