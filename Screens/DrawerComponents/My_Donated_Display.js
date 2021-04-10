import React, { useEffect }  from 'react';
import { View, Button, StyleSheet,SafeAreaView } from 'react-native';
import { useTheme,Text } from 'react-native-paper';
import {styles as ProfileScreenStyles} from '../ProfileScreen/ProfileScreen';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Zocial from 'react-native-vector-icons/Zocial';

const My_Blood_Donated_Screen = (props) => {
  const {colors} =useTheme();
        
    return (
      <ScrollView>
       
      <SafeAreaView style={[{paddingTop:'7%'}]} >
        <View style={[ProfileScreenStyles.cardview,{alignSelf:'stretch',fontSize:30,fontWeight:'bold'}]}>
        <Text style={[{alignSelf:'center',fontSize:30,fontWeight:'bold'}]} >Details</Text>
        </View>
        <View style={[ProfileScreenStyles.cardview,{margin:'10%',padding:'10%',marginTop:'5%'}]}>   
          <View style={[ProfileScreenStyles.row,{paddingBottom:'2%'}]}>
              <FontAwesome name="id-badge" color={colors.text} size={20} />  
              <Text style={{marginLeft:'5%'}}>Request Id: {props.route.params.bloodrequestid}</Text>
          </View> 
          <View style={[ProfileScreenStyles.row,{paddingBottom:'2%'}]}>
              {/* <Icon style={{color:'green'}} name="phone" color={colors.text} size={20}/> */}
              {/* <Text style={{color:colors.text, marginLeft: 20}}>{user_data_user_number}</Text> */}
              {/* <Text>{props.route.params.phoneNumber}</Text> */}
              <FontAwesome name="hospital-o" color={colors.text} size={20} />
              <Text style={{marginLeft:'3%'}}>Hospital Name: {props.route.params.hospital}</Text>
          </View>
          <View style={[ProfileScreenStyles.row,{paddingBottom:'2%'}]}>
              <Icon name="test-tube-empty" color={colors.text} size={20} />  
              <Text style={{marginLeft:'2%'}}>Required Type: {props.route.params.requesttype}</Text>
          </View> 
          <View style={[ProfileScreenStyles.row,{paddingBottom:'2%'}]}>
              <Fontisto name="blood-drop" color={colors.text} size={20} />
              <Text style={{marginLeft:'5%'}}>Blood Group: {props.route.params.bloodgroup}</Text>
          </View>
          <View style={[ProfileScreenStyles.row,{paddingBottom:'2%'}]}>
              <Icon name="blood-bag" color={colors.text} size={20} />  
              <Text style={{marginLeft:'3%'}}>Blood Unit: {props.route.params.noofunits}</Text>
          </View> 
          <View style={[ProfileScreenStyles.row,{paddingBottom:'2%'}]}>
              <FontAwesome name="user-o" color={colors.text} size={20} />  
              <Text style={{marginLeft:'5%'}}>Contact Name: {props.route.params.patientname}</Text>
          </View>   
          {props.route.params.replacement !==" " && props.route.params.replacement !==null && props.route.params.replacement !=="" ? 
          <View style={[ProfileScreenStyles.row,{paddingBottom:'2%'}]}>
              <FontAwesome name="refresh" color={colors.text} size={20} />  
              <Text style={{marginLeft:'5%'}}>Replacement: {props.route.params.replacement}</Text>
          </View>         
         :null}       
         <View style={[ProfileScreenStyles.row,{paddingBottom:'2%'}]}>
              <FontAwesome name="user-o" color={colors.text} size={20} />  
              <Text style={{marginLeft:'5%'}}>No of Donor Accepted: {props.route.params.noofdonoraccepted}</Text>
          </View>
          <View style={[ProfileScreenStyles.row,{paddingBottom:'2%'}]}>
              <FontAwesome name="address-book" color={colors.text} size={20} />  
              <Text style={{marginLeft:'5%'}}>Address: {props.route.params.address}</Text>
          </View> 
          <View style={[ProfileScreenStyles.row,{paddingBottom:'2%'}]}>
              <Icon name="map-marker-radius" color={colors.text} size={20} />  
              <Text style={{marginLeft:'5%'}}>Pincode: {props.route.params.pincode}</Text>
          </View> 
          <View style={[ProfileScreenStyles.row,{paddingBottom:'2%'}]}>
              <Zocial name="statusnet" color={colors.text} size={20} />  
              <Text style={{marginLeft:'5%'}}>status: {props.route.params.status}</Text>
          </View>                
        </View>
      </SafeAreaView>
      </ScrollView>
    
    );
};


export default My_Blood_Donated_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
