import React,{useEffect} from 'react';
import { View, StyleSheet,Image,Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContent } from '../Screens/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ambulace_home from '../Ambulance_Screen/Ambulace_home';

import MainScreen from '../Main_Screen/MainScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Ambulace_homeStack = createStackNavigator();
const Drawer = createDrawerNavigator();
let { username }=' ';
const{width,height} = Dimensions.get('window');
const screen_width = width;
const Main_Ambulance_Screen_Navigation = (props) =>
{
   username  = 'Hi '+props.userdata.userName+'!';
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
        
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} userdetails={props.userdata}/>}>
    
    {/* <Drawer.Screen name="HomeDrawer" component={MainTabScreen} /> */}
    <Drawer.Screen name="AmbulanceHomeDrawer" component={MainAmbulanceStackScreen} />
  
    
    {/* <Drawer.Screen name="SearchMap" component={SearchMap} /> */}
    </Drawer.Navigator>
    );

} 

export default Main_Ambulance_Screen_Navigation;

export const MainAmbulanceStackScreen = ({navigation}) =>(
 
    <Ambulace_homeStack.Navigator
     screenOptions = {{
      headerStyle:{
        backgroundColor :"white"
      },
      headerTintColor : "black",
      headerTintStyle : "black",      
      fontweight:'bold',
      headerTitleAlign:'center',
      
    }}
    >
    <Ambulace_homeStack.Screen name="Home" component={Ambulace_home} 
    options={{ 
      // title:username,
    headerLeft:() => {
      return (
      <View style={{flexDirection:'row'}}>
      <Ionicons.Button name="ios-menu" size={25}
        backgroundColor = "white" color='black'
         onPress={() => {navigation.openDrawer();}}></Ionicons.Button>
         
         <FontAwesome  backgroundColor = "white" color='black'  name="user-circle-o"  size={screen_width/10}>
           </FontAwesome>
         </View>
      )}
    
    }} />
  </Ambulace_homeStack.Navigator>
  );