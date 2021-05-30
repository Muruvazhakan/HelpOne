import React, { useEffect } from 'react';
import { View, Text,
   Button, StyleSheet,StatusBar,ToastAndroid,
   TouchableOpacity,Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import Toaster from 'react-native-toaster';
import {useSelector,useDispatch} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles as MainScreenStyles} from '../../../Main_Screen/MainScreen';
import * as fetchCovid from '../Covid_India_Fetch_Datas';
import { ScrollView } from 'react-native-gesture-handler';
import FlipCard from 'react-native-flip-card';
import { ActivityIndicator } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Covid_Bed_Details_Screen from './Covid_Bed_Details_Screen';
class Covid_Bed_Details extends React.Component {   
    state = {
      bed: null, 
      summary:{},     
      selectedbedloc:null,
      isLoading:true, 
    }
 
    async componentDidMount() {
    //   const data = await fetchCovid.fetchCovidStateData();
      const beddata = await fetchCovid.fetchCovidBedData();
    //   console.log("[Covid_Bed_Details_Screen] fetchData data");
    // console.log("contactdata");
     
      
      console.log("[Covid_Bed_Details_Screen] datas");    
      // console.log(beddata.primary);
      console.log(beddata);
      this.setState({       
        bed:beddata.regional,
        summary:beddata.summary,
        isLoading:false
    });
    console.log(this.state);  
     this.state.bed.map((bed, index) => {
      console.log("bed state") ;
      console.log(bed) ;  
      // this.var =  bed.state;
      
    });  
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
      const { bed,summary } = this.state;
      // if( bed ) {
      //   return(
      //     <View style={{
      //       //  flex:1,
      //       justifyContent:'center',alignItems:'center'}}>
      //       <ActivityIndicator size="large"/>         
            
      //     </View>
      //   );
      // }
      return (   
        <View>
        <Covid_Bed_Details_Screen props ={bed} summary={summary}  />   
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