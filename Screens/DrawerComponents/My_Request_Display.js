import React, { useEffect, useState, useRef } from 'react';
import {
  View, Button,ToastAndroid,
  StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity,
  FlatList,Alert,
} from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { styles as ProfileScreenStyles } from '../ProfileScreen/ProfileScreen';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Zocial from 'react-native-vector-icons/Zocial';
import {Server_URL} from '../../components/Parameter';
import { styles as EditProfileStyles } from '../ProfileScreen/EditProfileScreen';
import NetInfo from "@react-native-community/netinfo";
const My_Request_Display = (props) => {
  const { colors } = useTheme();
  const initialState = {
    nodonor: props.route.params.noofdonoraccepted,
    isLoading: true,
    requestid: props.route.params.bloodrequestid,
    checkserverdata: true,
    status:props.route.params.status,
    data: '',
	handlerequestflag:false,
  };
  const [state, setState] = useState(initialState);
  var setupretrivedata;
  
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
    let checkserverdata=state.checkserverdata;
	let handlerequestflag=state.handlerequestflag;
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
        console.log("You are checkserverdata", checkserverdata);
        if (checkserverdata) {
          console.log("[My_Request_Display] requestid " + state.requestid);
          onRetriveDonorData();
        }		
		if (handlerequestflag) {
          console.log("[My_Request_Display] confirmhandler path ");
          confirmhandler();
        }
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
  
  useEffect(() => {
	 loadProducts();
    console.log("[My_Request_Display]status " + state.status);
    

  }, []);
  // if (state.nodonor > 0) {
  //   console.log(" nodonor: " + state.nodonor);
  //   //onRetriveDonorData();
  //   setState(
  //     {
  //       ...state,
  //       isLoading: false,
  //     },
  //   );
  // }
  // else {
  //   setState(
  //     {
  //       ...state,
  //       isLoading: false,
  //     },
  //   );
  // }

  const onRetriveDonorData = () => {
	let API_URL = `${Server_URL}/Blood_Request_Component/display_donors.php`;
    //let API_URL = 'http://192.168.0.9/help_1/Blood_Request_Component/display_donors.php';
    // setmarkers:{isloading:true};
    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        requestid: state.requestid
      })

    }).then(res => res.json()).then(res => {
      //console.log("myssss");
      console.log(res);
      console.log("[My_Request_Display] res.BloodRequestId " + res.BloodRequestId);
      setState({
        ...state,
        checkserverdata: false,
        isLoading: false,
      });
      //console.log(state.isRequestCompleted);

      console.log("[My_Request_Display] isLoading " + state.isLoading);
      if (res == "No") {
        console.log("No");
        setState({
          ...state,
          isLoading: false,
          checkserverdata: false,
        });
        // ToastAndroid.show("No Blood  Request is Available, Please try after some time",ToastAndroid.LONG);
        // console.log(state.isBoodRequestAvailable);
        // console.log(" onMapget2 state.isRequestCompleted");
        // console.log(state.isRequestCompleted);
      }
      else {


        setupretrivedata = JSON.parse(res);
        console.log("[My_Request_Display] retriveserverdata before");
        console.log(setupretrivedata);
        console.log(setupretrivedata.BloodRequestId);
        setState({
          ...state,
          isLoading: false,
          checkserverdata: false,
          data: setupretrivedata,
        });
        console.log("state.data");
        console.log(state.data);
        // console.log(state.isBoodRequestAvailable);
      }
      //console.log("retriveserverdata after"+state.retrivemydonateddata);  
    })
      .catch((error) => {
        console.error(error);
      });
  }
  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handlepress =(item) =>{
    console.log("donorusername "+ item.donorusername);
    console.log("donormobilenumber "+ item.donormobilenumber);
        
    props.navigation.navigate('Donor_Display', {
      data:item,      
    });
    console.log("after "+ state.checkdiplayselected);
  }

  const renderHeader = () => {
    return <View>
      <View style={[ProfileScreenStyles.cardview, { alignSelf: 'stretch', fontSize: 30, fontWeight: 'bold' }]}>
        <Text style={[{ alignSelf: 'center', fontSize: 30, fontWeight: 'bold' }]} >Details</Text>
      </View>
      <View style={[ProfileScreenStyles.cardview, { margin: '10%', padding: '10%', marginTop: '5%', marginBottom: '3%' }]}>
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
          <Text style={{ marginLeft: '2%' }}>Required Type: {props.route.params.requiredtype}</Text>
        </View>
        <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
          <Fontisto style={{marginLeft: '1%' }} name="blood-drop" color={colors.text} size={20} />
          <Text style={{ marginLeft: '5%' }}>Blood Group: {props.route.params.bloodgroup}</Text>
        </View>
        <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
          <Icon name="blood-bag" color={colors.text} size={20} />
          <Text style={{ marginLeft: '3%' }}>Blood Unit: {props.route.params.noofunits}</Text>
        </View>
        <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <Text style={{ marginLeft: '5%' }}>Contact Name: {props.route.params.patientname}</Text>
        </View>
        {props.route.params.replacement !== " " && props.route.params.replacement !== null ?
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
        <View style={[ProfileScreenStyles.row,]}>
          <Zocial name="statusnet" color={colors.text} size={20} />
          <Text style={{ marginLeft: '5%' }}>status: {props.route.params.status}</Text>
        </View>
        <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <Text style={{ marginLeft: '5%' }}>No of Donor Accepted: {props.route.params.noofdonoraccepted}</Text>
        </View>
      </View>
      {props.route.params.noofdonoraccepted >0 ?
      <View style={[ProfileScreenStyles.cardview, 
        { margin: '20%', padding: '5%', marginTop: '3%',alignItems:'center', marginBottom: '3%' }]}>

      <Text style={{fontWeight:'bold',fontStyle:'italic',fontSize:25}}>Donors</Text>
      </View>
      :null}
    </View>

  }

  const renderFooter=()=>{
    return <View>
      {state.status !="Active" 
           ?  
       <View style={[{margin:'3%',marginBottom:'1%' }]}>
            <TouchableOpacity style={[EditProfileStyles.submit,
             { padding: '3%',marginTop:'1%',backgroundColor:'black' }]}
             onPress={() =>checkconfirmhandler()}>
              <Text style={EditProfileStyles.panelButtonTitle}>Close the Request</Text>
            </TouchableOpacity>
        </View>
        :null}
        {state.status !="Active" ?
        <View style={[{ paddingBottom: '2%',margin:'3%',marginTop:'1%' }]}>
          <TouchableOpacity style={[EditProfileStyles.submit,
          { padding: '3%',marginTop:0,backgroundColor:'black' }]}
          onPress={() =>activatehandler()}>
            <Text style={EditProfileStyles.panelButtonTitle}>Activate the Request</Text>
          </TouchableOpacity>
        </View>:null}
    </View>
  }

  // const renderFooter=(item)=>{
  //   console.log("renderFooter ");
  //   console.log(item);
  //   return <View>
  //     <Text>{item}</Text>
  //   </View>

  // }

  const activatehandler=()=>{
    
    Alert.alert(
      'Activate this Request?',
      'Want to Activate this Request?',
      [
        {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
        {text: 'YES', onPress: () => handlerequest('Active')},
      ]
    );
  }

  const checkconfirmhandler=()=>{
		setState({
        ...state,
        handlerequestflag: true,
      });
		loadProducts();	  
  }

  const confirmhandler=()=>{
    
    Alert.alert(
      'Close this Request?',
      'Want to Close this Request?',
      [
        {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
        {text: 'YES', onPress: () => handlerequest('Closed')},
      ]
    );
  }
  
  const handlerequest = (request) => {
    console.log("request "+request);
    setState({
      ...state, 
	  isLoading: true,
	  handlerequestflag:false,      
    });
	let API_URL = `${Server_URL}/Blood_Request_Component/close_request_handler_in_RequestList.php`;
    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will pass our input data to server       
        requestid:props.route.params.bloodrequestid,
        bloodstatus:request        
      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson "+responseJson);
        console.log(responseJson);
        setState({
          ...state, isLoading: false,      
        });
        if (responseJson == "Closed") {
          Alert.alert("Closed", 'The Request statues is changed to closed', [
            { text: 'Okay' }
          ]);
          
        }
        else if (responseJson == "Donor Donated and Closed") {
          Alert.alert("Done!", 'The Request statues is changed to Donor Donated and Closed!', [
              {text: 'Okay'}
          ]);
          console.log("Donor Donated and Closed");
         
        }
        else if (responseJson == "Active") {
          Alert.alert("Active", 'The Request statues is changed to Active status.', [
              {text: 'Okay'}
          ]);
          console.log("Accepted");          
        }
        else if (responseJson == "Already Active") {
          Alert.alert("Active", 'This Request is already in Active status', [
              {text: 'Okay'}
          ]);
          console.log("Accepted");          
        }
        else if (responseJson == "Already Closed") {
          Alert.alert("Already Closed!", 'This Request is already in Closed status', [
              {text: 'Okay'}
          ]);
          console.log("Activate");          
        }
        else if (responseJson == "Activate") {
          Alert.alert("Activated!", 'This Request is in Activate Status', [
            { text: 'Okay' }
          ]);          
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
        //props.navigation.navigate('My_Request_Raised');

      })
      .catch((error) => {
        console.error(error);
      });

  }

  return (
    <SafeAreaView style={[{ paddingTop: '3%' }]} >

      <FlatList
        data={state.data}
        renderItem={({ item }) => (
          <View
          // style={[{paddingLeft:'5%'}]}
          >
            <TouchableOpacity style={[ProfileScreenStyles.cardview,
            {
              alignItems: 'stretch',
              borderRadius: 25, padding: '4%'
            }]
            }
            onPress ={()=> handlepress(item)}
            >
              
              {item.noofdonoraccepted > 0 ?
                <View style={[ProfileScreenStyles.row, { margin: '1%', marginLeft: '5%' }]}>
                  <FontAwesome name="user-o" color={colors.text} size={20} />
                  <Text style={{ fontWeight: 'bold', marginLeft: '3%' }}>No of Donor Accepted: {item.BloodRequestId}</Text>
                </View>
                : null}
              <View style={[ProfileScreenStyles.row, { margin: '1%', marginLeft: '5%' }]}>
                <FontAwesome name="user-o" color={colors.text} size={20} />
                <Text style={{ marginLeft: '3%' }}>Donor Name: {item.donorusername}</Text>
              </View>
              <View style={[ProfileScreenStyles.row, { margin: '1%', marginLeft: '5%' }]}>
                <Icon style={{ color: 'green' }} name="phone" color={colors.text} size={20} />
                <Text style={{ marginLeft: '3%' }}>Donor Number: {item.donormobilenumber}</Text>
              </View>
              <View style={[ProfileScreenStyles.row, { margin: '1%', marginLeft: '5%' }]}>
                <Fontisto name="blood-drop" color={colors.text} size={20} />
                <Text style={{ marginLeft: '3%' }}>Donor Blood group: {item.donorbloodgroup}</Text>
              </View>
              <View style={[ProfileScreenStyles.row, { margin: '1%', marginLeft: '5%' }]}>
              <Icon name="email" color={colors.text} size={20} />
                <Text style={{ marginLeft: '3%' }}>Donor email: {item.donoremail}</Text>
              </View>
            </TouchableOpacity>

            {/* // <ListItem                  
                //   style={[ ProfileScreenStyles.cardview,
                //     {borderRadius:25,borderColor:'blue',margin:'2%',padding:'5%'} ]}              
                //   title={`Hospital Name: ${item.hospitalname}`}
                //   subtitle={`Contact Name: ${item.patientname}`}                                  
                //   onPress={()=> handlepress(item)}
                  
                // />  */}

          </View>
        )}
        keyExtractor={item => item.blooddonatedid}
        // ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={item=>renderFooter(item.donormobilenumber)}
      // onRefresh={handleRefresh}
      // refreshing={state.refreshing}                
      >

      </FlatList>


    </SafeAreaView>


  );
};


export default My_Request_Display;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
