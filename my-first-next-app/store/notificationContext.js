import React, { createContext, useState } from 'react';

const initialState = {
  notification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
};

const NotificationContext = createContext(initialState);

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  function handleShowNotification(notificationData) {
    setActiveNotification(notificationData);
  }

  function handleHideNotification() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: handleShowNotification,
    hideNotification: handleHideNotification,
  };

  return <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>;
}

export default NotificationContext;
