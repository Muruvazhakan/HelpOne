// import React,{useEffect} from 'react';
// import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'; 
// import { View,
//  // Share,
//   TextInput,TouchableOpacity,Animated, ScrollView,Dimensions,Text,
//    Button   , 
//   StyleSheet,Image,Platform, Alert, ToastAndroid } from 'react-native';
// import { useTheme } from '@react-navigation/native';
// import Geolocation from '@react-native-community/geolocation';
// import {PERMISSIONS, request} from 'react-native-permissions';

// import Map from './Map';
// import Share, {ShareSheet, 
//   //Button
// }
//   // as ShareButton
//  from 'react-native-share';

// const{width,height} = Dimensions.get('window');
// const CARD_HEIGHT =177;
// const CARD_WIDTH = width*0.9;
// const SPACING_FOR_CARD= width*0.1 -10;

// const SearchMap = () => {

//     return (
         
//       <View style={styles.container}>
//      <Map valuesfrom='searchMap' >

//      </Map>

//       </View>
      

   
//    );
// };

// export default SearchMap;


// const styles = StyleSheet.create({

//   map: {
//     height: '100%',
//     ...StyleSheet.absoluteFillObject,
//     },
  
//     bubble: {
//       flexDirection: 'column',
//       alignSelf:'flex-start',
//       backgroundColor:'#fff',
//       borderRadius:6,
//       borderColor:'#ccc',
//       borderWidth:0.5,
//       padding:15,
//       width:150,
//     },
    
//     arrow: {
//       backgroundColor:'transparent',
//       borderColor:'transparent',
//       borderTopColor: '#fff',
//       borderWidth:16,
//       alignSelf:'center',
//       marginTop: -32
//     },
//     arrowBorder: {
//       backgroundColor:'transparent',
//       borderColor:'transparent',
//       borderTopColor:'#007a78',
//       borderWidth:16,
//       alignSelf:'center',
//       marginTop: -0.5,
//       // marginBottom: -15
//     },
//     name: {
//       fontSize:16,
//       marginBottom:5,
//     },
//     image: {
//       width:120,
//       height:80,
//      },
    
//   container: {
//     flex: 1, 
//    },
//    refreshbox:{
//     position:'absolute',    
//     marginTop: Platform.OS==='ios'?'3.5%':'2.5%',
//     width:'3%',
//     alignSelf:'flex-end',
//     marginLeft:'9%',
//     padding:'4%',
//   },
//   messageBox:{
//     flexDirection:'row',
//     margin:'1%',
//   },
//   messageContainer:{
//     width:'100%',
//     alignSelf:'flex-start',
//     borderRadius:30,    
//     padding:'2%',
//     shadowColor:'#ccc',
//     textShadowOffset:{width:0,height:3},
//     shadowOpacity:5,
//     elevation:10,
    
//   },
//   messageText:{
//     fontSize:22,
//     fontWeight:"bold",
//     marginLeft:'3%',
    
//   },
//   searchBox:{
//     position:'absolute',
//     marginTop: Platform.OS==='ios'?'3.5%':'2.3%',
//     flexDirection:'row',
//     backgroundColor:'#fff',
//     width:'80%',
//     alignSelf:'flex-start',
//     borderRadius:5,
//     marginLeft:'4%',
//     padding:'2%',
//     shadowColor:'#ccc',
//     textShadowOffset:{width:0,height:3},
//     shadowOpacity:5,
//     elevation:10,
//   },
//   marker:{
//     width:30,
//     height:30
//   },
//   editIcon:{    
//     right:5,
//     marginLeft:'80%',    
//   },
//   chipsScrollView:{
//     position:'absolute',
//     top:Platform.OS === 'ios' ?'20%' :'10.5%',
//     paddingHorizontal:10
//   },
//   chipsIcon:{
//     margin:5
//   },
//   chipsItem:{
//     flexDirection:'row',
//     backgroundColor:'#fff',
//     borderRadius:20,
//     padding:8,
//     paddingHorizontal:20,
//     marginHorizontal:10,
//     height:35,
//     shadowColor:'#ccc',
//     shadowOffset:{width: 0,height :3},
//     shadowOpacity:0.5,
//     shadowRadius:5,elevation:10,
//   },
//   scrollView:{
//     flex:1,
//     position:'absolute',  
//     bottom:0,
//     left:0,
//     right:0,
//     paddingVertical:10,
//   },
//   endPading:{
//     paddingRight:width - CARD_WIDTH,
//   },
//   card:{
//     alignItems:"center",
//     elevation:2,
//     backgroundColor:"#fff",   
//     marginHorizontal:10,
//     shadowColor:"#000",
//     shadowRadius:5,
//     shadowOpacity:0.3,
//     shadowOffset:{x:2,y:-2},
//     height:CARD_HEIGHT,
//     width:CARD_WIDTH,
//     overflow:"hidden",
//     borderRadius:25,
//   },
//   textContent:{
//     flex:1,
//     padding:10,
//     borderRadius:3,
//     // backgroundColor:'green',
//   },
//   cardTitle:{
//     fontSize:20,
//     fontWeight:'bold'
//   },
//   cardDesc:{
//     fontSize:16,
//     color:'#444'
//   },
//   makerWrap:{
//     alignItems:"center",
//     justifyContent:"center",
//     width:50,
//     height:50,
//   },
//   marker: {
//     width: 30,
//     height: 30,
//   },
//   button:{
//     alignItems:"center",
//   },
//   action: {
//     flexDirection: 'row',
//     marginTop: '2%',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f2f2f2',
//     paddingBottom: 1
// },
//   signIn:{
//     // marginRight:'3%',
//     width:15,
//     padding:6,
//     // justifyContent:'center',
//     // alignItems:'center',
    
//   },
//   textSign:{
//     fontSize:20,
//     fontWeight:'bold'
//   },
//   // container: {
//   //   ...StyleSheet.absoluteFillObject,
//   //   height: 400,
//   //   width: 400,
//   //   justifyContent: 'flex-end',
//   //   alignItems: 'center',
//   // },
//   // map: {
//   //   ...StyleSheet.absoluteFillObject,
//   // },
// });


