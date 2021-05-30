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
import { styles as ProfileScreenStyles } from '../../Screens/ProfileScreen/ProfileScreen';
import { useSelector } from 'react-redux';
import { List, ListItem, SearchBar } from "react-native-elements";
import { TouchableRipple, useTheme, Text } from 'react-native-paper';
import { styles as EditProfileStyles } from '../../Screens/ProfileScreen/EditProfileScreen';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles as signupstyles } from '../../Screens/SignIn/SignUpScreen';
import { styles as BloodRequestScreenStyles } from '../../Screens/Blood_Request/Blood_Request_Screen';
import { styles as MainScreenStyles } from '../../Main_Screen/Main_Screen_Icons';
// import { styles as Home_Screen_Header } from '../Screens/Home_Screen/Home_Screen_Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { color } from 'react-native-reanimated';
import FlipCard from 'react-native-flip-card';
import SOSScreen from '../../Screens/SOS_Componet/SOSScreen';
import NetInfo from "@react-native-community/netinfo";
import * as URL from '../../components/Parameter';
import { screen_width, screen_height } from '../../components/Parameter';
import Swiper from 'react-native-swiper';
import Main_Screen_Icons from '../../Main_Screen/Main_Screen_Icons';
import * as Color_Code from '../../components/Color_Code';
const Covid_Details_List_Limt_Screen = (props) => {
  var setupretrivedata = [];
  const { colors } = useTheme();
  var image_width = screen_width * 0.70;
  var image_height = screen_height * 0.60;
  const CARD_HEIGHT = 177;
  const CARD_WIDTH = screen_width * 0.9;
  const user_data_user_number = useSelector(state =>
    state.helpone.user_number,
  );
  var retrivedonor = [];
  const initialState = {
    isHorizontal: true,
    imageLoading: true,
    page: 0,
    checkserverdata: true,
    refreshing: false,
    checkdataavailable: false,
    contact_name: "",
    user_number: user_data_user_number,


    noofdonoraccepted: 0,
    bloodrequesttime: '',
    isLoading: true,
    checkdiplayselected: false,
    selectedvalue: [],
    fulldata: [],

    network_flag: false,
  };
  var test = false;


  // const initialState = [
  //   {
  //     img: require('../assets/blood_request.png'),
  //     screen: "My_Blood_Donated_Screen",
  //     text: 'My Donated',
  //   },
  //   {
  //    img: require('../assets/donate.png'),
  //     screen: "My_Request_Raised_Screen",
  //     text: 'My Request',
  //   },
  //   {
  //    img: require('../assets/donate.png'),
  //     screen: "Blood_Request_List",
  //     text: 'Blood Request',
  //   },
  //   {
  //    img: require('../assets/blood_logo.png'),
  //     screen: "Detail",
  //     text: 'Blood Request Form',
  //   },
  //   {
  //     img: require('../assets/blood_request.png'),
  //     screen: "Profile",
  //     text: 'Profile',
  //   },
  // ];

  const [state, setState] = useState(initialState);

  // const initialStatess = [
  //   {
  //     img: require('../../assets/blood_request.png'),
  //     screen: "My_Blood_Donated_Screen",
  //     text: 'My Donated',
  //   },
  //   {
  //     img: require('../assets/donate.png'),
  //     screen: "My_Request_Raised_Screen",
  //     text: 'My Request',
  //   },
  //   {
  //     img: require('../assets/donate.png'),
  //     screen: "Blood_Request_List",
  //     text: 'Blood Request',
  //   },
  //   {
  //     img: require('../assets/blood_logo.png'),
  //     screen: "Detail",
  //     text: 'Blood Request Form',
  //   },
  //   {
  //     img: require('../assets/blood_request.png'),
  //     screen: "Profile",
  //     text: 'Profile',
  //   },
  // ];


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
          setState({
            ...state,
            asyncstorage: false,
          });
          offline = 1;
        }
      } else {
        //Alert.alert("You are online!");
        console.log("You are online!", state.isConnected);
        onRetrive_Donor_Data();
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

  const onRetrive_Donor_Data = () => {
    let API_URL = `${URL.Server_URL}/Covid_Components/Covid_Home_Components/Covid_Details_List_Limt.php`;

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

      console.log(state.isRequestCompleted);
      setState({
        ...state,
        checkserverdata: false,
        isLoading: false,
        refreshing: false,
      });
      console.log("[Covid_Details_List_Limt_Screen] isLoading & checkdataavailable:  " + state.isLoading + state.checkdataavailable);
      if (res == "No") {
        console.log("[Covid_Details_List_Limt_Screen] No");
        setState({
          ...state,
          checkdataavailable: false,
          isLoading: false,
        });
        //ToastAndroid.show("No is Available, Please try after some time", ToastAndroid.LONG);
        // console.log(state.isBoodRequestAvailable);
        // console.log(" onMapget2 state.isRequestCompleted");
        // console.log(state.isRequestCompleted);
      }
      else {

        setupretrivedata = JSON.parse(res);
        console.log("[Covid_Details_List_Limt_Screen] retriveserverdata before");
        console.log(setupretrivedata);

        setState({
          ...state,
          checkserverdata: false,
          checkdataavailable: true,
          isLoading: false,
          // retrivedonor: setupretrivedata,
          fulldata: setupretrivedata,

        });
        //slicedata = state.fulldata.slice(0, proplen);
        for (var i = 0; i < setupretrivedata.length; i++) {
          console.log(setupretrivedata[i].reqmobilenumber);
          console.log(setupretrivedata[i].donormobilenumber);

        }
        //addRecords(0);
        //console.log("[Covid_Details_List_Limt_Screen] isLoading & checkdataavailable: done  " + state.isLoading + state.checkdataavailable);
      }
      //console.log("retriveserverdata after"+state.retrivedonor);  
    })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    console.log("[Covid_Details_List_Limt_Screen] props: ", props);
    // console.log("[Covid_Details_List_Limt_Screen] props:props.navigation ", props.props.navigation);
    // console.log("[Covid_Details_List_Limt_Screen] props:navigation. ", props.navigation);
    loadProducts();

  }, []);



  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleRefresh = () => {
    console.log("[Covid_Details_List_Limt_Screen] refresh");
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
    loadProducts();
  };
  return (

    <SafeAreaView>
      <ScrollView
        showsHorizontalScrollIndicator={false}
      >
        <View style={{
          margin: 0, padding: 0,
          // marginTop: '3%',
        }}>

          {state.checkdataavailable ?
            <View>
              <Text style={[styles.donation_header,
              { color: Color_Code.silver_primary }]}>Latest Details</Text>
              <Swiper
                autoplay
                // horizontal={false}
                height={CARD_WIDTH * 0.85}

                activeDotColor="#76D7C4">
                {state.fulldata.map((item, index) => (
                  <View>
                    <View>
                      <ScrollView key={index}
                        style={MainScreenStyles.touchspacing}>
                        <TouchableOpacity
                          onPress={() => props.navigation.navigate('CovidDataListScreen')}
                        >
                          <View key={index} style={[ProfileScreenStyles.cardview,
                          {
                            alignItems: 'stretch', marginTop: '2%',
                            borderRadius: 25, paddingTop: '4%', borderColor: '#14ded7',
                          }]
                          }>
                            <View style={styles.rowalign}>

                              <View style={[ProfileScreenStyles.row, { marginRight: '5%', alignSelf: 'center' }]}>
                                <Entypo name="location" color={colors.text} size={20} />
                                <Text
                                  style={styles.iconstyles}

                                >{item.title}</Text>
                              </View>
                              {item.BedCount > 0 || item.O2BedCount > 0 || item.ICUBedCount > 0 ?
                                <View>
                                  <Text style={styles.textheaderstyle}>Bed Availablity</Text>

                                  <View style={[styles.columncontentstyle, { justifyContent: 'center' }]}>

                                    <View style={styles.columnalignstyle}>
                                      <View style={[ProfileScreenStyles.row]}>
                                        <Text style={{ marginLeft: '3%', }}>Normal Bed</Text>
                                        <Text style={{ marginLeft: '3%', }}>Oxygen Bed</Text>
                                        <Text style={{ marginLeft: '3%', }}>ICU Bed</Text>
                                      </View>
                                    </View>

                                    <View style={styles.columnalignstyle}>
                                      <View style={[ProfileScreenStyles.row]}>

                                        <Text >{item.BedCount}</Text>
                                        <Text style={styles.itemmiddlestyle}>{item.O2BedCount}</Text>
                                        <Text >{item.ICUBedCount}</Text>
                                      </View>
                                    </View>

                                  </View>
                                </View>
                                : null}

                              {item.O2SupplyCount > 0 ?
                                <View style={[ProfileScreenStyles.row, { margin: '3%', alignSelf: 'center', marginTop: 0 }]}>
                                  <Icon name="gas-cylinder" color={colors.text} size={20} />
                                  <Text
                                    style={styles.iconstyles}

                                  >Oxygen Cylinder Available Count:  {item.O2SupplyCount}</Text>
                                </View>
                                : null}

                              <View style={[ProfileScreenStyles.row, { margin: '3%', alignSelf: 'center' }]}>
                                <FontAwesome name="address-card" color={colors.text} size={20} />
                                <Text
                                  style={styles.iconstyles}

                                >{item.address}</Text>
                              </View>



                            </View>
                          </View>
                        </TouchableOpacity>
                      </ScrollView>
                    </View>
                  </View>
                ))}
              </Swiper>
            </View>
            : null
            // <View>
            //   <Text style={styles.donation_header}>Be the First Donor</Text>
            // </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default Covid_Details_List_Limt_Screen;

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  donation_header: {
    alignSelf: 'center',
    fontWeight: 'bold',
    // color:'red',
    fontSize: 20,
  },
  card: {
    backgroundColor: "#fff",
    // borderTopLeftRadius:5,
    // borderTopRightRadius:5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    //shadowOffset: { x: 2, y: -2 },
    height: 177,
    width: screen_width * 0.9,
    overflow: "hidden",
    borderRadius: 30,
    borderColor: 'black',
    //paddingLeft:'1%',
  },
  columnalignstyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1%'
    // justifyContent:'flex-start'
  },
  textheaderstyle: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  iconstyles: {
    textAlign: 'center',
    // fontWeight: 'bold',
    paddingLeft: '4%'
  },
  columncontentstyle: {
    marginTop: '1%',
    borderWidth: 2,
    borderRightWidth: 2,
    paddingTop: '1%',
    // borderBottomWidth:0,
    borderColor: '#76D7C4',
    borderRadius: 20,
  },
  itemmiddlestyle: {
    marginLeft: '20%',
    marginRight: '25%'
  }
});
