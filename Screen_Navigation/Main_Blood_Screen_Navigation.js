import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContent } from '../Screens/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from '../Screens/MainTabScreen';
import BookmarkScreen from '../Screens/BookmarkScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import SupportScreen from '../Screens/SupportScreen';
import GetLocationmap from '../Screens/Blood_Request/GetLocationmap';
import * as Screens from '../Screens/MainTabScreen';
// import {RequestDisplayStackScreen,
//     DonatedDisplayStackScreen,
//     OTPStackScreen,

//   } from '../Screens/MainTabScreen';
import MainScreen from '../Main_Screen/MainScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ambulace_home from '../Ambulance_Screen/Ambulace_home';
import Main_Ambulance_Screen_Navigation from './Ambulance_Screen_Navigation';
import RetriveData from '../Store/Datafromstorage/RetriveData';
import SOSScreen from '../Screens/SOS_Componet/SOSScreen';
const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();
let { username } = ' ';
const { width, height } = Dimensions.get('window');
const screen_width = width;
let globalprops = '';
const Main_Blood_Screen_Navigation = (props) => {
  username = 'Hi ' + props.userdata.userName + '!';
  globalprops = props;
  // useEffect(() => {
  //     console.log('RetriveData Screen: prop  userdata     '+props.userdata); 

  //     console.log('RetriveData Screen: prop  userName     '+props.userdata.userName); 
  // });
  return (
    // <MainStack.Navigator headerMode='none'>
    //     <MainStack.Screen name="SplashScreen" component={SplashScreen}/>
    //     <MainStack.Screen name="SignInScreen" component={SignInScreen}/>
    //     <MainStack.Screen name="SignUpScreen" component={SignUpScreen}/>
    // </MainStack.Navigator>

    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} userdetails={props.userdata} />}>
      <Drawer.Screen name="MainHome" component={MainHomeStackScreen} />
      {/* <Drawer.Screen name="HomeDrawer" component={MainTabScreen} /> */}
      <Drawer.Screen name="HomeDrawer" component={MainHomeStackScreen} />
      <Drawer.Screen name="BloodHome" component={MainTabScreen} />
      <Drawer.Screen name="SupportScreen" component={SupportScreen} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
      <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
      <Drawer.Screen name="GetLocationmap" component={GetLocationmap} />
      <Drawer.Screen name="My_Request_Raised_Screen" component={Screens.RequestDisplayStackScreen} />
      <Drawer.Screen name="My_Blood_Donated_Screen" component={Screens.DonatedDisplayStackScreen} />
      <Drawer.Screen name="OTP_Screen" component={Screens.OTPStackScreen} />
      <Drawer.Screen name="SOSScreen" component={Screens.SOSStackScreen} />
      <Drawer.Screen name="Here_Map" component={Screens.HereMapDisplayStackScreen} />
      <Drawer.Screen name="AmbulanceHomeDrawer" component={Ambulace_home} />
      {/* <Drawer.Screen name="SearchMap" component={SearchMap} /> */}
      {/* <Main_Ambulance_Screen_Navigation/> */}
    </Drawer.Navigator>
  );

}

export default Main_Blood_Screen_Navigation;

const MainHomeStackScreen = ({ navigation }) => (


  <MainStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "white"
      },
      headerTintColor: "black",
      headerTintStyle: "black",
      fontweight: 'bold',
      headerTitleAlign: 'center',

    }}
  >

    <MainStack.Screen name="Home" component={MainScreen}
      options={{
        title: username, userData: globalprops,
        headerLeft: () => {
          return (
            <View style={{ flexDirection: 'row' }}>
              <Ionicons.Button name="ios-menu" size={25}
                backgroundColor="white" color='black'
                onPress={() => { navigation.openDrawer(); }}></Ionicons.Button>

              <FontAwesome backgroundColor="white" color='black' name="user-circle-o" size={screen_width / 10}>
              </FontAwesome>
              <RetriveData userData={globalprops} />
            </View>
          )
        },
        headerRight: () => (
          <View style={{ paddingRight: '50%' }}>
            <SOSScreen navigation={navigation} />
          </View>
        )

      }} />

  </MainStack.Navigator>
);
