import React, { useEffect } from 'react';
import { View, Text,
   Button, StyleSheet,StatusBar,ToastAndroid,
   TouchableOpacity,Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import Toaster from 'react-native-toaster';
import {useSelector,useDispatch} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles as MainScreenStyles} from '../../Main_Screen/MainScreen';
import * as fetchCovid from './Covid_India_Fetch_Datas';
// import Covid_Cause_Screen from '../Covid_Home_Screen/Covid_Cause_Screen';
import FlipCard from 'react-native-flip-card';
import Covid_Statewise_Data_Screen from './Covid_Statewise_Data_Screen';
import { ActivityIndicator } from 'react-native-paper';
class Covid_Screen_India extends React.Component {
    state = {
      data: {},
      indiadata:[],
      country: '',
      isLoading:true,
    }
  
    async componentDidMount() {
    //   const data = await fetchCovid.fetchCovidStateData();
      const indiadatas = await fetchCovid.fetchCovidStateData();
    //   console.log("[Covid_Screen] fetchData data");
    // console.log("indiadatas");
    //   console.log(indiadatas);
      
      console.log("[Covid_Screen_India] fetchData IND data");
     
    //  const  indiadatasj= JSON.parse(indiadatas);
      // console.log("datass");
      this.setState({        
       indiadata:indiadatas,
       isLoading:false });
      //  console.log(this.state.indiadata);

      //  {this.state.indiadata.map((regiondata, index) => {
      //   console.log("index " + index)
      //   console.log(regiondata)     
      //   // console.log("index "+regiondata.loc)          
        
      // })}
    }   
    handleCountryChange = async (country) => {
      const data = await fetchData(country);
  
      this.setState({ ...this.state,
           data, country: country });
    }
  
    render() {
      const { data,indiadata, country,isLoading } = this.state;
      if( isLoading ) {
        return(
          <View style={{
            //  flex:1,
            justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large"/>
            {/* <Text  style={{ 
              flex:1,     
            justifyContent:'center',alignItems:'center'}}>Donate Blood</Text>        */}
            
            
          </View>
        );
      }
      return (        
        <View style={styles.container}> 
        <Covid_Statewise_Data_Screen data={indiadata}  countupstate="No" />
        </View>
      );
    }
  }
  
  export default Covid_Screen_India;
  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      // alignItems: 'center', 
      justifyContent: 'space-evenly'
    },
  });