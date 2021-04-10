import React, { useEffect,useRef } from 'react';
import {
  View, Button, StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import { useTheme, Text,ActivityIndicator } from 'react-native-paper';
import { styles as ProfileScreenStyles } from '../ProfileScreen/ProfileScreen';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Zocial from 'react-native-vector-icons/Zocial';
import { useSelector, useDispatch, useCallback } from 'react-redux';
import { styles as EditProfileStyles } from '../ProfileScreen/EditProfileScreen';
import NetInfo from "@react-native-community/netinfo";
import {Server_URL} from '../../components/Parameter';
import Share, {
  ShareSheet,
  //Button
}
  // as ShareButton
  from 'react-native-share';
const Requester_Details = (props) => {
  const { colors } = useTheme();

  const initialRequesterDetails = {
    userid: props.route.params.userid,
    isLoading:false,
  };

  const [state, setState] = React.useState(initialRequesterDetails);

  const user_data_user_number = useSelector(state =>
    state.helpone.user_number,
  );
  const user_data_user_Id = useSelector(state =>
    state.helpone.user_Id,
  );

  useEffect(() => {
    // console.log('user_data_user_name sdf'+user_data_user_name);


  });
   const [error, setError] = useState();
  const [isloading, setIsLoading] = useState(true);
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
		donorAcceptHandler();
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
  
  
  const handleDonate = () => {
    console.log("refresh");
    console.log("state.userid " + state.userid);
    console.log("user_data_user_Id " + user_data_user_Id);
    setState({
      ...state, isLoading: true,      
    });
    if (state.userid === user_data_user_Id) {
      console.log("You cannot donate to your Blood request raised");
      ToastAndroid.show("You cannot donate to your Blood request raised", 200, ToastAndroid.LONG);
      return ;
    }
    console.log("refressdfh");
    //donorAcceptHandler();
	loadProducts();
  }

  // if (state.isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  const donorAcceptHandler = () => {
	 let API_URL = `${Server_URL}/Blood_Request_Component/accept_handler_in_RequestList.php`;
    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will pass our input data to server
        mobile: user_data_user_number,
        requestid: props.route.params.bloodrequestid,
        bloodstatus:'Donor Accepted',
        requesterid: props.route.params.userid
      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson");
        console.log(responseJson+state.isLoading);
        setState({
          ...state, isLoading: false,      
        });
        if (responseJson == "Updated") {
          Alert.alert("Updated", 'Your data is updated', [
            { text: 'Okay' }
          ]);
          
        }
        else if (responseJson == "Already Accepted") {
          Alert.alert("Done!", 'Already Accepted!', [
              {text: 'Okay'}
          ]);
          console.log("Already Accepted");         
        }
        else if (responseJson == "Same id") {
          Alert.alert("Same id!", 'You cannot be a donor for your Request!', [
              {text: 'Okay'}
          ]);
          console.log("Already Accepted");         
        }
        else if (responseJson == "Accepted") {
          Alert.alert("Accepted", 'Your Acceptance has been recorded.', [
              {text: 'Okay'}
          ]);
          console.log("Accepted")
          
        }
        else if (responseJson == "No data in List") {
          Alert.alert("No data!", 'No data in List', [
            { text: 'Okay' }
          ]);
          
        }
        else if (responseJson == "Not Updated'") {
          Alert.alert("Failed!", 'Not Updated', [
            { text: 'Okay' }
          ]);
          
        }
        else if (responseJson == "Invalid user") {
          Alert.alert("Invalid user", 'Wrong Information', [
              {text: 'Okay'}
          ]);
          console.log("Invalid user")        
         
        }
        else{
          Alert.alert("Failed!", 'Something went wrong', [
            { text: 'Okay' }
          ]);
        }
        //props.navigation.navigate('Home');

      })
      .catch((error) => {
        console.error(error);
      });

  }

  const [shareOptions, setshareOptions] = React.useState({
    title: '',
    message: "",
    subject: "",
  })

  const messagehandle = async () => {

    setshareOptions({
      ...shareOptions,
      title: 'Blood Request!',
      message: 'Hospital: ' + props.route.params.hospital +
        ' Patient Name: ' + props.route.params.contact_name +
        '   Contact Number: ' + props.route.params.contactnumber +
        '   bloodgroup: ' + props.route.params.bloodgroup +
        ' From Help One',
      subject: "Blood Request from Help One"
    });

    try {

      const result = await Share.open(shareOptions)
        .then((res) => {
          console.log(res);
          ToastAndroid.show("Shared", 200, ToastAndroid.LONG);
        });



      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log("action == shared");
        } else {
          console.log("action not= shared");
          // shared
        }
      }

      if (result.action === "shared") {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log("action == shared");
        } else {
          console.log("action not= shared");
          // shared
        }
      }

      else if (result.action === Share.dismissedAction) {
        console.log("dis dismissedAction  shared " + result.action);
      }
      console.log(" shared action " + result.action);
      console.log(" shared result action" + result);
    }
    catch (error) {
      console.log("catch error" + error);
      if (error.message === "User did not share") {
        console.log("Message is not shared");
        ToastAndroid.show(" Message is not shared", 200, ToastAndroid.LONG);
      }
      else {
        alert(error.message);
      }
    }


  };


  return (
    <ScrollView>

      <SafeAreaView style={[{ paddingTop: '7%' }]} >
        <View style={[ProfileScreenStyles.cardview, { alignSelf: 'stretch', fontSize: 30, fontWeight: 'bold' }]}>
          <Text style={[{ alignSelf: 'center', fontSize: 30, fontWeight: 'bold' }]} >Details</Text>
        </View>
        <View style={[ProfileScreenStyles.cardview, { margin: '10%', padding: '10%', marginTop: '5%' }]}>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <FontAwesome name="id-badge" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>Request Id: {props.route.params.bloodrequestid}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            {/* <Icon style={{color:'green'}} name="phone" color={colors.text} size={20}/> */}
            {/* <Text style={{color:colors.text, marginLeft: 20}}>{user_data_user_number}</Text> */}
            {/* <Text>{props.route.params.phoneNumber}</Text> */}
            <FontAwesome name="hospital-o" color={colors.text} size={20} />
            <Text style={{ marginLeft: '3%' }}>Hospital Name: {props.route.params.hospital}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <Icon name="test-tube-empty" color={colors.text} size={20} />
            <Text style={{ marginLeft: '2%' }}>Required Type: {props.route.params.requesttype}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <Fontisto name="blood-drop" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>Blood Group: {props.route.params.bloodgroup}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <Icon name="blood-bag" color={colors.text} size={20} />
            <Text style={{ marginLeft: '3%' }}>Blood Unit: {props.route.params.noofunits}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <Icon name="blood-bag" color={colors.text} size={20} />
            <Text style={{ marginLeft: '3%' }}>Donor Accepted : {props.route.params.noofdonoraccepted}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>Contact Name: {props.route.params.contact_name}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>Contact Number: {props.route.params.contactnumber}</Text>
          </View>
          {props.route.params.replacement === "Yes" && props.route.params.replacement === "No" ?
            <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
              <FontAwesome name="refresh" color={colors.text} size={20} />
              <Text style={{ marginLeft: '5%' }}>Replacement: {props.route.params.replacement}</Text>
            </View>
            : null}
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <FontAwesome name="address-book" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>Address: {props.route.params.address}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <Icon name="map-marker-radius" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>Pincode: {props.route.params.pincode}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <Zocial name="statusnet" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>status: {props.route.params.status}</Text>
          </View>

          <View style={[{ paddingBottom: '2%' }]}>
            <TouchableOpacity style={[EditProfileStyles.submit, { padding: '5%' }]} onPress={() => handleDonate()}>
              <Text style={EditProfileStyles.panelButtonTitle}>Donate</Text>
            </TouchableOpacity>
          </View>

          <View style={[{ paddingBottom: '2%' }]}>
            <TouchableOpacity style={[EditProfileStyles.submit, { padding: '5%', backgroundColor: 'green' }]} onPress={() => messagehandle()}>
              <Text style={EditProfileStyles.panelButtonTitle}>Share</Text>
            </TouchableOpacity>
          </View>

        </View>

      </SafeAreaView>
    </ScrollView>

  );
};


export default Requester_Details;

