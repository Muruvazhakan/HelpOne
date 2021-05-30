import React,{useEffect} from 'react';
import { View, StyleSheet,Image,Dimensions,TouchableOpacity } from 'react-native';
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
import Covid_Bed_Details from '../Covid_Screen/Covid_Cause_India/Covid_Bed_Components/Covid_Bed_Details';
import Covid_Medical_Colleges_Screen from '../Covid_Screen/Covid_Cause_India/Covid_Medical_Colleges_Component/Covid_Medical_Colleges_Screen';
import Covid_Test_Screen from '../Covid_Screen/Covid_Cause_India/Covid_Test_Component/Covid_Test_Screen';
import Covid_Guidelines_Screen from '../Covid_Screen/Covid_Cause_India/Covid_Guidelines_Component/Covid_Guidelines_Screen';
import Covid_Data_Add_Screen from '../Covid_Screen/Covid_Add_Details/Covid_Data_Add_Screen';
import Covid_Data_Display_List_Screen from '../Covid_Screen/Covid_Add_Details/Covid_Data_Display_List_Screen';
import * as ColorsCode from '../components/Color_Code';
import Covid_Data_Single_Display_Screen from '../Covid_Screen/Covid_Add_Details/Covid_Data_Single_Display_Screen';

const Covid_Data_Single_Display_Screen_Stack = createStackNavigator();
const Covid_Data_Display_List_Stack = createStackNavigator();
const Covid_Data_Add_Stack = createStackNavigator();
const Covid_Guidelines_Stack = createStackNavigator();
const Covid_India_Medical_Colleges_Stack = createStackNavigator();
const Covid_India_Stack = createStackNavigator();
const Covid_India_Contacts_Stack = createStackNavigator();
const Covid_India_Bed_Stack = createStackNavigator();
const Covid_Test_Stack = createStackNavigator();
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

  export const CovidIndiaBedStackScreen = ({navigation}) =>(
 
    <Covid_India_Bed_Stack.Navigator
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
    <Covid_India_Bed_Stack.Screen name="Covid-India Bed Status" component={Covid_Bed_Details} 
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
  </Covid_India_Bed_Stack.Navigator>
  );

  export const CovidIndiaMedicalCollegesStackScreen = ({navigation}) =>(
 
    <Covid_India_Medical_Colleges_Stack.Navigator
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
    <Covid_India_Medical_Colleges_Stack.Screen name="Indian Medical Colleges" component={Covid_Medical_Colleges_Screen} 
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
  </Covid_India_Medical_Colleges_Stack.Navigator>
  );

  export const CovidIndiaTestStackScreen = ({navigation}) =>(
 
    <Covid_Test_Stack.Navigator
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
    <Covid_Test_Stack.Screen name="Covid Test Data" component={Covid_Test_Screen} 
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
  </Covid_Test_Stack.Navigator>
  );

  export const CovidIndiaGuidelinesStackScreen = ({navigation}) =>(
 
    <Covid_Guidelines_Stack.Navigator
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
    <Covid_Guidelines_Stack.Screen name="Covid Guidelines" component={Covid_Guidelines_Screen} 
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
  </Covid_Guidelines_Stack.Navigator>
  );


  export const Covid_Data_Add_StackScreen = ({navigation}) =>{
    // const {colors} = useTheme();
  return(
    
  <Covid_Data_Add_Stack.Navigator screenOptions = {{
    headerTransparent:true,
    headerStyle:{
      backgroundColor : "transparent",
      // shadowColor:"black", 
      elevation: 0,
      
    },
    headerTintColor : ColorsCode.blue_primary,
    headerTintStyle : "#fff",
    
    fontweight:'bold',
    headerTitleAlign:'center',
  }}>
  <Covid_Data_Add_Stack.Screen name="Explore" component={Covid_Data_Add_Screen} 
  options={{ title:"Add Details",
  
  headerLeft:() => (
   
    <Ionicons.Button name="ios-menu" size={30}
      backgroundColor = "transparent"
      // color="#191970"
      color={ColorsCode.blue_primary}
       onPress={() => {navigation.openDrawer();}}/>
     
  ),

  headerRight: () => (
    <View style={{marginRight:15}}>
        <TouchableOpacity         
        // onPress={() => navigation.navigate('EditProfile')}
        >
        <SOSScreen navigation={navigation} />
        </TouchableOpacity>
      </View>
      // <View style={{ paddingRight: '50%' }}>
      //   <SOSScreen navigation={navigation} />
      // </View>
    ),


  }} />


</Covid_Data_Add_Stack.Navigator>
)};

export const Covid_Data_Display_List_StackScreen = ({navigation}) =>{
  // const {colors} = useTheme();
return(
  
<Covid_Data_Display_List_Stack.Navigator screenOptions = {{
  headerTransparent:true,
  headerStyle:{
    backgroundColor : "transparent",
    // shadowColor:"black", 
    elevation: 0,
    
  },
  headerTintColor : ColorsCode.blue_primary,
  headerTintStyle : "#fff",
  
  fontweight:'bold',
  headerTitleAlign:'center',
}}>
<Covid_Data_Display_List_Stack.Screen name="Explore" component={Covid_Data_Display_List_Screen} 
options={{ title:"User Profile",
headerShown: false,

}} />


</Covid_Data_Display_List_Stack.Navigator>
)};

export const Covid_Data_Single_Display_Screen_StackScreen = ({navigation}) =>{
  // const {colors} = useTheme();
return(
  
<Covid_Data_Single_Display_Screen_Stack.Navigator screenOptions = {{
  headerTransparent:true,
  headerStyle:{
    backgroundColor : "transparent",
    // shadowColor:"black", 
    elevation: 0,
    
  },
  headerTintColor : ColorsCode.blue_primary,
  headerTintStyle : "#fff",
  
  fontweight:'bold',
  headerTitleAlign:'center',
}}>
<Covid_Data_Single_Display_Screen_Stack.Screen name="Details Screen" 
component={Covid_Data_Single_Display_Screen} 

options={(       
  { route }) => ({ title: 'Details Screen', 
  data: route.params,          
// options={{ title:"Details Screen",

headerLeft:() => (     
 
  <TouchableOpacity         
    onPress={() => {navigation.openDrawer();}}>
 <Ionicons name="ios-menu" size={30}
    backgroundColor = "transparent"        
    color={ColorsCode.blue_primary}
     />
 </TouchableOpacity>
   
),
headerRight: () => (
  <View style={{marginRight:15}}>
    <TouchableOpacity         
    // onPress={() => navigation.navigate('EditProfile')}
    >
    <SOSScreen navigation={navigation} />
    </TouchableOpacity>
  </View>
),
})} />


</Covid_Data_Single_Display_Screen_Stack.Navigator>
)};