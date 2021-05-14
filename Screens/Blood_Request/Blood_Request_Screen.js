import React, { useState, useEffect,useRef } from 'react';
import { View, Button, StyleSheet, Switch, TextInput, 
  TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple, useTheme
} from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import { Value } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
//import { useTheme } from 'react-native-paper';
// import  GooglePlacesInput  from "./Map_Component/places-autocomplete";

// import Placesearch from 'react-native-placesearch';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles as Editprofilestyle } from '../ProfileScreen/EditProfileScreen';
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styles as signupstyles } from '../SignIn/SignUpScreen';
import * as Animatable from 'react-native-animatable';
import * as toggledata from '../../Store/actions/HelpOne';

import {Server_URL} from '../../components/Parameter';
import * as condition from '../../ConditionHandler/Condition'
const Blood_Request_Screen = ({ navigation, route }) => {


  const user_data_user_latitude = useSelector(state =>
    state.helpone.user_latitude
  );

  const user_data_user_longitude = useSelector(state =>
    state.helpone.user_longitude
  );

  const user_data_user_address_line1 = useSelector(state =>
    state.helpone.user_address_line1
  );

  const user_data_user_city = useSelector(state =>
    state.helpone.user_city
  );


  const user_data_user_area = useSelector(state =>
    state.helpone.user_area
  );

  const user_data_user_state_name = useSelector(state =>
    state.helpone.user_state_name
  );

  const user_data_user_pincode = useSelector(state =>
    state.helpone.user_pincode
  );

  const user_data_user_name = useSelector(state =>
    state.helpone.user_name
  );

  const user_data_user_number = useSelector(state =>
    state.helpone.user_number,
  );

  const user_data_user_request_address_line1 = useSelector(state =>
    state.helpone.user_request_address_line1,
  );

  const user_data_user_request_user_city = useSelector(state =>
    state.helpone.user_request_user_city,
  );

  const user_data_user_request_user_state_name = useSelector(state =>
    state.helpone.user_request_user_state_name,
  );

  const user_data_user_request_user_district = useSelector(state =>
    state.helpone.user_request_user_district,
  );

  const user_data_user_request_user_pincode = useSelector(state =>
    state.helpone.user_request_user_pincode,
  );

  const user_data_user_request_user_countryName = useSelector(state =>
    state.helpone.user_request_user_countryName,
  );

  const user_data_user_request_user_longitude = useSelector(state =>
    state.helpone.user_request_user_longitude,
  );

  const user_data_user_request_user_latitude = useSelector(state =>
    state.helpone.user_request_user_latitude,
  );
  
  const { colors } = useTheme();

  const dispatch = useDispatch();

  const initialBloodRequest = {
    selectedBloodGroup: null,
    otherBloodGroup: null,
    loactionAddress: {
      address: null,
      city: null,
      area: null,
      statename: null,
      latitude: null,
      longitude: null,
    },
    user_name: user_data_user_name,
    user_number: user_data_user_number,
    check_textInput_user_name: true,
    check_textInput_user_number: true,
    hospitalname: null,
    pincode: null,
    check_textInput_hospita_name: false,
    check_textInput_pincode: false,
    check_textInput_noofunits: false,
    noofunits: 0,
    requestno: null,
  }
  const [state, setState] = useState(initialBloodRequest);
  const [isRequiredTypes, setisRequiredTypes] = useState({ Required: "Blood" });
  const [isReplacementAvailables, setisReplacementAvailables] = useState({ Replacement: "No" });

var offline = 0;
  let connectstate = "";
  const [error, setError] = useState();
  const [offlinemsgflag, setOfflinemsgflag] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const offlinemsgflagref = useRef();

  const loadProducts = () => {
    // console.log("loadProduct");
    setError(null);

    try {
      checkConnectivity();
      // manageretrive();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  const checkConnectivity = () => {
    setOfflinemsgflag(false);
    console.log("offlinemsgflagref", offlinemsgflagref);
    NetInfo.fetch().then(state => {
      console.log("Is connected?111", state.isConnected);
      //  setIsStarted({setState:false});
      if (state.isConnected.toString() === "false") {
        // Alert.alert("You are offline!");
        if (!offlinemsgflagref.current) {
          console.log("Is connected?", state.isConnected);

          console.log("Is NetInfoStateType?", state.NetInfoStateType);
          connectstate = state.isConnected.toString();
          console.log("connectstate", connectstate);
          Alert.alert("Opps!", 'No Internet Please check your connection', [
            {
              text: 'Try Again',
              onPress: () => errorAlerthandler()
            }

          ]);

          setOfflinemsgflag(true);
          //   setState({
          //     ...state,
          //     asyncstorage: false,
          // });
          offline = 1;
        }
      } else {
        //Alert.alert("You are online!");
        console.log("You are online!", state.isConnected);
        //onRetrivemydonordata();
		user_data_upload();
        if (offline === 1) {
          ToastAndroid.show("Back to online!", ToastAndroid.SHORT);
        }

      }

    });
	}
	
  const errorAlerthandler = () => {
    console.log("errorAlerthandler");
    setOfflinemsgflag(false);
    checkConnectivity();
  }

  const otherBloodHandler = (val) => {
    console.log("val  " + val);
    if (state.selectedBloodGroup === "Other") {
      setState({
        ...state,
        otherBloodGroup: val,
      })
    }
  }

  const submitHandle = () => {
    console.log("after "+ user_data_user_request_address_line1 );
    if (state.check_textInput_user_name &&
      state.check_textInput_user_number &&
      isRequiredTypes &&
      state.check_textInput_hospita_name &&
      state.check_textInput_pincode &&
      // state.loactionAddress.latitude!==null  &&
      state.selectedBloodGroup !== "" &&
      state.check_textInput_noofunits
    ) {
      console.log("submited  ");

       //user_data_upload();
	   loadProducts();
    }
    else {
      ToastAndroid.show("Please Complete the form!", ToastAndroid.LONG);
    }

    // console.log("   submit state.otherBloodGroups  "+state.selectedBloodGroup);

    // console.log("submit isRequiredTypes  "+isRequiredTypes);
    // console.log("submit isReplacementAvailables  "+isReplacementAvailables);
    // console.log("user_data_user_address_line1  "+user_data_user_address_line1);
  }

const clear_Dispatch=()=>{
  dispatch(toggledata.toggleuser_request_address_line1(null));    
  dispatch(toggledata.toggleuser_request_user_city(null));
  dispatch(toggledata.toggleuser_request_user_countryName(null));
  dispatch(toggledata.toggleuser_request_user_pincode(null));
  dispatch(toggledata.toggleuser_request_user_longitude(null));
  dispatch(toggledata.toggleuser_request_user_latitude(null));
  dispatch(toggledata.toggleuser_request_user_state_name(null));
  dispatch(toggledata.toggleuser_request_user_district(null));
}

  const clearall = () => {

    setState({
      ...state, selectedBloodGroup: null,
      hospitalname: null,
      pincode: null,
      check_textInput_hospita_name: false,
      check_textInput_pincode: false,
      check_textInput_noofunits: false,
      noofunits: 0,
    }),
      setisRequiredTypes(null);
    setisReplacementAvailables(null);
    clear_Dispatch();
  }
  var reqno;
  const user_data_upload = async () => {
    console.log("isReplacementAvailables:" + isReplacementAvailables);
    console.log("selectedBloodGroup:" + state.selectedBloodGroup);
	let API_URL = `${Server_URL}/Blood_Request_Component/user_blood_request.php`;
    fetch(API_URL,{
    method:'post',
    header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
      body: JSON.stringify({
        // we will pass our input data to server
        mobile: user_data_user_number,
        username: state.user_name,
        contactnumber: state.user_number,
        requesttype: isRequiredTypes,
        bloodgroup: ((state.otherBloodGroup !== null && state.selectedBloodGroup === "Other") ? state.otherBloodGroup : state.selectedBloodGroup),
        address:user_data_user_request_address_line1,
        latitude: user_data_user_request_user_latitude,
        longitude: user_data_user_request_user_longitude,
        city:user_data_user_request_user_city,        
        state:user_data_user_request_user_state_name,
        district:user_data_user_request_user_district,       
        pincode: user_data_user_request_user_pincode,
        country:user_data_user_request_user_countryName,
        hospitalname: state.hospitalname,
        replacementavailables: ((isRequiredTypes === "Platelets") ? '' : isReplacementAvailables),
        units: state.noofunits,
      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson + " responseJson");
        //ToastAndroid.show(responseJson,ToastAndroid.LONG);

        if (responseJson === "Invalid") {
          Alert.alert("Error", 'Something went wrong!', [
            { text: 'Okay' }
          ]);
        }
        else if (responseJson === "check") {
          Alert.alert("Connection Lost", 'check internet connection!', [
            { text: 'Okay' }
          ]);
          console.log("fail");
        }
        else {
          console.log("Recorded");
          reqno = responseJson.toString();
          setState({
            ...state,
            requestno: responseJson,
          }),

            Alert.alert("Recorded", 'Your Blood requeste is recorded', [
              { text: 'Okay' }
            ]);
          navigation.navigate('Home');
          UpdateRequestNohandler();
          clearall();

        };
      })
      .catch((error) => {
        console.error(error);
      });

  }

  let screenname = "Blood_Request_Screen";

  const UpdateRequestNohandler = async () => {


    console.log(" aynsc storgae in Blood request screen " + reqno);
    try {
      dispatch(toggledata.toggleuser_bood_request_raised(reqno));
      let status = await AsyncStorage.setItem('user_bood_request_raised', reqno);

      console.log("user_bood_request_raised  status " + status);
    } catch (e) {
      console.log(e);
    }
  }

  const handleusername = (val) => {
    const reshospitalname = condition.profilename(val);
    //console.log("resprofilename"+reshospitalname);
    setState({
      ...state,
      hospitalname: val,
    });
  }

  const handleaddress=(val) =>{
    console.log("before user_data_user_request_address_line1"+ user_data_user_request_address_line1 );
    dispatch(toggledata.toggleuser_request_address_line1(val));
    console.log("after user_data_user_request_address_line1"+ user_data_user_request_address_line1 );
  }

  const handleHospitalname = (val) => {
    const resprofilename = condition.profilename(val);
    //console.log("resprofilename"+resprofilename);
    if (resprofilename) {
      setState({
        ...state, check_textInput_hospita_name: true,
        hospitalname: val,
      });
    }
    else {
      {
        setState({
          ...state, check_textInput_hospita_name: false,
          hospitalname: val,
        });
      }
    }
  }

  const handlepincode = (val) => {
    const respincode = condition.userpincode(val);
    //console.log("resprofilename"+ respincode );
    if (respincode) {
      setState({
        ...state, check_textInput_pincode: true,
        pincode: val.replace(/\s/g, ''),
      });
    }
    else {
      {
        setState({
          ...state, check_textInput_pincode: false,
          pincode: val.replace(/\s/g, ''),
        });
      }
    }
  }

  const handleusernumber = (val) => {
    const resnumber = condition.user_number(val);
    console.log("resprofilenum :" + resnumber);
    if (resnumber) {
      setState({
        ...state, check_textInput_user_number: true,
        user_number: val,
      });
    }
    else {
      {
        setState({
          ...state, check_textInput_user_number: false,
          user_number: val,
        });
      }

    }
  }


  const OnPress_Pick_Location_Handler = () => {
    navigation.navigate('Here_Map', {     
      screenName: 'Blood_Request_Screen'
    });
    dispatch(toggledata.togglemap_screen_name('Blood_Request_Screen'));    

  }

  const handlenoofUnits = (val) => {

    if (val > 0) {
      setState({
        ...state, check_textInput_noofunits: true,
        noofunits: val,
      });
    }
    else {
      setState({
        ...state, check_textInput_noofunits: false,
        noofunits: val,
      });
    }

  }

  useEffect(() => {
    if (route) {
      console.log("route.params?.back_address");
      console.log(route.params?.back_address);
      console.log(route.params);
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }

  }, [route]);

  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.cardview} >
          <RadioButton.Group
            key="Required"
            onValueChange={value => setisRequiredTypes(value)
            }
            value={isRequiredTypes}

          >
            <Text style={styles.title}>Required Type</Text>
            <View style={[styles.radioButtonstyle, styles.content]}>
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
        {isRequiredTypes === 'Blood' ?
          <View style={styles.cardview}>
            <RadioButton.Group key="Replacement" onValueChange={value => setisReplacementAvailables(value)} value={isReplacementAvailables}  >
              <Text style={styles.title}> Replacement Available</Text>
              <View style={[styles.radioButtonstyle, styles.content]}>

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
          : null}

        <View style={styles.cardview}>
          <Text style={styles.title}>Blood Group</Text>
          <View style={styles.content} >
            <Picker
              selectedValue={state.selectedBloodGroup}
              style={{ height: 50, width: 150, color: colors.text, }}
              onValueChange={(itemValue, itemIndex) => setState({ ...state, selectedBloodGroup: itemValue })
              }>
              <Picker.Item label="Select" value="" />
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
          {state.selectedBloodGroup === "Other" ?
            <TextInput
              style={[styles.textInput,
              { color: colors.text }
              ]}
              onChangeText={(val) => otherBloodHandler(val)}
              placeholder="Enter Blood Group"></TextInput>
            : null}
        </View>

        <View style={[, styles.cardview,]}>
          <Text style={styles.title}>No of Units</Text>

          <View style={[signupstyles.action,]}>
            <Icon name="blood-bag" color={colors.text} size={20} />
            <TextInput placeholder="Units"
              keyboardType="phone-pad"
              style={[signupstyles.textInput, { color: colors.text }]} autoCapitalize="none"
              onChangeText={(val) => handlenoofUnits(val)}
            >{state.noofunits}
            </TextInput>
            {state.check_textInput_noofunits ?
              <Animatable.View
                animation="bounceIn">
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
              : null}
            <Feather style={Editprofilestyle.editicon} name="edit-2" color={colors.text} size={20} />
          </View>
        </View>



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
            <Text style={styles.title}>Hospital Address</Text>

            <View style={[signupstyles.action, { paddingTop: "2%" }]}>
              <FontAwesome name="hospital-o" color={colors.text} size={20} />
              <TextInput placeholder="Hospital Name"
                style={[signupstyles.textInput, { color: colors.text }]} autoCapitalize="none"
                onChangeText={(val) => handleHospitalname(val)}
              >{state.hospitalname}
              </TextInput>
              {state.check_textInput_hospita_name ?
                <Animatable.View
                  animation="bounceIn">
                  <Feather
                    name="check-circle"
                    color="green"
                    size={20}
                  />
                </Animatable.View>
                : null}
              <Feather style={Editprofilestyle.editicon} name="edit-2" color={colors.text} size={20} />
            </View>

            <View style={[signupstyles.action, { paddingTop: "2%" }]}>
              <TextInput placeholder="Hospital pin code"
                keyboardType="phone-pad"
                style={[signupstyles.textInput, { color: colors.text }]} autoCapitalize="none"
                onChangeText={(val) => handlepincode(val)}
              >{state.pincode}
              </TextInput>
              {state.check_textInput_pincode ?
                <Animatable.View
                  animation="bounceIn">
                  <Feather
                    name="check-circle"
                    color="green"
                    size={20}
                  />
                </Animatable.View>
                : null}
              <Feather style={Editprofilestyle.editicon} name="edit-2" color={colors.text} size={20} />
            </View>

            <View style={[Editprofilestyle.cardview, { alignItems: 'center', }]}>


              <View style={[Editprofilestyle.rowview, { padding: '2%', marginTop: 0, paddingBottom: '4%' }]}>
                <TouchableOpacity onPress={() => OnPress_Pick_Location_Handler()}
                  style={[styles.buttonSign, Editprofilestyle.rowview,]}
                  activeOpacity={.55}
                >
                  <Entypo name="location-pin" color={colors.text} size={30} />
                  <Text style={[styles.textSign, { color: "#009387", marginLeft: '20%', fontSize: 20 }]}>Pick Location</Text>
                </TouchableOpacity>
              </View>

            </View>
            {(user_data_user_request_address_line1 !== '' && user_data_user_request_address_line1 !== null) ?
              <View   >
                <View style={[signupstyles.action]}>
                  <FontAwesome5 style={{ paddingTop: '1%', color: 'green' }} name="address-card" size={30} />
                  <TextInput  multiline={true} 
                  style={[signupstyles.textInput, { color: colors.text }]}
                  onChangeText={(val) => handleaddress(val)}
                  >{user_data_user_request_address_line1}</TextInput>
                  {user_data_user_request_address_line1!==null ?
                <Animatable.View
                  animation="bounceIn">
                  <Feather
                    name="check-circle"
                    color="green"
                    size={20}
                  />
                </Animatable.View>
                : null}
              <Feather style={Editprofilestyle.editicon} name="edit-2" color={colors.text} size={20} />
                </View>
              </View>
              : null
            }
            {(user_data_user_request_user_city !== '' && user_data_user_request_user_city !== null) ?
              <View >
                <View>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <Text >City: {user_data_user_request_user_city}</Text>
                </View>
              </View>
              : null
            }
            {(user_data_user_request_user_state_name !== '' && user_data_user_request_user_state_name !== null) ?
              <View >
                <View>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <Text >State: {user_data_user_request_user_state_name}</Text>
                </View>
              </View>
              : null
            }
            {(user_data_user_request_user_district !== '' && user_data_user_request_user_district !== null) ?
              <View >
                <View>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <Text >District: {user_data_user_request_user_district}</Text>
                </View>
              </View>
              : null
            }
            {(user_data_user_request_user_pincode !== '' && user_data_user_request_user_pincode !== null) ?
              <View >
                <View>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <Text >Pincode: {user_data_user_request_user_pincode}</Text>
                </View>
              </View>
              : null
            }
            {(user_data_user_request_user_countryName !== '' && user_data_user_request_user_countryName !== null) ?
              <View >
                <View>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <Text >Country: {user_data_user_request_user_countryName}</Text>
                </View>
              </View>
              : null
            }
            {(user_data_user_request_user_latitude !== '' && user_data_user_request_user_latitude !== null) ?
              <View >
                <View>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <Text >Your Latitude: {user_data_user_request_user_latitude}</Text>
                </View>
              </View>
              : null
            }

            {(user_data_user_request_user_longitude !== '' && user_data_user_request_user_longitude !== null) ?
              <View >
                <View>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <Text >Your Longitude: {user_data_user_request_user_longitude}</Text>
                </View>
              </View>
              : null
            }

          </View>
        </View>



        <View style={[, styles.cardview,]}>
          <Text style={styles.title}>Contact details</Text>

          <View style={[signupstyles.action,]}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput placeholder="Name"
              style={[signupstyles.textInput, { color: colors.text }]} autoCapitalize="none"
              onChangeText={(val) => handleusername(val)}
            >{state.user_name}
            </TextInput>
            {state.check_textInput_user_name ?
              <Animatable.View
                animation="bounceIn">
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
              : null}
            <Feather style={Editprofilestyle.editicon} name="edit-2" color={colors.text} size={20} />
          </View>

          <View style={[signupstyles.action,]}>
            <FontAwesome name="phone" color={colors.text} size={20} />
            <TextInput placeholder="Number"
              keyboardType="phone-pad"
              style={[signupstyles.textInput, { color: colors.text }]} autoCapitalize="none"
              onChangeText={(val) => handleusernumber(val)}
            >{state.user_number}
            </TextInput>
            {state.check_textInput_user_number ?
              <Animatable.View
                animation="bounceIn">
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
              : null}
            <Feather style={Editprofilestyle.editicon} name="edit-2" color={colors.text} size={20} />
          </View>





        </View>

        <TouchableOpacity style={Editprofilestyle.submit} onPress={() => { submitHandle() }}>
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
  radioButtonstyle: {
    flexDirection: 'row',
    // alignItems: 'center', 
    // justifyContent: 'center',
    marginRight: '2%',

  },
  textInputs: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  title: {
    fontWeight: 'bold',
    // marginBottom:'3%',
  },
  content: {
    marginLeft: '3%',
    marginTop: '1%',

  },

  cardview: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 7,
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: 'white',
    padding: '4%',
    paddingLeft: '6%',
    borderRadius: 20,
    margin: '2%',

  }
});
