import React from 'react';
import {  Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as fetchCovid from '../Covid_Status/Covid_Fetch_Datas';
import Covid_Cause_Screen from '../Covid_Home_Screen/Covid_Cause_Screen';
import FlipCard from 'react-native-flip-card';
import { View } from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Covid_Country_Select_Screen from './Covid_Country_Select_Screen';
import Covid_Global_Chart from './Covid_Global_Chart';
class Covid_Screen extends React.Component {
    state = {
      data: {},
      indiadata:{},
      country: '',
    }
  
    async componentDidMount() {
      const data = await fetchCovid.fetchCovidData();
      const indiadatas = await fetchCovid.fetchCovidData("IND");
      // console.log("[Covid_Screen] fetchData data");
      // console.log(data);
      
      // console.log("[Covid_Screen] fetchData IND data");
      // console.log(indiadatas);

    //   console.log("datass");
      this.setState({  ...this.state,         
        data: data,indiadata:indiadatas });
    }
  
    handleCountryChange = async (country) => {
      const data = await fetchCovid.fetchCovidData(country);
      console.log("[Covid_Screen] handleCountryChange data");
      console.log(data);
      this.setState({ ...this.state,
           data, country: country });
    }
  
    render() {
      const { data,indiadata, country } = this.state;
  
      return (
        // <div className={styles.container}>
        //   <img className={styles.image} src={image} alt="COVID-19" />
        //   <Cards data={data} />
        //   <CountryPicker handleCountryChange={this.handleCountryChange} />
        //   <Chart data={data} country={country} /> 
        // </div>
        <ScrollView
         showsVerticalScrollIndicator={false}
        >
        <View style={[styles.container]}>       
       <Covid_Country_Select_Screen handleCountryChange={this.handleCountryChange} />
       <View style={[{}]}> 
        <Covid_Cause_Screen data={data} countrty={country}  countupstate="Yes"/>         
        <Covid_Global_Chart data={data} country={country}/>
      </View>
       
        </View>  
        </ScrollView>  
      );
    }
  }
  
  export default Covid_Screen;
  export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'space-around',
      margin:'4%',
    },
  });