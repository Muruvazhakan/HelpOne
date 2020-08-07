import React,{useState,useEffect} from 'react';
import {View, SafeAreaView, StyleSheet,Dimensions,Image} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,useTheme, Checkbox
} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { color } from 'react-native-reanimated';
import {useSelector,useDispatch,useCallback} from 'react-redux';
import EditProfileScreen, {styles as editprofilestyle} from './EditProfileScreen';



const{width,height} = Dimensions.get('window');
const screen_width = width;


const ProfileScreen = ({navigation}) => {

  const dispatch = useDispatch();

// EditProfileScreen.navigationOptions= navigationData =>{

// }
// const gotuserfname =navigation.getParam('back_user_first_name')
  useEffect(() => {
    // console.log('user_data_user_name sdf'+user_data_user_name);
    console.log('screen_width '+screen_width);
    
   },[screen_width]);
  const user_data_user_number=useSelector(state =>
    state.helpone.user_number,
    );

  const user_data_user_address_line1=useSelector(state =>
    state.helpone.user_address_line1
    );
    
  const user_data_user_name=useSelector(state =>
    state.helpone.user_name
    );

  const user_data_user_Confermation=useSelector(state =>
    state.helpone.user_Confermation
    );

  const user_data_user_first_name=useSelector(state =>
    state.helpone.user_first_name
    ); 
  
  const user_data_user_email=useSelector(state =>
    state.helpone.user_email
    );

  const user_data_user_last_name=useSelector(state =>
    state.helpone.user_last_name
    );

  
  const user_data_isUserImageAvailable=useSelector(state =>
    state.helpone.isUserImageAvailable
    );

  const user_data_user_BloodGroup=useSelector(state =>
    state.helpone.user_BloodGroup
    );

  const user_data_user_Gender=useSelector(state =>
    state.helpone.user_Gender
    );
    
  const user_data_user_DOB=useSelector(state =>
    state.helpone.user_DOB
    );
    
  const user_data_user_Proof=useSelector(state =>
    state.helpone.user_Proof
    );
    
  const user_data_user_city=useSelector(state =>
    state.helpone.user_city
    );

  const user_data_user_area=useSelector(state =>
    state.helpone.user_area
    );

  const user_data_user_bood_donated=useSelector(
    state =>
    state.helpone.user_bood_donated

    );
    
  const user_data_user_Proof_Select=useSelector(state =>
    state.helpone.user_Proof_Select
    );   

  const user_data_user_state_name=useSelector(state =>
    state.helpone.user_state_name
    );

  const user_data_user_latitude=useSelector(state =>
    state.helpone.user_latitude
    );

  const user_data_user_bood_request_raised=useSelector(state =>
    state.helpone.user_bood_request_raised
    );
      

  const user_data_user_pincode=useSelector(state =>
    state.helpone.user_pincode
    );
  const user_data_user_longitude=useSelector(state =>
  state.helpone.user_longitude
  );
      
const [profiledata, setprofiledata] = React.useState({    
    loactionAddress:{
    address:12,
    city:"test city",
    area:' test area',
    statename:'test state ',
    latitude: 37.425998333,
    longitude:  -110.125100000,
    },
    mail_id:user_data_user_email,
    user_name:user_data_user_name,
    user_number:user_data_user_number,
    isUserImageAvailable:user_data_isUserImageAvailable,
    imageUrl:'', 
    user_bood_donated:((user_data_user_bood_donated===null||user_data_user_bood_donated==='')?0 :user_data_user_bood_donated),
    user_bood_request_raised:((user_data_user_bood_request_raised===null||user_data_user_bood_request_raised==='')?0 :user_data_user_bood_request_raised),
    user_BloodGroup:user_data_user_BloodGroup,
    //user_firstname:user_data_user_first_name,
    user_Lastname:user_data_user_last_name,
  });
  const {colors} = useTheme();

  

  return (
    <ScrollView>
    <SafeAreaView style={[styles.container,styles.cardview]}>

      <View style={[styles.userInfoSection],{paddingHorizontal: 10,}}>
        <View style={{flexDirection: 'row', marginTop: '5%'}}>
         
          { user_data_isUserImageAvailable?
            <Image 
            source={{uri:user_data_isUserImageAvailable}}
            style={[styles.profileImg,{height: 100, width: 100,borderColor: 'green', borderWidth:1 }]}
            imageStyle={[{borderRadius: 25}]}/>
          :
          <FontAwesome name="user-circle-o" color={colors.text} size={80}/>
          }   
          <View style={{flexDirection: 'column'}}>     
              <View style={{marginLeft:'2%'}}>
                <Title style={[styles.title, { 
                  
                }]}>{user_data_user_name}</Title>
              
              </View>
              <Caption style={{marginLeft: '4%'}}>{user_data_user_first_name} {user_data_user_last_name}</Caption>
            </View>
        </View>
         
      </View>

      <View style={[styles.userInfoSection,styles.cardview,]}>  

        <View style={[styles.row,styles.cardfirstvalue]}>
          <Icon style={{color:'green'}} name="phone" color={colors.text} size={20}/>
          <Text style={{color:colors.text, marginLeft: 20}}>{user_data_user_number}</Text>
        </View>
                
        <View style={[styles.row,]}>
          <Fontisto style={{color:'#8a0303'}} name="blood-drop" color={colors.text} size={20}/>
          <Text style={{color:colors.text, marginLeft: 30}}>{user_data_user_BloodGroup}</Text>                  
        </View>

        <View style={styles.row}>
          <Icon name="email" color={colors.text} size={20}/>
          <Text style={{color:colors.text, marginLeft: 20}}>{user_data_user_email}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="map-marker-radius" color={colors.text} size={20}/>
          <Text style={{color:colors.text, marginLeft: 20}}>{profiledata.loactionAddress.statename}</Text>
        </View>       

      </View>
      
      <View style={[styles.cardview,styles.userInfoSection]}>

        <View style={{marginTop:'3%'}}>
          <View style={styles.row}  color={colors.text}>
            <Text>Gender:</Text>
            {user_data_user_Gender==='Male'?
              <Fontisto style={{marginLeft:'5%'}} name="male" color={colors.text} size={23} />
              :
            <Fontisto style={{marginLeft:'5%'}} name="female" color={colors.text} size={23} />
            }                   
          </View>
        </View>

        <View style={styles.row} >
          <Text>Date of Birth: </Text>
          <Text style={styles.DOBstyle}>  {user_data_user_DOB} </Text>            
        </View>

        <View style={styles.row} >
          <Text >User Proof: </Text> 
          <Text style={styles.DOBstyle}> {user_data_user_Proof_Select} </Text>                       
        </View>


        {user_data_user_Confermation ==='1'?
          <Animated.View style={[styles.row]} animation="bounceIn">
            <Text style={[{paddingTop:'1%'}]} >User Available: </Text>
            <Checkbox status='checked' />            
            <Icon name="emoticon-happy-outline" color='green' size={30}/>        
          </Animated.View>
        : null}

      </View>

      <View style={[styles.infoBoxWrapper,styles.cardview]}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{profiledata.user_bood_donated}</Title>
            <Caption>Donated</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{profiledata.user_bood_request_raised}</Title>
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
  
  DOBstyle:{
    backgroundColor:'#E5E4E2',
    borderRadius:20,
    borderWidth:1,
    color:'black',
    padding:'1%',
  },

  title: {
    fontSize:screen_width<400? 20:30,
    fontWeight: 'bold',
    width:screen_width*0.70,    
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
 
  profileImg: {    
    borderRadius: 50,
  },

});
