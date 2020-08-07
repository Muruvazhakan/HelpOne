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
import GetLocationmap from './Screens/GetLocationmap';
import RootStackScreen from './Screens/RootStackScreen';
import { DrawerContent } from './Screens/DrawerContent';
import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-community/async-storage';
import Toaster, { ToastStyles } from 'react-native-toaster';
import SearchMap from './Screens/Map_Component/SearchMap';
import {createStore,combineReducers} from 'redux';
import helponeReducer from './Store/reducers/HelpOne';
import {Provider} from 'react-redux';
const Drawer = createDrawerNavigator();

const rootReducer= combineReducers({
  helpone:helponeReducer
});

const store = createStore(rootReducer);
const App =() =>{
    //  const [isLoading, setIsLoading] = React.useState(true);
    // const [userToken, setUserToken] = React.useState(null); 

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
      } catch(e) {
        console.log(e);
      }

      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', userName: userName,userNumber:userNumber});
    },

    signOut: async() => {
        // setUserToken(null);
        // setIsLoading(false);
        let logout='0';
      try {
        await AsyncStorage.setItem('user_logout',logout);
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.removeItem('userNumber');
        await AsyncStorage.removeItem('userfirstname');

        await AsyncStorage.removeItem('user_last_name');
        console.log('user_logout logout :'+ logout);
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
  
  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      
      try {
        userName = await AsyncStorage.getItem('userName');
        userNumber = await AsyncStorage.getItem('userNumber');
      } catch(e) {
        console.log(e);
      }
      console.log('user userName: ', userName);
      console.log('user userNumber: ', userNumber);
      if(userName !==null){
        ToastAndroid.show('Welcome '+userName,ToastAndroid.LONG);
      }
      
      
      //console.log(foundUser[0].userName);
      dispatch({ type: 'RETRIEVE_TOKEN', userName: userName , userNumber:userNumber});
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }  

  return (
    <Provider store={store}>
    <PaperProvider theme = {theme}>
    <AuthContext.Provider value={authContext}>
      <NavigationContainer theme={theme}>
      { loginState.userName !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} userdetails={loginState}/>}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
          <Drawer.Screen name="GetLocationmap" component={GetLocationmap} />
          {/* <Drawer.Screen name="SearchMap" component={SearchMap} /> */}
        </Drawer.Navigator>
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


