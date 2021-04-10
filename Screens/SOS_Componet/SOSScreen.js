import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Image,Platform,Alert,TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableRipple, useTheme, Text } from 'react-native-paper';
import SendSMS from 'react-native-sms';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request} from 'react-native-permissions';
import { screen_width,screen_height } from '../../components/Parameter';
import {styles as MainScreenStyles} from '../../Main_Screen/MainScreen';
import {styles as Home_All_Donor_Styles} from '../Home_Screen/All_User_Donation_Bottom';
const CARD_WIDTH = screen_width * 0.1;
const SOSScreen = ({ navigation }) => {
  const num=100;
  const { colors } = useTheme();
  const user_data_user_number = useSelector(state =>
    state.helpone.user_number,
  );
  const user_data_user_name = useSelector(state =>
    state.helpone.user_name,
  );
  const user_data_sos_name1 = useSelector(state =>
    state.helpone.user_sos_name1,
  );
  const user_data_sos_name2 = useSelector(state =>
    state.helpone.user_sos_name2,
  );
  const user_data_sos_name3 = useSelector(state =>
    state.helpone.user_sos_name3,
  );

  const user_data_sos_name1_number = useSelector(state =>
    state.helpone.user_sos_name1_number,
  );
  const user_data_sos_name2_number = useSelector(state =>
    state.helpone.user_sos_name2_number,
  );
  const user_data_sos_name3_number = useSelector(state =>
    state.helpone.user_sos_name3_number,
  );
  useEffect(() => {
    // console.log('user_data_user_name sdf'+user_data_user_name);


  });
  const initialState = {
    markers: {
      latitude:28.7041,
      longitude:77.1025,
      latitudeDelta: 0.044,
      longitudeDelta: 0.0441,
      },
    location:false,
  };
  const [state, setState] = useState(initialState);
  var requestLocation= async () => {
    console.log("[SOSScreen] Inside the requestLocation");
    //this.requestLocation;
    if(Platform.OS === 'ios') {
      var response  = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('[SOSScreen] iphone' + response);
  
      if(response === 'granted'){
         locateCurrentPosition();
         
      }
  
    } else {
      var response  = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('[SOSScreen] android:' + response);
        
      if(response === 'granted'){       
        console.log("[SOSScreen] Inside the requestLocation android is granted");
        locateCurrentPosition();
      }
    }
  

  }
  
  var locateCurrentPosition =() =>{
  
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));        
        setState({  ...state,
          location:true,
          markers: position.coords,   
        });
        console.log("markers locateCurrentPosition: "+state.markers);
        sendSMSHandler();
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy:true, timeout:10000,maximumAge:1000}
      )
  
   }

   const sendSMSHandler=()=>{
     var smsbody= 'SOS Message from ' +
     (user_data_sos_name1 !== null?user_data_sos_name1+ 'number: '+(user_data_sos_name1_number !== null?user_data_sos_name1_number:null ):null ) +
      (user_data_sos_name2 !== null?user_data_sos_name2+ 'number: '+(user_data_sos_name2_number !== null?user_data_sos_name2_number:null ):null )+
      (user_data_sos_name3 !== null?user_data_sos_name3+ 'number: '+(user_data_sos_name3_number !== null?user_data_sos_name3_number:null ):null );

      var smsrecipient= (user_data_sos_name1_number !== null?user_data_sos_name1_number:null ) +
      (user_data_sos_name2_number !== null?user_data_sos_name2_number:null )+
      (user_data_sos_name3_number !== null?user_data_sos_name3_number:null );
      
    SendSMS.send({
      body: 'SOS Message from '+user_data_user_name+'number: '+user_data_user_number,
      recipients: smsrecipient,
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true,
      // attachment: attachment
  }, (completed, cancelled, error) => {

      console.log('SOS Message from your Friend : completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

  });
   }

  const handleSOSPress = ()=>{
    console.log('[SOSScreen] handleSOSPress 3'+user_data_sos_name1+user_data_sos_name1_number);
    //requestLocation();
    if(user_data_sos_name1 !== null && user_data_sos_name1_number!==null )
    {
      
      //requestLocation();
    console.log('[SOSScreen] requestLocation');
    }
    else{
      navigation.navigate('SOSScreen');     
      console.log('[SOSScreen] requestLocation');
    }
    
    
  }
  return (
    <View style={[MainScreenStyles.categoryBtn,{ paddingTop:'50%'}]} >
      <View >
       <TouchableOpacity onPress={() => handleSOSPress()}>
        
      <Image
        source={require('../../assets/sos.png')}        
        style={[MainScreenStyles.categoryIcon,
        {
          height:CARD_WIDTH, width: CARD_WIDTH,
          // borderColor: 'green', borderWidth: 1
        }]}
        
        />
          
        </TouchableOpacity>
        </View>
    </View>
  );
};


export default SOSScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
