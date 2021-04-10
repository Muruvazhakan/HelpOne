import {
      Dimensions
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
const { width, height } = Dimensions.get('window');
export const screen_width = width;
export const screen_height = height; 
import { Alert,ToastAndroid,ActivityIndicator,View } from 'react-native';
// export const isOnline = () => {
//       NetInfo.fetch().then(state => {
//             console.log("Is connected?", state.isConnected);
//             console.log("Is NetInfoStateType?", state.NetInfoStateType);
//             if (state.isConnected.toString() === "false") {
//                   // Alert.alert("You are offline!");
//                   Alert.alert("Opps!", 'No Internet Please check your connection', [
//                         {
//                               text: 'Try Again',
//                               onPress:() => isOnline()                              
//                         }
//                   ]);
//                   return false;

//             } else {
//                   console.log("You are online!", state.isConnected);
//                   return true;
//             }

//       });
//       return false;
// }

export const checkConnectivity = () => {
      NetInfo.fetch().then(state => {
            console.log("Is connected? checkConnectivity ", state.isConnected);
            console.log("Is NetInfoStateType?checkConnectivity ", state.NetInfoStateType);
            if (state.isConnected.toString() === "false") {
                  // Alert.alert("You are offline!");                 
                  return false;

            } else {
                  console.log("checkConnectivity You are online!", state.isConnected);
                  return true;
            }

      });     
}

export const Server_URL='http://192.168.0.9/help_1';

export const Image_URL='https://storage.googleapis.com/helpone-9bf33.appspot.com/User_Profile_Photo/';
