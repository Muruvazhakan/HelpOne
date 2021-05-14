import React, { useEffect } from 'react';
import { View, Button, StyleSheet, TouchableOpacity,Alert,ToastAndroid, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import FCM_Screen from '../FirebaseCloud/FCM_Screen';
import Covid_Cause_Screen from '../Covid_Screen/Covid_Home_Screen/Covid_Cause_Screen';
import Covid_Screen from '../Covid_Screen/Covid_Home_Screen/Covid_Main_Screen';
import {
  Text,
  useTheme,
} from 'react-native-paper';
import RetriveData from '../Store/Datafromstorage/RetriveData';
import Main_Screen_Top_Donor from './Main_Screen_Top_Donor';
import { ScrollView } from 'react-native-gesture-handler';
const Main_Screen_Icons = (props) => {
  let navigation = props.props.navigation;

  const { colors } = useTheme();
  useEffect(() => {
    // console.log('[Main_Screen_Icons] props ');
    // console.log("[Main_Screen_Icons] props: ", props.props);
    // console.log("[Main_Screen_Icons] props:props.navigation ", props.props.navigation);
    //console.log("[Main_Screen_Icons] props:navigation. ", props.navigation);
    //console.log(props);   
   });
  return (
    <View style={styles.container}>     
      <View>
      {/* <Covid_Cause_Screen /> */}
     <Covid_Screen/>
        

       
        <View  
        style={{marginLeft:'2%',marginRight:'2%',justifyContent:'space-evenly'}}
        >
 <ScrollView 
      horizontal={true}
        showsHorizontalScrollIndicator={false}   
        // style={[styles.categoryContainer]}     
      >
        <View  style={[styles.categoryContainer,styles.icon_styles]}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('BloodHome', { title: 'Blood Home' })
            }>
            <View style={styles.categoryIcon}>
              <Fontisto name="blood-drop" size={35} color="#bb0a1e" />
            </View>
            <Text style={styles.categoryBtnTxt}>Blood</Text>
          </TouchableOpacity>
         
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
            //  { Alert.alert("Opps!", 'No Internet Please check your connection', [
            //     {
            //       text: 'Try Again',
            //       onPress: () => errorAlerthandler()
            //     }  
            //   }  
            ToastAndroid.show("Under Construnction", ToastAndroid.LONG)
              // navigation.navigate('AmbulanceHomeDrawer', { title: 'Ambulance Home' })
            }>
            <View style={styles.categoryIcon}>
              <Fontisto name="ambulance" size={35} color="#bb0a1e" />
            </View>
            <Text style={styles.categoryBtnTxt}>Ambulance</Text>
          </TouchableOpacity>
          
           
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('CovidHomeDrawer', { title: 'Covid Home' })
            }>
            <View style={styles.categoryIcon}>
              <FontAwesome5 name="virus-slash" size={35} color="#bb0a1e" />
            </View>
            <Text style={styles.categoryBtnTxt}>Covid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('BloodHome', { title: 'Blood Home' })
            }>
            <View style={styles.categoryIcon}>
              <Fontisto name="blood-drop" size={35} color="#bb0a1e" />
            </View>
            <Text style={styles.categoryBtnTxt}>Oxygen</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('BloodHome', { title: 'Blood Home' })
            }>
            <View style={styles.categoryIcon}>
              <FontAwesome5 name="virus-slash" size={35} color="#bb0a1e" />
            </View>
            <Text style={styles.categoryBtnTxt}>Covid</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('BloodHome', { title: 'Blood Home' })
            }>
            <View style={styles.categoryIcon}>
              <FontAwesome5 name="virus-slash" size={35} color="#bb0a1e" />
            </View>
            <Text style={styles.categoryBtnTxt}>Covid</Text>
          </TouchableOpacity>
          </View>
          </ScrollView>
           </View>

          
      


      </View>
    </View>
  );
};


export default Main_Screen_Icons;

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center', 
    justifyContent: 'center'
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'stretch',
    marginTop: '4%',
    paddingBottom:'2%',
    // paddingLeft:'2%',
    // justifyContent:'space-between'
    // marginBottom: '5%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: '3%',
  },
  icon_styles: {
    paddingBottom: '3%',
    justifyContent:'space-between',
    paddingRight:'5%'
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
    // backgroundColor: 'white',
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
    // alignSelf: 'center',
    // paddingLeft: '2%',
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
