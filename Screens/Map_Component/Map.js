import React,{useEffect} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'; 
import { View,
 // Share,
  TextInput,TouchableOpacity,Animated, ScrollView,Dimensions,Text,
   Button   , 
  StyleSheet,Image,Platform, Alert, ToastAndroid } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request} from 'react-native-permissions';
import { mapDarkStyle,manpStandardStyle} from '../mapStyle';
import {connect,useSelector,useDispatch,useCallback} from 'react-redux';
import {styles as signupstyles} from '../SignUpScreen';
import Share, {ShareSheet, 
  //Button
}
  // as ShareButton
 from 'react-native-share';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionics from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {styles as requestListstyle} from  '../Blood_Request_List_Screen';
import {styles as Editprofilestyle} from '../ProfileScreen/EditProfileScreen';
// import Autocomplete from 'react-google-autocomplete';
// import Geocode from "react-geocode";
// Geocode.setApiKey( "AIzaSyDGe5vjL8wBmilLzoJ0jNIwe9SAuH2xS_0" );
// Geocode.enableDebug();
import * as toggledata  from '../../Store/actions/HelpOne';
import { fromAddress } from 'react-geocode';
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=[AIzaSyDGe5vjL8wBmilLzoJ0jNIwe9SAuH2xS_0]&libraries=places"></script> 

const{width,height} = Dimensions.get('window');
const CARD_HEIGHT =177;
const CARD_WIDTH = width*0.9;
const SPACING_FOR_CARD= width*0.1 -10;

const Map = (props) => {

const user_data_user_latitude=useSelector(state =>
  state.helpone.user_latitude
  );

const user_data_user_longitude=useSelector(state =>
  state.helpone.user_longitude
  );  

const user_data_user_address_line1=useSelector(state =>
  state.helpone.user_address_line1
  );
  
const user_data_user_city=useSelector(state =>
  state.helpone.user_city
  );
  
const user_data_user_area=useSelector(state =>
  state.helpone.user_area
  );

const user_data_user_state_name=useSelector(state =>
  state.helpone.user_state_name
  );

const user_data_user_pincode=useSelector(state =>
  state.helpone.user_pincode
  );

const [data, setData] = React.useState({    
    isMapvisible:false,    
})

const [screen,setscreen] = React.useState({    
     valuesfrom: props.valuesfrom,
})

const handledata =(lati,longi) =>{
  setData({
    ...data,
    lat:lati,
    long: longi,
   
});

}
let int_lat=((user_data_user_latitude !==null||user_data_user_latitude !=='')? user_data_user_latitude :122.091);
let int_long=((user_data_user_longitude !==null||user_data_user_longitude !=='')? user_data_user_longitude :-33.00987);
const initialMapState={
   int_lat:28.7041,
   int_long:77.1025,
  isRequestCompleted:false,
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
  
    address: user_data_user_address_line1,
    city:user_data_user_city,
    area:user_data_user_area,
    statename:user_data_user_state_name,
    pincode: user_data_user_pincode,
    screenname:props.loactionAddress.data,
};
const dispatch = useDispatch();
const [state,setState] = React.useState(initialMapState);


  const theme=useTheme();
  
  var requestLocationPermission= async () => {
    console.log("Inside the requestLocationPermission");
    //this.requestLocationPermission;
    if(Platform.OS === 'ios') {
      var response  = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iphone' + response);
  
      if(response === 'granted'){
         locateCurrentPosition();
         
      }
  
    } else {
      var response  = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('android:' + response);
        
      if(response === 'granted'){
        //Alert.alert("locating");
        console.log("Inside the requestLocationPermission android is granted");
         locateCurrentPosition();
      }
    }
  

  }
  
  var locateCurrentPosition =() =>{
  
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));
        setData({...data,isMapvisible:true});
        setState({  ...state,
          markers: position.coords,   
        });
        console.log(" data.isMapvisible "+data.isMapvisible);        
        console.log("markers locateCurrentPosition: "+state.markers);
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy:true, timeout:10000,maximumAge:1000}
      )
  
   }
   const onMapPress =(e) => {
    // alert("coordinates:"+ JSON.stringify(e.nativeEvent.coordinate))
    console.log("screenname"+state.screenname);
    //console.log("coordinate: "+e.nativeEvent.coordinate)
    setState({  ...state,
      markers: e.nativeEvent.coordinate,  address:'ssf' 
    });
    setData({
      ...data,isMapvisible:true,
    })
    }
const handleMarkerPress=(event)=> {
        const markerID = event.nativeEvent.identifier
        alert(markerID)
        console.log("markerID "+markerID);
        }
  // useEffect(() => {

  //   if(!data.isMapvisible)
  //   {
  //     console.log("requestLocationPermission");
  //          requestLocationPermission();          
  //   }   
  //   console.log("use effect data.isMapvisible");
  //   console.log(data.isMapvisible);
  //   console.log("loactionAddress latitude state: "+ state.markers.latitude);
  //   console.log("loactionAddress latitude props: "+ props.loactionAddress.latitude);
  //   console.log("loactionAddress latitude address props: "+ props.loactionAddress.address+props.loactionAddress.city);
  //   console.log("loactionAddress latitude state: "+ state.address+state.city);
  //   // getAddressfromLoaction();
  // });
const onRegionChange=(e)=> {
  //alert("coordinates:"+ JSON.stringify(e.latitude))
  console.log("onRegionChange coordinate: "+e.latitude+e.longitude)
  
  setState({ ...state,
    markers: e,

  });
}

const sentbackdata=() =>{
    

    props.getloactionAddress({address:'muru',
        city:state.city,
        area:state.area,
        statename:state.statename,
        latitude: state.markers.latitude,
        longitude: state.markers.longitude})
        dipatchHandler();
        asyncStoragehandler();
}
const dipatchHandler=async() =>{  
  // dispatch(toggleuser_latitude(profiledata.user_latitude));
  // dispatch(toggleuser_longitude(profiledata.user_longitude));
  // dispatch(toggleuser_pincode(profiledata.user_pincode));
  // dispatch(toggleuser_state_name(profiledata.user_state_name));
  // dispatch(toggleuser_area(profiledata.user_area));
  // dispatch(toggleuser_city(profiledata.user_city));
  // dispatch(toggleuser_address_line1(profiledata.user_address_line1));
  console.log("state.markers.address"+state.address);
  
 
  dispatch(toggledata.toggleuser_latitude(state.markers.latitude));
  dispatch(toggledata.toggleuser_longitude(state.markers.longitude));
  dispatch(toggledata.toggleuser_pincode(state.pincode));
  dispatch(toggledata.toggleuser_state_name(state.statename));
  dispatch(toggledata.toggleuser_area(state.area));
  dispatch(toggledata.toggleuser_city(state.city));
  dispatch(toggledata.toggleuser_address_line1(state.address));
 
   
  
 
}

const user_data_upload=async() =>{

  fetch('http://192.168.0.9/help_1/user_personal_details_upload.php',{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
        mobile:profiledata.user_number,
        userfirst:profiledata.user_first_name,
        userlast:profiledata.user_last_name,
        UserImage:profiledata.isUserImageAvailable,	

        address:profiledata.address,
        city:profiledata.city,
        area:profiledata.area,
        statename:profiledata.statename,
        latitude:profiledata.latitude,
        usercountry:profiledata.user_country,
        userpincode:profiledata.user_pincode,
        longitude:profiledata.longitude,   


        useremail:profiledata.user_email,
        userGender:profiledata.user_Gender,
        userBloodGroup:profiledata.user_BloodGroup,
        userDOB:profiledata.user_DOB,    
        userConfermation:profiledata.user_Confermation,
        userProof:profiledata.user_Proof	
			})
			
		})
		.then((response) => response.json())
		 .then((responseJson) => {
      console.log(responseJson+ " responseJson");
      //ToastAndroid.show(responseJson,ToastAndroid.LONG);
      
      if(responseJson === "Updated")
          {
             console.log("Updated");        
          //navigation.goBack();
          }
        else if(responseJson==="Recorded")
        {            
            console.log("Recorded");
        
        //navigation.goBack();
        }  
        else if(responseJson ==="check")
        {
            Alert.alert("Connection Lost", 'check internet connection!', [
                {text: 'Okay'}
            ]);
            console.log("fail");
        //alert(responseJson);
        //navigation.goBack();
        }
        else if(responseJson =="user")
        {
            console.log("Invalid user");
            Alert.alert("Invalid user", 'Invalid user!', [
              {text: 'Okay'}
          ]);
        //alert(responseJson);
        //navigation.goBack();
        }
      else{
        console.log("else else");
      };
        })
		 .catch((error)=>{
		 console.error(error);
		 });

}

const asyncStoragehandler =async()=>{
  console.log(" aynsc storgae in Map screen ");
  try {

    await AsyncStorage.setItem('user_address_line1', state.address);	
    // await AsyncStorage.setItem('user_city', state.city);	
    // await AsyncStorage.setItem('user_area', state.area);	
    // await AsyncStorage.setItem('user_longitude', state.markers.user_longitude);	
    // await AsyncStorage.setItem('user_pincode', state.pincode);	
    // await AsyncStorage.setItem('user_latitude', state.markers.user_latitude);
    // await AsyncStorage.setItem('user_state_name', state.statename);
    
  } catch(e) {
    Alert.alert(e);
    console.log(e);
  }
}


// const getArea = ( addressArray ) => {
//   let area = '';
//   for( let i = 0; i < addressArray.length; i++ ) {
//    if ( addressArray[ i ].types[0]  ) {
//     for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
//      if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
//       area = addressArray[ i ].long_name;
//       return area;
//      }
//     }
//    }
//   }
//  };

//  const getCity = ( addressArray ) => {
//   let city = '';
//   for( let i = 0; i < addressArray.length; i++ ) {
//    if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
//     city = addressArray[ i ].long_name;
//     return city;
//    }
//   }
//  };

//  const getState = ( addressArray ) => {
//   let state = '';
//   for( let i = 0; i < addressArray.length; i++ ) {
//    for( let i = 0; i < addressArray.length; i++ ) {
//     if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
//      state = addressArray[ i ].long_name;
//      return state;
//     }
//    }
//   }
//  };

// const onPlaceSelected = ( place ) => {
//   const address = place.formatted_address,
//      addressArray =  place.address_components,
//      city = getCity( addressArray ),
//      area = getArea( addressArray ),
//      state = getState( addressArray ),
//      latValue = place.geometry.location.lat(),
//      lngValue = place.geometry.location.lng();
//   // Set these values in the state.
//     setState({...state,
//      address: ( address ) ? address : '',
//      area: ( area ) ? area : '',
//      city: ( city ) ? city : '',
//      state: ( state ) ? state : '',
//      markers: {
//       latitude: latValue,
//       longitude: lngValue,
//      },

//     })
//    };

// const getAddressfromLoaction =() =>{
//   Geocode.fromLatLng( state.markers.latitude , state.markers.longitude ).then(
//     response => {
//       console.log("getAddressfromLoaction "+ response);
//      const address = response.results[0].formatted_address,
//       addressArray =  response.results[0].address_components,
//       city = this.getCity( addressArray ),
//       area = this.getArea( addressArray ),
//       state = this.getState( addressArray );
   
//      console.log( 'city  '+ city+ area+state );
//      console.log( 'address  '+ address);
//      setState( {
//       address: ( address ) ? address : '',
//       area: ( area ) ? area : '',
//       city: ( city ) ? city : '',
//       statename: ( state ) ? state : '',
//      } )
//     },
//     error => {
//      console.error(error);
//     }
//    );
// }

const textInputAddressChange = (val) =>{
setState({
  ...state,address:val,
})
};

const _map=React.useRef(null);

    return (
         
      <View style={styles.container}>
          {/* <MapStyle/> */}
     <MapView 
       identifier={"1"}
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       showsUserLocation={true}
       style={styles.map}
       ref={_map}        
       customMapStyle={theme.dark ? mapDarkStyle:manpStandardStyle}
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
       onPress= {(event)=> onMapPress(event)}
      style={styles.container}
       region={
        //  state.region
         {
        latitude: state.markers.latitude,
        longitude:  state.markers.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }
      }
       >
         {data.isMapvisible ?
       <Marker 
       draggable={true}
       onDrag={(event)=> onRegionChange(event)}
       onDragEnd={(event)=> onRegionChange(event)}
          coordinate = {{
            latitude:state.markers.latitude,
            longitude: state.markers.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }} 
          //image={require('../assets/map_marker.png')}
          title="Your Location"
          >
            <Callout tooltip>
              <View>
                <View style ={styles.bubble}>
                  <Text style ={styles.name}>Drop the Location</Text> 
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow}/>
                <TouchableOpacity  onPress= {(event)=> onMapPress(event)}/> 
              </View>
            </Callout>
            
          </Marker>
           :null}           
           </MapView>
          
           <View style={styles.refreshbox}> 

        <TouchableOpacity onPress= {()=> requestLocationPermission()}>
        <Ionics name="md-locate" size ={60} />
        {/* <Animated.Image
                          source={require('../assets/target1.png')}
                          resizeMode='cover'
                          style={[styles.makerWrap]}
                          /> */}
           </TouchableOpacity>
      </View>
      <View>
        {screen.valuesfrom ==='getLocation'?          
          <View  style={styles.scrollView}>
               
              <View style={requestListstyle.card}>
               <ScrollView> 
                  <View style={{padding:'5%'}}>    
                     <View style={requestListstyle.messageBox}>            
                        <Text >Save your Location</Text>
                       <TouchableOpacity style={styles.editIcon}
                                onPress={() =>sentbackdata()}
                              >
                              <MaterialCommunityIcon style={{color:'green'}}name="content-save-move" size ={25} />                             
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
                          <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} />
                          <TextInput style={{paddingTop:0}} onChangeText={(val)=>textInputAddressChange(val)}>{state.address} </TextInput>
                        </View>

                    <Text  >City: {state.markers.longitude}</Text>
                    <Text style={styles.cardDesc}>state: </Text>
                    {/* <Text style={styles.cardDesc}>Urgent: {marker.urgent}</Text> */}

                    
                    <Text  >Longitude{state.markers.longitude}</Text>
                    <Text >Latitude{state.markers.latitude}</Text>
                   
                  </View>
                </ScrollView>
              </View>
              
          </View>
        :null}
        </View>                      

        
      </View>
      

   
   );
};

export default Map;


const styles = StyleSheet.create({

  map: {
    height: '100%',
    ...StyleSheet.absoluteFillObject,
    },
  
    bubble: {
      flexDirection: 'column',
      alignSelf:'flex-start',
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
    
    
  container: {
    flex: 1, 
   },
   refreshbox:{
    position:'absolute',    
    marginTop: Platform.OS==='ios'?'3.5%':'2.5%',
    width:'3%',
    alignSelf:'flex-end',
    marginLeft:'9%',
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
