import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet,StatusBar,SafeAreaView
 
  ,ToastAndroid,TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import Toaster from 'react-native-toaster';
import {Currentlocation} from '../../components/context';
import {useSelector,useDispatch} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles as MainScreenStyles} from '../../Main_Screen/MainScreen';
import OTP_Screen from '../SignIn/OTP_Screen';
import { ScrollView } from 'react-native-gesture-handler';
import All_User_Donation_Bottom from './All_User_Donation_Bottom';
import Home_Screen_Header from './Home_Screen_Header';
// import Here_Map from '../../HERE_Component/Here_Map'
// const test=()=>{
//   console.log(Currentlocation.location);
//   // setState({...state,location:40.425998333});
//   Currentlocation.location=40.425998333;
//   console.log("Currentlocation.location2"+Currentlocation.location);

// }

const HomeScreen = ({navigation}) => {
  const themes = useTheme();
  const user_data_user_first_name=useSelector(state =>
    state.helpone.user_first_name,
    );
    useEffect(() => {
      // console.log('user_data_user_name sdf'+user_data_user_name);
      //console.log('user_data_user_first_name home '+user_data_user_first_name);
      
     });
 // const [state,setState] = React.useState(Currentlocation);

//  const [data, setData] = React.useState({    
//   location:Currentlocation.location,
// })

  const { colors } = useTheme();
    return (
      // <Here_Map/>
      
      <SafeAreaView style={{flex: 1}}>
        
        <View style={styles.container}>   
        <StatusBar  barStyle= {themes.dark ?"light-content":"default-content" } />
        {/* <View style={[MainScreenStyles.cardview,{margin:'2%'}]}>
            <View style={MainScreenStyles.row}>
              <View style={MainScreenStyles.component}>
                <TouchableOpacity style={MainScreenStyles.touchspacing}
                  onPress={() => navigation.navigate('My_Blood_Donated_Screen')}>
                <Fontisto style={MainScreenStyles.iconcenterspacing}
                name="blood-drop" color={colors.text} size={35}/>
                </TouchableOpacity> 
                <Text>My donation</Text>  
                <TouchableOpacity style={MainScreenStyles.touchspacing}
                  onPress={() => navigation.navigate('OTP_Screen')}>
                <Fontisto style={MainScreenStyles.iconcenterspacing}
                name="blood-drop" color={colors.text} size={35}/>
                </TouchableOpacity>          
              </View>         
          </View>        
        </View> */}
        {/* <Home_Screen_Header navigation={navigation}/> */}
        <All_User_Donation_Bottom navigation={navigation}/>
      </View>
        </SafeAreaView>
     
    );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});

