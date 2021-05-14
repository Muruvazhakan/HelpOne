import React, { useEffect, useState, useRef } from 'react';
import {
  View, Button,
  StyleSheet, FlatList, SafeAreaView,
  Image,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles as ProfileScreenStyles } from '../ProfileScreen/ProfileScreen';
import { useSelector } from 'react-redux';
import { List, ListItem, SearchBar } from "react-native-elements";
import { TouchableRipple, useTheme, Text } from 'react-native-paper';
import { styles as EditProfileStyles } from '../ProfileScreen/EditProfileScreen';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { styles as signupstyles } from '../SignIn/SignUpScreen';
import { styles as BloodRequestScreenStyles } from '../Blood_Request/Blood_Request_Screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Home_Screen_Header from './Home_Screen_Header';
import { color } from 'react-native-reanimated';
import FlipCard from 'react-native-flip-card';
import * as gcp from '../../components/GCP_component';
import SOSScreen from '../SOS_Componet/SOSScreen';
import NetInfo from "@react-native-community/netinfo";
import {Server_URL,Image_URL} from '../../components/Parameter';
import {No_Image_Component} from './No_Image_Component';
const All_User_Donation_Bottom = (props) => {

  const { colors } = useTheme();

  const user_data_user_number = useSelector(state =>
    state.helpone.user_number,
  );
  var retrivedonor = [];
  const initialState = {
    imageLoading: true,
    retrivedonor: [],
    page: 0,
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
    network_flag: false,
  };
  var test = false;
  const [state, setState] = useState(initialState);

  // useEffect(() => {

  //   if (state.checkserverdata) {
  //     onRetrivemydonordata();


  //   };

  // }, []);
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
        onRetrivemydonordata();
        if (offline === 1) {
          ToastAndroid.show("Back to online!", ToastAndroid.SHORT);
        }

      }

    });

    const errorAlerthandler = () => {
      console.log("errorAlerthandler");
      setOfflinemsgflag(false);
      checkConnectivity();
    }
  }


  // var checkConnectivityHandler=async()=>{
  //    test=checkConnectivity();
  //    await console.log("[All_User_Donation_Bottom] test "+test);
  //    if(test){
  //     setState({
  //       ...state,
  //       network_flag: true,
  //     });
  //     console.log("[All_User_Donation_Bottom] isOnline true"+state.checkserverdata);
  //     if (state.checkserverdata) {
  //       onRetrivemydonordata();   
  //     };
  //   }
  //   else{
  //     console.log("[All_User_Donation_Bottom] isOnline false");
  //     Alert.alert("Opps!", 'No checkConnectivityHandler Internet Please check your connection', [
  //       {
  //             text: 'Try Again',
  //             onPress:() => checkConnectivityHandler()                              
  //       }
  // ]);
  //   }
  // }
  useEffect(() => {

    // if(!state.network_flag){       
    //   checkConnectivity();
    // }
    loadProducts();

  }, []);

  var setupretrivedata = [];
  var slicedata = [];
  const onRetrivemydonordata = () => {
	let API_URL = `${Server_URL}/Home_Screen/donated_user_retrive_data.php`;
    //let API_URL = 'http://192.168.0.9/help_1/Home_Screen/donated_user_retrive_data.php';
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
      console.log("[All_User_Donation_Bottom] isLoading & checkdataavailable:  " + state.isLoading + state.checkdataavailable);
      if (res == "No") {
        console.log("[All_User_Donation_Bottom] No");
        setState({
          ...state,
          checkdataavailable: false,
          isLoading: false,
        });
        ToastAndroid.show("No Blood  Request is Available, Please try after some time", ToastAndroid.LONG);
        // console.log(state.isBoodRequestAvailable);
        // console.log(" onMapget2 state.isRequestCompleted");
        // console.log(state.isRequestCompleted);
      }
      else {

        setupretrivedata = JSON.parse(res);
        console.log("[All_User_Donation_Bottom] retriveserverdata before");
        console.log(setupretrivedata);

        setState({
          ...state,
          checkserverdata: false,
          checkdataavailable: true,
          isLoading: false,
          // retrivedonor: setupretrivedata,
          fulldata: setupretrivedata,

        });
        slicedata = state.fulldata.slice(0, proplen);
        for (var i = 0; i < setupretrivedata.length; i++) {
          console.log(setupretrivedata[i].reqmobilenumber);
          console.log(setupretrivedata[i].donormobilenumber);

        }
        //addRecords(0);
        console.log("[All_User_Donation_Bottom] isLoading & checkdataavailable: done  " + state.isLoading + state.checkdataavailable);
        // let img = 'https://storage.googleapis.com/helpone-9bf33.appspot.com/User_Profile_Photo/123456780.png'
        // console.log(img);
        // console.log(state.isBoodRequestAvailable);
      }
      //console.log("retriveserverdata after"+state.retrivedonor);  
    })
      .catch((error) => {
        console.error(error);
      });


  }

  const addRecords = (page) => {
    console.log("[All_User_Donation_Bottom] page " + page);
    // assuming state.fulldata hold all the records
    const newRecords = [];
    var il;
    var i;
    for (i = page * 2, il = i + 2; i < il && i <
      state.fulldata.length; i++) {
      newRecords.push(state.fulldata[i]);
    }
    setState({
      ...state,
      retrivedonor: [...state.retrivedonor, ...newRecords],
    });
    console.log("[All_User_Donation_Bottom] retrivedonor " + state.retrivedonor);
  }

  const onScrollHandler = () => {
    slicedata = state.fulldata;
    console.log("[All_User_Donation_Bottom] onScrollHandler ");
    console.log(proplen);
    console.log(slicedata);
    proplen = proplen + 1;
    // setState({...state,
    //   page: state.page + 1,
    // }, () => {
    //   addRecords(state.page);
    // });

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
        retrivedonor: tempfulldata,
        search: text,
      });
    }
    else if (!Array.isArray(filteredName) && !filteredName.length) {
      console.log("not name");
      setState({
        ...state,
        retrivedonor: [],
        search: text,
      });
    }
    // if name matches then display
    else if (Array.isArray(filteredName)) {
      console.log('Name');
      setState({
        ...state,
        retrivedonor: filteredName,
        search: text,
      });
    }
    if ('' == search) {
      setState({
        retrivedonor: state.fulldata,
      });
      return;
    }
    // state.retrivedonor
    let filet = state.fulldata.filter(function (item) {
      return item.hospitalname.includes(search);
    }).map(function ({ address, hospitalname }) {
      return { address, hospitalname };
    });
    console.log("updateSearch filet " + filet);


  };


  // if(state.isLoading ) {
  //   return(
  //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  //       <ActivityIndicator size="large"/>
  //     </View>
  //   );
  // } 

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const handleRefresh = () => {
    console.log("[All_User_Donation_Bottom] refresh");
    ToastAndroid.show("Refreshed", 200, ToastAndroid.LONG);

    setState(
      {
        ...state,
        checkserverdata: true,
        isLoading: true,
        refreshing: true,
        search: '',
        // retrivedonor:state.fulldata,
      },
    );
    // onRetrivemydonordata();
    loadProducts();
  };

  const handlepress = (item) => {
    console.log("noofunits " + item.patientname);
    // console.log("click " + item.requiredtype);
    // console.log("before " + state.checkdiplayselected);
    if (state.checkdiplayselected) {
      setState({
        ...state,
        checkdiplayselected: true,
        selectedvalue: item,
      });
    }
    // navigation.navigate('My_Donated_Display', {
    //   bloodgroup:item.bloodgroup,
    //   hospital:item.hospitalname,
    //   bloodrequestid:item.bloodrequestid,
    //   contact_name:item.description,
    //   patientname:item.patientname,
    //   noofunits:item.noofunits,
    //   replacement:item.replacementavailable,
    //   requiredtype:item.requiredtype,
    //   noofdonoraccepted:item.noofdonoraccepted,
    //   address:item.address,
    //   pincode:item.pincode,
    //   status:item.status,
    // });
    console.log("[All_User_Donation_Bottom] after " + state.checkdiplayselected);
  }

  // const renderHeader = () => {
  //   return <SearchBar
  //     placeholder="Type Here..."
  //     lightTheme
  //     round
  //     // value={sea}
  //     // onChangeText={(val)=>{
  //     //   setState({
  //     //     ...state,
  //     //     search:val,
  //     //   })
  //     //   sea=sea+val;
  //     //   console.log("search "+state.search);
  //     // }}
  //     value={state.search}
  //     onChangeText={updateSearch}
  //   // onChangeText={(val) => updateSearch(val)}
  //   />;

  //   // return  <TextInput 
  //   // placeholder="Search here"
  //   // placeholderTextColor="#000"
  //   // autoCapitalize="none"

  //   // style={{flex:2,padding:0}}
  //   // contentInset={{
  //   //   top:0,
  //   //   left:0,
  //   //   bottom:0,
  //   //   right:20
  //   // }}
  //   // onChangeText={updateSearch}
  //   // // onChangeText={(val) => updateSearch(val)}
  //   // >{state.search} </TextInput>

  // };

  const renderHeader = () => {
    return (
      <View>
        <Home_Screen_Header navigation={props.navigation} />
        <Text style={styles.donation_header}>Our Real Heroes</Text>
      </View>
    )
  };
  let proplen = 2;
  const renderFooter = () => {
    if (!state.checkserverdata) return (
      <View>
        <TouchableRipple style={EditProfileStyles.submit} onPress={() => handleRefresh()}>
          <Text style={EditProfileStyles.panelButtonTitle}>Refresh</Text>
        </TouchableRipple>
        {/* <TouchableRipple style={EditProfileStyles.submit} onPress={() => onScrollHandler()}>
        <Text style={EditProfileStyles.panelButtonTitle}>Load more</Text>
      </TouchableRipple> */}
      </View>
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
    <SafeAreaView style={[ProfileScreenStyles.container, { margin: '2%', marginBottom: 0 }]}>
      {/* <SOSScreen navigation={props.navigation} /> */}
      <View containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>

        {state.checkdataavailable ?
          <View>
            {/* <Text>Search</Text> */}

            <FlatList
              data={state.fulldata}
              // data={slicedata}
              maxToRenderPerBatch={5}
              renderItem={({ item,index }) => (
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
                    key={index}
                    onFlipEnd={(isFlipEnd) => { console.log('isFlipEnd', isFlipEnd) }}
                  >
                    {/* <TouchableOpacity style={[ProfileScreenStyles.cardview,
                  {
                    alignItems: 'stretch',marginTop:'2%',
                    borderRadius: 25, paddingTop: '4%'
                  }]
                  }
                    onPress={() => handlepress(item)}> */}
                    <View style={[ProfileScreenStyles.cardview,
                    {
                      alignItems: 'center', marginTop: '2%',
                      borderRadius: 25, paddingTop: '4%'
                    }]
                    }>
                      <View style={{ alignItems: 'center' }}>

                        <View style={[ProfileScreenStyles.row]}>
                          <FontAwesome name="id-badge" color={colors.text} size={20} />
                          <Text style={{ fontWeight: 'bold', marginLeft: '3%' }}>Blood Donation Id: {item.BloodDonationId}</Text>
                        </View>
                      </View>

                      <View style={styles.rowalign}>
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <View style={[ProfileScreenStyles.row, { alignContent: 'space-between' }]}>
                            {/* <FontAwesome name="hospital-o" color={colors.text} size={20} /> */}
                            <Text style={{ fontWeight: 'bold' }}>Donor</Text>
                          </View>
                          {/* <Text style={{ marginLeft: '3%' }}>{item.donorphoto}</Text>
                        <Text style={{ marginLeft: '3%' }}> {item.donormobilenumber.trim()}</Text>
                        */}
                          <Image

                            source={item.donorphoto.trim() === "Yes"
                              ?
                              { uri: `${Image_URL}${item.donormobilenumber.trim()}.png` }
                              :
                              // <No_Image_Component username={item.donorfirstname}/>}
                              require('../../assets/donor_img.png')}

                            // source={{
                            //   uri: 'https://storage.googleapis.com/helpone-9bf33.appspot.com/User_Profile_Photo/1234567890.png',
                            // }}
                            style={[styles.profileImg,
                            {
                              height: 150, width: 150,
                              borderColor: 'green', borderWidth: 1
                            }]}
                            imageStyle={[{ borderRadius: 25 }]} />

                          <View style={{ marginTop: '5%' }}>

                            <View style={[ProfileScreenStyles.row]}>
                              <FontAwesome name="user-o" color={colors.text} size={20} />
                              <Text style={{ fontWeight: 'bold', marginLeft: '3%', alignItems: 'flex-start' }}>{item.donorfirstname}</Text>
                            </View>
                          </View>
                          {/* <View style={[ProfileScreenStyles.row]}>
                            <Fontisto style={{ marginLeft: '1%', color: 'red' }} name="blood-drop" color={colors.text} size={20} />
                            <Text style={{ marginLeft: '3%' }}>Bloodgroup: {item.donorbloodgroup}</Text>
                          </View> */}


                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <View style={[ProfileScreenStyles.row, { alignContent: 'space-between' }]}>
                            {/* <FontAwesome name="hospital-o" color={colors.text} size={20} /> */}
                            <Text style={{ fontWeight: 'bold', marginLeft: '3%' }}>Requestor</Text>
                          </View>
                          {/* <Text style={{ marginLeft: '3%' }}> {item.requestorphoto}</Text>
                        <Text style={{ marginLeft: '3%' }}> {item.reqmobilenumber}</Text>
                         */}
                          <Image
                            source={item.requestorphoto.trim() === "Yes"
                              ?
                              { uri: `${Image_URL}${item.reqmobilenumber.trim()}.png` }
                              :
                              // <No_Image_Component username={item.donorfirstname}/>}
                              require('../../assets/donor_img.png')}

                            // source={{ uri: 'https://storage.googleapis.com/helpone-9bf33.appspot.com/User_Profile_Photo/1.png' }}
                            style={[styles.profileImg, {
                              height: 150, width: 150,
                              marginLeft: '1.5%',
                              borderColor: 'green', borderWidth: 1
                            }]}
                            imageStyle={[{ borderRadius: 25 }]} />

                          <View style={{ marginTop: '5%' }}>
                            <View style={[ProfileScreenStyles.row]}>
                              <FontAwesome name="user-o" color={colors.text} size={20} />
                              <Text style={{ fontWeight: 'bold', marginLeft: '3%', alignItems: 'baseline' }}>{item.reqfirstname}</Text>
                            </View>
                            {/* <View style={[ProfileScreenStyles.row]}>
                            <Fontisto style={{ marginLeft: '1%', color: 'red' }} name="blood-drop" color={colors.text} size={20} />
                            <Text style={{ marginLeft: '3%' }}>Bloodgroup: {item.donorbloodgroup}</Text>
                          </View> */}
                          </View>

                        </View>
                      </View>

                    </View>
                    {/* back screen */}
                    <View style={[ProfileScreenStyles.cardview,
                    {
                      alignItems: 'center', marginTop: '2%',
                      borderRadius: 25, paddingTop: '4%'
                    }]
                    }>
                      <View style={{ alignItems: 'center' }}>

                        <View style={[ProfileScreenStyles.row]}>
                          <FontAwesome name="id-badge" color={colors.text} size={20} />
                          <Text style={{ fontWeight: 'bold', marginLeft: '3%' }}>Blood Donation Id: {item.BloodDonationId}</Text>
                        </View>
                        <View style={[ProfileScreenStyles.row,]}>
                          <Icon style={{ color: 'blue' }} name="calendar-today" color={colors.text} size={20} />
                          <Text style={{ marginLeft: '3%' }}>Donated Date: {item.DonatedDate}</Text>
                        </View>
                        <View style={[ProfileScreenStyles.row]}>
                          <FontAwesome name="id-badge" color={colors.text} size={20} />
                          <Text style={{ fontWeight: 'bold', marginLeft: '3%' }}>Status: {item.DonationStatus}</Text>
                        </View>
                      </View>

                      <View style={[styles.rowalign,{alignItems: 'stretch'}]}>
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <View style={[ProfileScreenStyles.row, { alignContent: 'space-between' }]}>
                            {/* <FontAwesome name="hospital-o" color={colors.text} size={20} /> */}
                            <Text style={{ fontWeight: 'bold' }}>Donor</Text>
                          </View>
                          {/* <Text style={{ marginLeft: '3%' }}>{item.donorphoto}</Text>
    <Text style={{ marginLeft: '3%' }}> {item.donormobilenumber.trim()}</Text>
    */}
                          <Image

                            source={item.donorphoto.trim() === "Yes"
                              ?
                              { uri: `${Image_URL}${item.donormobilenumber.trim()}.png` }
                              :
                              // <No_Image_Component username={item.donorfirstname}/>}
                              require('../../assets/donor_img.png')}

                            // source={{
                            //   uri: 'https://storage.googleapis.com/helpone-9bf33.appspot.com/User_Profile_Photo/1234567890.png',
                            // }}
                            style={[styles.profileImg,
                            {
                              height: 150, width: 150,
                              borderColor: 'green', borderWidth: 1
                            }]}
                            imageStyle={[{ borderRadius: 25 }]} />

                          <View style={{ marginTop: '5%' }}>

                            <View style={[ProfileScreenStyles.row]}>
                              <FontAwesome name="user-o" color={colors.text} size={20} />
                              <Text style={{ fontWeight: 'bold', marginLeft: '3%', alignItems: 'flex-start' }}>{item.donorfirstname}</Text>
                            </View>
                          </View>
                          <View style={[ProfileScreenStyles.row]}>
                            <Fontisto style={{ marginLeft: '1%', color: 'red' }} name="blood-drop" color={colors.text} size={20} />
                            <Text style={{ marginLeft: '3%' }}>BG: {item.donorbloodgroup}</Text>
                          </View>


                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <View style={[ProfileScreenStyles.row, { alignContent: 'space-between' }]}>
                            {/* <FontAwesome name="hospital-o" color={colors.text} size={20} /> */}
                            <Text style={{ fontWeight: 'bold', marginLeft: '3%' }}>Requestor</Text>
                          </View>
                          {/* <Text style={{ marginLeft: '3%' }}> {item.requestorphoto}</Text>
    <Text style={{ marginLeft: '3%' }}> {item.reqmobilenumber}</Text>
     */}
                          <Image
                            source={item.requestorphoto.trim() === "Yes"
                              ?
                              { uri: `${Image_URL}${item.reqmobilenumber.trim()}.png` }
                              :
                              // <No_Image_Component username={item.donorfirstname}/>}
                              require('../../assets/donor_img.png')}

                            // source={{ uri: 'https://storage.googleapis.com/helpone-9bf33.appspot.com/User_Profile_Photo/1.png' }}
                            style={[styles.profileImg, {
                              height: 150, width: 150,
                              marginLeft: '1.5%',
                              borderColor: 'green', borderWidth: 1
                            }]}
                            imageStyle={[{ borderRadius: 25 }]} />

                          <View style={{ marginTop: '5%' }}>
                            <View style={[ProfileScreenStyles.row]}>
                              <FontAwesome name="user-o" color={colors.text} size={20} />
                              <Text style={{ fontWeight: 'bold', marginLeft: '3%', alignItems: 'baseline' }}>{item.reqfirstname}</Text>
                            </View>
                          </View>
                          <View style={[ProfileScreenStyles.row]}>
                            <Fontisto style={{ marginLeft: '1%', color: 'red' }} name="blood-drop" color={colors.text} size={20} />
                            <Text style={{ marginLeft: '3%' }}>BG: {item.reqbloodgroup}</Text>
                          </View>
                        </View>
                      </View>

                    </View>



                    {/* </TouchableOpacity> */}
                  </FlipCard>
                  {/* // <ListItem                  
                //   style={[ ProfileScreenStyles.cardview,
                //     {borderRadius:25,borderColor:'blue',margin:'2%',padding:'5%'} ]}              
                //   title={`Hospital Name: ${item.hospitalname}`}
                //   subtitle={`Contact Name: ${item.patientname}`}                                  
                //   onPress={()=> handlepress(item)}
                  
                // />  */}

                </View>
              )}
              keyExtractor={item => item.BloodDonationId}
              // ItemSeparatorComponent={renderSeparator}
              ListHeaderComponent={renderHeader}
              ListFooterComponent={renderFooter}
              onRefresh={handleRefresh}
              refreshing={state.refreshing}
            // onEndReached={onScrollHandler}
            // onEndThreshold={0.1}
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

          <View>
            <ScrollView>
              <Home_Screen_Header navigation={props.navigation} />
              <View style={[ProfileScreenStyles.cardview, { alignSelf: 'center', marginTop: '50%', padding: '8%' }]}>
                <Text>No data.....!!</Text>
                <TouchableRipple style={EditProfileStyles.submit} onPress={() => handleRefresh()}>
                  <Text style={EditProfileStyles.panelButtonTitle}>Refresh</Text>
                </TouchableRipple>
              </View>
            </ScrollView>
          </View>
          : null}

      </View>

    </SafeAreaView>
  );
};



export default All_User_Donation_Bottom;
export const styles = StyleSheet.create({
  profileImg: {
    borderRadius: 50,
  },
  rowalign: {
    flexDirection: 'row', alignContent: 'space-between'
  },
  donation_header: {
    alignSelf: 'center',
    fontWeight: 'bold',
    // color:'red',
    fontSize: 20,
  },
});