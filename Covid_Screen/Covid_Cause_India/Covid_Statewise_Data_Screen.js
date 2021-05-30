import React, { useEffect, useState } from 'react';
import {
  View,
  Button, StyleSheet, StatusBar, ToastAndroid, FlatList,
  TouchableOpacity, Linking, SafeAreaView
} from 'react-native';
//import Toaster from 'react-native-toaster';
import { useSelector, useDispatch } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { styles as MainScreenStyles } from '../../Main_Screen/MainScreen';
import AnimateNumber from 'react-native-countup';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import Covid_Global_Chart from '../Covid_Global_Component/Covid_Global_Chart';
import Covid_Cause_Screen from '../Covid_Home_Screen/Covid_Cause_Screen';
import { commonstyles } from '../../components/Styles';
import { useTheme, Text, ActivityIndicator } from 'react-native-paper';
import { styles as ProfileScreenStyles } from '../../Screens/ProfileScreen/ProfileScreen';
const Covid_Statewise_Data_Screen = (props) => {
  const themes = useTheme();
  const user_data_user_first_name = useSelector(state =>
    state.helpone.user_first_name,
  );
  const [selectedState, setselectedState] = useState(null);
  const initialState = {
    location: "",
    confirmed: "",
    deaths: "",
    recovered: "",

  }
  let newData = {};
  const [state, setState] = useState(initialState);

  useEffect(() => {
    // console.log('user_data_user_name sdf'+user_data_user_name);
    // console.log('[Covid_Statewise_Data_Screen] home ');
    // console.log(props.data);
    // console.log(props.data.deaths);
    // {props.data.map((regiondata, index) => {
    //   // console.log(" props.data index " + index)
    //   // console.log(regiondata)     
    //   // console.log("index "+regiondata.loc)          

    // })}

  });


  const handleStateChange = (e) => {
    newData = props.data.filter((regiondata) => {
      return regiondata.location === e;
    })
    console.log("newData");
    console.log(newData);
    newData.map((regiondata, index) => {
      console.log("regiondata");
      console.log(regiondata);
      setState({
        ...state,
        location: regiondata.location,
        confirmed: regiondata.confirmed,
        deaths: regiondata.deaths,
        recovered: regiondata.discharged,
      });
    });

  }

  const { colors } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View>
          <StatusBar barStyle={themes.dark ? "light-content" : "default-content"} />
          {props.data.slice(0, 5).map((regiondata, index) => {
            //       console.log("index " + index)
            // console.log(regiondata)     
            //       console.log(regiondata.deaths)   

            //   return (
            //   	<ScrollView
            //     horizontal={true} 
            //     key={index}
            //     showsHorizontalScrollIndicator={false}            

            //    > 
            //     {/* <View style={[MainScreenStyles.cardview,{ padding: 0,paddingTop:'3%'}]}> */}
            //     <View>

            //     <Text>{regiondata.location}</Text>
            //     <Text>{regiondata.confirmed}</Text>
            //     <Text>{regiondata.deaths}</Text>
            //     </View>
            //    </ScrollView>
            // //   <View>
            // //      <FlatList
            // //   data={state.retrivemydonateddata}
            // //   renderItem={({ item }) => (
            // //     <View
            // //     // style={[{paddingLeft:'5%'}]}
            // //     >
            // //        </View>
            // //   )}
            // //   keyExtractor={item => item.bloodrequestid}
            // //   // ItemSeparatorComponent={renderSeparator}
            // //   // ListHeaderComponent={renderHeader}
            // //   ListFooterComponent={renderFooter}
            // //   onRefresh={handleRefresh}
            // //   refreshing={state.refreshing}

            // // >

            // // </FlatList>
            // //     </View>

            //   );
          })}

          <View style={styles.container}>
            <View
            style ={[ProfileScreenStyles.cardview,{  alignItems: 'center',marginTop:'4%'}]}
            >             
              <Text style={[styles.textStyle, { color: '#1DA1F2', fontSize: 15, textAlign: 'center' }]}>Pick the State</Text>
              <Picker
                selectedValue={selectedState}
                style={[{ height: 50, width: 200, alignSelf: 'center', color: colors.text, }]}
                // style={[
                //   // MainScreenStyles.cardview,
                //   { 
                //   height: 50, width:200,marginTop:'8%',
                //   justifyContent: 'center', color: colors.text, }]}
                onValueChange={(e, itemIndex) => {
                  console.log(e);
                  setselectedState(e);
                  handleStateChange(e)
                }
                }>
                {/* <Picker.Item label="Select" value="" /> */}
                {props.data.map((regiondata, i) =>
                  <Picker.Item key={i} label={regiondata.location} value={regiondata.location} />
                )}

              </Picker>
              {/* <Text>{state.location}</Text>
                 <Text>{state.confirmed}</Text>
                 <Text>{state.recovered}</Text>
                <Text>{state.deaths}</Text> */}
            </View>
            <View>
              <Covid_Cause_Screen data={state} countrty={state.location} countupstate="Yes" />
              <View
                style={[{ marginBottom: '3%' }]}
              >
                <Covid_Global_Chart data={state} country={state.location} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Covid_Statewise_Data_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // margin:'4%',
  },
  textStyle: {
    fontWeight: 'bold',
    paddingBottom: '1%'
  }
});

