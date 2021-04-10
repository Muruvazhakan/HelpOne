/**
 * @format
 */
import 'react-native-gesture-handler'; 
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//var admin = require("firebase-admin");

var serviceAccount = require("./components/helpone-9bf33-firebase-adminsdk-x1m1w-df2ad71cf3.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://helpone-9bf33.firebaseio.com"
// });

var message = {
    notification:{
        title: 'title',
        body: 'body'
    },
    data: {
        title: 'title',
        body: 'body'
    },
    android:{
        notification:{
            sound:'default',
        }
    },
    apns:{
        payload:{
            aps:{
                sound:'default',
            }
        }
    },

    token:''
    
  };
//   admin.messaging().send(message)
//     .then((response) => {
//         // Response is a message ID string.
//         console.log('Successfully sent message:', response);
//     })
//     .catch((error) => {
//         console.log('Error sending message:', error);
//     });

AppRegistry.registerComponent(appName, () => App);

