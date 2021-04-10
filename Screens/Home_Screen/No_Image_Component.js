import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const No_Image_Component = (props) => {
    return (
      <View style={styles.container}>
        <Text style={[styles.profileImg, {
                              height: 150, width: 150,
                              marginLeft: '1.5%',
                              borderColor: 'green', borderWidth: 1,
                              backgroundColor: 'black'
                            }]}>
        ds
      </Text>
      </View>
    );
};

export default No_Image_Component;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  profileImg: {
    borderRadius: 50,
  },
});
