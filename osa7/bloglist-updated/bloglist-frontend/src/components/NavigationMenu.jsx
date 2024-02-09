import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutHandler } from '../reducers/loginReducer'
import {
  changeNotification,
  useNotificationDispatch,
} from '../reducers/notificationReducer'
import LoginForm from './LoginForm'
import { Button, Nav, Navbar } from 'react-bootstrap'

const NavigationMenu = ({ user }) => {
  const dispatch = useDispatch()
  const NotificationDispatch = useNotificationDispatch()
  const padding = {
    paddingRight: 5,
    float: 'left',
  }
  const handleLogout = () => {
    dispatch(logoutHandler()).then(
      NotificationDispatch(
        changeNotification({
          notification: 'logged out',
          isError: false,
        })
      )
    )
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/'>
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/users'>
              users
            </Link>
          </Nav.Link>
          {!user && (
            <>
              <LoginForm />
            </>
          )}
          {user && (
            <>
              <Navbar.Brand>
                {user.name} logged in <Button variant='primary' onClick={handleLogout}>logout</Button>
              </Navbar.Brand>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationMenu
