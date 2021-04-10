import PushNotification from "react-native-push-notification";
import * as React from 'react';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
class LocalNotificationService extends React.Component {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    
    configure = (onOpenNotification) => {
       // let { navigation } = this.props;
        
        try {

            PushNotification.configure({
                // (optional) Called when Token is generated (iOS and Android)
                try: {


                    onRegister: function (token) {
                        console.log("[Local Notification] onRegister TOKEN:", token);

                    }
                },
                catch(err) {
                    console.log('[Local Notification] onRegister TOKEN: Error:', err);
                },

                // (required) Called when a remote is received or opened, or local notification is opened
                onNotification: function (notification) {
                    console.log("[Local Notification] NOTIFICATION:", notification);
                    console.log("[Local Notification] NOTIFICATION: message ", notification.data);
                    try {

                        if (!notification?.data) {
                            return
                        }
                        // process the notification
                        notification.userInteraction = true;
                        //onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data);
                        // (required) Called when a remote is received or opened, or local notification is opened
                        if (Platform.OS === 'ios') {
                            notification.finish(PushNotificationIOS.FetchResult.NoData);
                        }
                        else{
                            notification.finish(PushNotification.FetchResult.NoData);
                        }


                    } catch (err) {
                        console.log('[Local Notification] onNotification Error:', err);
                    }
                    //navigation.navigate('Home');
                    
                },

                permissions: {
                    alert: true,
                    badge: true,
                    sound: true
                },

                // (optional) Called when Registered dAction is pressed and invokeApp is false, if true onNotification will be called (Android)
                onAction: function (notification) {
                    console.log("ACTION:", notification.action);
                    console.log("NOTIFICATION:", notification);

                    // process the action
                },

                // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
                onRegistrationError: function (err) {
                    console.log("onRegistrationError: ", err);
                    console.error(err.message, err);
                },

                // IOS ONLY (optional): default: all - Permissions to register.

                // Should the initial notification be popped automatically
                // default: true
                popInitialNotification: true,

                /**
                 * (optional) default: true
                 * - Specified if permissions (ios) and token (android and ios) will requested or not,
                 * - if not, you must call PushNotificationsHandler.requestPermissions() later
                 * - if you are not using remote notification or do not have Firebase installed, use this:
                 *     requestPermissions: Platform.OS === 'ios'
                 */
                requestPermissions: true,
            });
        }
        catch (err) {
            console.log('[Local Notification] configure Error:', err);
        }
    }



    unregister = () => {
        PushNotification.unregister()
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({

            ...this.buildAndroidNotification(id, title, message, data, options),
            ...this.buildIOSNotification(id, title, message, data, options),
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false
        });
    }

    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
            //largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
            smallIcon: options.smallIcon || "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
            bigText: message || '', // (optional) default: "message" prop
            subText: "This is a subText", // (optional) default: none
            //bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
            color: "red", // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            //tag: "some_tag", // (optional) add tag to message
            //group: "group", // (optional) add group to message
            priority: options.priority || "high",
            importance: options.importance || "high",
            data: data,
        }
    }

    buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || 'view',
            category: options.category || "",
            userInfo: {
                id: id,
                item: data
            }
        }
    }

    cancelAllLocalNotifications = () => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
            PushNotification.cancelLocalNotifications();
        }
    }

    removeAllDeliveredNotificationByID = (notificationId) => {
        console.log("[local] removeAllDeliveredNotificationByID :  ", notificationId);
        PushNotification.cancelLocalNotifications({ id: '$(notificationId)' });
    }
}

export const localNotificationService = new LocalNotificationService();