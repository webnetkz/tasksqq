Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

function displayNotification(content,description, img) {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      if(!img) { img = '/public/img/logo.png'; }
      var options = {
        body: description,
        icon: img,
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      };
      reg.showNotification(content, options);
    });
  }
}