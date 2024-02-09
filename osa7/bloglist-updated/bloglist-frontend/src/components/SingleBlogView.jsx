import { useDispatch } from 'react-redux'
import {
  changeNotification,
  useNotificationDispatch,
} from '../reducers/notificationReducer'
import { changedBlog, removeBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import { handleAddComment } from '../reducers/commentReducer'
import { Button, Col, Form, ListGroup, Row, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SingleBlogView = ({ blog, user, comments }) => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const NotificationDispatch = useNotificationDispatch()
  const navigate = useNavigate()

  if (!blog) return null

  const handleLike = event => {
    event.preventDefault()
    const newBlog = { ...blog, user: blog.user.id }
    newBlog.likes += 1
    dispatch(changedBlog(newBlog))
    NotificationDispatch(
      changeNotification({
        notification: `${newBlog.title} liked`,
        isError: false,
      })
    )
  }

  const handleRemove = event => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
        .then(() => {
          NotificationDispatch(
            changeNotification({ notification: 'blog deleted', isError: false })
          )
          navigate('/')
        }
        )
        .catch(() =>
          NotificationDispatch(
            changeNotification({
              notification: "You don't have permission to delete this blog",
              isError: false,
            })
          )
        )
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(handleAddComment(blog.id, input))
    setInput('')
  }

  return (
    <div>
      <div>
        <h2>{blog.title}</h2>
        {blog.likes} likes <Button variant='success' onClick={handleLike}>like</Button>
      </div>
      <p>read more at <a href={blog.url}>{blog.url}</a></p>
      <p>posted by {blog.user.name}</p>
      {user && user.username === blog.user.username && (
        <Button variant='danger' onClick={handleRemove}>
          remove
        </Button>
      )}

      <h3>Comments</h3>
      <Form onSubmit={addComment}>
        <Row className='mb-1'>
          <Col>
            <Form.Control
              id='text'
              type='text'
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </Col>
          <Col><Button type='submit' variant='outline-success'>add comment</Button></Col>

        </Row>
      </Form>

      {comments.length > 0 && (
        <ListGroup>
          {comments.map(comment => (
            <ListGroup.Item key={comment.id}>
              {comment.content}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {comments.length === 0 && (
        <p>no comments</p>
      )}
    </div>
  )
}

export default SingleBlogView
