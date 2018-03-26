import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';

const configure = () => {
 PushNotification.configure({

   onRegister: function(token) {
     //process token
   },

   onNotification: function(notification) {
     // process the notification
     // required on iOS only
     notification.finish(PushNotificationIOS.FetchResult.NoData);
   },

   permissions: {
     alert: true,
     badge: true,
     sound: true
   },

   popInitialNotification: true,
   requestPermissions: true,

 });
};

const localNotification = (data) => {
 PushNotification.localNotification({
   autoCancel: true,
   largeIcon: "ic_launcher",
   smallIcon: "ic_notification",
   bigText: data.description,
   subText: data.reminderType,
   color: "green",
   vibrate: true,
   vibration: 300,
   title: "RemindMe",
   message: data.reminderTitle,
   playSound: true,
   soundName: 'default',
 });
};

export {
 configure,
 localNotification,
};