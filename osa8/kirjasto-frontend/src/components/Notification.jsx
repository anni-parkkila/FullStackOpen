const Notification = ({ message }) => {
  if (!message) {
    return null
  } else if (
    message.includes('wrong credentials') ||
    message.includes('Saving new author failed') ||
    message.includes(
      'Variable "$published" got invalid value ""; Int cannot represent non-integer value: ""'
    )
  ) {
    return <div style={{ color: 'red' }}>{message}</div>
  } else {
    return <div style={{ color: 'green' }}>{message}</div>
  }
}

export default Notification
