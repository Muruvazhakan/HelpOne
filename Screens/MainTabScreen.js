import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Image,Platform,Alert,StyleSheet,TouchableOpacity } from 'react-native';
import Icon from  'react-native-vector-icons/Ionicons';
import Fontisto from  'react-native-vector-icons/Fontisto';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './Home_Screen/HomeScreen';
import Blood_Request_Screen from './Blood_Request/Blood_Request_Screen';
import Blood_Request_List_Screen from './Blood_Request/Blood_Request_List_Screen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import EditProfileScreen from './ProfileScreen/EditProfileScreen';
import Requester_Details from './Blood_Request/Requester_Details';
import OTP_Screen from './SignIn/OTP_Screen';
import SOSData from './SOS_Componet/SOSData';
import My_Request_Display from '../Screens/DrawerComponents/My_Request_Display';
import Donor_Display from '../Screens/DrawerComponents/Donor_Details';
import My_Request_Raised_Screen from './DrawerComponents/My_Request_Raised_Screen';
import My_Blood_Donated_Screen from './DrawerComponents/My_Blood_Donated_Screen';
import My_Donated_Display from '../Screens/DrawerComponents/My_Donated_Display';
import Here_Map from '../HERE_Component/Here_Map';
import SOSScreen from './SOS_Componet/SOSScreen';
import { screen_width } from '../components/Parameter';
import {styles as MainScreenStyles} from '../Main_Screen/MainScreen';
import * as ColorsCode from '../components/Color_Code';
const HomeStack = createStackNavigator();
const Blood_Request_Screen_Stack = createStackNavigator();
const ProfileStack = createStackNavigator();
const RequestDisplayStack = createStackNavigator();
const Requester_Detail_Stack = createStackNavigator();
const DonatedDisplayStack = createStackNavigator();
const OTPScreenStack = createStackNavigator();
const SOSScreenStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const MapDisplayStack = createStackNavigator();
const CARD_WIDTH = screen_width * 0.1;
const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#3ED7B5"
      inactiveColor='#EFC753'
      barStyle={styles.bottombarstyles}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          backgroundColor: 'transparent',
         // tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Blood_Request_List"
        component={Requester_Detail_StackScreen}
        options={{
        //  tabBarLabel: 'Donate',
          tabBarLabel: 'Request',
          // tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <View style={{marginBottom:'-10%'}}>
            <Fontisto name="blood-drop" color={color} size={26} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Detail"
        component={Blood_Request_StackScreen}
        options={{
          tabBarLabel: 'Add Request',
          // tabBarColor: '#8a0303',
          tabBarIcon: ({ color }) => (
            <Icon name="md-add-circle-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          backgroundColor: 'transparent',
          tabBarLabel: 'Profile',          
          // tabBarColor: '#483D8B',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person"
             color={color}
            //  color={ColorsCode.blue_primary}
              size={26} />
          ),
        }}
      />
     
    </Tab.Navigator>
    
);


export default MainTabScreen;

  const HomeStackScreen = ({navigation}) =>{
      const {colors} = useTheme();
    return(
      
    <HomeStack.Navigator screenOptions = {{
      headerTransparent:true,
      headerStyle:{
        backgroundColor : "transparent",
        //backgroundColor :"white"
        // elevation: 0,        
      },
      headerTintColor : ColorsCode.blue_primary,
      headerTintStyle : "black",     
      fontweight:'bold',
      headerTitleAlign:'center',
    }}>
    <HomeStack.Screen name="Home" component={HomeScreen} 
    options={{ title:"Blood Home Screen",
    headerLeft:() => (
     
      <TouchableOpacity         
        onPress={() => {navigation.openDrawer();}}>
		 <Icon name="ios-menu" size={30}
        backgroundColor = "transparent"
        style={{marginLeft:15}}          
        color={ColorsCode.blue_primary}
         />
		 </TouchableOpacity>
       
    ),
    headerRight:()=>(
      <View style={{paddingRight:'50%'}}>
      <SOSScreen navigation={navigation} />
      </View>
    ),


    }} />

  </HomeStack.Navigator>
  )};
  
  const Blood_Request_StackScreen = ({navigation}) =>{
  return (
    <Blood_Request_Screen_Stack.Navigator screenOptions = {{
		headerTransparent:true,
      headerStyle:{
        backgroundColor : "transparent",
      },
      headerTintColor : ColorsCode.blue_primary,
      headerTintStyle : "#fff",
      fontweight:'bold',      
      headerTitleAlign:'center',
    }}>
    <Blood_Request_Screen_Stack.Screen name="Details" component={Blood_Request_Screen} //screen name navigation
    options={{ title:"Blood Request Details",
    headerLeft:() => (
      <TouchableOpacity         
        onPress={() => {navigation.openDrawer();}}>
		 <Icon name="ios-menu" size={30}
        backgroundColor = "transparent"        
        color={ColorsCode.blue_primary}
        style={{marginLeft:15}}  
         />
		 </TouchableOpacity>
    ),
    headerRight:()=>(
      <View style={{paddingRight:'50%'}}>
      <SOSScreen navigation={navigation} />
      </View>
    )
    }} />

  {/* <Blood_Request_Screen_Stack.Screen 
      name="Requester_Details"
      options={{
        title: 'Edit Profile'
      }}
      component={Requester_Details}
    /> */}

  </Blood_Request_Screen_Stack.Navigator>
    )};


    const ProfileStackScreen = ({navigation}) =>{
      const {colors} = useTheme();
    return(
      
    <ProfileStack.Navigator screenOptions = {{
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
    <ProfileStack.Screen name="Explore" component={ProfileScreen} 
    options={{ title:"User Profile",
    
    headerLeft:() => (
     
      <TouchableOpacity         
        onPress={() => {navigation.openDrawer();}}>
		 <Icon name="ios-menu" size={30}
        backgroundColor = "transparent"
        style={{marginLeft:15}}          
        color={ColorsCode.blue_primary}
         />
		 </TouchableOpacity>
       
    ),
    headerRight: () => (
      <View style={{marginRight:15}}>
        <TouchableOpacity         
        onPress={() => navigation.navigate('EditProfile')}>
        <MaterialCommunityIcons
          name="account-edit"
          size={30}
          backgroundColor= "transparent"
          style={{marginLeft:15}}  
          // color="#191970"      
          color={ColorsCode.blue_primary}
        />
        </TouchableOpacity>
      </View>
    ),


    }} />

<ProfileStack.Screen 
      name="EditProfile"
      options={{
        title: 'Edit Profile'
      }}
      component={EditProfileScreen}
    />

  </ProfileStack.Navigator>
  )};


  const Requester_Detail_StackScreen = ({navigation}) =>{
    const {colors} = useTheme();
  return(
    
  <Requester_Detail_Stack.Navigator screenOptions = {{
    headerTransparent:true,
    // headerStyle:{
    //  backgroundColor : "transparent",
    //   shadowColor:"#d02860",
    //   elevation: 0,      
    // },
    // headerTintColor : "#fff",
    // headerTintStyle : "#fff",
    // fontweight:'bold',
    // headerTitleAlign:'center',
  }}>
  <Requester_Detail_Stack.Screen name="Blood_Request_List" component={Blood_Request_List_Screen} 
   options={{
    headerShown: false,
    title: 'Requester',
    headerBackTitleVisible:true,
    headerTransparent:true,
    // headerLeft:() => (
     
    //   <Icon.Button name="ios-menu" size={25}
    //    backgroundColor = "transparent"
    //      onPress={() => {navigation.openDrawer();}}/>
       
    // ),
    // headerRight:()=>(
    //   <View style={{paddingRight:'50%'}}>
    //   <SOSScreen navigation={navigation} />
    //   </View>
    // )
  }}  
  />

<Requester_Detail_Stack.Screen 
      name="Requester_Details"
      // options={{
      //   title: 'Requester Details'
      // }}

      options={(       
        { route }) => ({ title: 'Requester Details', 
        data: route.params.alldata,       
      })     
    }
      component={Requester_Details}
    />

</Requester_Detail_Stack.Navigator>
)};


export const RequestDisplayStackScreen = ({navigation}) =>{
  const {colors} = useTheme();
return(
  
<RequestDisplayStack.Navigator screenOptions = {{
  headerTransparent:true,
  headerStyle:{
    backgroundColor : "transparent",
    shadowColor:"#000080",
    elevation: 0,

  },
  headerTintColor : "#fff",
  headerTintStyle : "#fff",
  fontweight:'bold',
  headerTitleAlign:'center',
}}>
<RequestDisplayStack.Screen name="My_Request_Raised" 
component={My_Request_Raised_Screen} 
options={{ title:"My Blood Requests List",
// headerLeft:() => (
 
//   <Icon.Button name="ios-menu" size={25}
//     //backgroundColor = "#009387"
//      onPress={() => {navigation.openDrawer();}}

headerLeft:() => (
 
  <TouchableOpacity         
  onPress={() => {navigation.openDrawer();}}>
<Icon name="ios-menu" size={30}
  backgroundColor = "transparent"    
  style={{marginLeft:15}}    
  color={ColorsCode.blue_primary}
   />
</TouchableOpacity>
   
),
headerRight:()=>(
  <View style={{paddingRight:'50%'}}>
  <SOSScreen navigation={navigation} />
  </View>
)
}} />

<RequestDisplayStack.Screen 
      name="My_Request_Display"
      // options={{
      //   title: 'Requester Details'
      // }}
      options={(       
        { route }) => ({ title: 'My Request Details', 
        data: route.params.alldata,       
      })     
    }
      component={My_Request_Display}
    />

<RequestDisplayStack.Screen 
      name="Donor_Display"
      // options={{
      //   title: 'Requester Details'
      // }}

      options={(       
        { route }) => ({ title: 'Donor Details', 
        data: route.params.alldata,       
      })     
    }
      component={Donor_Display}
    />

</RequestDisplayStack.Navigator>
)};

export const DonatedDisplayStackScreen = ({navigation}) =>{
  const {colors} = useTheme();
return(
  
<DonatedDisplayStack.Navigator screenOptions = {{
  headerTransparent:true,
  headerStyle:{
    backgroundColor : "transparent",
    shadowColor:"#000080",
    elevation: 0,

  },
  headerTintColor : "#fff",
  headerTintStyle : "#fff",
  fontweight:'bold',
  headerTitleAlign:'center',
}}>
<DonatedDisplayStack.Screen name="My_Blood_Donated_Screen" component={My_Blood_Donated_Screen} 
options={{ title:"My Donation List",
headerLeft:() => (
 
  // <Icon.Button name="ios-menu" size={25}
  //   backgroundColor = "transparent"
  //    onPress={() => {navigation.openDrawer();}}/>
  <TouchableOpacity         
  onPress={() => {navigation.openDrawer();}}>
<Icon name="ios-menu" size={30}
  backgroundColor = "transparent"  
  style={{marginLeft:15}}      
  color={ColorsCode.blue_primary}
   />
</TouchableOpacity>
),
headerRight:()=>(
  <View style={{paddingRight:'50%'}}>
  <SOSScreen navigation={navigation} />
  </View>
)
}} /> 

<DonatedDisplayStack.Screen 
      name="My_Donated_Display"
      // options={{
      //   title: 'Requester Details'
      // }}

      options={(       
        { route }) => ({ title: 'My Donation Detail', 
        data: route.params.alldata,       
      })     
    }
      component={My_Donated_Display}
    />

</DonatedDisplayStack.Navigator>
)};

export const OTPStackScreen = ({navigation}) =>{
  const {colors} = useTheme();
return(  
<OTPScreenStack.Navigator screenOptions = {{  
  headerTransparent:true,
  headerStyle:{
    backgroundColor : "transparent",
    shadowColor:"#000080",
    elevation: 0,
  },
  headerTintColor : "#fff",
  headerTintStyle : "#fff",
  fontweight:'bold',
  headerTitleAlign:'center',
}}>
<OTPScreenStack.Screen name="OTP_Screen" component={OTP_Screen} 
options={{ title:"OTP Screen",
}} /> 
</OTPScreenStack.Navigator>
)};


export const HereMapDisplayStackScreen = ({navigation}) =>{
  const {colors} = useTheme();
return(
  
<MapDisplayStack.Navigator screenOptions = {{
  headerTransparent:true,
  headerStyle:{
    backgroundColor : "transparent",
    shadowColor:"#000080",
    elevation: 0,

  },
  headerTintColor : "#fff",
  headerTintStyle : "#fff",
  fontweight:'bold',
  headerTitleAlign:'center',
}}>

<MapDisplayStack.Screen 
      name="Here_Map"
      // options={{
      //   title: 'Requester Details'
      // }}

      options={(       
        { route }) => ({ title: 'Map',     
        data: route.params, 
              
      })     
    }
      component={Here_Map}
      // initialParams={{ screenName:'Edit_Profile_Screen',
      // loactionAddress:null }}
    />

</MapDisplayStack.Navigator>
)};

export const SOSStackScreen = ({navigation}) =>{
  const {colors} = useTheme();
return(  
<SOSScreenStack.Navigator screenOptions = {{  
  headerTransparent:true,
  headerStyle:{
     backgroundColor : "transparent",
    shadowColor:"#000080",
    elevation: 0,
  },
  headerTintColor : ColorsCode.blue_primary,
  headerTintStyle : "#fff",
  fontweight:'bold',
  headerTitleAlign:'center',
}}>
    
<SOSScreenStack.Screen name="SOSData" component={SOSData} 
options={{ title:"SOS Screen",
headerLeft:() => (
//   <TouchableOpacity onPress={() => {navigation.openDrawer()}}>
// <Image
//         source={require('../assets/sos.png')}        
//         style={[MainScreenStyles.categoryIcon,
//         {
//           height:CARD_WIDTH, width: CARD_WIDTH,
//           // borderColor: 'green', borderWidth: 1
//         }]}
        
//         />
// </TouchableOpacity>
 
  <TouchableOpacity         
        onPress={() => {navigation.openDrawer();}}>
		 <Icon name="ios-menu" size={30}
        backgroundColor = "transparent"  
        style={{marginLeft:15}}        
        color={ColorsCode.blue_primary}
         />
		 </TouchableOpacity>
   
),
}} 
/> 
</SOSScreenStack.Navigator>
)};


export const styles = StyleSheet.create({
  bottombarstyles:{ 
    padding: '1%',
    position:'absolute',
    // bottom:25,
    backgroundColor:'transparent',
    // backgroundColor:'white',
    // height:50,
    shadowOpacity:0.2,
    borderRadius:25,
    // shadowRadius:70,
    borderColor:'black',
    // paddingBottom:'10%',      
    borderWidth:1,
    margin:'3%',     
  },
});