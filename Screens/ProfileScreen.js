import React,{useState} from 'react';
import {View, SafeAreaView, StyleSheet,Dimensions} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,useTheme
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';

const{width,height} = Dimensions.get('window');
const screen_width = width;

const ProfileScreen = () => {
  const [profiledata, setprofiledata] = React.useState({    
    loactionAddress:{
    address:12,
    city:"test city",
    area:' test area',
    statename:'test state ',
    latitude: 37.425998333,
    longitude:  -110.125100000,
    },
    mail_id:'abc@gmail.com',
    user_name:'abcasdaadas',
    user_number:'9898',

  });
  const {colors} = useTheme();
  return (
    <ScrollView>
    <SafeAreaView style={[styles.container,styles.cardview]}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
        <Avatar.Image 
              source={require('../assets/user-icon.png')}
              size={80}
            />
          <View style={{marginLeft:'2%'}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{profiledata.user_name}</Title>
           
          </View>
        </View>
      </View>

      <View style={[styles.userInfoSection,styles.cardview,]}>        
        <View style={[styles.row,styles.cardfirstvalue]}>
          <Icon name="phone" color={colors.text} size={20}/>
          <Text style={{color:colors.text, marginLeft: 20}}>{profiledata.user_number}</Text>
        </View>
                
        <View style={styles.row}>
          <Icon name="email" color={colors.text} size={20}/>
          <Text style={{color:colors.text, marginLeft: 20}}>{profiledata.mail_id}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="map-marker-radius" color={colors.text} size={20}/>
          <Text style={{color:colors.text, marginLeft: 20}}>{profiledata.loactionAddress.statename}</Text>
        </View>

      </View>
      

      <View style={[styles.infoBoxWrapper,styles.cardview]}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>1</Title>
            <Caption>Donated</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Request Raised</Caption>
          </View>
      </View>

      <View style={[styles.cardview]}>
      
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color={colors.text} size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color={colors.text} size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color={colors.text} size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default ProfileScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: '2%',
  },
  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    width:screen_width*0.50,    
  },
  cardfirstvalue:{
    marginTop: '4%',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: '3%',
  },
  infoBoxWrapper: {
    marginTop:'2%',
    flexDirection: 'row',
    
  },
  infoBox: {
    
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: '4%',
    paddingHorizontal: '5%',
  },
  menuItemText: {   
    marginLeft: '4%',
    fontWeight: '600',
    fontSize: 16,
    
  },
  cardview:{
    shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 7,
      shadowOpacity: 0.25,
      elevation: 5,
      // backgroundColor: 'white',
      padding: '2%',
      borderRadius:20,
      margin:'2%',         
  },

});
