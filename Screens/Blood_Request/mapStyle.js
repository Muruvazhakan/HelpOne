import { Component } from "react";
import React from 'react';
// class SignInScreen extends Component {
//   state={
//     items:[],
//     isloading:false
//   }

  //   const [mark, setmarkers] = React.useState({
  //     data:[],
  //     isloading:false,
  //     coordinate:{
  //       latitude:37.425998333,
  //       longitude:-122.125200000,
  //     },
  //     title:"",
  //     description:"",
  //     bloodgroup:"",
  //     phoneNumber:"",
  //  })
  

  //   let API_URL= 'http://192.168.0.9/help_1/blood_request_list.php';
  //   // setmarkers:{isloading:true};
  //   fetch(API_URL,{
  //     method:'post',
  //     header:{
  //         'Accept': 'application/json',
  //         'Content-type': 'application/json'
  //     }

  //   }).then(res => res.json()).then(res =>{
  //     setmarkers({markers:res});
  //     console.log(markers);
  //     console.log("mys");
  //   })
  //   .catch((error)=>{
  //     console.error(error);
  //     });
    //.finally(() => setmarkers({isloading:false}));


   //markers= data;
  
  
  export var markers= [
    {
        coordinate:{
            latitude:37.425998333,
            longitude:-122.125200000,
        },
        title:"Hospital 1",
        description:"Person name",
        bloodgroup:"O+",
        phoneNumber:"8989324",
        urgent:"Yes",
    },
    {
      coordinate:{
        latitude:37.411298343,
        longitude:-122.128200010,
      },
      title:"Hospital 2",
      description:"Person name",
      bloodgroup:"O+",
      phoneNumber:"8989324",
      urgent:"Yes",
  },
  
  {
    coordinate:{
      latitude:37.410998353,
      longitude:-122.125200004,
    },
    title:"Hospital 3",
    description:"Person name",
    bloodgroup:"O+",
    phoneNumber:"8989324",
    urgent:"Yes",
},
{
  coordinate:{
    latitude:37.410998303,
    longitude:-122.123200005,
  },
  title:"Hospital 4",
  description:"Person name",
  bloodgroup:"O+",
  phoneNumber:"8989324",
  urgent:"Yes",
},
   
];
    
  
// fetch('http://192.168.0.9/help_1/blood_request_list.php',{
//   method:'post',
//   header:{
//       'Accept': 'application/json',
//       'Content-type': 'application/json'
//   },
//   body:JSON.stringify({
//       // we will pass our input data to server
//       name: name,
//       password: password
//   })    
// }).then((response) => response.json())
// .then((responseJson) => {
//   if(responseJson == "ok"){
      
//       signIn(name,password);// change
//       alert("Successfully Login");
//   }else{
//       alert("Wrong Login Details");
//   }
// })
// .catch((error)=>{
// console.error(error);
// })






export const mapDarkStyle= [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];

export const manpStandardStyle=[
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
  ];

