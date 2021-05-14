import React, { useEffect } from 'react';
import {
  View, Text,
  Button, StyleSheet, StatusBar, ToastAndroid,
  TouchableOpacity, Linking
} from 'react-native';
import { useTheme } from '@react-navigation/native';
//import Toaster from 'react-native-toaster';
import { useSelector, useDispatch } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { styles as MainScreenStyles } from '../../Main_Screen/MainScreen';
import Covid_Main_Screen from './Covid_Main_Screen';
import { ScrollView } from 'react-native-gesture-handler';
import Covid_Statewise_Data from '../Covid_Cause_India/Covid_Statewise_Data';
const Covid_Home = ({ navigation }) => {
  const themes = useTheme();
  const user_data_user_first_name = useSelector(state =>
    state.helpone.user_first_name,
  );
  useEffect(() => {
    // console.log('user_data_user_name sdf'+user_data_user_name);
    // console.log('user_data_user_first_name home '+user_data_user_first_name);

  });
  // const [state,setState] = React.useState(Currentlocation);

  //  const [data, setData] = React.useState({    
  //   location:Currentlocation.location,
  // })

  const { colors } = useTheme();
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle={themes.dark ? "light-content" : "default-content"} />
        <Covid_Main_Screen />
        <View style={[MainScreenStyles.cardview, { margin: '2%' }]}>
          <View style={MainScreenStyles.row}>
            <View style={MainScreenStyles.component}>
              <TouchableOpacity style={MainScreenStyles.touchspacing}
                onPress={() => navigation.navigate('CovidGlobalScreen')}>
                <Fontisto style={MainScreenStyles.iconcenterspacing}
                  name="blood-drop" color={colors.text} size={35} />
              </TouchableOpacity>
              <Text>Global Causes</Text>
            </View>
          </View>

          <View style={MainScreenStyles.row}>
            <View style={MainScreenStyles.component}>
              <TouchableOpacity style={MainScreenStyles.touchspacing}
                onPress={() => navigation.navigate('CovidIndiaScreen')}>
                <Fontisto style={MainScreenStyles.iconcenterspacing}
                  name="blood-drop" color={colors.text} size={35} />
              </TouchableOpacity>
              <Text>India Causes</Text>
            </View>
          </View>

          <View style={MainScreenStyles.row}>
            <View style={MainScreenStyles.component}>
              <TouchableOpacity style={MainScreenStyles.touchspacing}
                onPress={() => navigation.navigate('CovidIndiaContactScreen')}>
                <Fontisto style={MainScreenStyles.iconcenterspacing}
                  name="blood-drop" color={colors.text} size={35} />
              </TouchableOpacity>
              <Text>Covid Help Line</Text>
            </View>
          </View>

        </View>
        <Covid_Statewise_Data />
        
      </View>
    </ScrollView>
  );
};
export default Covid_Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center', 
    justifyContent: 'space-evenly'
  },
});

