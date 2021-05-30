import React, { useEffect }  from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Click_to_flip_Component = (props) => {
  
    // useEffect(() => {
    //   // console.log('Click_to_flip_Component props'+props);
    //   // console.log(props);
      
    //  });
    return (
      <View style={styles.container}>
        {props.cardface ===   "front" ?
          <MaterialIcons style={{color:'#00BFFF'}} name="rotate-left" size={18} />
        : 
         <MaterialIcons style={{color:'#00BFFF'}} name="rotate-right" size={18} />
        }        
        <Text style={{color:'#20B2AA',marginLeft:'3%'}}>Click to flip</Text>        
      </View>
    );
};


export default Click_to_flip_Component;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end', 
    justifyContent: 'flex-end',
    position: 'absolute',
    color:'red'
  },
});
