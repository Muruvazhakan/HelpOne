import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
// import * as admin from "firebase-admin";

const firebase_api_key = 'AAAAtX8FQLI:APA91bEhBLlFzyFCfcoQJw4BCeqiuCN8-oUf_1Vk2doZo155GweUiLixGv3zDBisX9qHtOm0lA06Qupq6phQbz3LSdNMaTtGUWTIKWBvRdUxpcZmGBYo-SOmzEELp4_6azumkupfuSpJ';
var city = 'Chennai';
let token = '';
class FCMservice {
    register = async (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister)
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    }


    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDevieForRemoteMessages();
            await messaging().setAutoInitEnabled(true)
        }

    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // let fcmToken = await AsyncStorage.getItem('fcmToken');

                    this.getToken(onRegister)


                } else {
                    this.requestPermission(onRegister)
                }
            }).catch(error => {
                console.log("[FCMService] Permission rejected " + error)
            })
    }
    getToken = async (onRegister) => {
        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken);

                    if (city != '') {
                        messaging()
                            .subscribeToTopic(city)
                            .then(() => {
                                console.log("[FCMService] subscribeToTopic: " + city);
                            })
                    }
                    // await AsyncStorage.setItem('fcmToken', fcmToken);
                    token: fcmToken;
                } else {
                    console.log("[FCMService] user does not have a device token ")
                }
            }).catch(error => {
                console.log("[FCMService] getToken rejected " + error)
            })


    }

    requestPermission = (onRegister) => {
        messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister)
            }).catch(error => {
                console.log("[FCMService] Permission rejected " + error)
            })
    }

    deleteToken = async () => {
        console.log("[FCMService] deleteToken ")
        messaging().deleteToken()
            .catch(error => {
                console.log("[FCMService] deleteToken error " + error)
            })
    };



    // async sendNotification(title, body) {
    //     const firebase_api_key = 'AAAAtX8FQLI:APA91bEhBLlFzyFCfcoQJw4BCeqiuCN8-oUf_1Vk2doZo155GweUiLixGv3zDBisX9qHtOm0lA06Qupq6phQbz3LSdNMaTtGUWTIKWBvRdUxpcZmGBYo-SOmzEELp4_6azumkupfuSpJ';
    //     const message = {
    //         registration_ids: token,
    //         notification: {
    //             title: title,
    //             body: body,
    //             'vibrate': 1,
    //             "sound": 1,
    //             "show_in_foreground": true,
    //             "priority": "high",
    //             "content_available": true,
    //         }

    //     }

    //     let headers = new Headers({
    //         "Content-type": "application/json",
    //         "Authorization": "key=" + firebase_api_key
    //     });

    //     let response = await fetch("https://fcm.googleapis.com/fcm/send", {
    //         method: "POST", headers, body: JSON.stringify(message)
    //     })
    //     response = await response.JSON();
    //     console.log(response);
    // }



      createNotificationListeners = async (onRegister, onNotification, onOpenNotification) => {
        messaging()
            .onNotificationOpenedApp(remoteMessage => {
                console.log("[FCMService] onNotificationOpenedApp caused app to open from background state: ", remoteMessage.notification);
                // navigation.navigate(remoteMessage.data.type);
                if (remoteMessage) {
                    const notification = remoteMessage.notification
                    onOpenNotification(notification)
                }

            });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                console.log(
                    '[FCMService] Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
                if (remoteMessage) {
                    const notification = remoteMessage.notification
                    onOpenNotification(notification)
                    //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                }
            }).catch((error) => {
                console.log("[FCMService] error " + error);
                //alert(error.message);
            });

        //Foreground state messages
        this.messageListener = messaging()
            .onMessage(async remoteMessage => {
                console.log('[FCMService] Foreground msg recived ', remoteMessage);

                if (remoteMessage) {
                    let notification = null;

                    if (Platform.OS === 'ios') {
                        notification = remoteMessage.data.notification
                    }
                    else {
                        notification = remoteMessage.notification
                    }
                    console.log(
                        '[FCMService] Foreground msg recived ', notification
                    );
                    onNotification(notification)
                    //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                }
            });

        messaging().onTokenRefresh(fcmToken => {
            try {
                console.log("[FCMService] new token referesh ", fcmToken);
                onRegister(fcmToken)
            }
            catch (err) {
                console.log('[FCMServicen] onRegister TOKEN: Error:', err);
            }
        })

    }


    unRegister = () => {
        this.messageListener()
    }



    // topic = 'highScores';

    // message = {
    //     data: {
    //         score: '850',
    //         time: '2:45'
    //     },
    //     topic: topic
    // };

    // Send a message to devices subscribed to the provided topic.
    // messagesend = (message) => {
    //     adminmessaging.send(message)
    //         .then((response) => {
    //             // Response is a message ID string.
    //             console.log('Successfully sent message:', response);
    //         })
    //         .catch((error) => {
    //             console.log('Error sending message:', error);
    //         });
    // }




}

export const fcmService = new FCMservice();