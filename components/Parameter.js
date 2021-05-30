import {
      Dimensions
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
export const { width, height } = Dimensions.get('window');
export const screen_width = width;
export const screen_height = height; 
import { Alert,ToastAndroid,ActivityIndicator,View } from 'react-native';
//import * as AWS from './rootkey';
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

//export const Server_URL='http://192.168.0.9/help_1';
// export const Server_URL='http://65.0.74.65/HelpOne';

//Gcp
//export const Image_URL='https://storage.googleapis.com/helpone-9bf33.appspot.com/User_Profile_Photo/';

//Aws
export const Image_URL='https://helpone.s3.ap-south-1.amazonaws.com/Profile/';
export const Ip_Address_URL='https://helpone.s3.ap-south-1.amazonaws.com/Ip_Address_Config/Ip_Address.txt';
export const AWS_Access_KeyId='AKIA2QEB3DC7UUSKOJZN';
//AWS.AWSAccessKeyId;//AWS.AWSSecretKey;
export const AWS_Secret_KeyId='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';
export const AWS_Bucket= "helpone";
export const AWS_Region= "ap-south-1";
// export let Server_URL='http://65.0.74.65/HelpOne';
export let Server_URL;
fetch(Ip_Address_URL,         
      )
      .then(res => res.text())
      .then(res => {
        console.log("[Parameter] Ip_Address");
        console.log(res);  
      //   Server_URL='http://65.0.74.65/HelpOne'
      //  dispatch(toggledata.toggleip_address(res.toString()));              
      Server_URL=res.toString();
        //console.log(res.data);    
      })
        .catch((error) => {
          console.error(error);
        });      
      
