import React,{useEffect} from 'react';
import { View, StyleSheet,Image,Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContent } from '../Screens/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Covid_home from '../Covid_Screen/Covid_Home_Screen/Covid_Home';
import Covid_Global_Screen from '../Covid_Screen/Covid_Global_Component/Covid_Global_Screen';
import SOSScreen from '../Screens/SOS_Componet/SOSScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Covid_Screen_India from '../Covid_Screen/Covid_Cause_India/Covid_Statewise_Data';
import Covid_India_Contacts_Screen from '../Covid_Screen/Covid_Cause_India/Covid_India_Contacts';

const Covid_India_Stack = createStackNavigator();
const Covid_India_Contacts_Stack = createStackNavigator();
const Covid_Home_Stack = createStackNavigator();
const Covid_Global_Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
let { username }=' ';
const{width,height} = Dimensions.get('window');
const screen_width = width;
const Main_Covid_Screen_Navigation = (props) =>
{
  //  username  = 'Hi '+props.userdata.userName+'!';
  //   useEffect(() => {
  //       console.log('[Main_Covid_Screen_Navigation] Screen: prop  userdata     '+props.userdata); 
        
  //       console.log('[Main_Covid_Screen_Navigation] Screen: prop  userName     '+props.userdata.userName); 
  //   });
    return (
        // <MainStack.Navigator headerMode='none'>
        //     <MainStack.Screen name="SplashScreen" component={SplashScreen}/>
        //     <MainStack.Screen name="SignInScreen" component={SignInScreen}/>
        //     <MainStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        // </MainStack.Navigator>
        
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
    
    {/* <Drawer.Screen name="HomeDrawer" component={MainTabScreen} /> */}
    <Drawer.Screen name="CovidHomeDrawer" component={MainCovidStackScreen} />  
    
    {/* <Drawer.Screen name="SearchMap" component={SearchMap} /> */}
    </Drawer.Navigator>
    );
} 

export default Main_Covid_Screen_Navigation;

export const MainCovidStackScreen = ({navigation}) =>(
 
    <Covid_Home_Stack.Navigator
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
    <Covid_Home_Stack.Screen name="Covid Home" component={Covid_home} 
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
      )},
      
      headerRight: () => (
        <View style={{ paddingRight: '50%' }}>
          <SOSScreen navigation={navigation} />
        </View>
      )
    
    }} />
  </Covid_Home_Stack.Navigator>
  );

  export const CovidGlobalStackScreen = ({navigation}) =>(
 
    <Covid_Global_Stack.Navigator
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
    <Covid_Global_Stack.Screen name="Covid Global Causes" component={Covid_Global_Screen} 
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
      )},
      
      headerRight: () => (
        <View style={{ paddingRight: '50%' }}>
          <SOSScreen navigation={navigation} />
        </View>
      )
    
    }} />
  </Covid_Global_Stack.Navigator>
  );

  export const CovidIndiaStackScreen = ({navigation}) =>(
 
    <Covid_India_Stack.Navigator
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
    <Covid_India_Stack.Screen name="Covid India Causes" component={Covid_Screen_India} 
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
      )},
      
      headerRight: () => (
        <View style={{ paddingRight: '50%' }}>
          <SOSScreen navigation={navigation} />
        </View>
      )
    
    }} />
  </Covid_India_Stack.Navigator>
  );

  export const CovidIndiaContactStackScreen = ({navigation}) =>(
 
    <Covid_India_Contacts_Stack.Navigator
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
    <Covid_India_Contacts_Stack.Screen name="Covid Help Line" component={Covid_India_Contacts_Screen} 
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
      )},
      
      headerRight: () => (
        <View style={{ paddingRight: '50%' }}>
          <SOSScreen navigation={navigation} />
        </View>
      )
    
    }} />
  </Covid_India_Contacts_Stack.Navigator>
  );