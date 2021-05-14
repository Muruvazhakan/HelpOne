import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { useTheme } from 'react-native-paper';
import * as fetchCovid from '../Covid_Status/Covid_Fetch_Datas';
import { View } from 'react-native-animatable';
import { Picker } from '@react-native-community/picker';
import { width, height } from '../../components/Parameter';
import {  Text,
  Button, StyleSheet,StatusBar,ToastAndroid,FlatList,
  TouchableOpacity,Linking } from 'react-native';
const Covid_Country_Select_Screen = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);
  const [selectedcountries, setselectedCountries] = useState(null);
  const { colors } = useTheme();
  const widths=width*0.9;
  useEffect(() => {
    console.log(""+handleCountryChange);
    const fetchCountryAPI = async () => {
      setCountries(await fetchCovid.fetchCountries());
      console.log('[Covid_Country_Select_Screen] countries');
      console.log(countries);
    };
   
    fetchCountryAPI();
  }, []);

  return (
    // <FormControl className={styles.formControl}>
    //   <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
    //     <option value="">United States</option>
    //     {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
    //   </NativeSelect>
    // </FormControl>
    <View style={styles.container}>
        <Picker
              selectedValue={selectedcountries}
              style={[{ height: 50, width:200,alignSelf: 'center', color: colors.text, }]}
              onValueChange={(e, itemIndex) => 
                {  console.log(e);
                    setselectedCountries(e);
                    handleCountryChange(e)}
              }>
              {/* <Picker.Item label="Select" value="" /> */}
              {countries.map((country, i) =>
               <Picker.Item  key={i}  label={country} value={country}/>
               )}

            </Picker>

    </View>
  );
};

export default Covid_Country_Select_Screen;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100%',
  }, 
});