import React, { useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {
  View,
  // Share,
  TextInput, TouchableOpacity, Animated, ScrollView, Dimensions,
  Button,
  StyleSheet, Image, Platform, Alert, ToastAndroid, Linking,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS, request } from 'react-native-permissions';
import { mapDarkStyle, manpStandardStyle } from '../../Screens/Blood_Request/mapStyle';
import Share, {
  ShareSheet,
  //Button
}
  // as ShareButton
  from 'react-native-share';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionics from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
// import { set } from 'react-native-reanimated';
import NetInfo from "@react-native-community/netinfo";
import { screen_height, screen_width } from '../../components/Parameter';
import { Server_URL } from '../../components/Parameter';
import * as Server_Url from '../../components/Covid_Parameter';
import FlipCard from 'react-native-flip-card';
import { Picker } from '@react-native-community/picker';
import {
  Avatar,
  Title,
  Text,
  useTheme, Checkbox
} from 'react-native-paper';
import Click_to_flip_Component from '../../components/Click_to_flip_Component';
import Covid_Data_Single_Display_Screen from './Covid_Data_Single_Display_Screen';

// const CARD_HEIGHT = 177;
const CARD_HEIGHT = screen_width * 0.5;
const CARD_WIDTH = screen_width * 0.8;
const SPACING_FOR_CARD = screen_width * 0.1 - 10;

const Covid_Data_Display_List_Screen = ({ navigation }) => {
var propsmark=[];
  var setupmark = [
    // {
    //     coordinate:{
    //         latitude:37.425998333,
    //         longitude:-122.125200000,
    //     },
    //     title:"Hospital 1",
    //     description:"Person name",
    //     bloodgroup:"O+",
    //     phoneNumber:"8989324",
    //     urgent:"Yes",
    // },
  ];
  var allmarkerdata = [];
  var markers = [
    // {
    //     coordinate:{
    //         latitude:37.425998333,
    //         longitude:-122.125200000,
    //     },
    //     title:"Hospital 1",
    //     description:"Person name",
    //     bloodgroup:"O+",
    //     phoneNumber:"8989324",
    //     urgent:"Yes",
    // },
    //   {
    //     coordinate:{
    //       latitude:37.411298343,
    //       longitude:-122.128200010,
    //     },
    //     title:"Hospital 2",
    //     description:"Person name",
    //     bloodgroup:"O+",
    //     phoneNumber:"8989324",
    //     urgent:"Yes",
    // },

    //   {
    //     coordinate:{
    //       latitude:37.410998353,
    //       longitude:-122.125200004,
    //     },
    //     title:"Hospital 3",
    //     description:"Person name",
    //     bloodgroup:"O+",
    //     phoneNumber:"8989324",
    //     urgent:"Yes",
    // },
    // {
    //   coordinate:{
    //     latitude:37.410998303,
    //     longitude:-122.123200005,
    //   },
    //   title:"Hospital 4",
    //   description:"Person name",
    //   bloodgroup:"O+",
    //   phoneNumber:"8989324",
    //   urgent:"Yes",
    // },

  ];
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
        requestLocationPermission();
        onMapget();
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

  const [shareText, setshareText] = React.useState({
    visible: false,
  });

  const acceptHandler = (data) => {
    console.log("acceptHandler data");
    console.log(data);
    setState({
      ...state,
      acceptflag: true,
      marksprops:data,
    })
    propsmark=data;
    console.log("propsmark");
    console.log(propsmark);
  }
  const onCancel = () => {
    console.log("CANCEL")
    ToastAndroid.show("Message share was Canceled!", ToastAndroid.LONG);

    setshareText({ visible: false });
  }
  const onOpen = () => {
    console.log("OPEN")
    setshareText({ visible: true });
  }
  const [data, setData] = React.useState({
    lat: 13.083245626291832,
    long: 80.2754809,
    isMapvisible: false,
  })

  const handledata = (lati, longi) => {
    setData({
      ...data,
      lat: lati,
      long: longi,

    });

  }

  const closeaccept =()=>{
    setState({
      ...state,
      acceptflag:false,
    })
  }
  const onMapget = () => {

    let API_URL = `${Server_URL}/Covid_Components/Covid_Add_Details_Components/Covid_Details_list.php`;

    // setmarkers:{isloading:true};
    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }

    }).then(res => res.json()).then(res => {
      //console.log("myssss");
      console.log(res);
      console.log(" onMapget state.isRequestCompleted");
      console.log(state.isRequestCompleted);

      if (res == "No") {
        setState({
          ...state, isBoodRequestAvailable: false, isRequestCompleted: true,
        });
        ToastAndroid.show("No Blood  Request is Available, Please try after some time", ToastAndroid.LONG);
        console.log(state.isBoodRequestAvailable);
        console.log(" onMapget2 state.isRequestCompleted");
        console.log(state.isRequestCompleted);
      }
      else {


        setupmark = JSON.parse(res);
        console.log("setupmark " + setupmark);
        setState({
          ...state,
          markers: setupmark,
          allmarkerdata: setupmark,
          isBoodRequestAvailable: true,
          isRequestCompleted: true,
        });
        console.log("in res markers " + markers);
        // console.log(state.isBoodRequestAvailable);
      }

    })
      .catch((error) => {
        console.error(error);
      });
  }

  const initialMapState = {
    acceptflag: false,
    isLoading: true,
    markers,
    allmarkerdata,
    normalbedflag: false,
    O2bedflag: false,
    ICUbedflag: false,
    O2Supplyflag: false,
    filterflag: false,
    isBoodRequestAvailable: false,
    isRequestCompleted: false,
    userid: '',
    marksprops:null,
    categories: [
      {
        name: 'B+',
        icon: <MaterialCommunityIcon style={styles.chipsIcon} name="food-fork-drink" size={18} />,
      },
      {
        name: 'B-',
        icon: <MaterialCommunityIcon style={styles.chipsIcon} name="food" size={18} />,

      },
      {
        name: 'O-',
        icon: <MaterialCommunityIcon style={styles.chipsIcon} name="food-fork-drink" size={18} />,
      },
      {
        name: 'O+',
        icon: <MaterialCommunityIcon style={styles.chipsIcon} name="food" size={18} />,
      },
      {
        name: 'AB+',
        icon: <MaterialCommunityIcon style={styles.chipsIcon} name="food-fork-drink" size={18} />,
      },
      {
        name: 'AB+',
        icon: <MaterialCommunityIcon style={styles.chipsIcon} name="food-fork-drink" size={18} />,
      },
    ],
    region: {
      latitude: 22.62,
      longitude: 88.43,
      longitudeDelta: 0.044,
      latitudeDelta: 0.0401
    },
  };

  const [state, setState] = React.useState(initialMapState);
  const [selectedbed, setselectedbed] = useState(null);

  const onFilterSavePress = (e) => {
    console.log(e);
    let alldata = [];
    let nomalbedarr = [];
    let o2bedarr = [];
    let icubedarr = [];
    let o2supplyarr = [];

    setState({
      ...state,
      markers: [],
    })
    // if (state.normalbedflag && state.O2bedflag && state.ICUbedflag && state.O2Supplyflag) {
    //   setState({
    //     ...state,
    //     markers: allmarkerdata,
    //   })
    //   return markers;
    // }
    if (state.normalbedflag) {
      nomalbedarr = state.allmarkerdata.filter((data) => {
        console.log('BedCount' + data);
        console.log(data.BedCount > 0);
        return data.BedCount > 0;
      })

      //  console.log(state.markers);
    }

    if (state.O2bedflag) {
      o2bedarr = state.allmarkerdata.filter((data) => {
        console.log('O2BedCount' + data);
        console.log(data.O2BedCount > 0);
        return data.O2BedCount > 0;
      })

      // console.log(o2bedarr);
    }

    if (state.ICUbedflag) {
      icubedarr = state.allmarkerdata.filter((data) => {
        console.log('BedCount' + data);
        console.log(data.ICUBedCount > 0);
        return data.ICUBedCount > 0;
      })

      // console.log(icubedarr);
    }

    if (state.O2Supplyflag) {
      o2supplyarr = state.allmarkerdata.filter((data) => {
        console.log('BedCount' + data);
        console.log(data.O2SupplyCount > 0);
        return data.O2SupplyCount > 0;
      })

      //console.log(o2supplyarr);

    }

    alldata = [...nomalbedarr, ...o2bedarr, ...icubedarr, ...o2supplyarr];
    console.log("alldata.length ****" + alldata.length);
    var finaldata = alldata.filter((item, pos) => alldata.indexOf(item) === pos)
    console.log("d.length ****" + finaldata.length);
    if (!finaldata.length > 0) {
      ToastAndroid.show("No data found!", ToastAndroid.SHORT);
    }
    else {
      ToastAndroid.show(finaldata.length + " data found!", ToastAndroid.SHORT);
    }
    setState({
      ...state,
      markers: finaldata,
      filterflag: false,
    })



  }

  const theme = useTheme();

  var requestLocationPermission = async () => {

    //this.requestLocationPermission;
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iphone' + response);

      if (response === 'granted') {
        locateCurrentPosition();

      }

    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('android:' + response);

      if (response === 'granted') {
        //Alert.alert("locating");
        locateCurrentPosition();
      }
    }


  }

  var getGeolocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));
        data.lat = position.coords.latitude;
        data.long = position.coords.longitude;
        // let initialPosition={
        //   latitude:position.coords.latitude,
        //   longitude:position.coords.longitude,
        //   latitudeDelta:0.09,
        //   longitudeDelta:0.03
        // }
        //console.log(data.lat);
        //console.log(data.long);
        handledata(data.lat, data.long);
        setData({ ...data, isMapvisible: true });
        console.log("locateCurrentPosition data.isMapvisible");
        console.log(data.isMapvisible);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    )
  }

  var locateCurrentPosition = () => {
    console.log("locateCurrentPosition*****");

    //     let API_URL= 'http://192.168.0.9/help_1/blood_request_list.php';
    //   //setmarkers:{isloading:true};
    //   fetch(API_URL,{
    //     method:'post',
    //     header:{
    //         'Accept': 'application/json',
    //         'Content-type': 'application/json'
    //     }

    //   }).then(res => res.json()).then(res =>{
    //     //setmarkerss({data:res});
    //     console.log(res);
    //     console.log("my");
    //   })
    //   .catch((error)=>{
    //     console.error(error);
    //     });
    onMapget();
    getGeolocation();
    // loadProducts();
  }

  // console.log(data.lat);
 const  handleCallback = (childData) =>{
  console.log("handleCallback"+childData );
  if(childData==="done")
  {
    setState({
      ...state,
      acceptflag: false})
  }
    
}

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {

    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);
      //onMapget();
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });

    if (!data.isMapvisible && !state.isRequestCompleted) {
      requestLocationPermission();
      //loadProducts();
    }

    console.log("use effect data.isMapvisible");
    console.log(data.isMapvisible + " " + state.isRequestCompleted);

  }, [mapAnimation]
    // [data.isMapvisible,]
  );

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    console.log(mapEventData._targetInst.return.key + "mapEventData");
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  }

  const onBlooodPress = (index, e) => {

    console.log(index);
    console.log(e);

    // console.log("markerID"+markerID);
    let bloodgroup = e;
    //   console.log("bloodgroup"+bloodgroup.forwardref);
    ToastAndroid.show("Moved to " + bloodgroup + " request", 200, ToastAndroid.LONG);
    let markerID = index;
    console.log("markerID " + markerID);
    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  }

  const filerHandler = () => {
    setState({
      ...state,
      filterflag: !state.filterflag
    })
  }

  const [shareOptions, setshareOptions] = React.useState({
    title: '',
    message: "",
    subject: "",
  })

  // let shareOptions = {
  //   title: "React Native",
  //   message: "Hola mundo",    
  //   subject: "Share Link" //  for email
  // };
  const messagehandle = async (marker) => {
    //try {
    // console.log(title);
    // console.log(description);
    // onOpen();  
    let BedCounts = "" + (marker.BedCount > 0 ? ("Normal Bed Count: " + marker.BedCount) : "") + " " +
      (marker.O2BedCount > 0 ? ("Oxygen Bed Count: " + marker.O2BedCount) : "") + " " +
      (marker.ICUBedCount > 0 ? ("Icu Bed Count: " + marker.ICUBedCount) : "") + " " +
      (marker.O2SupplyCount > 0 ? ("Oxygen Supply Count: " + marker.O2SupplyCount) : "");
    setshareOptions({
      ...shareOptions,
      title: 'Help One Details!',

      message: 'Hospital: ' + marker.title +
        ' contact Name: ' + marker.contactname + marker.BedCount +
        '   Contact Number: ' + marker.contactnumber +
        BedCounts +
        ' From Help One',
      subject: "Help One Details"
    });
    //     Share.share({
    //       title: 'Wow, did you see that?'+title,
    //       message: 'Hospital: '+title +
    //       'Hospital: '+description +
    //       'bloodgroup: '+bloodgroup +
    //       'phoneNumber: '+phoneNumber +
    //       +'From Help One' ,      
    //     }, 

    //     {
    //       dialogTitle: 'Share BAM goodness',
    //       // iOS only:
    //       excludedActivityTypes: [
    //         'com.apple.UIKit.activity.PostToTwitter'
    //       ]
    //     }
    //     )
    // }
    // catch(error) {
    //   alert(error.message);
    // }
    try {
      //onCancel();

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


  // const shareOptions= async (title,description,bloodgroup,phoneNumber) => {
  //   try {
  //     console.log(title);
  //     console.log(description);
  //     Share.share({
  //       title: 'Wow, did you see that?'+title,
  //       message: 'Hospital: '+title +
  //       'Hospital: '+description +
  //       'bloodgroup: '+bloodgroup +
  //       'phoneNumber: '+phoneNumber +
  //       +'From Help One' ,      
  //     }, 

  //     // {
  //     //   dialogTitle: 'Share BAM goodness',
  //     //   // iOS only:
  //     //   excludedActivityTypes: [
  //     //     'com.apple.UIKit.activity.PostToTwitter'
  //     //   ]
  //     // }
  //     )
  // }
  // catch(error) {
  //   alert(error.message);
  // }

  // };


  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (

    <View style={styles.container}>
      {/* <MapStyle/> */}


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
        followsUserLocation={true}
        showsCompass={true}
        showsBuildings={true}
        showsTraffic={true}
        showsIndoors={true}
        style={styles.container}
        region={{
          latitude: data.lat,
          longitude: data.long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {/* {data.isMapvisible ? */}
        <View>
          {/* {state.isBoodRequestAvailable ? */}
          <Marker
            coordinate={{
              latitude: data.lat,
              longitude: data.long,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            image={require('../../assets/map_marker.png')}
            title="Your Location"
          >
            <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}>Your Location</Text>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
                <TouchableOpacity onPress={() =>
                  //loadProducts()
                  requestLocationPermission()
                } />
              </View>
            </Callout>
          </Marker>
          {/* : null} */}
        </View>
        {state.isBoodRequestAvailable && state.markers.length > 0 ?
          <View>

            {state.markers.map((marker, index) => {
              console.log("index " + index)
              console.log(marker.coordinate)
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              return (

                <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>

                  <Animated.View style={[styles.makerWrap]} >

                    <Animated.Image
                      source={require('../../assets/map_marker.png')}
                      // resizeMode='cover'
                      style={[styles.marker, scaleStyle]}
                    />

                  </Animated.View>

                </MapView.Marker>
              );
            })}

          </View>
          : null}
      </MapView>

      {/* <View style={styles.searchBox}>
             <TextInput 
             placeholder="Search here"
             placeholderTextColor="#000"
              autoCapitalize="none"
              style={{flex:2,padding:0}}
              contentInset={{
                top:0,
                left:0,
                bottom:0,
                right:20
              }}
              />
              <Ionics name="ios-search" size ={20} />
           </View> */}




      {/* {state.markers.map((marker, index) => (

            <View key={index}>
              <TouchableOpacity key={index} style={styles.chipsItem} onPress={(e) => onBlooodPress(index, marker.bloodgroup)} >
                <Text  >{marker.BedCount}</Text>
              </TouchableOpacity>
            </View>
          ))} */}
      {state.isBoodRequestAvailable ?
        <View style={[styles.chipsScrollView]} >
          <TouchableOpacity onPress={() => filerHandler()}>
            <MaterialCommunityIcon
              //  style={styles.chipsIcon} 

              name="filter" size={40} />
          </TouchableOpacity>

          {state.filterflag ?
            <View>
              <View style={styles.filterselect} animation="bounceInRight" >
                <Animatable.View
                  style={styles.bedstyles}
                  animation="bounceInRight">
                  <Animatable.Text animation="bounce" style={{ paddingTop: '3%' }} >Normal Bed</Animatable.Text>

                  <Checkbox status={state.normalbedflag ? 'checked' : 'unchecked'}
                    onPress={() => {
                      console.log(state.normalbedflag + " state.Normal_Bed");
                      setState({
                        ...state,
                        normalbedflag: !state.normalbedflag,
                      })

                    }} />
                </Animatable.View>

                <Animatable.View style={styles.bedstyles} animation="bounceInRight">
                  <Animatable.Text animation="bounce" style={{ paddingTop: '3%' }} >Oxygen Bed</Animatable.Text>

                  <Checkbox status={state.O2bedflag ? 'checked' : 'unchecked'}
                    onPress={() => {
                      console.log(state.O2bedflag + " state.O2Supplyflag");
                      setState({
                        ...state,
                        O2bedflag: !state.O2bedflag,
                      })

                    }} />
                </Animatable.View>

                <Animatable.View style={styles.bedstyles} animation="bounceInRight">
                  <Animatable.Text animation="bounce" style={{ paddingTop: '3%' }} >ICU Bed</Animatable.Text>

                  <Checkbox status={state.ICUbedflag ? 'checked' : 'unchecked'}
                    onPress={() => {
                      console.log(state.ICUbedflag + " state.ICUbedflag");
                      setState({
                        ...state,
                        ICUbedflag: !state.ICUbedflag,
                      })

                    }} />
                </Animatable.View>

                <Animatable.View style={styles.bedstyles} animation="bounceInRight">
                  <Animatable.Text animation="bounce" style={{ paddingTop: '3%' }} >O2 Supply</Animatable.Text>

                  <Checkbox status={state.O2Supplyflag ? 'checked' : 'unchecked'}
                    onPress={() => {
                      console.log(state.O2Supplyflag + " state.O2Supplyflag");
                      setState({
                        ...state,
                        O2Supplyflag: !state.O2Supplyflag,
                      })

                    }} />
                </Animatable.View>


                <Animatable.View
                  style={[styles.bedstyles, { alignSelf: 'center' }]}
                  animation="bounceInRight">
                  <TouchableOpacity onPress={() => onFilterSavePress()}>
                    <MaterialCommunityIcon
                      color='green'
                      name="content-save" size={30} />
                  </TouchableOpacity>
                </Animatable.View>


              </View>

            </View>
            : null}
        </View>


        : null}

      {state.isBoodRequestAvailable && state.markers.length > 0 ?
        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          scrollEventThroll={1}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          style={styles.scrollView}
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD,
            bottom: 0,
            right: SPACING_FOR_CARD,
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD : 0
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  }
                },
              },
            ],
            { useNativeDriver: true }
          )}
        >


          {state.markers.map((marker, index) => (

            <View style={styles.card} key={index}>

              <FlipCard
                // style={styles.cardview}
                friction={6}
                perspective={1000}
                flipHorizontal={true}
                flipVertical={false}
                flip={false}
                clickable={true}
                // key={index}
                onFlipEnd={(isFlipEnd) => { console.log('isFlipEnd', isFlipEnd) }}
              >


                <ScrollView >
                  <View style={styles.textContent}>
                    <View
                      style={{ alignItems: 'flex-end' }} >
                      <Click_to_flip_Component cardface={"front"} />
                    </View>
                    <Text style={styles.cardTitle}>Hospital Name: {marker.title}</Text>
                    <Text style={styles.cardDesc}>Covid Details Id: {marker.CovidAddDetailsId}</Text>
                    <Text style={styles.cardDesc}>Contact Name: {marker.contactname}</Text>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(`tel:${marker.contactnumber}`)}
                    >
                      <Text style={[styles.cardDesc, { color: 'green' }]}>Contact Number :{marker.contactnumber}</Text>
                    </TouchableOpacity>

                    <Text style={styles.cardDesc}>Address: {marker.address}</Text>

                    {marker.BedCount > 0 && marker.BedCount !== "" ?
                      <Text style={styles.cardDesc}>Normal Bed Count {marker.BedCount}</Text>
                      : null}

                    {marker.O2BedCount > 0 && marker.O2BedCount !== "" ?
                      <Text style={styles.cardDesc}>Oxygen Bed Count {marker.O2BedCount}</Text>
                      : null}

                    {marker.ICUBedCount > 0 && marker.ICUBedCount !== "" ?
                      <Text style={styles.cardDesc}>ICU Bed Count {marker.ICUBedCount}</Text>
                      : null}

                    {marker.O2SupplyCount > 0 && marker.O2SupplyCount !== "" ?
                      <Text style={styles.cardDesc}>Normal Bed Count {marker.O2SupplyCount}</Text>
                      : null}



                  </View>
                </ScrollView>



                <ScrollView >
                  <View
                    style={{ alignItems: 'center', }} >
                    <Click_to_flip_Component cardface={"back"} />
                  </View>
                  <View style={styles.action}>
                    <View style={styles.button}>
                      <TouchableOpacity
                        onPress={() =>
                          acceptHandler(marker)
                          //   navigation.navigate('CovidDataSingleDisplayScreen', {
                          //   markerdata: marker.phoneNumber,
                          //   // bloodgroup: marker.bloodgroup,
                          //   // hospital: marker.title,
                          //   // bloodrequestid: marker.bloodrequestid,
                          //   // contact_name: marker.description,
                          //   // replacement: marker.replacement,
                          //   // requesttype: marker.requesttype,
                          //   // address: marker.address,
                          //   // pincode: marker.pincode,
                          //   // noofunits: marker.noofunits,
                          //   // status: marker.status,
                          //   // userid: marker.userid,
                          //   // noofdonoraccepted: marker.noofdonoraccepted,
                          //   // contactnumber: marker.phoneNumber,
                          // })
                        }
                        style={[styles.signIn, {

                        }]}
                      >

                        <Text style={[styles.textSign, {
                          color: '#FF6347'
                        }]}>Accept</Text>
                      </TouchableOpacity>
                    </View>
                    <View >
                      <TouchableOpacity
                        onPress={
                          () => { messagehandle(marker) }
                          //onOpen

                        }
                        style={[styles.signIn]} >

                        <Text style={[styles.textSign, {
                          color: '#009387'
                        }]}>Share</Text>
                      </TouchableOpacity>
                    </View>
                  </View>


                </ScrollView>

              </FlipCard>
            </View>

          ))}

        </Animated.ScrollView>
        : null}

      <View style={styles.refreshbox}>
        <TouchableOpacity onPress={() =>
          //loadProducts()
          requestLocationPermission()
        }>
          <Ionics name="md-locate" size={45} />

        </TouchableOpacity>
      </View>


      {state.acceptflag ?
        <Animatable.View
          animation="fadeInUpBig"
          style={[styles.acceptstyle,styles.scrollView]}
          >   
         
          <TouchableOpacity
            onPress={
              () => { closeaccept() }
              //onOpen

            }
            //style={[styles.signIn]} 
            style ={{alignSelf:"center"}}
            >

            <MaterialCommunityIcon
                      color='red'
                      name="close-circle" size={30} />
                
          </TouchableOpacity>
          <Covid_Data_Single_Display_Screen marker={state.marksprops} screen={"Accept"} databack={handleCallback}/>
        </Animatable.View>
        : null
      }
    </View>

  );
};

export default Covid_Data_Display_List_Screen;

export const styles = StyleSheet.create({

  map: {
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },

  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },

  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32
  },
  acceptstyle: {
    elevation: 2,
    backgroundColor: "#fff",
    // backgroundColor: "transparent",
    // borderTopLeftRadius:5,
    // borderTopRightRadius:5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: screen_height * 0.80,
    width: screen_width*0.95 ,
    opacity: 0.5,
    // overflow: "hidden",
    borderRadius: 50,
    borderColor: 'gold',
    borderWidth: 1,
    // marginBottom:'2%',
    // marginRight:'10%',
    margin:"2%",
    //paddingLeft:'1%',
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a78',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 120,
    height: 80,
  },

  container: {
    flex: 1,
  },
  refreshbox: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? '3.5%' : '1.5%',
    width: '3%',
    alignSelf: 'flex-end',
    marginLeft: '12%',
    padding: '4%',
  },
  messageBox: {
    flexDirection: 'row',
    margin: '1%',
  },
  messageContainer: {
    width: '100%',
    alignSelf: 'flex-start',
    borderRadius: 30,
    padding: '2%',
    shadowColor: '#ccc',
    textShadowOffset: { width: 0, height: 3 },
    shadowOpacity: 5,
    elevation: 10,

  },
  messageText: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: '3%',

  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? '3.5%' : '2.3%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '80%',
    alignSelf: 'flex-start',
    borderRadius: 5,
    marginLeft: '4%',
    padding: '2%',
    shadowColor: '#ccc',
    textShadowOffset: { width: 0, height: 3 },
    shadowOpacity: 5,
    elevation: 10,
  },
  marker: {
    width: 30,
    height: 30
  },
  chipsScrollView: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: Platform.OS === 'ios' ? '10%' : '3%',
    marginLeft: '6%',
    // padding: '4%',
    // top: Platform.OS === 'ios' ? '10%' : '3%',


  },
  chipsIcon: {
    // margin: 5,
    // position: "absolute",
    marginHorizontal: 10,
    paddingHorizontal: 20,
    padding: '5%',
  },
  filterselect: {
    // flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    //paddingTop:'3%',
    padding: '7%',
    //margin:'1%',
    paddingLeft: '10%',
    paddingRight: '10%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    // height: 100,   
    opacity: 0.8,
  },
  bedstyles: {
    flexDirection: 'row', justifyContent: 'space-between',

  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    backgroundColor: "transparent",
    borderRadius: 20,
    //paddingTop:'3%',
    padding: '5%',
    //margin:'1%',
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5, elevation: 10,
    borderWidth: 1,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPading: {
    paddingRight: screen_width - CARD_WIDTH,
  },
  card: {
    elevation: 2,
    backgroundColor: "#fff",
    // borderTopLeftRadius:5,
    // borderTopRightRadius:5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius: 25,
    borderColor: 'gold',
    borderWidth: 1
    //paddingLeft:'1%',
  },
  textContent: {
    flex: 1,
    padding: '5%',
    borderRadius: 3,
    // backgroundColor:'green',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  cardDesc: {
    fontSize: 16,
    color: '#444',
    fontWeight: 'bold'
  },
  makerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    // alignItems: "center",
    // alignSelf:'center',

    // justifyContent:'space-evenly',
  },
  action: {
    flexDirection: 'row',
    // marginTop: '2%',
    // borderBottomWidth: 1,
    // paddingBottom: 1
    // borderBottomColor: '#f2f2f2',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: CARD_WIDTH * 0.25,
    // alignItems:'center',
    // flex:1
  },
  signIn: {
    marginRight: '3%',
    // width:150,
    //padding:'5%',
    width: CARD_WIDTH / 2.5,
    paddingBottom: '5%',
    marginLeft: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderTopColor: "#FF6347",
    borderWidth: 1,
  },
  textSign: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  // container: {
  //   ...StyleSheet.absoluteFillObject,
  //   height: 400,
  //   width: 400,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  // map: {
  //   ...StyleSheet.absoluteFillObject,
  // },
});

