import React, { useContext } from 'react';
import MainHeader from './MainHeader';
import Notification from '../UI/Notification';
import NotificationContext from '../../store/notificationContext';

function Layout({ children }) {
  const { notification, showNotification, hideNotification } = useContext(NotificationContext);

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {notification && (
        <Notification title={notification.title} message={notification.message} status={notification.status} />
      )}
    </>
  );
}

export default Layout;
