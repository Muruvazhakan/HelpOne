import React, { useState, useEffect, useRef } from 'react';
import {
  View, Button, StyleSheet, Switch, TextInput,
  TouchableOpacity, Alert, ToastAndroid
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple, useTheme, Checkbox
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
import { styles as Editprofilestyle } from '../../Screens/ProfileScreen/EditProfileScreen';
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styles as signupstyles } from '../../Screens/SignIn/SignUpScreen';
import * as Animatable from 'react-native-animatable';
import * as toggledata from '../../Store/actions/HelpOne';
import { styles as BloodRequestScreenStyle } from '../../Screens/Blood_Request/Blood_Request_Screen';
import * as Server_Url from '../../components/Covid_Parameter';
import { Server_URL } from '../../components/Parameter';
import * as condition from '../../ConditionHandler/Condition';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Covid_Data_Add_Screen = ({ navigation, route }) => {


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

    Normal_Bed: false,
    O2_Bed: false,
    O2_Supply: false,
    ICU_Bed: false,

    Normal_Bed_Count: 0,
    O2_Bed_Count: 0,
    O2_Supply_Count: 0,
    ICU_Bed_Count: 0,

    user_name: user_data_user_name,
    user_number: user_data_user_number,
    check_textInput_user_name: true,
    check_textInput_user_number: true,
    hospitalname: null,
    pincode: null,
    check_textInput_hospita_name: false,
    check_textInput_pincode: false,
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


  const submitHandle = () => {
    console.log("submitHandle " + user_data_user_request_user_latitude + " user_data_user_longitude" + user_data_user_request_user_longitude);
    console.log(state);

    if (state.Normal_Bed && (state.Normal_Bed_Count <= 0 || state.Normal_Bed_Count == null)) {
      Alert.alert("Error in Bed Count", 'Please Enter valid Normal Bed Count!', [
        { text: 'Okay' }
      ]);
      return false;
    }

    if (state.O2_Bed && (state.O2_Bed_Count <= 0 || state.O2_Bed_Count == null)) {
      Alert.alert("Error in Bed Count", 'Please Enter valid Oxygen Bed Count!', [
        { text: 'Okay' }
      ]);
      return false;
    }

    if (state.ICU_Bed && (state.ICU_Bed_Count <= 0 || state.ICU_Bed_Count == null)) {
      Alert.alert("Error in Bed Count", 'Please Enter valid ICU Bed Count!', [
        { text: 'Okay' }
      ]);
      return false;
    }

    if (state.O2_Supply && (state.O2_Supply_Count <= 0 || state.O2_Supply_Count == null)) {
      Alert.alert("Error in Oxygen Supply", 'Please Enter valid Oxygen Cylinder Count!', [
        { text: 'Okay' }
      ]);
      return false;
    }

    if (!state.O2_Supply && !state.O2_Bed && !state.Normal_Bed && !state.ICU_Bed) {
      Alert.alert("Error", 'Please enter Atlest one Details!', [
        { text: 'Okay' }
      ]);
      return false;
    }

    if (!state.check_textInput_user_name || !state.check_textInput_user_number) {
      Alert.alert("Error", 'Please complete the Contact details', [
        { text: 'Okay' }
      ]);
      return false;
    }

    if (user_data_user_request_user_latitude == '' && user_data_user_request_user_longitude == '') {
      Alert.alert("Error", 'Please select the location', [
        { text: 'Okay' }
      ]);
      return false;
    }

    if (state.check_textInput_hospita_name && state.check_textInput_hospita_name) {
      console.log("submited  ");

      // user_data_upload();
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

  const clear_Dispatch = () => {
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
      Normal_Bed: false,
      O2_Bed: false,
      O2_Supply: false,
      ICU_Bed: false,
      Normal_Bed_Count: 0,
      O2_Bed_Count: 0,
      O2_Supply_Count: 0,
      ICU_Bed_Count: 0,

    }),
      // setState(null),
      // setisRequiredTypes(null);   
      clear_Dispatch();
  }
  var reqno;
  const user_data_upload = async () => {
    // console.log("isReplacementAvailables:" + isReplacementAvailables);
    // console.log("selectedBloodGroup:" + state.selectedBloodGroup);
    let API_URL =  `${Server_URL}/Covid_Components/Covid_Add_Details_Components/Covid_Add_Details.php`;
    // Server_Url.Covid_Add_Details_URL;
    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will pass our input data to server
        mobile: user_data_user_number,
        username: state.user_name,
        contactnumber: state.user_number,
        BedCount: state.Normal_Bed_Count,
        O2BedCount: state.O2_Bed_Count,
        ICUBedCount: state.ICU_Bed_Count,
        O2SupplyCount: state.O2_Supply_Count,
        address: user_data_user_request_address_line1,
        latitude: user_data_user_request_user_latitude,
        longitude: user_data_user_request_user_longitude,
        city: user_data_user_request_user_city,
        state: user_data_user_request_user_state_name,
        district: user_data_user_request_user_district,
        pincode: user_data_user_request_user_pincode,
        country: user_data_user_request_user_countryName,
        hospitalname: state.hospitalname,
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
        else if (responseJson === "Recorded") {
          console.log("Recorded");
          reqno = responseJson.toString();
          setState({
            ...state,
            requestno: responseJson,
          }),

            Alert.alert("Recorded", 'Your Details are recorded', [
              { text: 'Okay' }
            ]);
         navigation.navigate('CovidHomeDrawer');
          // UpdateRequestNohandler();
         clearall();

        };
      })
      .catch((error) => {
        console.error(error);
      });

  }

  let screenname = "Blood_Request_Screen";

  // const UpdateRequestNohandler = async () => {


  //   console.log(" aynsc storgae in Blood request screen " + reqno);
  //   try {
  //     dispatch(toggledata.toggleuser_bood_request_raised(reqno));
  //     let status = await AsyncStorage.setItem('user_bood_request_raised', reqno);

  //     console.log("user_bood_request_raised  status " + status);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const handleusername = (val) => {
    const reshospitalname = condition.profilename(val);
    //console.log("resprofilename"+reshospitalname);
    setState({
      ...state,
      hospitalname: val,
    });
  }

  const handleaddress = (val) => {
    console.log("before user_data_user_request_address_line1" + user_data_user_request_address_line1);
    dispatch(toggledata.toggleuser_request_address_line1(val));
    console.log("after user_data_user_request_address_line1" + user_data_user_request_address_line1);
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



  const handlenormalbedcount = (val) => {

    if (val > 0) {
      setState({
        ...state,
        // check_textInput_noofunits: true,
        Normal_Bed_Count: val,
      });
    }
    else {
      setState({
        ...state,
        // check_textInput_noofunits: false,
        Normal_Bed_Count: val,
      });
    }

  }

  const handleO2bedcount = (val) => {

    if (val > 0) {
      setState({
        ...state,
        // check_textInput_noofunits: true,
        O2_Bed_Count: val,
      });
    }
    else {
      setState({
        ...state,
        // check_textInput_noofunits: false,
        O2_Bed_Count: val,
      });
    }

  }


  const handleICUbedcount = (val) => {

    if (val > 0) {
      setState({
        ...state,
        // check_textInput_noofunits: true,
        ICU_Bed_Count: val,
      });
    }
    else {
      setState({
        ...state,
        // check_textInput_noofunits: false,
        ICU_Bed_Count: val,
      });
    }

  }

  const handleO2Supplycount = (val) => {

    if (val > 0) {
      setState({
        ...state,
        // check_textInput_noofunits: true,
        O2_Supply_Count: val,
      });
    }
    else {
      setState({
        ...state,
        // check_textInput_noofunits: false,
        O2_Supply_Count: val,
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
      <View style={BloodRequestScreenStyle.container}>

        <View style={BloodRequestScreenStyle.cardview} >
        
          <Text style={BloodRequestScreenStyle.title}>Please select the Details you want to record</Text>

          <View style={[styles.bed_space_style
            // { padding: '2%', marginTop: 0, paddingBottom: '4%' }
          ]}>
            <Text style={{ paddingTop: '3%' }}>Normal Bed</Text>
            <Checkbox
              status={state.Normal_Bed ? 'checked' : 'unchecked'}
              onPress={() => {
                console.log(state.Normal_Bed + " state.Normal_Bed");
                setState({
                  ...state,
                  Normal_Bed: !state.Normal_Bed,
                })

              }}
            />
          </View>

          <View style={[styles.bed_space_style
          ]}>
            <Text style={{ paddingTop: '3%' }}>Oxygen Bed</Text>
            <Checkbox
              status={state.O2_Bed ? 'checked' : 'unchecked'}
              onPress={() => {
                console.log(state.O2_Bed + " state.O2_Bed");
                setState({
                  ...state,
                  O2_Bed: !state.O2_Bed,
                })

              }}
            />
          </View>

          <View style={[styles.bed_space_style
          ]}>
            <Text style={{ paddingTop: '3%' }}>ICU Bed</Text>
            <Checkbox
              status={state.ICU_Bed ? 'checked' : 'unchecked'}
              onPress={() => {
                console.log(state.ICU_Bed + " state.ICU_Bed");
                setState({
                  ...state,
                  ICU_Bed: !state.ICU_Bed,
                })

              }}
            />
          </View>

          <View style={[styles.bed_space_style
          ]}>
            <Text style={{ paddingTop: '3%' }}>Oxygen Cylinder</Text>
            <Checkbox
              status={state.O2_Supply ? 'checked' : 'unchecked'}
              onPress={() => {
                console.log(state.O2_Supply + " state.O2_Supply");
                setState({
                  ...state,
                  O2_Supply: !state.O2_Supply,
                })

              }}
            />
          </View>

        </View>


        {state.Normal_Bed ?

          <Animatable.View style={[BloodRequestScreenStyle.cardview,]} animation="bounceInRight">
            <Text style={BloodRequestScreenStyle.title}>No of Normal Beds Available</Text>

            <View style={[signupstyles.action,]}

            >
              <Fontisto name="bed-patient" color='black' size={30} />
              <TextInput placeholder="Units"
                keyboardType="phone-pad"
                style={[signupstyles.textInput, { color: colors.text, paddingLeft: '5%' }]} autoCapitalize="none"
                onChangeText={(val) => handlenormalbedcount(val)}
              >{state.Normal_Bed_Count}
              </TextInput>
              {state.Normal_Bed_Count > 0 && state.Normal_Bed_Count ?
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
          </Animatable.View>

          : null}


        {state.O2_Bed ?

          <Animatable.View style={[BloodRequestScreenStyle.cardview,]} animation="bounceInRight">
            <Text style={BloodRequestScreenStyle.title}>No of Oxygen Beds Available</Text>

            <View style={[signupstyles.action,]}>
              <Fontisto name="bed-patient" color='black' size={30} />
              <TextInput placeholder="Units"
                keyboardType="phone-pad"
                style={[signupstyles.textInput, { color: colors.text, paddingLeft: '5%' }]} autoCapitalize="none"
                onChangeText={(val) => handleO2bedcount(val)}
              >{state.O2_Bed_Count}
              </TextInput>
              {state.O2_Bed_Count > 0 && state.O2_Bed_Count ?
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
          </Animatable.View>

          : null}

        {state.ICU_Bed ?

          <Animatable.View style={[BloodRequestScreenStyle.cardview,]} animation="bounceInRight">
            <Text style={BloodRequestScreenStyle.title}>No of ICU Beds Available</Text>

            <View style={[signupstyles.action,]}>
              <Fontisto name="bed-patient" color='black' size={30} />
              <TextInput placeholder="Units"
                keyboardType="phone-pad"
                style={[signupstyles.textInput, { color: colors.text, paddingLeft: '5%' }]} autoCapitalize="none"
                onChangeText={(val) => handleICUbedcount(val)}
              >{state.ICU_Bed_Count}
              </TextInput>
              {state.ICU_Bed_Count > 0 && state.ICU_Bed_Count ?
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
          </Animatable.View>

          : null}

        {state.O2_Supply ?

          <Animatable.View style={[BloodRequestScreenStyle.cardview,]} animation="bounceInRight">
            <Text style={BloodRequestScreenStyle.title}>No of Oxygen Cylinder Available</Text>

            <View style={[signupstyles.action,]}>
              <MaterialCommunityIcons name="gas-cylinder" color='black' size={30} />
              <TextInput placeholder="Units"
                keyboardType="phone-pad"
                style={[signupstyles.textInput, { color: colors.text, paddingLeft: '5%' }]} autoCapitalize="none"
                onChangeText={(val) => handleO2Supplycount(val)}
              >{state.O2_Supply_Count}
              </TextInput>
              {state.O2_Supply_Count > 0 && state.O2_Supply_Count ?
                <Animatable.View
                  animation="fadeInUpBig">
                  <Feather
                    name="check-circle"
                    color="green"
                    size={20}
                  />
                </Animatable.View>
                : null}
              <Feather style={Editprofilestyle.editicon} name="edit-2" color={colors.text} size={20} />
            </View>
          </Animatable.View>

          : null}


        <View style={BloodRequestScreenStyle.cardview}>

          <View>
            <Text style={BloodRequestScreenStyle.title}>Hospital Address</Text>

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
                  style={[BloodRequestScreenStyle.buttonSign, Editprofilestyle.rowview,]}
                  activeOpacity={.55}
                >
                  <Entypo name="location-pin" color={colors.text} size={30} />
                  <Text style={[BloodRequestScreenStyle.textSign, { color: "#009387", marginLeft: '20%', fontSize: 20 }]}>Pick Location</Text>
                </TouchableOpacity>
              </View>

            </View>
            {(user_data_user_request_address_line1 !== '' && user_data_user_request_address_line1 !== null) ?
              <View   >
                <View style={[signupstyles.action]}>
                  <FontAwesome5 style={{ paddingTop: '1%', color: 'green' }} name="address-card" size={30} />
                  <TextInput multiline={true}
                    style={[signupstyles.textInput, { color: colors.text }]}
                    onChangeText={(val) => handleaddress(val)}
                  >{user_data_user_request_address_line1}</TextInput>
                  {user_data_user_request_address_line1 !== null ?
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



        <View style={[, BloodRequestScreenStyle.cardview,]}>
          <Text style={BloodRequestScreenStyle.title}>Contact details</Text>

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

export default Covid_Data_Add_Screen;

export const styles = StyleSheet.create({
  bed_space_style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%'
  }
});
