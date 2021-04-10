import React, { useEffect, useState,useRef } from 'react';
import {
  View, Button, StyleSheet, SafeAreaView,
  Alert, ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { styles as ProfileScreenStyles } from '../ProfileScreen/ProfileScreen';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Zocial from 'react-native-vector-icons/Zocial';
import { styles as EditProfileStyles } from '../ProfileScreen/EditProfileScreen';
import {Server_URL} from '../../components/Parameter';
import NetInfo from "@react-native-community/netinfo";
const Donor_Details = (props) => {
  const { colors } = useTheme();
  const initialState = {
    isLoading: false,
    requestid: props.route.params.data.bloodrequestid,
    donormobilenumber: props.route.params.data.donormobilenumber,
    status: props.route.params.data.requeststatus,
  };

  const [state, setState] = useState(initialState);
  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
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
		handleDonated();
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
  
  const Donatehandler=()=>{
	  loadProducts();
  }

  const handleDonated = () => {

    setState({
      ...state, isLoading: true,
    });
	let API_URL = `${Server_URL}/Blood_Request_Component/accept_handler_in_RequestList.php`;
    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will pass our input data to server
        mobile: state.donormobilenumber,
        requestid: state.requestid,
        bloodstatus: 'Donor Donated',
        requesterid: 0
      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson "+responseJson );
        console.log(responseJson);
        setState({
          ...state, isLoading: false,
        });
        if (responseJson == "Donor Donated") {
          Alert.alert("Donor Donated", 'Donor status has been updated', [
            { text: 'Okay' }
          ]);

        }
        else if (responseJson == "Already Donated") {
          Alert.alert("Done!", 'Already Donated', [
            { text: 'Okay' }
          ]);
          console.log("Already Donated");

        }
        else if (responseJson == "Already Accepted") {
          Alert.alert("Already Accepted", 'Your Acceptance has been recorded.', [
            { text: 'Okay' }
          ]);
          console.log("Accepted")

        }
        else if (responseJson == "Closed") {
          Alert.alert("Request Closed!", 'This Request cannot be changed due to the Request is in Closed statues', [
            { text: 'Okay' }
          ]);
          console.log("Accepted")

        }
        else if (responseJson == "Accepted") {
          Alert.alert("Accepted", 'Your Acceptance has been recorded.', [
            { text: 'Okay' }
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
            { text: 'Okay' }
          ]);
          console.log("Invalid user")

        }
        else {
          Alert.alert("Failed!", 'Something went wrong', [
            { text: 'Okay' }
          ]);
        }
        props.navigation.navigate('My_Request_Display');

      })
      .catch((error) => {
        console.error(error);
      });

  }

  return (
    <ScrollView>
      <SafeAreaView style={[{ paddingTop: '7%' }]} >
        <View style={[ProfileScreenStyles.cardview, { alignSelf: 'stretch', fontSize: 30, fontWeight: 'bold' }]}>
          <Text style={[{ alignSelf: 'center', fontSize: 30, fontWeight: 'bold' }]} >Details</Text>
        </View>
        <View style={[ProfileScreenStyles.cardview, { margin: '10%', padding: '10%', marginTop: '5%', marginBottom: '3%' }]}>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <FontAwesome name="id-badge" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>Request Id: {props.route.params.data.bloodrequestid}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <FontAwesome name="id-badge" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>Donation Id: {props.route.params.data.blooddonatedid}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <Text style={{ marginLeft: '4%' }}>Donor name {props.route.params.data.donorusername}</Text>
          </View>

          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <Icon style={{ color: 'green' }} name="phone" color={colors.text} size={20} />
            <Text style={{ marginLeft: '3%' }}>Donor number {props.route.params.data.donormobilenumber}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <Icon name="email" color={colors.text} size={20} />
            <Text style={{ marginLeft: '3%' }}>Donor Email: {props.route.params.data.donoremail}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%', }]}>
            <Fontisto style={{ marginLeft: '1%' }} name="blood-drop" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>Donor Blood Group: {props.route.params.data.donorbloodgroup}</Text>
          </View>

          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <Text style={{ marginLeft: '4%' }}>Donor Gender: {props.route.params.data.donorgender}</Text>
          </View>

          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <Zocial name="statusnet" color={colors.text} size={20} />
            <Text style={{ marginLeft: '4%' }}>Donor Request Status: {props.route.params.data.requeststatus}</Text>
          </View>

        </View>

        <View style={[{ paddingBottom: '2%' }]}>
          <TouchableOpacity style={[EditProfileStyles.submit, 
            { padding: '3%', margin: '5%', marginBottom: '1%' }]}
             onPress={() => Donatehandler()}>
            <Text style={EditProfileStyles.panelButtonTitle}>Donated</Text>
          </TouchableOpacity>
        </View>
        <View style={[{ paddingBottom: '2%' }]}>
          <TouchableOpacity style={[EditProfileStyles.submit, 
          { padding: '3%', margin: '5%', marginTop: '1%', backgroundColor: 'black' }]}
            onPress={() => props.navigation.navigate('My_Request_Display')}>
            <Text style={EditProfileStyles.panelButtonTitle}>Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>

  );
};


export default Donor_Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
