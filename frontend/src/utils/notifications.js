// src/utils/notifications.js
export const showSuccessNotification = (message) => {
    if (window.UIkit) {
      window.UIkit.notification({
        message,
        status: 'success',
        pos: 'top-center',
        timeout: 2000,
      });
    } else {
      console.error("UIkit no está cargado");
    }
  };