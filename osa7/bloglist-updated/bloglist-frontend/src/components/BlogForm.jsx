import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import {
  useNotificationDispatch,
  changeNotification,
} from '../reducers/notificationReducer'
import { Button, Col, Form, Row } from 'react-bootstrap'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const NotificationDispatch = useNotificationDispatch()
  const dispatch = useDispatch()

  const addBlog = event => {
    event.preventDefault()

    const blog = { title, author, url }
    dispatch(createBlog(blog))
    NotificationDispatch(
      changeNotification({
        notification: `a new blog ${blog.title} by ${blog.author}`,
        isError: false,
      })
    )
    blogFormRef.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='formDiv'>
      <h2>Create a new blog</h2>

      <Form onSubmit={addBlog}>
        <Form.Group as={Row} className='mb-1'>
          <Form.Label column sm='1'>Title</Form.Label>
          <Col>
            <Form.Control
              type='text'
              onChange={event => setTitle(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-1'>
          <Form.Label column sm='1'>Author</Form.Label>
          <Col>
            <Form.Control
              type='text'
              onChange={event => setAuthor(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-1'>
          <Form.Label column sm='1'>Url</Form.Label>
          <Col>
            <Form.Control
              type='text'
              onChange={event => setUrl(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Button variant='outline-success' id='submitBlogButton' type='submit'>
          save
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
