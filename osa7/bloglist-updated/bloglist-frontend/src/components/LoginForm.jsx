import { useDispatch } from 'react-redux'
import {
  changeNotification,
  useNotificationDispatch,
} from '../reducers/notificationReducer.jsx'
import { loginHandler } from '../reducers/loginReducer.js'
import { useState } from 'react'

import { Table, Button, Form, Row, Col } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const NotificationDispatch = useNotificationDispatch()

  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()

    dispatch(loginHandler(username, password))
      .then(() =>
        NotificationDispatch(
          changeNotification({
            notification: `logged in as ${username}`,
            isError: false,
          })
        )
      )
      .catch(() =>
        NotificationDispatch(
          changeNotification({
            notification: 'wrong username or password',
            isError: true,
          })
        )
      )

    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Row>
          <Col>
            <Form.Control
              placeholder='username'
              type="text"
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder='password'
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Col>
          <Col>
            <Button id='loginButton' type='submit'>
              login
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default LoginForm
