import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const InputForm = ({ title, value, handleChange }) => {
  return (
    <>
      <label for={title} >{title}</label>
      <input
        id={title}
        type='text'
        value={value}
        onChange={handleChange}
      /><br />
    </>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setMessageHandler = (message, errorBoolean) => {
    setError(errorBoolean)
    setMessage(message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  const handleTitleChange = ({ target }) => {
    setTitle(target.value)
  }

  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value)
  }
 
  const handleUrlChange = ({ target }) => {
    setUrl(target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setMessageHandler(`logged in as ${username}`, false)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setMessage(exception.response.data.error)
      setMessageHandler("wrong username or password", true)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setMessageHandler(`logged out`, false)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title,
      author,
      url
    }
    
    blogService
      .create(blogObject)
      .then(returnedBlogs => {
        setBlogs(blogs.concat(returnedBlogs))
      })
      .then(setMessageHandler(`a new blog ${title} by ${author}`))
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <InputForm title="title" value={title} handleChange={handleTitleChange}/>
      <InputForm title="author" value={author} handleChange={handleAuthorChange}/>
      <InputForm title="url" value={url} handleChange={handleUrlChange}/>      
      
      <button type="submit">save</button>
    </form>
  )

  const errorNotification = () => {
    return (
      <div>
        {error && <div className='error'>
            {message}
          </div>
        }
        {!error && <div className='success'>
            {message}
          </div>
        }
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      {message && errorNotification(error)}
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        {blogForm()}

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }
    </div>
  )
}

export default App