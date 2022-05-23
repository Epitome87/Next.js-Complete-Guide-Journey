import { useContext, useEffect } from 'react';
import NotificationContext from '../../store/notificationContext';
import classes from './Notification.module.css';

function Notification(props) {
  const { hideNotification, notification } = useContext(NotificationContext);
  const { title, message, status } = props;

  useEffect(() => {
    if (notification && (notification.status === 'success' || notification.status === 'error')) {
      const timeout = setTimeout(() => {
        hideNotification();

        return () => {
          clearTimeout(timeout);
        };
      }, 3000);
    }
  }, [notification]);

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
