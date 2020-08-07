import React, { useEffect }  from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
const SettingsScreen = (navigation) => {
  
    useEffect(() => {
      // console.log('user_data_user_name sdf'+user_data_user_name);
     
      
     });
    return (
      <View style={styles.container}>
        <Text>Settings Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};


export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
