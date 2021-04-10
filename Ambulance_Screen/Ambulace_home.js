import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet,StatusBar,ToastAndroid,TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import Toaster from 'react-native-toaster';
import {Currentlocation} from '../components/context';
import {useSelector,useDispatch} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles as MainScreenStyles} from '../Main_Screen/MainScreen';

const Ambulace_home = ({navigation}) => {
  const themes = useTheme();
  const user_data_user_first_name=useSelector(state =>
    state.helpone.user_first_name,
    );
    useEffect(() => {
      // console.log('user_data_user_name sdf'+user_data_user_name);
      console.log('user_data_user_first_name home '+user_data_user_first_name);
      
     });
 // const [state,setState] = React.useState(Currentlocation);

//  const [data, setData] = React.useState({    
//   location:Currentlocation.location,
// })

  const { colors } = useTheme();
    return (
      <View style={styles.container}>   
        <StatusBar  barStyle= {themes.dark ?"light-content":"default-content" } />
        <View style={[MainScreenStyles.cardview,{margin:'2%'}]}>
            <View style={MainScreenStyles.row}>
              <View style={MainScreenStyles.component}>
                <TouchableOpacity style={MainScreenStyles.touchspacing}
                  onPress={() => navigation.navigate('My_Blood_Donated_Screen')}>
                <Fontisto style={MainScreenStyles.iconcenterspacing}
                name="blood-drop" color={colors.text} size={35}/>
                </TouchableOpacity> 
                <Text>My donation</Text>           
              </View>         
          </View>
        </View>
      </View>
    );
};
export default Ambulace_home;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});

