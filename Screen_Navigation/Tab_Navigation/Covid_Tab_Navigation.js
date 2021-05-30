import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions,TouchableOpacity } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Covid_Screen_India from '../../Covid_Screen/Covid_Cause_India/Covid_Statewise_Data';
import Covid_India_Contacts_Screen from '../../Covid_Screen/Covid_Cause_India/Covid_India_Contacts';
import Covid_Bed_Details from '../../Covid_Screen/Covid_Cause_India/Covid_Bed_Components/Covid_Bed_Details';
import Covid_Medical_Colleges_Screen from '../../Covid_Screen/Covid_Cause_India/Covid_Medical_Colleges_Component/Covid_Medical_Colleges_Screen';
import Covid_Test_Screen from '../../Covid_Screen/Covid_Cause_India/Covid_Test_Component/Covid_Test_Screen';
import Covid_Guidelines_Screen from '../../Covid_Screen/Covid_Cause_India/Covid_Guidelines_Component/Covid_Guidelines_Screen';
import { DrawerContent } from '../../Screens/DrawerContent';
import * as CovidScreen from '../Covid_Screen_Navigation';
import {styles} from '../../Screens/MainTabScreen';
import Icon from  'react-native-vector-icons/Ionicons';
import FontAwesome5 from  'react-native-vector-icons/FontAwesome5';
import Fontisto from  'react-native-vector-icons/Fontisto'; 
import MaterialIcons from  'react-native-vector-icons/MaterialIcons';
import Covid_Data_Add_Screen from '../../Covid_Screen/Covid_Add_Details/Covid_Data_Add_Screen';
import { createStackNavigator } from '@react-navigation/stack';
import SOSScreen from '../../Screens/SOS_Componet/SOSScreen';
import * as ColorsCode from '../../components/Color_Code';
import {covid_img} from '../../components/Covid_Parameter';
import * as params from '../../components/Parameter';
const Covid_Data_Add_Stack = createStackNavigator();
const Covid_Home_Tab = createMaterialBottomTabNavigator();

const Main_Covid_Screen_Tab_Navigation = (props) =>
{ 
    return (      
    <Covid_Home_Tab.Navigator 
    initialRouteName="Home"
    activeColor="orange"
    inactiveColor='black'
      barStyle={[styles.bottombarstyles]}
    drawerContent={props => <DrawerContent {...props}/>}>
        
    {/* <Covid_Home_Tab.Screen name="CovidHomeTab" component={Covid_Screen_India} />  
    <Covid_Home_Tab.Screen name="CovidBedDetailsTab" component={Covid_Bed_Details} />  
    <Covid_Home_Tab.Screen name="CovidMedicalCollegesScreenTab" component={Covid_Medical_Colleges_Screen} />   */}
    <Covid_Home_Tab.Screen
     name="CovidHomeDrawer"
     component={CovidScreen.MainCovidStackScreen} 
     options={{
       
        tabBarLabel: 'Covid Home',
        backgroundColor: 'transparent',
       // tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          // <Icon name="ios-home" color={color} size={26} />
          <Image
                  // source={require('../../assets/Covid_Icons/Glyph/Warning.png')}    
                  source={covid_img.CoronaVirus.uri}                       
                        resizeMode="cover"                        
                        style={[styless.image_icon_style]}                       
                         />
        ),
      }}
     /> 
      <Covid_Home_Tab.Screen 
      name="CovidIndiaGuidelinesScreen" 
      component={CovidScreen.CovidIndiaGuidelinesStackScreen}
      options={{
        tabBarLabel: 'Guidelines',
        backgroundColor: 'transparent',
       // tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          // <FontAwesome5 name="book-medical" color={color} size={26} />
          <Image
                  // source={require('../../assets/Covid_Icons/Glyph/Warning.png')}    
                  source={covid_img.Warning.uri}                       
                        resizeMode="cover"                        
                        style={[styless.image_icon_style]}                       
                         />
        ),
      }}
      /> 

      <Covid_Home_Tab.Screen
       name="CovidDataAddScreen"
        component={CovidScreen.Covid_Data_Add_StackScreen} 
        options={{
            tabBarLabel: 'Add',
            backgroundColor: 'transparent',
           // tabBarColor: '#009387',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="add" color='black'
              // color={color} 
              size={26} />
            ),
          }}
        /> 

      <Covid_Home_Tab.Screen
       name="CovidIndiaBedScreen"
        component={CovidScreen.CovidIndiaBedStackScreen} 
        options={{
            tabBarLabel: 'Bed',
            backgroundColor: 'transparent',
           // tabBarColor: '#009387',
            tabBarIcon: ({ color }) => (
              <Fontisto name="bed-patient" color='black' size={30} />
            ),
          }}
        /> 
        
      <Covid_Home_Tab.Screen
       name="CovidIndiaContactScreen"
        component={CovidScreen.CovidIndiaContactStackScreen} 
        options={{
            tabBarLabel: 'Covid Home',
            // backgroundColor: 'transparent',
           // tabBarColor: '#009387',
            tabBarIcon: ({ color }) => (
              // <MaterialIcons name="contacts" color={color} size={26} />
              <Image
                  // source={require('../../assets/Covid_Icons/Glyph/Warning.png')}    
                  source={covid_img.whf.uri}                       
                        resizeMode="cover"                        
                        style={[styless.image_icon_style]}                       
                         />
            ),
          }}
        /> 

      {/* <Covid_Home_Tab.Screen name="CovidIndiaBedScreen" component={CovidScreen.CovidIndiaBedStackScreen} /> 
      <Covid_Home_Tab.Screen name="CovidIndiaMedicalCollegesScreen" component={CovidScreen.CovidIndiaMedicalCollegesStackScreen} /> 
      <Covid_Home_Tab.Screen name="CovidIndiaTestScreen" component={CovidScreen.CovidIndiaTestStackScreen} /> 
      <Covid_Home_Tab.Screen name="CovidIndiaGuidelinesScreen" component={CovidScreen.CovidIndiaGuidelinesStackScreen} />  */}
 
 {/* <Covid_Home_Tab.Screen
       name="CovidIndiaScreen"
        component={CovidScreen.CovidIndiaStackScreen} 
        options={{
            tabBarLabel: 'Covid Home',
            backgroundColor: 'transparent',
           // tabBarColor: '#009387',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-home" color={color} size={26} />
            ),
          }}
        />  */}

{/* <Covid_Home_Tab.Screen
       name="CovidIndiaScreen"
        component={CovidScreen.CovidIndiaStackScreen} 
        options={{
            tabBarLabel: 'Covid Home',
            backgroundColor: 'transparent',
           // tabBarColor: '#009387',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-home" color={color} size={26} />
            ),
          }}
        />  */}

    </Covid_Home_Tab.Navigator>
    );
} 

export default Main_Covid_Screen_Tab_Navigation;


const styless = StyleSheet.create({  
  image_icon_style:{
    alignSelf:'center',
    height: params.width*0.08,
     width: params.width*0.08,
    //  paddingBottom:'5%'
  }
});