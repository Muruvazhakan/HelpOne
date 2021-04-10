import React, { useEffect, useState,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { HEREMap, Marker, Circle } from 'here-maps-react';
// import HEREMap from "react-here-map";
// import HEREMap from 'react-here-maps';

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {
  View,
  // Share,
  TextInput, TouchableOpacity, Animated, ScrollView, Dimensions, Text,
  Button,
  StyleSheet, Image, Platform, Alert, ToastAndroid,
  FlatList,SafeAreaView,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS, request } from 'react-native-permissions';
import {Server_URL} from '../components/Parameter';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionics from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Map from '../Screens/Map_Component/Map';
import * as toggledata from '../Store/actions/HelpOne';
import { styles as requestListstyle } from '../Screens/Blood_Request/Blood_Request_List_Screen';
import { styles as Editprofilestyle } from '../Screens/ProfileScreen/EditProfileScreen';
import { mapDarkStyle,manpStandardStyle} from '../Screens/Blood_Request/mapStyle';
import {styles as signupstyles} from '../Screens/SignIn/SignUpScreen';
import Share, {
  ShareSheet,
  //Button
}
  // as ShareButton
  from 'react-native-share';
import NetInfo from "@react-native-community/netinfo";
const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 177;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD = width * 0.1 - 10;
import * as Here_Api from '../components/Here_Api';
import ENV from '../env';
// import { stat } from 'fs';
//  const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
//   const ui = H.ui.UI.createDefault(map, defaultLayers);

const Here_Map = ({navigation, route}) => {
  const [datas, setDatas] = useState({
    screenvalues: "getLocation",
    done: true,
    search_data_text_box:null,
    
  })
  // useEffect(() => {
  //   console.log('[Here_Map] '+route);    
  //   console.log(navigation);
  //  // console.log(props.route);
  //  });

  const [all_search_data_list, set_all_search_data_list] = useState([]);
  const [selected_search_data, set_selected_search_data] = useState();
  var add_len=0;

  const user_data_map_screen_name = useSelector(state =>
    state.helpone.map_screen_name,
  );

  const [data, setData] = React.useState({    
    isMapvisible:false,    
})
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

  const retrive_geo_location = (val) => {
    let lat = val.latitude;
    let lon = val.longitude;
    // let lat=41.89993;
    // let lon=12.45447;

    // let reverse_code="https://revgeocode.search.hereapi.com/v1/revgeocode?at=41.89993%2C12.45447&lang=en-US&apikey=sFJNF9HJdMgMVkktSiPvUumNh9LoxuXM8Ce1u8DtmQE";
    let reverse_code = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${lon}&lang=en-US&apikey=${Here_Api.Here_JavaScript_Api_Id}`;
    console.log("[Here_Map] retrive_geo_location : " + val.longitude + val.latitude);
    fetch(reverse_code)
      .then(response => response.json())
      .then(datas => {
        // console.log(data);
        //console.log(data.items);
        console.log(datas.items[0].address);
        let add_data = datas.items[0].address;
        console.log(add_data);
        // setDatas({
        //   ...datas,
        //   loactionAddress: {
        //     address: add_data.label,
        //     city: add_data.city,
        //     district: add_data.district,
        //     statename: add_data.state,
        //     pincode: add_data.postalCode,
        //     countryName: add_data.countryName,
        //     addNumber: add_data.houseNumber,
        //   }
        // })

        setState({
          ...state,
          address: add_data.label,
            city: add_data.city,
            district: add_data.district,
            statename: add_data.state,
            pincode: add_data.postalCode,
            countryName: add_data.countryName,
            addNumber: add_data.houseNumber,
            markers:{
              latitude:lat,
              longitude:lon,
            }
        });
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });;
  }

  const retrivelocation = (val) => {
    console.log("[Here_Map] retrivelocation1 : " + val.longitude + val.latitude);
    setData({
      ...data, done: true,
    });
    retrive_geo_location(val);
  }

  const initialMapState={    
    int_lat:28.7041,
    int_long:77.1025,
    search_box_display_flag:false,
   isRequestCompleted:false,
   search_data:null,
   region: {
     latitude:28.7041,
     longitude:77.1025,
     longitudeDelta:0.044,
     latitudeDelta:0.0401
   },
   markers: {
     latitude:28.7041,
     longitude:77.1025,
     latitudeDelta: 0.044,
     longitudeDelta: 0.0441,
     },
   
      addNumber: null,
      address: null,
      city: null,
      district: null,
      statename: null,
      latitude: 36.425998333,
      longitude: -110.125100000,
      pincode: null,
      countryName: null,
 };
  const dispatch = useDispatch();
  const [state, setState] = React.useState(initialMapState);
  const theme = useTheme();

  var requestLocationPermission = async () => {
    console.log("[Here_Map] Inside the requestLocationPermission");
    //this.requestLocationPermission;
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('[Here_Map] iphone' + response);

      if (response === 'granted') {
        locateCurrentPosition();

      }

    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('android:' + response);

      if (response === 'granted') {
        //Alert.alert("locating");
        console.log("Inside the requestLocationPermission android is granted");
        locateCurrentPosition();
      }
    }


  }

  var locateCurrentPosition = () => {

    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));
        setData({ ...data, isMapvisible: true });
        setState({
          ...state,
          markers: position.coords,
        });
        console.log(" data.isMapvisible " + data.isMapvisible);
        console.log("markers locateCurrentPosition: " + state.markers);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    )

  }
  const onMapPress = (e) => {
    // alert("coordinates:"+ JSON.stringify(e.nativeEvent.coordinate))
    //console.log("screenname"+state.screenname);
    console.log("coordinate: " + e.nativeEvent.coordinate.latitude +
      e.nativeEvent.coordinate.longitude)
    setState({
      ...state,
      markers: e.nativeEvent.coordinate,
    });
    setDatas({
      ...data, isMapvisible: true,
    });
    //MapaddressHandler(e);
    Handle_send_data_back(e)
  };
  const Handle_send_data_back = (e) => {
    
    retrivelocation({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    })
  }

  const onRegionChange = (e) => {
    //alert("coordinates:"+ JSON.stringify(e.latitude))
    console.log("onRegionChange coordinate: " + e.latitude + e.longitude)

    setState({
      ...state,
      markers: e,

    });
  }

  const sentbackdata = () => {
    console.log("[Here_Map] sentbackdata screen_name" + user_data_map_screen_name);
    if(user_data_map_screen_name === 'Blood_Request_Screen')
    {
    navigation.goBack({ back_address: state.address });
    dipatch_User_Request_Handler();
    }
    else{      
      dipatch_User_Handler();
      navigation.goBack({ back_address: state.address });
    }
    
    // asyncStoragehandler();
  }
  const dipatch_User_Request_Handler = async () => {
    dispatch(toggledata.toggleuser_request_address_line1(state.address));
    console.log("[Here_Map] dipatch_User_Request_Handler address" + state.district);
    dispatch(toggledata.toggleuser_request_user_city(state.city));
    dispatch(toggledata.toggleuser_request_user_countryName(state.countryName));
    dispatch(toggledata.toggleuser_request_user_pincode(state.pincode));
    dispatch(toggledata.toggleuser_request_user_longitude(state.markers.longitude));
    dispatch(toggledata.toggleuser_request_user_latitude(state.markers.latitude));
    dispatch(toggledata.toggleuser_request_user_state_name(state.statename));
    dispatch(toggledata.toggleuser_request_user_district(state.district));
  }

  const dipatch_User_Handler = async () => {
    console.log("[Here_Map] state.markers.address" + state.district);
    dispatch(toggledata.toggleuser_latitude(state.markers.latitude));
    dispatch(toggledata.toggleuser_longitude(state.markers.longitude));
    dispatch(toggledata.toggleuser_country(state.countryName));
    dispatch(toggledata.toggleuser_pincode(state.pincode));
    dispatch(toggledata.toggleuser_state_name(state.statename));   
    dispatch(toggledata.toggleuser_city(state.city));
    dispatch(toggledata.toggleuser_address_line1(state.address));
    dispatch(toggledata.toggleuser_district(state.district));
  }

  const user_data_upload = async () => {
	  
	let API_URL = `${Server_URL}/user_personal_details_upload.php`;

    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will pass our input data to server
        mobile: profiledata.user_number,
        userfirst: profiledata.user_first_name,
        userlast: profiledata.user_last_name,
        UserImage: profiledata.isUserImageAvailable,

        address: profiledata.address,
        city: profiledata.city,
        area: profiledata.area,
        statename: profiledata.statename,
        latitude: profiledata.latitude,
        usercountry: profiledata.user_country,
        userpincode: profiledata.user_pincode,
        longitude: profiledata.longitude,


        useremail: profiledata.user_email,
        userGender: profiledata.user_Gender,
        userBloodGroup: profiledata.user_BloodGroup,
        userDOB: profiledata.user_DOB,
        userConfermation: profiledata.user_Confermation,
        userProof: profiledata.user_Proof
      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson + " responseJson");
        //ToastAndroid.show(responseJson,ToastAndroid.LONG);

        if (responseJson === "Updated") {
          console.log("Updated");
          //navigation.goBack();
        }
        else if (responseJson === "Recorded") {
          console.log("Recorded");

          //navigation.goBack();
        }
        else if (responseJson === "check") {
          Alert.alert("Connection Lost", 'check internet connection!', [
            { text: 'Okay' }
          ]);
          console.log("fail");
          //alert(responseJson);
          //navigation.goBack();
        }
        else if (responseJson == "user") {
          console.log("Invalid user");
          Alert.alert("Invalid user", 'Invalid user!', [
            { text: 'Okay' }
          ]);
          //alert(responseJson);
          //navigation.goBack();
        }
        else {
          console.log("else else");
        };
      })
      .catch((error) => {
        console.error(error);
      });

  }

  const search_place= (val)=>{
    set_all_search_data_list([]); 
        
    //console.log(val);
    //console.log("search_place");

    setDatas({
      ...datas,
      search_data_text_box:val,
    });
  
    setState({
      ...state,
      search_box_display_flag:true,
    });
    let original_val= val.replace(/[ ,]+/g, "+");
    if(val.lenght !=0){
    //console.log(original_val);
    // let reverse_code = `https://geocode.search.hereapi.com/v1/geocode?at=${lat}%2C${lon}&lang=en-US&apikey=${Here_Api.Here_JavaScript_Api_Id}`;
    let geo_code = `https://geocode.search.hereapi.com/v1/geocode?apikey=${Here_Api.Here_JavaScript_Api_Id}&q=${original_val}`;
    //console.log(geo_code);
    fetch(geo_code)
      .then(response => response.json())
      .then(address => {
       // console.log("address");
        //console.log(address);
        //console.log(address.status);
       
        
        if(address.status !==400)
        {
        add_len=address.items.length;        
        }
        if(add_len>0)        
      {
        for(var i=0;i<add_len;i++)
        {

          let add_data = address.items[i];
          //console.log(add_data.address.label);  
          set_all_search_data_list([  
            ...all_search_data_list,                    
           add_data,
          ]);   
          
          // console.log(all_search_data_list); 
          // console.log(i);    
          
        }
      //  let add_data = address.items[0].title;
        
     
      }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  const asyncStoragehandler = async () => {
    console.log(" aynsc storgae in Map screen ");
    try {

      await AsyncStorage.setItem('user_address_line1', state.address);
      // await AsyncStorage.setItem('user_city', state.city);	
      // await AsyncStorage.setItem('user_area', state.area);	
      // await AsyncStorage.setItem('user_longitude', state.markers.user_longitude);	
      // await AsyncStorage.setItem('user_pincode', state.pincode);	
      // await AsyncStorage.setItem('user_latitude', state.markers.user_latitude);
      // await AsyncStorage.setItem('user_state_name', state.statename);

    } catch (e) {
      Alert.alert(e);
      console.log(e);
    }
  }

  const textInputAddressChange = (val) => {
    setState({
      ...state, address: val,
    })
  };

  const _map = React.useRef(null);

  const handle_search_press =(val)=>{
    console.log("[Here_Map] handle_search_press"+val.address.label);
    setState({
      ...state,
      search_box_display_flag:false,
    });
    set_selected_search_data({val});
    setDatas({
      ...datas,
      search_data_text_box:val.address.label,
    });

    search_locater_handler(val);
   // console.log(selected_search_data);
  }

  const handle_cross_click =()=>{
    console.log("[Here_Map] handle_cross_click");
    setState({
      ...state,
      search_box_display_flag:false,
    });
    setDatas({
      ...datas,
      search_data_text_box:null,
    });
    set_all_search_data_list([]);
    set_selected_search_data({});
  }

  const search_locater_handler =(val)=>{    
    setState({
      ...state,
      address: val.address.label,
      city: val.address.city,
      district: val.address.district,
      statename: val.address.state,
      pincode: val.address.postalCode,
      countryName: val.address.countryName,
      addNumber: val.address.houseNumber,
      markers:{
        latitude:val.position.lat,
        longitude:val.position.lng,
      },
      search_box_display_flag:false,
    });
  }


  return (
    <View style={styles.container}>
      {/* <Map valuesfrom='getLocation'
        loactionAddress={data.screenvalues}
        getloactionAddress={(val)=>retrivelocation(val)}
        addressdiplay={data.loactionAddress}
          >

            
        <ScrollView>

        </ScrollView>
        </Map> */}
      <MapView
        identifier={"1"}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        showsUserLocation={true}
        style={styles.map}
        ref={_map}
        customMapStyle={theme.dark ? mapDarkStyle : manpStandardStyle}
        initialRegion={state.region}
        zoomEnabled={true}

        pitchEnabled={true}
        mapType="standard"
        //onRegionChange={(event)=> onRegionChange(event)}
        followsUserLocation={true}
        showsCompass={true}
        showsBuildings={true}
        showsTraffic={true}
        showsIndoors={true}
        onPress={(event) => onMapPress(event)}
        style={styles.container}
        region={
          //  state.region
          {
            latitude: state.markers.latitude,
            longitude: state.markers.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }
        }
      >
        {datas.isMapvisible ?
          <Marker
            draggable={true}
            onDrag={(event) => onRegionChange(event)}
            onDragEnd={(event) => onRegionChange(event)}
            coordinate={{
              latitude: state.markers.latitude,
              longitude: state.markers.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            //image={require('../assets/map_marker.png')}
            title="Your Location"
          >
            <Callout tooltip>

              <View>
                <View style={styles.bubble}>
                  <ScrollView>
                    <Text style={styles.name}>Your Location: latitude:{state.markers.latitude}, longitude:{state.markers.longitude}</Text>
                  </ScrollView>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
                <TouchableOpacity onPress={(event) => onMapPress(event)} />
              </View>

            </Callout>

          </Marker>
          : null}
      </MapView>

      {state.search_box_display_flag?
      <View style={[styles.searchBoxDisplay,{marginTop:'15%'}]}>
        <SafeAreaView>
        <FlatList
         data={all_search_data_list}         
        renderItem={({item}) => 
        (
        <View>
          <TouchableOpacity
            onPress ={()=> handle_search_press(item)}
          >
        <Text>{item.address.label}</Text>
        </TouchableOpacity>
        </View>
        )}
        keyExtractor={item => item.position.lat}
        />
        </SafeAreaView>        
      </View>
      : null}

      <View style={requestListstyle.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          value={datas.search_data_text_box}
          style={{ flex: 2, padding: 0 ,marginRight:'2%'}}
          onChangeText={(e)=>search_place(e)}
          contentInset={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 20
          }}
        />
        {!state.search_box_display_flag?
        <TouchableOpacity>
        <Ionics name="ios-search" size={30} onPress={()=>search_place(datas.search_data_text_box)} />
        </TouchableOpacity>
        :<TouchableOpacity>
        <Entypo name="circle-with-cross" onPress={()=>handle_cross_click()} size={30} />
        </TouchableOpacity>}
      </View>


      <View style={styles.refreshbox}>

        <TouchableOpacity onPress={() => requestLocationPermission()}>
          <Ionics name="md-locate" size={50} />
          {/* <Animated.Image
                                source={require('../assets/target1.png')}
                                resizeMode='cover'
                                style={[styles.makerWrap]}
                                /> */}
        </TouchableOpacity>
      </View>
      <View>
        { state.address ?
          <View style={styles.scrollView}>

            <View style={requestListstyle.card}>
              <ScrollView>
                <View style={{ padding: '5%' }}>
                  <View style={{ flexDirection: 'row', marginLeft: '5%', alignContent: 'flex-end' }}>
                    <Text >Save your Location</Text>
                    <TouchableOpacity style={{ marginLeft: '30%' }}
                      onPress={() => sentbackdata()}
                    >
                      <MaterialCommunityIcon style={{ color: 'green' }} name="content-save-move" size={25} />
                    </TouchableOpacity>
                  </View>
                  {/* <Autocomplete
                      style={{
                        width: '100%',
                        height: '40px',
                        paddingLeft: '16px',
                        marginTop: '2px',
                        marginBottom: '100px'
                      }}
                      onPlaceSelected={ (place) => {
                        console.log(place)}}
                       types={['(state.region)']}
                      /> */}
                  <View style={signupstyles.action}>
                    <FontAwesome5 style={{ paddingTop: '1%', color: 'green' }} name="address-card" size={30} />
                    {/* <TextInput style={{paddingTop:0}}
                          
                          onChangeText={(val)=>textInputAddressChange(val)}>{state.address} </TextInput> */}
                    <Text style={{ paddingTop: 0 }}

                    >{state.address} </Text>
                  </View>
                  {state.city ?
                    <Text  >City: {state.city}</Text>
                    : null}
                  {state.statename ?
                    <Text style={styles.cardDesc}>State: {state.statename}</Text>
                    : null}
                  {/* <Text style={styles.cardDesc}>Urgent: {marker.urgent}</Text> */}

                  {state.district ?
                    <Text >District: {state.district}</Text>
                    : null}
                  {state.pincode ?
                    <Text >Pincode: {state.pincode}</Text>
                    : null}
                  {state.countryName ?
                    <Text >Country: {state.countryName}</Text>
                    : null}
                </View>
              </ScrollView>
            </View>

          </View>
          : null}
      </View>
     
    </View>


  );
};


export default Here_Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center', 
    // justifyContent: 'center'
  },
  map: {
    height: '100%',
    flex:1,
    ...StyleSheet.absoluteFillObject,
    },

    searchBoxDisplay:{
      position:'absolute',
      marginTop: Platform.OS==='ios'?'3.5%':'2.3%',
      // flexDirection:'row',
      backgroundColor:'#fff',
      width:'80%',
      // maxWidth:'80%',
      maxHeight:'70%',
      alignSelf:'flex-start',
      borderRadius:5,
      marginLeft:'4%',
      padding:'2%',
      shadowColor:'#ccc',
      textShadowOffset:{width:0,height:3},
      shadowOpacity:5,
      elevation:10,
    },
  
    bubble: {
      flexDirection: 'column',
      alignSelf:'auto',
      backgroundColor:'#fff',
      borderRadius:6,
      borderColor:'#ccc',
      borderWidth:0.5,
      padding:15,
      width:150,
    },
    
    arrow: {
      backgroundColor:'transparent',
      borderColor:'transparent',
      borderTopColor: '#fff',
      borderWidth:16,
      alignSelf:'center',
      marginTop: -32
    },
    arrowBorder: {
      backgroundColor:'transparent',
      borderColor:'transparent',
      borderTopColor:'#007a78',
      borderWidth:16,
      alignSelf:'center',
      marginTop: -0.5,
      // marginBottom: -15
    },
    name: {
      fontSize:16,
      //marginBottom:5,
    },
  
     refreshbox:{
    position:'absolute',    
    // bottom: Platform.OS==='ios'?'3.5%':'5.5%',
    width:'2%',
    alignSelf:'flex-end',
    marginLeft:'7.5%',
   // marginTop:'10%',
    // marginLeft:'3%',
    padding:'4%',
  },
  
  searchBox:{
    position:'absolute',
    marginTop: Platform.OS==='ios'?'3.5%':'2.3%',
    flexDirection:'row',
    backgroundColor:'#fff',
    width:'80%',
    alignSelf:'flex-start',
    borderRadius:5,
    marginLeft:'4%',
    padding:'2%',
    shadowColor:'#ccc',
    textShadowOffset:{width:0,height:3},
    shadowOpacity:5,
    elevation:10,
  },
  editIcon:{    
   
    //marginLeft:'70%',    
    marginLeft:'20%'
  },


  scrollView:{
    flex:1,
    position:'absolute', 
    alignItems:'center' ,
    bottom:0,
    left:0,
    right:0,
    paddingVertical:10,
  },


  cardDesc:{
    //fontSize:10,
    color:'#444'
  },

});
