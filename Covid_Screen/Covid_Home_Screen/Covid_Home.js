import React, { useEffect } from 'react';
import {
  View, Text,
  Button, StyleSheet, StatusBar, ToastAndroid,
  TouchableOpacity, Linking,Image,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
//import Toaster from 'react-native-toaster';
import { useSelector, useDispatch } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles as MainScreenStyles } from '../../Main_Screen/MainScreen';
import { styles as MainScreenIconStyles } from '../../Main_Screen/Main_Screen_Icons';
import Covid_Main_Screen from './Covid_Main_Screen';
import { ScrollView } from 'react-native-gesture-handler';
import Covid_Statewise_Data from '../Covid_Cause_India/Covid_Statewise_Data';
import {covid_img} from '../../components/Covid_Parameter';
import * as params from '../../components/Parameter';
import Covid_Details_List_Limt_Screen from './Covid_Details_List_Limt_Screen';
const Covid_Home = ({ navigation }) => {

 
  const themes = useTheme();
  const user_data_user_first_name = useSelector(state =>
    state.helpone.user_first_name,
  );
  useEffect(() => {
    console.log('Covid_Home navigation******'+navigation);
    console.log(navigation);
    // console.log('user_data_user_first_name home '+user_data_user_first_name);

  });
  // const [state,setState] = React.useState(Currentlocation);

  //  const [data, setData] = React.useState({    
  //   location:Currentlocation.location,
  // })

  const { colors } = useTheme();
  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <StatusBar barStyle={themes.dark ? "light-content" : "default-content"} />
        <Covid_Main_Screen />
        <View
        // style={[MainScreenStyles.cardview, { maxWidth:'100%' }]}
        >
          <View
            // style={MainScreenStyles.row}
            style={{ margin: '3%', justifyContent: 'center', }}
          >
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            // style={[{margin:0,marginRight:'2%',padding:0}]}     
            >

              {/* <TouchableOpacity
            style={MainScreenIconStyles.categoryBtn}
            onPress={() =>
              navigation.navigate('BloodHome', { title: 'Blood Home' })
            }>
            <View style={MainScreenIconStyles.categoryIcon}>
              <Fontisto name="blood-drop" size={35} color="#bb0a1e" />
            </View>
            <Text style={MainScreenIconStyles.categoryBtnTxt}>Blood</Text>
          </TouchableOpacity>              */}

              <TouchableOpacity
                style={[MainScreenIconStyles.categoryBtn,]}
                onPress={() => navigation.navigate('CovidIndiaGuidelinesScreen')}>
                <View style={MainScreenIconStyles.categoryIcon}>
                  {/* <FontAwesome5 name="book-medical" color="#008080" size={35} /> */}
                  <Image
                  // source={require('../../assets/Covid_Icons/Glyph/Warning.png')}    
                  source={covid_img.Warning.uri}                       
                        resizeMode="cover"                        
                        style={[styles.image_icon_style]}                       
                         />
                  
                </View>
                <Text
                  style={MainScreenIconStyles.categoryBtnTxt}>  Guidelines  </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[MainScreenIconStyles.categoryBtn,]}
                onPress={() => navigation.navigate('CovidDataListScreen')}>
                <View style={MainScreenIconStyles.categoryIcon}>
                  {/* <FontAwesome5 name="globe" color="#008080" size={35} /> */}
                  <Image
                  // source={require('../../assets/Covid_Icons/Glyph/Warning.png')}    
                  source={covid_img.Location.uri}                       
                        resizeMode="cover"                        
                        style={[styles.image_icon_style]}                       
                         />
                </View>
                <Text
                  style={MainScreenIconStyles.categoryBtnTxt}>  Bed Location  </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[MainScreenIconStyles.categoryBtn,]}
                onPress={() => navigation.navigate('CovidDataAddScreen')}>
                <View style={MainScreenIconStyles.categoryIcon}>
                  <MaterialIcons name="add-circle" color="black" size={35} />
                </View>
                <Text
                  style={MainScreenIconStyles.categoryBtnTxt}>  Add Details  </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[MainScreenIconStyles.categoryBtn, MainScreenStyles.component]}
                onPress={() => navigation.navigate('CovidGlobalScreen')}>
                <View style={MainScreenIconStyles.categoryIcon}>
                  {/* <FontAwesome5 name="globe" color="#008080" size={35} /> */}
                  <Image
                  // source={require('../../assets/Covid_Icons/Glyph/Warning.png')}    
                  source={covid_img.EarthCorona.uri}                       
                        resizeMode="cover"                        
                        style={[styles.image_icon_style]}                       
                         />
                </View>
                <Text
                  style={MainScreenIconStyles.categoryBtnTxt}>Global Causes  </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[MainScreenIconStyles.categoryBtn, MainScreenStyles.component]}
                onPress={() => navigation.navigate('CovidIndiaScreen')}>
                <View style={MainScreenIconStyles.categoryIcon}>
                <Image
                  // source={require('../../assets/Covid_Icons/Glyph/Warning.png')}    
                  source={covid_img.EarthCorona.uri}                       
                        resizeMode="cover"                        
                        style={[styles.image_icon_style]}                       
                         />
                </View>
                <Text
                  style={MainScreenIconStyles.categoryBtnTxt}>  India Causes  </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[MainScreenIconStyles.categoryBtn, MainScreenStyles.component]}
                onPress={() => navigation.navigate('CovidIndiaTestScreen')}>
                <View style={MainScreenIconStyles.categoryIcon}>
                <Image
                  // source={require('../../assets/Covid_Icons/Glyph/Warning.png')}    
                  source={covid_img.Report.uri}                       
                        resizeMode="cover"                        
                        style={[styles.image_icon_style]}                       
                         />
                </View>
                <Text
                  style={MainScreenIconStyles.categoryBtnTxt}>  Test Results  </Text>
              </TouchableOpacity>





              <TouchableOpacity
                style={[MainScreenIconStyles.categoryBtn, MainScreenStyles.component]}
                onPress={() => navigation.navigate('CovidIndiaContactScreen')}>
                <View style={MainScreenIconStyles.categoryIcon}>
                <Image
                  // source={require('../../assets/Covid_Icons/Glyph/Warning.png')}    
                  source={covid_img.whf.uri}                       
                        resizeMode="cover"                        
                        style={[styles.image_icon_style]}                       
                         />
                </View>
                <Text
                  style={MainScreenIconStyles.categoryBtnTxt}>  Covid Help Line</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[MainScreenIconStyles.categoryBtn, MainScreenStyles.component]}
                onPress={() => navigation.navigate('CovidIndiaBedScreen')}>
                <View style={MainScreenIconStyles.categoryIcon}>
                  <Fontisto name="bed-patient" color="black" size={40} />
                </View>
                <Text
                  style={MainScreenIconStyles.categoryBtnTxt}>  Bed Details  </Text>
              </TouchableOpacity>

              <View style={MainScreenStyles.component}>
                <TouchableOpacity
                  style={MainScreenIconStyles.categoryBtn}
                  onPress={() => navigation.navigate('CovidIndiaMedicalCollegesScreen')}>
                  <View style={MainScreenIconStyles.categoryIcon}>
                    <FontAwesome5 name="hospital" color="black"  size={40} />
                  </View>
                  <Text
                    style={MainScreenIconStyles.categoryBtnTxt}>  Medical Colleges  </Text>
                </TouchableOpacity>
              </View>

              {/* <View style={MainScreenStyles.component}>
              <TouchableOpacity style={MainScreenStyles.touchspacing}
                onPress={() => navigation.navigate('CovidIndiaMedicalCollegesScreen')}>
                <Fontisto style={MainScreenStyles.iconcenterspacing}
                  name="blood-drop" color={colors.text} size={35} />
              </TouchableOpacity>
              <Text>Medical Colleges</Text>
            </View>
             */}


            </ScrollView>

            <Covid_Details_List_Limt_Screen navigation={navigation}/>
          </View>

        </View>
        {/* <Covid_Statewise_Data /> */}

      </View>
    </ScrollView>
  );
};
export default Covid_Home;

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center', 
    justifyContent: 'center',
    marginBottom:'20%',
  },
  image_icon_style:{
    alignSelf:'center',
    height: params.width*0.15,
     width: params.width*0.15,
  }
});

