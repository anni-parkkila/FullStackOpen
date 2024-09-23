const Notification = ({ message }) => {
  if (!message) {
    return null
  } else if (message.includes('wrong credentials')) {
    return <div style={{ color: 'red' }}>{message}</div>
  } else {
    return <div style={{ color: 'green' }}>{message}</div>
  }
}

export default Notification
