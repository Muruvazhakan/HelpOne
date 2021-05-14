import React, { useState, useEffect,useRef } from 'react';
import {
  View, Button, StyleSheet, TextInput, TouchableOpacity,
  ToastAndroid,Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as toggledata from '../../Store/actions/HelpOne';
import {
  Avatar,
  Title,
  Caption,
  Text,

  TouchableRipple, useTheme, Checkbox
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { connect, useSelector, useDispatch } from 'react-redux';
import { styles as signupstyles } from '../SignIn/SignUpScreen';
import { styles as EditProfileScreenStyles } from '../ProfileScreen/ProfileScreen';
import {Server_URL} from '../../components/Parameter';
import { styles as EditProfileScreen } from '../ProfileScreen/EditProfileScreen';
import NetInfo from "@react-native-community/netinfo";
const SOSData = ({ navigation }) => {

  const { colors } = useTheme();
  const user_data_user_number = useSelector(state =>
    state.helpone.user_number,
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
  const user_data_sos_msg = useSelector(state =>
    state.helpone.user_sos_msg,
  );
  
  var temp_msg="Need Help! to "+user_data_sos_name1;

  const initialState = {
    sos_user1: user_data_sos_name1,
    sos_user2: user_data_sos_name2,
    sos_user3: user_data_sos_name3,
    sos_user1_number: user_data_sos_name1_number,
    sos_user2_number: user_data_sos_name2_number,
    sos_user3_number: user_data_sos_name3_number,
    user_sos_msg:(user_data_sos_msg !== null ?user_data_sos_msg:temp_msg),
    check_textInput_user1_sos_name: false,
    check_textInput_user1_sos_number: false,
    check_textInput_user2_sos_number: false,
    check_textInput_user2_sos_name: false,
    check_textInput_user3_sos_number: false,
    check_textInput_user3_sos_name: false,
    check_textInput_user_sos_msg: true,
  };
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  var setupSOSData = [];
  var data;
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
          return;
        }
      } else {
        //Alert.alert("You are online!");
        console.log("You are online!", state.isConnected);
        //onRetrivemydonordata();
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
  
//onRetrivetableSosdata is available in RetriveData.js file
  const onRetrivetableSosdata = () => {
    //console.log(state.user_number+"state.user_number");    
	let API_URL = `${Server_URL}/Retrive_Component/user_sos_data.php`;	
    //let API_URL = 'http://192.168.0.9/help_1/Retrive_Component/user_sos_data.php';
    // setmarkers:{isloading:true};
    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        mobile: user_data_user_number,
        reqtype: '2'
      })

    }).then(res => res.json()).then(res => {
      console.log("[SOSData] res");

      console.log(res);
      console.log("[SOSData] res.ok value" + res.ok);
      //console.log(state.isRequestCompleted);
      setState({
        ...state,
        serverdata: false,
      });
      if (res == "No") {
        console.log("[SOSData] No");

        // ToastAndroid.show("No Blood  Request is Available, Please try after some time",ToastAndroid.LONG);
        // console.log(state.isBoodRequestAvailable);
        // console.log(" onMapget2 state.isRequestCompleted");
        // console.log(state.isRequestCompleted);
      }
      else if (res === ']') {
        console.log("[SOSData] No data");
      }
      else {

        console.log("[SOSData] server data else state.user_id " + state.user_id);
        setupSOSData = JSON.parse(res);
        //console.log("retriveserverdata before");
        //console.log(setupSOSData);

        for (data of setupSOSData) {
          console.log("setupSOSData");
          console.log(data);
        }

      }
      //console.log(data.dob+data.bloodgroup);
      let val;
    }).catch((error) => {

      setState({
        ...state,
        serverdata: false,
        SOSData: false,
        asyncstorage: false,
      });
      console.error("Internet connection " + error);
      console.log("[SOSData] list error " + error);
      Alert.alert("Sorry", 'Something went wrong', error[
        {
          text: 'Try Again',
          onPress: () => onRetrivetableSosdata()
        }

      ]);
      console.log("[SOSData] state serverdatas " + state.serverdata + state.SOSData);
    });


  }

  const onWritetableSosdata = () => {
    //console.log(state.user_number+"state.user_number");   
	let API_URL = `${Server_URL}/Retrive_Component/user_sos_data.php`;	
    //let API_URL = 'http://192.168.0.9/help_1/Retrive_Component/user_sos_data.php';
    // setmarkers:{isloading:true};
    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        mobile: user_data_user_number,
        reqtype: '1',
        Name1: state.sos_user1,
        Name1Number: state.sos_user1_number,
        Name2: state.sos_user2,
        Name2Number: state.sos_user2_number,
        Name3: state.sos_user3,
        Name3Number: state.sos_user3_number,
        UserSosMsg:state.user_sos_msg
      })

    }).then(res => res.json()).then(res => {
      console.log("[SOSData] res");

      console.log(res);
      console.log("[SOSData] res.ok value" + res.ok);

      if (res == "No") {
        console.log("[SOSData] No");

      }
      else if (res === ']') {
        console.log("[SOSData] No data");
      }
      else {

        console.log("[SOSData] server data else state.user_id ");



        dipatchsosdata(data);
      }
      //console.log(data.dob+data.bloodgroup);
      let val;
    }).catch((error) => {


      console.error("Internet connection " + error);
      console.log("[SOSData] list error " + error);
      Alert.alert("Sorry", 'Something went wrong', error[
        {
          text: 'Try Again',
          onPress: () => onWritetableSosdata()
        }

      ]);
      console.log("[SOSData] state serverdatas " + state.serverdata + state.SOSData);
    });


  }

  const dipatchsosdata = () => {
    console.log('[SOSData] dipatchsosdata data');
    console.log(state);
    try {

      if (typeof state.sos_user1 !== "undefined") {
        dispatch(toggledata.toggleuser_sos_name1(state.sos_user1));
      }

      if (typeof state.sos_user1_number !== "undefined") {
        dispatch(toggledata.toggleuser_sos_name2(state.sos_user1_number));
      }
      if (typeof state.sos_user2 !== "undefined") {
        dispatch(toggledata.toggleuser_sos_name2(state.sos_user2));
      }

      if (typeof state.sos_user2_number !== "undefined") {
        dispatch(toggledata.toggleuser_sos_name2(state.sos_user2_number));
      }

      if (typeof state.sos_user3 !== "undefined") {
        dispatch(toggledata.toggleuser_sos_name3(state.sos_user3));
      }

      if (typeof state.sos_user3_number !== "undefined") {
        dispatch(toggledata.toggleuser_sos_name3(state.sos_user3_number));
      }

      if (typeof state.user_sos_msg !== "undefined") {
        dispatch(toggledata.toggleuser_sos_msg(state.user_sos_msg));
      }

      console.log('[SOSData] sos data state.sos_user' + state.sos_user1, state.sos_user2);

      setsosasyncstorage();
    } catch (e) {
      console.log('[SOSData] SOSData dispatch error' + e);
    }
  }

  const setsosasyncstorage = async () => {
    try {
      console.log('[SOSData] sos setsosasyncstorage ');
      console.log(state);
      if (typeof state.sos_user1 !== "undefined") {
        await AsyncStorage.setItem('user_sos_name1', state.sos_user1);
        console.log(state.sos_user1);
      }

      if (typeof state.sos_user1_number !== "undefined") {
        await AsyncStorage.setItem('user_sos_name1_number', state.sos_user1_number);
      }

      if (typeof state.sos_user2 !== "undefined") {
        await AsyncStorage.setItem('user_sos_name2', state.sos_user2);
        console.log("state.sos_user2"+state.sos_user2);
      }

      if (typeof state.sos_user2_number !== "undefined") {
        await AsyncStorage.setItem('user_sos_name2_number', state.sos_user2_number);
      }

      if (typeof state.sos_user3 !== "undefined") {
        await AsyncStorage.setItem('user_sos_name3', state.sos_user3);
        console.log("state.sos_name3"+state.sos_user3);
      }

      if (typeof state.sos_user3_number !== "undefined") {
        await AsyncStorage.setItem('user_sos_name3_number', state.sos_user3_number);
      }
      if (typeof state.user_sos_msg !== "undefined") {
        await AsyncStorage.setItem('user_sos_msg', state.user_sos_msg);
      }      

      console.log('[SOSData] inside sos setasyncstorage completed ');
    }
    catch (error) {
      // Error retrieving data
      console.log(error.message);
    }

  }

  const handle_sos_first_name = (val) => {
    // console.log(val.length + " state.sos_user1");
    if (val.length !== 0) {
      console.log(val + " val");
      setState({
        ...state,
        sos_user1: val.replace(/\s/g, ''),
        check_textInput_user1_sos_name: true,
      });
    }
    else {
      setState({
        ...state,
        sos_user1: val.replace(/\s/g, ''),
        check_textInput_user1_sos_name: false,
      });
    }
    // availableprofiledata =val;
    console.log(state.sos_user1 + " state.sos_user1 asd");
  }

  const handle_sos_sec_name = (val) => {
    if (val.length === 0) {
      console.log(val + " val");
      setState({
        ...state,
        sos_user2: val.replace(/\s/g, ''),
        check_textInput_user2_sos_name: false,
      });
    }
    else {
      setState({
        ...state,
        sos_user2: val.replace(/\s/g, ''),
        check_textInput_user2_sos_name: true,
      });
    }
    // availableprofiledata =val;
    console.log(state.sos_user2 + " state.sos_user1");
  }

  const handle_sos_third_name = (val) => {
    if (val.length === 0) {
      console.log(val + " val");
      setState({
        ...state,
        sos_user3: val.replace(/\s/g, ''),
        check_textInput_user3_sos_name: false,
      });
    }
    else {
      setState({
        ...state,
        sos_user3: val.replace(/\s/g, ''),
        check_textInput_user3_sos_name: true,
      });
    }
    // availableprofiledata =val;
    console.log(state.sos_user3 + " state.sos_user1");
  }

  const handle_sos_first_number = (val) => {
    if (val.trim().length != 10) {
      console.log(val + " val");
      setState({
        ...state,
        sos_user1_number: val.replace(/\s/g, ''),
        check_textInput_user1_sos_number: false,
      });
    }
    else {
      setState({
        ...state,
        sos_user1_number: val.replace(/\s/g, ''),
        check_textInput_user1_sos_number: true,
      });
    }
    // availableprofiledata =val;
    console.log(state.sos_user1_number + " state.sos_user1_number");
  }

  const handle_sos_sec_number = (val) => {
    if (val.trim().length != 10) {
      console.log(val + " val");
      setState({
        ...state,
        sos_user2_number: val.replace(/\s/g, ''),
        check_textInput_user2_sos_number: false,
      });
    }
    else {
      setState({
        ...state,
        sos_user2_number: val.replace(/\s/g, ''),
        check_textInput_user2_sos_number: true,
      });
    }
    // availableprofiledata =val;
    console.log(state.sos_user2_number + " state.sos_user1_number");
  }

  const handle_sos_third_number = (val) => {
    if (val.trim().length != 10) {
      console.log(val + " val");
      setState({
        ...state,
        sos_user3_number: val.replace(/\s/g, ''),
        check_textInput_user3_sos_number: false,
      });
    }
    else {
      setState({
        ...state,
        sos_user3_number: val.replace(/\s/g, ''),
        check_textInput_user3_sos_number: true,
      });
    }
    // availableprofiledata =val;
    console.log(state.sos_user3_number + " state.sos_user1_number");
  }

  const handle_sos_msg = (val) => {
    if (val.length === 0) {
      console.log(val + " val");
      setState({
        ...state,
        user_sos_msg: val,
        check_textInput_user_sos_msg: false,
      });
    }
    else {
      setState({
        ...state,
        user_sos_msg: val,
        check_textInput_user_sos_msg: true,
      });
    }
    // availableprofiledata =val;
    console.log(state.sos_user3_number + " state.sos_user1_number");
  }

  const SubmitHandler = async () => {

    // console.log(profiledata.isUserImageAvailable + " Edit profile screen submit isUserImageAvailable ");
    
    if (state.check_textInput_user1_sos_name && state.check_textInput_user1_sos_number &&
      state.check_textInput_user_sos_msg) {
      dipatchsosdata();
      loadProducts();
      onWritetableSosdata();

      ToastAndroid.show('Your details has been saved.', ToastAndroid.LONG);
    }
    else {
      Alert.alert("Invalid Data", "Please complete the form", [
        { text: 'Okay' }
      ]);
    }
  };

  return (
    <ScrollView>
    <View style={[styles.container]} >
      <View style={[
        EditProfileScreenStyles.cardview,
         { alignItems: 'center' }]}>
        <Text>SOS Data</Text>
        <Text>Enter User Detail to Notify them!</Text>
      </View>
      <View style={EditProfileScreenStyles.cardview} >
        <Text  style={styles.sos_user}>Enter Your Help Message</Text>
        <View style={[signupstyles.action,{marginRight:'2%'}]}>
        <TextInput placeholder="Your Message"
          style={[signupstyles.textInput,{ color: colors.text }]}
          autoCapitalize="none"
          onChangeText={(val) => handle_sos_msg(val)}
        >{state.user_sos_msg}
        </TextInput>
        {state.check_textInput_user_sos_msg ===true ?
                <Animatable.View
                  animation="bounceIn">
                  <Feather
                    style={{alignSelf:'stretch'}}
                    name="check-circle"
                    color="green"
                    size={20}
                  />
                </Animatable.View>
                : null}
          <Feather style={EditProfileScreen.editicon} name="edit-2" color={colors.text} size={20} />
         </View>
      </View>
      <View style={EditProfileScreenStyles.cardview} >
        <Text
         style={styles.sos_user}
        >First User Detail</Text>
        <View style={[signupstyles.action,{marginRight:'2%'}]}>
        <TextInput placeholder="First User Name"
          style={[signupstyles.textInput,{ color: colors.text }]}
          autoCapitalize="none"
          onChangeText={(val) => handle_sos_first_name(val)}
        >{state.sos_user1}
        </TextInput>
        {state.check_textInput_user1_sos_name ===true ?
                <Animatable.View
                  animation="bounceIn">
                  <Feather
                    style={{alignSelf:'stretch'}}
                    name="check-circle"
                    color="green"
                    size={20}
                  />
                </Animatable.View>
                : null}
          <Feather style={EditProfileScreen.editicon} name="edit-2" color={colors.text} size={20} />
         </View>
         <View style={[signupstyles.action,{marginRight:'2%'}]}>
        <TextInput placeholder="First User Number"
        keyboardType="phone-pad"
        style={[signupstyles.textInput,{ color: colors.text }]}
          autoCapitalize="none"
          onChangeText={(val) => handle_sos_first_number(val)}
        >{state.sos_user1_number}
        </TextInput>
        {state.check_textInput_user1_sos_number === true ?
                <Animatable.View
                  animation="bounceIn">
                  <Feather
                    style={{alignSelf:'stretch'}}
                    name="check-circle"
                    color="green"
                    size={20}
                  />
                </Animatable.View>
                : null}

          <Feather style={EditProfileScreen.editicon} name="edit-2" color={colors.text} size={20} />
          </View>
      </View>

      <View style={EditProfileScreenStyles.cardview}>
        <Text style={styles.sos_user}>Second User Detail</Text>
        <View style={[signupstyles.action,{marginRight:'2%'}]}>
        <TextInput placeholder="Second User Name"
          style={[signupstyles.textInput,{ color: colors.text }]}
          autoCapitalize="none"
          onChangeText={(val) => handle_sos_sec_name(val)}
        >{state.sos_user2}
        </TextInput>
		{state.check_textInput_user2_sos_name ===true ?
                <Animatable.View
                  animation="bounceIn">
                  <Feather
                    style={{alignSelf:'stretch'}}
                    name="check-circle"
                    color="green"
                    size={20}
                  />
                </Animatable.View>
                : null}
				 <Feather style={EditProfileScreen.editicon} name="edit-2" color={colors.text} size={20} />
         </View>
		 <View style={[signupstyles.action,{marginRight:'2%'}]}>
        <TextInput placeholder="Second User Number"
		 keyboardType="phone-pad"
          style={[signupstyles.textInput,{ color: colors.text }]}
          autoCapitalize="none"
          onChangeText={(val) => handle_sos_sec_number(val)}
        >{state.sos_user2_number}
        </TextInput>
		{state.check_textInput_user2_sos_number === true ?
                <Animatable.View
                  animation="bounceIn">
                  <Feather
                    style={{alignSelf:'stretch'}}
                    name="check-circle"
                    color="green"
                    size={20}
                  />
                </Animatable.View>
                : null}

          <Feather style={EditProfileScreen.editicon} name="edit-2" color={colors.text} size={20} />
        </View>
      </View>

      <View style={EditProfileScreenStyles.cardview} >
        <Text  style={styles.sos_user}>Third User Detail</Text>
        <View style={[signupstyles.action,{marginRight:'2%'}]}>
        <TextInput placeholder="Third User Name"
          style={[signupstyles.textInput,{ color: colors.text }]}
          autoCapitalize="none"
          onChangeText={(val) => handle_sos_third_name(val)}
        >{state.sos_user3}
        </TextInput>
        {state.check_textInput_user3_sos_name ===true ?
                <Animatable.View
                  animation="bounceIn">
                  <Feather
                    style={{alignSelf:'stretch'}}
                    name="check-circle"
                    color="green"
                    size={20}
                  />
                </Animatable.View>
                : null}
          <Feather style={EditProfileScreen.editicon} name="edit-2" color={colors.text} size={20} />
         </View>
         <View style={[signupstyles.action,{marginRight:'2%'}]}>
        <TextInput placeholder="Third User Number"
        keyboardType="phone-pad"
        style={[signupstyles.textInput,{ color: colors.text }]}
          autoCapitalize="none"
          onChangeText={(val) => handle_sos_third_number(val)}
        >{state.sos_user3_number}
        </TextInput>
        {state.check_textInput_user3_sos_number === true ?
                <Animatable.View
                  animation="bounceIn">
                  <Feather
                    style={{alignSelf:'stretch'}}
                    name="check-circle"
                    color="green"
                    size={20}
                  />
                </Animatable.View>
                : null}

          <Feather style={EditProfileScreen.editicon} name="edit-2" color={colors.text} size={20} />
          </View>
      </View>

      <View >
        <TouchableOpacity style={EditProfileScreen.submit} onPress={() => SubmitHandler()}>
          <Text style={EditProfileScreen.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>


    </View>
    </ScrollView>
    );
};

export default SOSData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sos_user: {
    alignSelf:'center',
    fontWeight: 'bold'
  },
  action: {
    flexDirection: 'row',   
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    //alignContent:'stretch'
    // marginBottom: '3%',
},
});
