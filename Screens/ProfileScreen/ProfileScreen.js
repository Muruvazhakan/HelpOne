import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet,
  TouchableOpacity,
   Image, ToastAndroid } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple, useTheme, Checkbox
} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { color } from 'react-native-reanimated';
import { useSelector, useDispatch, useCallback } from 'react-redux';
import EditProfileScreen, { styles as editprofilestyle } from './EditProfileScreen';
import Share from 'react-native-share';
import { screen_width } from '../../components/Parameter';
import { FCM_Handle_message } from '../../FirebaseCloud/FCM_Screen';
import { styles as signupstyles } from '../SignIn/SignUpScreen';
import { styles as Home_Donation_Bottom } from '../Home_Screen/All_User_Donation_Bottom';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import FlipCard from 'react-native-flip-card';
// const{width,height} = Dimensions.get('window');
// const screen_width = width;


const ProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch();


  useEffect(() => {
    console.log('screen_width admin_comments ' + screen_width + admin_comments);
    console.log('****user_data_user_first_name ' + user_data_user_first_name);
  }, [screen_width]);
  const user_data_user_number = useSelector(state =>
    state.helpone.user_number,
  );



  const user_data_user_name = useSelector(state =>
    state.helpone.user_name,
  );

  const user_data_user_Confermation = useSelector(state =>
    state.helpone.user_Confermation,
  );

  const user_data_user_first_name = useSelector(state =>
    state.helpone.user_first_name
  );

  const user_data_user_email = useSelector(state =>
    state.helpone.user_email
  );
  const admin_comments = useSelector(state =>
    state.helpone.admin_comments
  );

  const user_data_user_last_name = useSelector(state =>
    state.helpone.user_last_name
  );


  const user_data_isUserImageAvailable = useSelector(state =>
    state.helpone.isUserImageAvailable
  );

  const user_data_user_BloodGroup = useSelector(state =>
    state.helpone.user_BloodGroup
  );

  const user_data_user_Gender = useSelector(state =>
    state.helpone.user_Gender
  );

  const user_data_user_DOB = useSelector(state =>
    state.helpone.user_DOB
  );

  const user_data_user_Proof = useSelector(state =>
    state.helpone.user_Proof
  );



  const user_data_user_bood_donated = useSelector(
    state =>
      state.helpone.user_bood_donated

  );

  const user_data_user_Proof_Select = useSelector(state =>
    state.helpone.user_Proof_Select
  );

  const user_data_user_bood_request_raised = useSelector(state =>
    state.helpone.user_bood_request_raised
  );

  const user_data_user_address_line1 = useSelector(state =>
    state.helpone.user_address_line1,
  );
 
  const user_data_user_state_name = useSelector(state =>
    state.helpone.user_state_name
  );

  const user_data_user_city = useSelector(state =>
    state.helpone.user_city
  );

  const user_data_user_country = useSelector(state =>
    state.helpone.user_country
  );

  const user_data_user_district = useSelector(state =>
    state.helpone.user_district
  );

  const user_data_user_pincode = useSelector(state =>
    state.helpone.user_pincode
  );
  const user_data_user_longitude = useSelector(state =>
    state.helpone.user_longitude
  );

  const user_data_user_latitude = useSelector(state =>
    state.helpone.user_latitude
  );

  const [shareOptions, setshareOptions] = React.useState({
    title: '',
    message: "",
    subject: "",
  })

  const messagehandle = async () => {
    setshareOptions({
      ...shareOptions,
      title: 'Help One',
      message: 'Help One ' +
        ' Join Us',
      subject: "Join"
    });

    try {
      const result = await Share.open(shareOptions)
        .then((res) => {
          console.log(res);
          ToastAndroid.show("Shared", 200, ToastAndroid.LONG);
        });

    } catch (error) {
      console.log("catch error" + error);
      if (error.message === "User did not share") {
        console.log("Share request is canceled");
        ToastAndroid.show("Share request is canceled", 200, ToastAndroid.LONG);
      }
      else {
        alert(error.message);
      }
    }
  };


  const [profiledata, setprofiledata] = React.useState({
    loactionAddress: {
      address: 12,
      city: null,
      area: null,
      statename: null,
      latitude: 37.425998333,
      longitude: -110.125100000,
    },
    mail_id: user_data_user_email,
    user_name: user_data_user_name,
    user_number: user_data_user_number,
    isUserImageAvailable: user_data_isUserImageAvailable,
    imageUrl: '',   
    user_BloodGroup: user_data_user_BloodGroup,
    //user_firstname:user_data_user_first_name,
    user_Lastname: user_data_user_last_name,
  });  
  const { colors } = useTheme();
   return (
    <ScrollView>
      <SafeAreaView style={[styles.container, styles.cardview]}>

        <View style={[styles.userInfoSection], { paddingHorizontal: 10, alignItems: 'center', }}>
          <View style={{
            //flexDirection: 'row', 
            alignItems: 'center', marginTop: '5%'
          }}>

            {user_data_isUserImageAvailable ?
              <Image
                source={{ uri: user_data_isUserImageAvailable }}
                style={[styles.profileImg, { height: 150, width: 150, borderColor: 'green', borderWidth: 1 }]}
              />
              :
              <FontAwesome name="user-circle-o" color={colors.text} size={150} />
            }
            {user_data_user_name !== null ?
            <View>
              <View>
                <Title style={[editprofilestyle.cardview_no_shadow, {
                  marginTop:'5%'
                }]}>{user_data_user_name}</Title>

              </View>
              {/* <Caption style={{ marginLeft: '4%' }}>{user_data_user_first_name} {user_data_user_last_name}</Caption> */}
            </View>
            :null}
          </View>

        </View>

        <View style={[styles.infoBoxWrapper, styles.cardview]}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{((user_data_user_bood_donated === null || user_data_user_bood_donated === '') ? 0 : user_data_user_bood_donated)}</Title>
            <Caption>Donated</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{((user_data_user_bood_request_raised === null || user_data_user_bood_request_raised === '') ? 0 : user_data_user_bood_request_raised)}</Title>
            <Caption>Request Raised</Caption>
          </View>
        </View>
        

        <View style={[styles.userInfoSection, styles.cardview,]}>
          {user_data_user_first_name && user_data_user_last_name && user_data_user_first_name.trim() !=='' ?
            <View style={[styles.row, styles.cardfirstvalue]}>
              <FontAwesome name="user-o" color={colors.text} size={20} />
              <Text style={{ color: colors.text, marginLeft: 20 }}>{user_data_user_first_name} {user_data_user_last_name}</Text>
            </View>
            : null}

          <View style={[styles.row]}>
            <Icon style={{ color: 'green' }} name="phone" color={colors.text} size={20} />
            <Text style={{ color: colors.text, marginLeft: 20 }}>{user_data_user_number}</Text>
          </View>

          {user_data_user_email ?
            <View style={styles.row}>
              <Icon name="email" color={colors.text} size={20} />
              <Text style={{ color: colors.text, marginLeft: 20 }}>{user_data_user_email}</Text>
            </View>
            : null}

          {profiledata.user_BloodGroup === " " || profiledata.user_BloodGroup === null ? null
            :
            <View style={[styles.row,]}>
              <Fontisto style={{ color: '#8a0303' }} name="blood-drop" color={colors.text} size={20} />
              <Text style={{ color: colors.text, marginLeft: 30 }}>{user_data_user_BloodGroup}</Text>
            </View>
          }

          {profiledata.loactionAddress.statename === null ? null
            :
            <View style={styles.row}>
              <Icon name="map-marker-radius" color={colors.text} size={20} />
              <Text style={{ color: colors.text, marginLeft: 20 }}>{profiledata.loactionAddress.statename}</Text>
            </View>
          }
        </View>

        {user_data_user_Gender || user_data_user_DOB || user_data_user_Proof_Select || user_data_user_Confermation ?
          <View style={[styles.cardview, styles.userInfoSection]}>
            {user_data_user_Gender ?
              <View style={{ marginTop: '3%' }}>
                <View style={styles.row} color={colors.text}>
                  <Text>Gender:</Text>
                  {user_data_user_Gender === 'Male' ?
                    <Fontisto style={{ marginLeft: '5%' }} name="male" color={colors.text} size={23} />
                    :
                    <Fontisto style={{ marginLeft: '5%' }} name="female" color={colors.text} size={23} />
                  }
                </View>


              </View>
              : null}

            {user_data_user_DOB ?
              <View style={styles.row} >
                <Text>Date of Birth: </Text>
                <Text style={styles.DOBstyle}>  {user_data_user_DOB} </Text>
              </View>
              : null}
            {user_data_user_Proof_Select ?
              <View style={styles.row} >
                <Text >User Proof: </Text>
                <Text style={styles.DOBstyle}> {user_data_user_Proof_Select} </Text>
              </View>

              : null}
            {user_data_user_Confermation === '1' ?
              <Animated.View style={[styles.row]} animation="bounceIn">
                <Text style={[{ paddingTop: '1%' }]} >User Available: </Text>
                <Checkbox status='checked' />
                <Icon name="emoticon-happy-outline" color='green' size={30} />
              </Animated.View>
              : null}

          </View>
          : null}




{user_data_user_address_line1?
  <FlipCard 
  // style={styles.cardview}
  friction={6}
  perspective={1000}
  flipHorizontal={true}
  flipVertical={false}
  flip={false}
  clickable={true}
  onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
>
  {/* Face Side */}
  <View style={[styles.cardview,{padding:'4%'}]}>
  {(user_data_user_address_line1 !== '' || user_data_user_address_line1 !== null) ?
              <View>
                <Text style={{alignSelf:'center',fontWeight:'bold'}} >Address</Text>       
                <View style={[signupstyles.action, {borderBottomWidth: 0,maxWidth:'80%' }]}>
                  
                 <FontAwesome5 style={{ paddingTop: '1%', color: 'green',paddingRight:'2%'}} name="address-card" size={30} />
                 <Text >{user_data_user_address_line1}</Text>
                 </View>
               
              </View>
              : null
    }
  </View>
  {/* Back Side */}
  <View style={[styles.cardview,{padding:'4%'}]}>
 
  {(user_data_user_address_line1 !== '' || user_data_user_address_line1 !== null) ?
              <View>
                <Text style={{alignSelf:'center',fontWeight:'bold'}} >Address</Text>       
                <View style={[signupstyles.action, {borderBottomWidth: 0,maxWidth:'80%' }]}>
                  
                 <FontAwesome5 style={{ paddingTop: '1%', color: 'green',paddingRight:'2%'}} name="address-card" size={30} />
                 <Text >{user_data_user_address_line1}</Text>
                 </View>
               
              </View>
              : null
  }
  <View style={[styles.row,{maxWidth:'50%'}]}>
      <View style={[{  flexDirection: 'column',}]}>
       
  {(user_data_user_city!== '' || user_data_user_city !== null) ?
              <View >
                <View style={[styles.row]}>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <FontAwesome5  style={{paddingRight:'2%'}} name="city" color={colors.text} size={20} />
                  <Text >City: {user_data_user_city}</Text>
                </View>
              </View>
              : null
            }
            {(user_data_user_state_name !== '' || user_data_user_state_name !== null) ?
              <View >
                <View>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <Text >State: {user_data_user_state_name}</Text>
                </View>
              </View>
              : null
            }
             {(user_data_user_country !== '' || user_data_user_country !== null) ?
              <View >
                <View>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <Text >Country: {user_data_user_country}</Text>
                </View>
              </View>
              : null
            }
             {(user_data_user_longitude !== '' || user_data_user_longitude !== null) ?
              <View >
                <View>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <Text >Your Longitude: {user_data_user_longitude}</Text>
                </View>
              </View>
              : null
            }
  </View>
 
  <View style={{  flexDirection: 'column', }}>
 
  {(user_data_user_district !== '' || user_data_user_district !== null) ?
              <View >
                <View>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <Text >District: {user_data_user_district}</Text>
                </View>
              </View>
              : null
            }
            {(user_data_user_pincode !== '' || user_data_user_pincode !== null) ?
              <View >
                <View>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <Text >Pincode: {user_data_user_pincode}</Text>
                </View>
              </View>
              : null
            }
              {(user_data_user_latitude !== '' || user_data_user_latitude !== null) ?
              <View >
                <View>
                  {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                  <Text >Your Latitude: {user_data_user_latitude}</Text>
                </View>
              </View>
              : null
            }
            
           
  
  </View>
  </View>          
           
            
          

  </View>
</FlipCard>
   :null}

        
        
        {admin_comments !== null && admin_comments !== '' ?
          <View style={[styles.cardview, styles.admincommendstyle]}>
            <View style={{ alignItems: 'center' }} >
              <Text  >Admin Comments: </Text>
              <Text style={[styles.DOBstyle, { margin: '2%', padding: '2%' }]}> {admin_comments} </Text>
            </View>

          </View>
          : null}
        
        
        <View style={[styles.cardview]}>

          <TouchableRipple
            onPress={() => { messagehandle() }
              //onOpen         
            }
          >
            <View style={styles.menuItem}>
              <Icon name="share-outline" color={colors.text} size={25} />
              <Text style={styles.menuItemText}>Tell Your Friends</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => { }}>
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color={colors.text} size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => { }}>
            <View style={styles.menuItem}>
              <Icon name="settings-outline" color={colors.text} size={25} />
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

  DOBstyle: {
    backgroundColor: '#E5E4E2',
    borderRadius: 20,
    borderWidth: 1,
    color: 'black',
    padding: '1%',
  },
  admincommendstyle: {
    backgroundColor: '#5DE6DE',
    borderRadius: 20,
    borderWidth: 1,
    color: 'black',
    padding: '1%',
  },

  title: {
    fontSize: screen_width < 400 ? 20 : 30,
    fontWeight: 'bold',

    // width: screen_width * 0.70,
  },
  cardfirstvalue: {
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
    marginTop: '2%',
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
  cardview: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
    elevation: 5,
    // backgroundColor: 'white',   
    backgroundColor: 'white',
    padding: '5%',
    paddingBottom: '2%',
    //paddingTop:'7%',
    borderRadius: 10,
    margin: '3%',
  },

  profileImg: {
    borderRadius: 75,
  },

});
