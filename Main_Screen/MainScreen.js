import React, { useEffect } from 'react';
import { View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import FCM_Screen from '../FirebaseCloud/FCM_Screen';
import {
  Text,
  useTheme,
} from 'react-native-paper';
import RetriveData from '../Store/Datafromstorage/RetriveData';
import Main_Screen_Top_Donor from './Main_Screen_Top_Donor';
import Swiper from 'react-native-swiper';
import { ScrollView } from 'react-native-gesture-handler';
import Main_Covid_Screen_Navigation from '../Screen_Navigation/Covid_Screen_Navigation';
const MainScreen = (props) => {
  let navigation = props.navigation;

  const { colors } = useTheme();
  // useEffect(() => {
  //   console.log('[Main Screen ] props ');
  //   console.log(props.globalprops);   

  //  });
  return (
    <View 
    //style={styles.container}
    >     
      {/* <View>
        <ScrollView>
        <View style={styles.categoryContainer} >
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('BloodHome', { title: 'Blood Home' })
            }>
            <View style={styles.categoryIcon}>
              <Fontisto name="blood-drop" size={35} color="#bb0a1e" />
            </View>
            <Text style={styles.categoryBtnTxt}>Blood Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('AmbulanceHomeDrawer', { title: 'Ambulance Home' })
            }>
            <View style={styles.categoryIcon}>
              <Fontisto name="ambulance" size={35} color="#bb0a1e" />
            </View>
            <Text style={styles.categoryBtnTxt}>Ambulance Home</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View> */}
     
      {/* <FCM_Screen /> */}
      {/* <RetriveData userData={props} /> */}      
      <Main_Screen_Top_Donor props={props}/>
      <Main_Covid_Screen_Navigation />
    </View>
  );
};


export default MainScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: '3%',
  },
  component: {
    paddingLeft: '3%'
  },
  touchspacing: {
    paddingLeft: '2%',
  },
  iconcenterspacing: {
    paddingLeft: '10%',
  },

  cardview: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 7,
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: 'white',
    padding: '5%',
    paddingBottom: '2%',
    borderRadius: 20,
    margin: '3%',
    width: '100%',
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
    paddingLeft: '2%',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#E1DDDD' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#bb0a1e',
  },
});
