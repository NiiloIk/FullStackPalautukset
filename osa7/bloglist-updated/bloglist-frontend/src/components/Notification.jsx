import { useSelector } from "react-redux"

const Notification = () => {

  const notificationInfo = useSelector(({ notification}) => {
    return notification
  })

  const notification = notificationInfo.notification
  const isError = notificationInfo.isError

  console.log("In notification", notificationInfo)
  if (!notification) return null

  return (
    <>
      {notification && isError &&
        <div className='error'>
          {notification}
        </div>
      }
      {notification && !isError &&
        <div className='success'>
          {notification}
        </div>
      }
    </>
  )
}

export default Notification