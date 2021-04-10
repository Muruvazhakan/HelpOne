import 'react-native-gesture-handler'; 
import React,{ useEffect } from 'react';
import { StyleSheet, Text, View,Button,ActivityIndicator,ToastAndroid } from 'react-native';
import {  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme 
  } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import{ Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
   } from 'react-native-paper';
import MainTabScreen from './Screens/MainTabScreen';
import BookmarkScreen from './Screens/BookmarkScreen';
import SettingsScreen from './Screens/SettingsScreen';
import SupportScreen from './Screens/SupportScreen';
import GetLocationmap from './Screens/Blood_Request/GetLocationmap';
import RootStackScreen from './Screens/RootStackScreen';
import { DrawerContent } from './Screens/DrawerContent';
import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-community/async-storage';
import Toaster, { ToastStyles } from 'react-native-toaster';
import SearchMap from './Screens/Map_Component/SearchMap';
import {createStore,combineReducers} from 'redux';
import helponeReducer from './Store/reducers/HelpOne';
import {Provider} from 'react-redux';
import LottieView from 'lottie-react-native';

// import {connect,useSelector,useDispatch} from 'react-redux';
// import {toggleusername,
//   toggleusernumber,    
// } from './Store/actions/HelpOne';
import {RequestDisplayStackScreen,
  DonatedDisplayStackScreen,

} from './Screens/MainTabScreen';

import Main_Blood_Screen_Navigation from './Screen_Navigation/Main_Blood_Screen_Navigation';
const Drawer = createDrawerNavigator();

const rootReducer= combineReducers({
  helpone:helponeReducer
});

const store = createStore(rootReducer);
const App =() =>{
 
    //  const [isLoading, setIsLoading] = React.useState(true);
    // const [userToken, setUserToken] = React.useState(null); 
    // const dispatchredux = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = React.useState(false); 
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userNumber: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userName: action.userName,
          userNumber:action.userNumber,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.userName,
          userNumber: action.userNumber,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userNumber: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.userName,
          userNumber: action.userNumber,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  let userName,userNumber;
  userName = null;
  userNumber=null;
  const authContext = React.useMemo(() => ({

    
    signIn: async(userName,userNumber) => {
      //console.log(userName);
      // setUserToken('fgkj');
      //  setIsLoading(false);
    
      const userToken = userName;
      
      try {
        await AsyncStorage.setItem('userName', userName);
        await AsyncStorage.setItem('userNumber', userNumber);
      
        // dispatchredux(toggleusername(userName));
        // dispatchredux(toggleusernumber(userNumber));
      } catch(e) {
        console.log('[App]'+e);
      }

      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', userName: userName,userNumber:userNumber});
    },

    signOut: async() => {
        // setUserToken(null);
        // setIsLoading(false);
        let logout='0';
      try {
        clearAppData();
        console.log('[App] user_logout logout :'+ logout);
      } catch(e) {
        console.log(e);
      }
       dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      //  setUserToken('fgkj');
      //   setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  const clearAppData = async() => {
    try {
      console.log('clearAppData in AsyncStorage ');
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing app data.');
    }
}
  
  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      
      try {
        userName = await AsyncStorage.getItem('userName');
        userNumber = await AsyncStorage.getItem('userNumber');
      } catch(e) {
        console.log(e);
      }
      console.log('[App] user userName: ', userName);
      console.log('[App] user userNumber: ', userNumber);
      if(userName !==null){
        ToastAndroid.show('Welcome '+userName,ToastAndroid.LONG);
      }
      
      
      //console.log(foundUser[0].userName);
      dispatch({ type: 'RETRIEVE_TOKEN', userName: userName , userNumber:userNumber});
    }, 3500);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{
         flex:1,
        justifyContent:'center',alignItems:'center'}}>
        {/* <ActivityIndicator size="large"/> */}
        <Text style={{       
        justifyContent:'center',alignItems:'center'}}>Donate Blood</Text>       
        <LottieView source={require('./assets/blood-transfusion-kawaii.json')} autoPlay loop />
        
      </View>
    );
  }  

  return (
    <Provider store={store}>
    <PaperProvider theme = {theme}>
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme}>
      { loginState.userName !== null ? (
        // <Drawer.Navigator drawerContent={props => <DrawerContent {...props} userdetails={loginState}/>}>
        //   <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        //   <Drawer.Screen name="SupportScreen" component={SupportScreen} />
        //   <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
        //   <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        //   <Drawer.Screen name="GetLocationmap" component={GetLocationmap} />
        //   <Drawer.Screen name="My_Request_Raised_Screen" component={RequestDisplayStackScreen} />
        //   <Drawer.Screen name="My_Blood_Donated_Screen" component={DonatedDisplayStackScreen} />
        //   {/* <Drawer.Screen name="SearchMap" component={SearchMap} /> */}
        // </Drawer.Navigator>
     
      <Main_Blood_Screen_Navigation userdata={loginState} />
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
    </Provider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


