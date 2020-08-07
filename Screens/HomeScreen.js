import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet,StatusBar,ToastAndroid } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import Toaster from 'react-native-toaster';
import {Currentlocation} from '../components/context';
import {useSelector,useDispatch} from 'react-redux';
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
        <Text style = {{color: colors.text}}>Home Screen</Text>
      <Button
        title="Go to details screen"
       // onPress={showToast}
        // onPress={() => navigation.navigate("Blood_Request_List")}
        // onPress={()=> test()}
      />
      <Text>{Currentlocation.latitude}</Text>
      </View>
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

