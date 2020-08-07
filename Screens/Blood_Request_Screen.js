import React,{useState} from 'react';
import { View,  Button, StyleSheet,Switch,TextInput,TouchableOpacity } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,useTheme
} from 'react-native-paper';
import {RadioButton} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import { Value } from 'react-native-reanimated';
//import { useTheme } from 'react-native-paper';
// import  GooglePlacesInput  from "./Map_Component/places-autocomplete";

// import Placesearch from 'react-native-placesearch';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {styles as profilestyle} from './ProfileScreen/ProfileScreen';
import {styles as Editprofilestyle} from './ProfileScreen/EditProfileScreen';
import {connect,useSelector,useDispatch,useCallback} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {styles as signupstyles} from './SignUpScreen';

const Blood_Request_Screen = ({navigation}) => {

  const user_data_user_latitude=useSelector(state =>
    state.helpone.user_latitude
    );
  
  const user_data_user_longitude=useSelector(state =>
    state.helpone.user_longitude
    );  
  
  const user_data_user_address_line1=useSelector(state =>
    state.helpone.user_address_line1
    );
    
  const user_data_user_city=useSelector(state =>
    state.helpone.user_city
    );
    
  const user_data_user_area=useSelector(state =>
    state.helpone.user_area
    );
  
  const user_data_user_state_name=useSelector(state =>
    state.helpone.user_state_name
    );
  
  const user_data_user_pincode=useSelector(state =>
    state.helpone.user_pincode
    );


  const {colors} =useTheme();

  const initialBloodRequest ={
     selectedBloodGroup:null,
     otherBloodGroup:null,
     loactionAddress:{
      address:' test address',
      city:'test city',
      area:' test area',
      statename:'test state ',
      latitude: 37.425998333,
      longitude:  -110.125100000,
      },
    user_name:'sad',
    user_number:'9898',
  }

 const loactionAddress={
    address:' test address',
    city:'test city',
    area:' test area',
    statename:'test state ',
    latitude: 37.425998333,
    longitude:  -110.125100000,
    }

  const [state,setState] = useState(initialBloodRequest); 
  const [isRequiredTypes, setisRequiredTypes] = useState({ Required: "Blood" });
  const [isReplacementAvailables, setisReplacementAvailables] = useState({ Replacement: "Yes" });
 
  const otherBloodHandler =(val)=>
  {
    console.log("val  "+val);
    if(state.selectedBloodGroup ==="Other"){
      setState({...state,
        otherBloodGroup:val,
      })
    }       
  }

  const submitHandle =() =>{
    console.log("submit state.otherBloodGroups  "+state.otherBloodGroup);
    console.log("submit isRequiredTypes  "+isRequiredTypes);
    console.log("submit isReplacementAvailables  "+isReplacementAvailables);
    console.log("user_data_user_address_line1  "+user_data_user_address_line1);
  }
 
let screenname="Blood_Request_Screen";

    return (
      <ScrollView>
      <View style={styles.container}>
        
        <View style={styles.cardview} >
          <RadioButton.Group
           key="Required" 
           onValueChange={value=> setisRequiredTypes(value)
          }
           value={isRequiredTypes}
           
           >
          <Text style={styles.title}>Required Type</Text>
          <View style={[styles.radioButtonstyle,styles.content]}>      
            <Text>Blood</Text>
            <RadioButton 
              value="Blood"
              
              // status={isRequiredTypes === 'Blood' ? 'checked' : 'unchecked' }
              //checked={state.isRequiredType === 'Blood'}              
              // onPress={() => setState({isRequiredType:'Blood'})}
            />
        
            <Text>Platelets</Text>
            
            <RadioButton
              value="Platelets"
              // status={ state.isRequiredType === 'Platelets' ? 'checked' : 'unchecked' }
              //checked={state.isRequiredType === 'Platelets'}
              // onPress={() => setState({isRequiredTypes:'Platelets'},              
              
              // )}
            />
          </View>
          </RadioButton.Group>
        </View>

        <View style={styles.cardview}>
        <RadioButton.Group key="Replacement" onValueChange={value=> setisReplacementAvailables(value)} value={isReplacementAvailables}  >
          <Text style={styles.title}> Replacement Available</Text>
          <View style={[styles.radioButtonstyle,styles.content]}>
            
            <Text style={styles.content}>Yes</Text>
            <RadioButton 
              value="Yes"
              // status={ isReplacementAvailables === 'Yes' ? 'checked' : 'unchecked' }
              // onPress={() => setisReplacementAvailables({isReplacementAvailables:'Yes'})}              
            />
            <Text style={styles.content}>No</Text>
            <RadioButton 
              value="No"
              // status={ isReplacementAvailables === 'No' ? 'checked' : 'unchecked' }
              // onPress={() => setisReplacementAvailables({isReplacementAvailables:'No'})}
            />
          </View>
        </RadioButton.Group>       
        </View>
        
        {isRequiredTypes ==='Blood' ?
        <View style={styles.cardview}>
            <Text style={styles.title}>Blood Group</Text>
            <View style={styles.content} >
            <Picker 
              selectedValue={state.selectedBloodGroup}
              style={{ height: 50, width: 150,color:colors.text,}}
              onValueChange={(itemValue, itemIndex) => setState({selectedBloodGroup:itemValue})
              }>
                <Picker.Item label="A+" value="A+" />
                <Picker.Item label="A-" value="A-" />
                <Picker.Item label="B+" value="B+" />
                <Picker.Item label="B-" value="B-" />
                <Picker.Item label="A1+" value="A1+" />
                <Picker.Item label="A1-" value="A1-" />
                <Picker.Item label="A2-" value="A2-" />
                <Picker.Item label="A2+" value="A2+" />
                <Picker.Item label="AB+" value="AB+" />
                <Picker.Item label="AB-" value="AB-" />  
                <Picker.Item label="A1B+" value="A1B+" /> 
                <Picker.Item label="A1B-" value="A1B-" />
                <Picker.Item label="A2B+" value="A2B+" /> 
                <Picker.Item label="A2B-" value="A2B-" />             
                <Picker.Item label="O+" value="O+" />
                <Picker.Item label="O-" value="O-" />
                <Picker.Item label="INRA" value="INRA" />
                <Picker.Item label="Other" value="Other" />
            
            </Picker>
         </View>
          {state.selectedBloodGroup ==="Other" ?
          <TextInput
          style={[styles.textInput,
            {color:colors.text}
          ]}
          onChangeText={(val)=>otherBloodHandler(val)}
          placeholder="Enter Blood Group"></TextInput>
          :null}
        </View>
        :null}
 
      <View style={styles.cardview}> 
                {/* <GooglePlacesAutocomplete
              placeholder='Search'
              minLength={2}
              autoFocus={true}
              fetchDetails={true}
              nearbyPlacesAPI='GooglePlacesSearch'
              renderDescription={row => row.description}
              listViewDisplayed={false}
              returnKeyType={'search'}
              debounce={200}
              onPress={(data, details = null) => {
                console.log("run");
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}
              query={{
                key: 'AIzaSyDGe5vjL8wBmilLzoJ0jNIwe9SAuH2xS_0',
                language: 'en',
              }}
              
              // currentLocation={true}
              // currentLocationLabel='Current location'
            
            /> */}
   
    
    
        <View>
          <Text style={styles.title}>Address</Text>
          <View style={[Editprofilestyle.cardview,]}>
            <View style={[Editprofilestyle.rowview,{alignItems:'center',padding:'4%',marginTop:0,}]}>
              <Text style={[styles.textSign,{color:"#009387",marginLeft:'3%'}]}>Get your Location</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('GetLocationmap',{loactionAddress},{screenname})}
                      style={[styles.buttonSign,]}
                      activeOpacity = { .55 }   
                      >
                <Entypo style={[Editprofilestyle.editicon,{marginLeft:'40%'}]} name="location-pin" color={colors.text} size={30} />
                
              </TouchableOpacity>  
            </View> 
            
          </View>
          {(user_data_user_address_line1 !=='' || user_data_user_address_line1 !==null) ?
          <View >
            <View style={signupstyles.action}>
              <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} />
                <TextInput >{user_data_user_address_line1}</TextInput> 
            </View>
              {/* <Text>{user_data_user_area}</Text> 
              <Text>{user_data_user_city}</Text> */}
              <Text>{user_data_user_longitude}</Text> 
              <Text>{user_data_user_latitude}</Text> 
          </View>
          :null  
        }         
        </View>      
      </View>
     
       
        
    <View style={[,styles.cardview,]}>        
      <Text style={styles.title}>Contact details</Text>
      <View style={Editprofilestyle.rowview}>
        <FontAwesome  name="user-o" color={colors.text} size={20} />
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#666666"            
          style={[
          Editprofilestyle.textInput,
          {
              color: colors.text,
          },
          ]}> {initialBloodRequest.user_name}
            </TextInput>
            <Feather style={[Editprofilestyle.editicon]} name="edit-2" color={colors.text} size={20} />
        </View>

        <View style={Editprofilestyle.rowview}>
        <FontAwesome  name="phone" color={colors.text} size={20} />
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#666666"            
          style={[
          Editprofilestyle.textInput,
          {
              color: colors.text,
          },
          ]}> {initialBloodRequest.user_number}
            </TextInput>
            <Feather style={[Editprofilestyle.editicon]} name="edit-2" color={colors.text} size={20} />
        </View>
                
       
        
      </View>

      <TouchableOpacity style={Editprofilestyle.submit}   onPress={() => {submitHandle()}}>
          <Text style={Editprofilestyle.panelButtonTitle}>Submit</Text>
      </TouchableOpacity>

      </View>
      </ScrollView>
    );
};

export default Blood_Request_Screen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,     
  },
  radioButtonstyle:{
    flexDirection: 'row',
    // alignItems: 'center', 
    // justifyContent: 'center',
    marginRight:'2%',
    
  },
  textInputs: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
title:{
  fontWeight:'bold',  
  // marginBottom:'3%',
},
content:{
  marginLeft: '3%',
  marginTop:'1%',
  
},

cardview:{
  shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 7,
    shadowOpacity: 0.25,
    elevation: 5,
    // backgroundColor: 'white',
    padding:'4%',
    paddingLeft:'6%',
    borderRadius:20,
    margin:'2%',   
    
}
});
