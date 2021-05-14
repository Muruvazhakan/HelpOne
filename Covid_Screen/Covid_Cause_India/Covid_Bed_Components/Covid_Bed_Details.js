import React, { useEffect } from 'react';
import { View, Text,
   Button, StyleSheet,StatusBar,ToastAndroid,
   TouchableOpacity,Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import Toaster from 'react-native-toaster';
import {useSelector,useDispatch} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles as MainScreenStyles} from '../../../Main_Screen/MainScreen';
import * as fetchCovid from '../../Covid_India_Fetch_Datas';
import { ScrollView } from 'react-native-gesture-handler';

import FlipCard from 'react-native-flip-card';
import Covid_Statewise_Data_Screen from '../../Covid_Statewise_Data_Screen';
import { Picker } from '@react-native-community/picker';
import Covid_India_Contacts_Screen from '../Covid_India_Contacts_Screen';
class Covid_Bed_Details extends React.Component {   
    state = {
      contact: {}, 
      new:{},
      primarycontacts:{
        number: null,
        numbertollfree:null,
        email: "ncov2019@gov.in",
        twitter: "https://twitter.com/MoHFW_INDIA",
        facebook: "https://www.facebook.com/MoHFWIndia",
      } ,  
      selectedcontactloc:null 
    }
 
    async componentDidMount() {
    //   const data = await fetchCovid.fetchCovidStateData();
      const contactdata = await fetchCovid.fetchCovidStateContactData();
    //   console.log("[Covid_India_Contacts_Screen] fetchData data");
    // console.log("contactdata");
     
      
      console.log("[Covid_India_Contacts] allcontact datas");    
    //   console.log(contactdata.primary);
      console.log(contactdata);
      this.setState({        
        // contact:contactdata.regional,
        // primarycontacts:contactdata.primary
        contact:contactdata.allcontactsplit,
        primarycontacts:contactdata.allcontact.contacts.primary
    });
    // console.log(this.state);  
    //  this.state.contact.map((contact, index) => {
    //   console.log("contact inside") ;
    //   console.log(contact) ;  
    //   this.var =  contact.location;
      
    // });  
    // console.log(this.var) ;  
      //  console.log(this.state.indiadata);

      //  {this.state.indiadata.map((regiondata, index) => {
      //   console.log("index " + index)
      //   console.log(regiondata)     
      //   // console.log("index "+regiondata.loc)          
        
      // })}
    } 
    
     handleStateContactChange = (e) =>{
      let  newData = this.state.contact.filter((contact)=>{
          return contact.loc === e;
        })
        console.log("newData") ;
        console.log(newData) ;
        newData.map((contact, index) => {
          console.log("contact inside") ;
          console.log(contact) ;
        //   setState({ ...state,
        //     location: regiondata.location,
        //     confirmed: regiondata.confirmed,
        //     deaths: regiondata.deaths,
        //     recovered: regiondata.discharged,
        //   });
        });  
        
       }
  
    render() {
      const { contact,primarycontacts } = this.state;
      
      return (   
        <View>
        <Covid_India_Contacts_Screen props ={contact} primarycontacts={primarycontacts}  />   
        </View> 
      );
    }
  }
  
  export default Covid_Bed_Details;
  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      // alignItems: 'center', 
      justifyContent: 'space-evenly'
    },
  });