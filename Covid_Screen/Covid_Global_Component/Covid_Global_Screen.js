import React from 'react';
import { Button, StyleSheet, TouchableOpacity,SafeAreaView } from 'react-native';
import * as fetchCovid from '../Covid_Status/Covid_Fetch_Datas';
import Covid_Cause_Screen from '../Covid_Home_Screen/Covid_Cause_Screen';
import FlipCard from 'react-native-flip-card';
import { View } from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import Covid_Country_Select_Screen from './Covid_Country_Select_Screen';
import Covid_Global_Chart from './Covid_Global_Chart';
import { commonstyles } from '../../components/Styles';
import { useTheme, Text, ActivityIndicator } from 'react-native-paper';
import { styles as ProfileScreenStyles } from '../../Screens/ProfileScreen/ProfileScreen';
class Covid_Screen extends React.Component {
  state = {
    data: null,
    indiadata: {},
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
    this.setState({
      ...this.state,
      data: data, indiadata: indiadatas
    });
  }

  handleCountryChange = async (country) => {
    const data = await fetchCovid.fetchCovidData(country);
    console.log("[Covid_Screen] handleCountryChange data");
    console.log(data);
    this.setState({
      ...this.state,
      data, country: country
    });
  }

  render() {
    const { data, indiadata, country } = this.state;

    return (
      
      <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View
        // style={[{ alignItems: 'center',marginTop:'3%' }]} 
        >
        {data ?
          <View style={[styles.container]}>
            <View
        style={[{ alignItems: 'center',marginTop:'3%' }]} 
        >        
            <Covid_Country_Select_Screen handleCountryChange={this.handleCountryChange} />
            </View>
            <View style={[{}]}>
              <Covid_Cause_Screen data={data} countrty={country} countupstate="Yes" />
              <View
        style={[{ marginBottom:'3%' }]} 
        >   
              <Covid_Global_Chart data={data} country={country} />
              </View>
            </View>

          </View>
          :
          <View style={[commonstyles.activityIndicatorStyle]}>
            <ActivityIndicator size="large" />
          </View>

        }
        </View>
      </ScrollView>
      </SafeAreaView>
   
    );
  }
}

export default Covid_Screen;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // marginBottom: '4%',
  },
});