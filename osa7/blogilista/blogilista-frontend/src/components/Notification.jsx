import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }
  if (notification.includes('ERROR')) {
    return (
      <Alert className="notification" variant="danger">
        {notification}
      </Alert>
    )
  } else {
    return (
      <Alert className="notification" variant="success">
        {notification}
      </Alert>
    )
  }
}

export default Notification
