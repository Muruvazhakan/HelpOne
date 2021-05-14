// import React, { useEffect } from 'react';
// import { View, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
// import { useTheme, Text, Switch,TouchableRipple } from 'react-native-paper';
// import { fcmService } from './FCMservice';
// import { localNotificationService } from './LocalNotificationService';
// import { styles as editprofilestyle } from '../Screens/ProfileScreen/EditProfileScreen';


// const FCM_Screen = (props) => {
//     const { colors } = useTheme();

//     useEffect(() => {
//         fcmService.registerAppWithFCM()
//         fcmService.register(onRegister, onNotification, onOpenNotification)
//         localNotificationService.configure(onOpenNotification)

//         function onRegister(token) {
//             console.log("[FCM screen] onRegister: ", token);
//         }

//         function onNotification(notify) {
//             console.log("[FCM screen] onNotification: ", notify);

//             const options = {
//                 soundName: 'default',
//                 playsound: true
//             }
//             localNotificationService.showNotification(
//                 0,
//                 notify.title,
//                 notify.body,
//                 notify,
//                 options
//             )
//         }

//         async function onOpenNotification(notify) {
//             console.log("[FCM screen] onOpenNotification: ", notify);
//             // Alert.alert("Notification: "+notify.body);
//             Alert.alert("Title :" + notify.title, 'Message: ' + notify.body, [
//                 { text: 'Okay' }
//             ]);
//         }

//         return () => {
//             console.log("[FCM screen] unRegister: ");
//             fcmService.unRegister()
//             localNotificationService.unregister()
//         }
//     }, [])

//     return (
//         null

//     )
// }

// export default FCM_Screen;

// export const FCM_Handle_message = (props) => {

//     const [data, setdata] = React.useState({
//         notification_state: true
//     });
//     const toggleNotification = () => {
//         console.log("[FCM screen] data.notification_state before", data.notification_state);
//         setdata({
//             ...setdata,
//             notification_state: !data.notification_state
//         });
//         if (data.notification_state) {
            
//             //localNotificationService.cancelAllLocalNotifications();
            
//         }
//         // console.log("[FCM screen] data.notification_state after", data.notification_state);

//     }

//     const handlemess = () =>{
//        let topic = 'highScores';

//      let  message = {
//         data: {
//             score: '850',
//             time: '2:45'
//         },
//         topic: topic
//     };

//         console.log("[FCM screen] handlemess ");
//         localNotificationService.messagesend(message);
//     }

//     return (
//         <View>
//             <TouchableRipple onPress={() => { toggleNotification() }}>
//                 <View style={[editprofilestyle.rowview,{margin:'2%',marginLeft:'5%'}]}>
//                     <Text>Message Notification</Text>
//                     <View pointerEvents="none">
//                         <Switch value={data.notification_state} />
//                     </View>
//                 </View>
//             </TouchableRipple>
//             <TouchableRipple onPress={() => { handlemess() }}>
//                 <Text>send a message</Text>
//             </TouchableRipple>
//         </View>
//     )
// }
