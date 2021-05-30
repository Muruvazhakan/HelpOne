import React, { useEffect, useState,useRef } from 'react';
import {
  View, Button,
  StyleSheet, Alert, FlatList, SafeAreaView, ActivityIndicator, ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles as ProfileScreenStyles } from '../../Screens/ProfileScreen/ProfileScreen';
import { useSelector } from 'react-redux';
import { List, ListItem, SearchBar } from "react-native-elements";
import { TouchableRipple, useTheme, Text } from 'react-native-paper';
import { styles as EditProfileStyles } from '../../Screens/ProfileScreen/EditProfileScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { styles as signupstyles } from '../SignIn/SignUpScreen';
import { styles as BloodRequestScreenStyles } from '../../Screens/Blood_Request/Blood_Request_Screen';
import FlipCard from 'react-native-flip-card';
import { red } from '@material-ui/core/colors';
import {Server_URL} from '../../components/Parameter';
import NetInfo from "@react-native-community/netinfo";
const User_Display_List = ({ navigation }) => {

  const { colors } = useTheme();

  const user_data_user_number = useSelector(state =>
    state.helpone.user_number,
  );
  var retrivemydonateddata = [];
  const initialState = {
    retrivemydonateddata,
    checkserverdata: true,
    refreshing: false,
    checkdataavailable: false,
    contact_name: "",
    user_number: user_data_user_number,
    contact_number: "",
    hospitalname: null,
    pincode: null,
    noofunits: 0,
    BloodGroup: null,
    status: null,
    requiredtype: '',
    replacementavailable: '',
    loactionAddress: {
      address: ' test address',
      city: 'test city',
      area: ' test area',
      statename: 'test state ',
      latitude: 37.425998333,
      longitude: -110.125100000,
    },
    noofdonoraccepted: 0,
    bloodrequesttime: '',
    isLoading: true,
    checkdiplayselected: false,
    selectedvalue: [],
    fulldata: [],
    search: '',
  };

  const [state, setState] = useState(initialState);
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
		onRetrivemydonateddata();
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

    if (state.checkserverdata) {
      //onRetrivemydonateddata();
	  loadProducts();
    }

  }, []);
  var setupretrivedata = [];
  const onRetrivemydonateddata = async () => {
	 let API_URL = `${Server_URL}/my_donation_retrive_data.php`;
    //let API_URL = 'http://192.168.0.9/help_1/my_donation_retrive_data.php';
    //let API_URL= 'https://storage.googleapis.com/helpone-9bf33.appspot.com/HelpOne_Seerver_Files/my_donation_retrive_data.php';

    // setmarkers:{isloading:true};
    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        mobile: user_data_user_number
      })

    }).then(res => res.json()).then(res => {
      //console.log("myssss");
      console.log(res);

      //console.log(state.isRequestCompleted);
      setState({
        ...state,
        checkserverdata: false,
        isLoading: false,
        refreshing: false,
      });
      console.log("isLoading " + state.isLoading);
      if (res == "No") {
        console.log("No");
        setState({
          ...state,
          checkdataavailable: false,
          isLoading: false,
        });
        // ToastAndroid.show("No Blood  Request is Available, Please try after some time",ToastAndroid.LONG);
        // console.log(state.isBoodRequestAvailable);
        // console.log(" onMapget2 state.isRequestCompleted");
        // console.log(state.isRequestCompleted);
      }
      else {


        setupretrivedata = JSON.parse(res);
        console.log("retriveserverdata before");
        console.log(setupretrivedata);
        setState({
          ...state,
          checkserverdata: false,
          checkdataavailable: true,
          isLoading: false,
          retrivemydonateddata: setupretrivedata,
          fulldata: setupretrivedata,

        });

        // console.log(state.isBoodRequestAvailable);
      }
      //console.log("retriveserverdata after"+state.retrivemydonateddata);  
    })
      .catch((error) => {
        console.error(error);
      });
  }
  let sea = "";
  const updateSearch = search => {

    let text = search.replace(/\s/g, '');
    // let text =search;
    let tempfulldata = state.fulldata;

    //  let textaa =val.stringify();
    //  console.log("updateSearch textaa "+ textaa );
    setState({ ...state, search: text, });
    console.log("updateSearch text " + text);
    console.log("updateSearch sea " + sea);
    let filteredName = tempfulldata.filter((val) => {
      console.log("val text " + val.bloodgroup);
      return val.hospitalname.toLowerCase().match(text);
    });
    console.log("tempfulldata text " + tempfulldata.bloodgroup);
    console.log("filteredName text " + filteredName.bloodgroup);


    if (!text || text === '') {
      console.log('change state');
      setState({
        ...state,
        retrivemydonateddata: tempfulldata,
        search: text,
      });
    }
    else if (!Array.isArray(filteredName) && !filteredName.length) {
      console.log("not name");
      setState({
        ...state,
        retrivemydonateddata: [],
        search: text,
      });
    }
    // if name matches then display
    else if (Array.isArray(filteredName)) {
      console.log('Name');
      setState({
        ...state,
        retrivemydonateddata: filteredName,
        search: text,
      });
    }
    if ('' == search) {
      setState({
        retrivemydonateddata: state.fulldata,
      });
      return;
    }
    // state.retrivemydonateddata
    let filet = state.fulldata.filter(function (item) {
      return item.hospitalname.includes(search);
    }).map(function ({ address, hospitalname }) {
      return { address, hospitalname };
    });
    console.log("updateSearch filet " + filet);


  };


  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleRefresh = () => {
    console.log("refresh");
    ToastAndroid.show("Refreshed", 200, ToastAndroid.LONG);

    setState(
      {
        ...state,
        checkserverdata: true,
        isLoading: true,
        refreshing: true,
        search: '',
        // retrivemydonateddata:state.fulldata,
      },
    );
    //onRetrivemydonateddata();
	loadProducts();
  };

  const handlepress = (item) => {
    console.log("noofunits " + item.patientname);
    console.log("click " + item.requiredtype);
    console.log("before " + state.checkdiplayselected);
    if (state.checkdiplayselected) {
      setState({
        ...state,
        checkdiplayselected: true,
        selectedvalue: item,
      });
    }
    navigation.navigate('My_Donated_Display', {
      bloodgroup: item.bloodgroup,
      hospital: item.hospitalname,
      bloodrequestid: item.bloodrequestid,
      contact_name: item.description,
      patientname: item.patientname,
      noofunits: item.noofunits,
      replacement: item.replacement,
      requesttype: item.requesttype,
      noofdonoraccepted: item.noofdonoraccepted,
      address: item.address,
      pincode: item.pincode,
      status: item.status,
    });
    console.log("after " + state.checkdiplayselected);
  }

  const renderHeader = () => {
    return <SearchBar
      placeholder="Type Here..."
      lightTheme
      round
      // value={sea}
      // onChangeText={(val)=>{
      //   setState({
      //     ...state,
      //     search:val,
      //   })
      //   sea=sea+val;
      //   console.log("search "+state.search);
      // }}
      value={state.search}
      onChangeText={updateSearch}
    // onChangeText={(val) => updateSearch(val)}
    />;

    // return  <TextInput 
    // placeholder="Search here"
    // placeholderTextColor="#000"
    // autoCapitalize="none"

    // style={{flex:2,padding:0}}
    // contentInset={{
    //   top:0,
    //   left:0,
    //   bottom:0,
    //   right:20
    // }}
    // onChangeText={updateSearch}
    // // onChangeText={(val) => updateSearch(val)}
    // >{state.search} </TextInput>

  };

  const renderFooter = () => {
    if (!state.checkserverdata) return (
      <TouchableRipple style={EditProfileStyles.submit} onPress={() => handleRefresh()}>
        <Text style={EditProfileStyles.panelButtonTitle}>Refresh</Text>
      </TouchableRipple>
    );

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
        <Text>---</Text>
      </View>

    );
  };




  return (
    <SafeAreaView style={[ProfileScreenStyles.container, { margin: '2%', paddingBottom: '5%' }]}>
      <View containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>

        {state.checkdataavailable ?
          <View>
            {/* <Text>Search</Text> */}

            <FlatList
              data={state.retrivemydonateddata}
              renderItem={({ item }) => (
                <View
                // style={[{paddingLeft:'5%'}]}
                >
                  <FlipCard
                    // style={styles.cardview}
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={false}
                    clickable={true}
                    onFlipEnd={(isFlipEnd) => { console.log('isFlipEnd', isFlipEnd) }}
                  >

                    <View style={[ProfileScreenStyles.cardview, { padding: '4%',
                   // backgroundColor: item.noofdonoraccepted >  0 && colors.text==="#333333" ?'#7FFF30': item.noofdonoraccepted >  0 && colors.text !=="#333333" ?'#70AF49':null
                   backgroundColor: item.noofdonoraccepted > 0 && colors.text === "#333333" ? '#ffc' : '#fff'
                     }]}>
                      <View style={[ProfileScreenStyles.row, { margin: '1%', marginLeft: '5%' }]}>
                        <FontAwesome name="hospital-o" color={colors.text} size={20} />
                        <Text style={{ fontWeight: 'bold', marginLeft: '3%' }}>Hospital Name: {item.hospitalname}</Text>
                      </View>
                      <View style={[ProfileScreenStyles.row, { margin: '1%', marginLeft: '5%' }]}>
                        <FontAwesome name="user-o" color={colors.text} size={20} />
                        <Text style={{ marginLeft: '3%' }}>Name: {item.patientname}</Text>
                      </View>
                      {item.noofdonoraccepted > 0 ?
                        <View style={[ProfileScreenStyles.row, { margin: '1%', marginLeft: '5%' }]}>
                          <FontAwesome name="user-o" color={colors.text} size={20} />
                          <Text style={{ fontWeight: 'bold', marginLeft: '3%' }}>No of Donor Accepted: {item.noofdonoraccepted}</Text>
                        </View>
                        : null}
                    </View>
                    <View style={[ProfileScreenStyles.cardview, { padding: '4%',
                    // backgroundColor: item.noofdonoraccepted >  0 && colors.text==="#333333" ?'#7FFF30': item.noofdonoraccepted >  0 && colors.text !=="#333333" ?'#70AF49':null 
                    backgroundColor: item.noofdonoraccepted > 0 && colors.text === "#333333" ? '#ffc' : '#fff'
                    }]}>
                      <View style={[ProfileScreenStyles.row, { margin: '1%', marginLeft: '5%' }]}>
                        <FontAwesome name="hospital-o" color={colors.text} size={20} />
                        <Text style={{ fontWeight: 'bold', marginLeft: '3%' }}>Hospital Name: {item.hospitalname}</Text>
                      </View>
                      <View style={[ProfileScreenStyles.row, { margin: '1%', marginLeft: '5%' }]}>
                        <FontAwesome name="user-o" color={colors.text} size={20} />
                        <Text style={{ marginLeft: '3%' }}>Name: {item.patientname}</Text>
                      </View>
                      {item.noofdonoraccepted > 0 ?
                        <View style={[ProfileScreenStyles.row, { margin: '1%', marginLeft: '5%' }]}>
                          <FontAwesome name="user-o" color={colors.text} size={20} />
                          <Text style={{ fontWeight: 'bold', marginLeft: '3%' }}>No of Donor Accepted: {item.noofdonoraccepted}</Text>
                        </View>
                        : null}
                      
                      <View style={[ProfileScreenStyles.row, { margin: '1%', marginLeft: '5%' }]}>
                        <Icon style={{ color: 'green' }} name="phone" color={colors.text} size={20} />
                        <Text style={{ marginLeft: '3%' }}>Number: {item.contactNumber}</Text>
                      </View>
                      <View style={[ProfileScreenStyles.row, { margin: '1%', marginLeft: '5%' }]}>
                        <Icon style={{ color: 'red' }} name="calendar-today" color={colors.text} size={20} />
                        <Text style={{ marginLeft: '3%' }}>Date: {item.bloodrequesttime}</Text>
                      </View>
                      <TouchableOpacity style={[ProfileScreenStyles.cardview,
                      {
                        alignItems: 'center',
                        borderRadius: 25, padding: '4%',
                        backgroundColor: colors.background,
                      }]
                      }
                        onPress={() => handlepress(item)}>
                        <Text style={{ marginLeft: '3%', fontWeight: 'bold'}}>More Details</Text>
                      </TouchableOpacity>
                    </View>


                    {/* // <ListItem                  
                //   style={[ ProfileScreenStyles.cardview,
                //     {borderRadius:25,borderColor:'blue',margin:'2%',padding:'5%'} ]}              
                //   title={`Hospital Name: ${item.hospitalname}`}
                //   subtitle={`Contact Name: ${item.patientname}`}                                  
                //   onPress={()=> handlepress(item)}
                  
                // />  */}
                  </FlipCard>
                </View>
              )}
              keyExtractor={item => item.bloodrequestid}
              // ItemSeparatorComponent={renderSeparator}
              // ListHeaderComponent={renderHeader}
              ListFooterComponent={renderFooter}
              onRefresh={handleRefresh}
              refreshing={state.refreshing}
            // onEndReached={handleLoadMore}
            // onEndReachedThreshold={50}
            >
              {/* <Text>asas</Text>
             {!state.checkdiplayselected ?
              // <Text>{state.selectedvalue.bloodrequestid}</Text>
              <Text>asas</Text>
              :null} */}

            </FlatList>

          </View>
          : null}
        {!state.checkdataavailable ?
          <View style={[ProfileScreenStyles.cardview, { alignSelf: 'center', marginTop: '50%', padding: '8%' }]}>
            <Text>No Request raised.....!!</Text>
            <TouchableRipple style={EditProfileStyles.submit} onPress={() => handleRefresh()}>
              <Text style={EditProfileStyles.panelButtonTitle}>Refresh</Text>
            </TouchableRipple>
          </View>
          : null}

      </View>

    </SafeAreaView>
  );
};



export default User_Display_List;

export const styles = StyleSheet.create({
donoAccepted:{
  
}
});