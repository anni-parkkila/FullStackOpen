import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    if (notification === null) {
        return null
    }
    if (notification.includes('ERROR')) {
        return <div className="error">{notification}</div>
    } else {
        return <div className="success">{notification}</div>
    }
}

export default Notification
