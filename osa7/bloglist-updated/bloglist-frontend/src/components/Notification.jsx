import { useEffect } from 'react'
import {
  useNotificationDispatch,
  useNotificationValue,
  changeNotification,
} from '../reducers/notificationReducer'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notificationInfo = useNotificationValue()
  const notification = notificationInfo.notification
  const isError = notificationInfo.isError
  const NotificationDispatch = useNotificationDispatch()

  useEffect(() => {
    setTimeout(() => {
      NotificationDispatch(
        changeNotification({ notification: '', isError: false })
      )
    }, 5000)
  }, [notification])

  if (!notification) return null

  return (
    <>
      {notification && isError && <Alert variant='danger'>{notification}</Alert>}
      {notification && !isError && (
        <Alert variant='success'>{notification}</Alert>
      )}
    </>
  )
}

export default Notification
