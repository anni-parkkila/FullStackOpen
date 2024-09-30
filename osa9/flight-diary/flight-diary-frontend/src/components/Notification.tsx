interface NotificationProps {
  message: string;
}

const Notification = (props: NotificationProps) => {
  const style = {
    color: "red",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return props.message && <div style={style}>{props.message}</div>;
};

export default Notification;
