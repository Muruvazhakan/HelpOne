import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from  'react-native-vector-icons/Ionicons';
import Fontisto from  'react-native-vector-icons/Fontisto';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View } from 'react-native';
import HomeScreen from './HomeScreen';
import Blood_Request_Screen from './Blood_Request_Screen';
import Blood_Request_List_Screen from './Blood_Request_List_Screen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import EditProfileScreen from './ProfileScreen/EditProfileScreen';

const HomeStack = createStackNavigator();
const Blood_Request_Screen_Stack = createStackNavigator();
const ProfileStack = createStackNavigator();
const EditProfileStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#F5B041"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Blood_Request_List"
        component={Blood_Request_List_Screen}
        options={{
          tabBarLabel: 'Donate',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Fontisto name="blood-drop" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Detail"
        component={Blood_Request_StackScreen}
        options={{
          tabBarLabel: 'Blood Request',
          tabBarColor: '#8a0303',
          tabBarIcon: ({ color }) => (
            <Icon name="md-add-circle-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#000000',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
     
    </Tab.Navigator>
    
);


export default MainTabScreen;

const HomeStackScreen = ({navigation}) =>(
 
    <HomeStack.Navigator screenOptions = {{
      headerStyle:{
        backgroundColor :"#009387"
      },
      headerTintColor : "#fff",
      headerTintStyle : "#fff",
      fontweight:'bold'
    }}>
    <HomeStack.Screen name="Home" component={HomeScreen} 
    options={{ title:"Home Screen",
    headerLeft:() => (
      <Icon.Button name="ios-menu" size={25}
        backgroundColor = "#009387"
         onPress={() => {navigation.openDrawer();}}></Icon.Button>
    )
    }} />
  </HomeStack.Navigator>
  );
  
  const Blood_Request_StackScreen = ({navigation}) =>(
    <Blood_Request_Screen_Stack.Navigator screenOptions = {{
      headerStyle:{
        backgroundColor :"#8a0303"
      },
      headerTintColor : "#fff",
      headerTintStyle : "#fff",
      fontweight:'bold',
      size:10,
    }}>
    <Blood_Request_Screen_Stack.Screen name="Details" component={Blood_Request_Screen} //screen name navigation
    options={{ title:"Blood Request Details",
    headerLeft:() => (
      <Icon.Button name="ios-menu" size={25}
        backgroundColor = "#8a0303"
         onPress={() => {navigation.openDrawer();}}></Icon.Button>
    )}} />
  </Blood_Request_Screen_Stack.Navigator>
  );


    const ProfileStackScreen = ({navigation}) =>{
      const {colors} = useTheme();
    return(
      
    <ProfileStack.Navigator screenOptions = {{
      
      headerStyle:{
        backgroundColor :"#000000",
        shadowColor:"#000080",
        elevation: 0,

      },
      headerTintColor : "#fff",
      headerTintStyle : "#fff",
      fontweight:'bold'
    }}>
    <ProfileStack.Screen name="Explore" component={ProfileScreen} 
    options={{ title:"User Profile",
    headerLeft:() => (
     
      <Icon.Button name="ios-menu" size={25}
        backgroundColor = "#000000"
         onPress={() => {navigation.openDrawer();}}/>
       
    ),
    headerRight: () => (
      <View style={{marginRight:10}}>
        <MaterialCommunityIcons.Button
          name="account-edit"
          size={25}
          backgroundColor= "#000000"
          color="#fff"
          onPress={() => navigation.navigate('EditProfile')}
        />
      </View>
    ),


    }} />

<EditProfileStack.Screen 
      name="EditProfile"
      options={{
        title: 'Edit Profile'
      }}
      component={EditProfileScreen}
    />

  </ProfileStack.Navigator>
  )};


  const EditProfileStackScreen = ({navigation}) =>{
    const {colors} = useTheme();
  return(
    
  <EditProfileStack.Navigator screenOptions = {{
    
    headerStyle:{
      backgroundColor :"#694fad",
      shadowColor:"#694fad",
      elevation: 0,

    },
    headerTintColor : "#fff",
    headerTintStyle : "#fff",
    fontweight:'bold'
  }}>
  <EditProfileStack.Screen name="EditProfile" component={EditProfileScreen} 
  options={{ title:"User Edit Profile",
  headerLeft:() => (
   
    <Icon.Button name="ios-menu" size={25}
      backgroundColor = "#694fad"
       onPress={() => {navigation.openDrawer();}}/>
     
  ),
  headerRight: () => (
    <View style={{marginRight:10}}>
      <MaterialCommunityIcons.Button
        name="account-edit"
        size={25}
        backgroundColor= "#694fad"
        color="#fff"
        onPress={() => navigation.navigate('EditProfile')}
      />
    </View>
  ),


  }} />

{/* <EditProfileStack.Screen 
    name="EditProfile"
    options={{
      title: 'Edit Profile'
    }}
    component={EditProfileScreen}
  /> */}

</EditProfileStack.Navigator>
)};

