import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ToastAndroid,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
    useTheme,
    RadioButton,
    Checkbox,
  } from 'react-native-paper';
import {styles as signupstyles} from '../SignUpScreen';
import * as Animatable from 'react-native-animatable';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Animated, { color } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import {connect,useSelector,useDispatch,useCallback} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-community/picker';
import {toggleuserfirstname,
  toggleuserlastname,
  toggleuserisUserImageAvailable,
  toggleuser_Gender,
  toggleuser_DOB,
  toggleuseremail,
  toggleuser_Confermation,
  toggleuser_Proof,
  toggleuser_BloodGroup,
  toggleuser_address_line1,
  toggleuser_city,
  toggleuser_area,
  toggleuser_state_name,
  toggleuser_latitude,
  toggleuser_longitude,
  toggleuser_pincode,
  toggleuser_Proof_Select,
} 
from '../../Store/actions/HelpOne';
import {styles as BloodRequestStyle} from '../Blood_Request_Screen';
import {styles as ProfileStyles} from '../ProfileScreen/ProfileScreen';
const{width,height} = Dimensions.get('window');
const screen_width = width;
// import {profiledata as profile_data} from './ProfileScreen';
const EditProfileScreen = ({navigation}) => {
    
  // const [image,setimage]=useState(require('../assets/user-icon.png'));
const dispatch = useDispatch();

  // const toggleuserfname =useCallback(()=>{
  //   dispatch(toggleuserfirstname(profiledata.user_first_name));
  // },[dispatch,profiledata.user_first_name]);

const user_data_user_name=useSelector(state =>
  state.helpone.user_name
  );

const user_data_user_number=useSelector(state =>
    state.helpone.user_number,
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

const user_data_user_Confermation=useSelector(state =>
  state.helpone.user_Confermation
  );

const user_data_user_Gender=useSelector(state =>
  state.helpone.user_Gender
  );
  
const user_data_isUserImageAvailable=useSelector(state =>
  state.helpone.isUserImageAvailable
  );

const user_data_user_BloodGroup=useSelector(state =>
  state.helpone.user_BloodGroup
  );

const user_data_user_DOB=useSelector(state =>
  state.helpone.user_DOB
  );

const user_data_user_Proof=useSelector(state =>
  state.helpone.user_Proof
  );
  
const user_data_user_address_line1=useSelector(state =>
  state.helpone.user_address_line1
  );
  
const user_data_user_city=useSelector(state =>
  state.helpone.user_city
  );

const user_data_user_area=useSelector(state =>
  state.helpone.user_area
  );

const user_data_user_state_name=useSelector(state =>
  state.helpone.user_state_name
  );   
  
const user_data_user_latitude=useSelector(state =>
  state.helpone.user_latitude
  );

const user_data_user_longitude=useSelector(state =>
  state.helpone.user_longitude
  );    
const user_data_user_pincode=useSelector(state =>
  state.helpone.user_pincode
  );
      
const user_data_user_Proof_Select=useSelector(state =>
  state.helpone.user_Proof_Select
  );          
            
const handleuser_pincode = (val) => { 
    console.log(val +" handleuser_pincode val");
    setprofiledata({
        ... profiledata, 
        user_pincode:val,      
    });
    // availableprofiledata =val;
    console.log(profiledata.user_pincode +"user_pincode");
}       
              
    
 const handleuser_longitude = (val) => { 
    console.log(val +" handleuser_longitude val");
    setprofiledata({
        ... profiledata, 
        user_longitude:val,      
    });
    // availableprofiledata =val;
    console.log(profiledata.user_longitude +"user_longitude");
}

  const handleuser_latitude = (val) => { 
    console.log(val +" handleuser_latitude val");
    setprofiledata({
        ... profiledata, 
        user_latitude:val,      
    });
    // availableprofiledata =val;
    console.log(profiledata.user_latitude +"user_latitude");
}


const handleuser_state_name = (val) => { 
  console.log(val +" val");
  setprofiledata({
      ... profiledata, 
      user_state_name:val,      
  });
  // availableprofiledata =val;
  console.log(profiledata.user_state_name +"user_state_name");
}

const handleuser_area = (val) => { 
  console.log(val +" val");
  setprofiledata({
      ... profiledata, 
      user_area:val,      
  });
  // availableprofiledata =val;
  console.log(profiledata.user_area +"user_area");
}


const handleuser_city = (val) => { 
  console.log(val +" val");
  setprofiledata({
      ... profiledata, 
      user_city:val,      
  });
  // availableprofiledata =val;
  console.log(profiledata.user_city +"user_city");
}


const handleuser_address_line1 = (val) => { 
  console.log(val +" val");
  setprofiledata({
      ... profiledata, 
      user_address_line1:val,      
  });
  // availableprofiledata =val;
  console.log(profiledata.user_address_line1 +"user_address_line1");
}


	
const handleuser_Confermation = () => { 
  if(profiledata.user_Confermation){
    setprofiledata({
        ... profiledata,       
        user_Confermation:false,
    }); 
  }
  else{
    setprofiledata({
        ... profiledata,       
        user_Confermation:true,    
    });
  }
  // availableprofiledata =val;
  console.log(profiledata.user_Confermation +" edit user_Confermation");
}
  
const handleuserfirstname = (val) => { 
  if(val.length === 0) {
      console.log(val +" val");
      setprofiledata({
          ... profiledata,
          user_first_name:val.replace(/\s/g, ''), 
          check_textInput_user_first_name:false,        
      });
  }
  else {
    setprofiledata({
      ... profiledata,
      user_first_name:val.replace(/\s/g, ''), 
      check_textInput_user_first_name:true,        
  });
}
  // availableprofiledata =val;
  console.log(profiledata.user_first_name +" handle user_first_name");
}

// const handleuseremail = (val) => { 
//   console.log(val +" handleuseremail val");
//   setprofiledata({
//       ... profiledata,
//       user_email:val.replace(/\s/g, ''),      
//   });
//   // availableprofiledata =val;
//   console.log(profiledata.user_email +" handleuseremail");
// }

const handleuserlastname = (val) => { 
  if(val.length === 0) {
  console.log(val +" val");
  setprofiledata({
      ... profiledata,
      user_last_name:val.replace(/\s/g, '') ,
      check_textInput_user_last_name:false, 
  });
}
else {
  setprofiledata({
    ... profiledata,
    user_last_name:val.replace(/\s/g, '') ,
    check_textInput_user_last_name:true, 
});
}
  // availableprofiledata =val;
  console.log(profiledata.user_last_name +" handleuserlastname");
}

const handleuser_BloodGroup = (val) => { 
  console.log(val +" val");
  setprofiledata({
      ... profiledata,
      user_BloodGroup:val,      
  });
  // availableprofiledata =val;
  console.log(profiledata.user_BloodGroup +" user_BloodGroup");
}

const handleuser_Gender = (val) => { 
  console.log(val +" val");
  setprofiledata({
      ... profiledata,
      user_Gender:val,      
  });
  // availableprofiledata =val;
  console.log(profiledata.user_Gender +" user_Gender");
}

const handleuser_DOB = (val) => { 
  console.log(val +" val");
  setprofiledata({
      ... profiledata,
      user_DOB:val,      
  });
  // availableprofiledata =val;
  console.log(profiledata.user_DOB +" user_DOB");
}


const textInputEmailChange=(val) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/.test(val)) {
    setprofiledata({
      ...profiledata, user_email:val,check_textInputEmailChange:true
    });
  }
  else{
    setprofiledata({
          ...profiledata, user_email:val,check_textInputEmailChange:false
      });
  }
}

const EditProofHandler =async()=>{
  setprofiledata({
    ...profiledata,user_Proof_Select_edit:false,
  })
}

const SubmitUploadHandler =async()=>{
  console.log('Edit profile user_Proof_Select and user_Proof: '+profiledata.user_Proof_Select+profiledata.user_Proof);
  if(profiledata.user_Proof_Select!=='' && profiledata.user_Proof!==''){
    setprofiledata({
      ...profiledata,user_Proof_Select_edit:true,
    })
    ToastAndroid.show('Your Proof has been saved!',ToastAndroid.LONG);
  }
  else {
    setprofiledata({
      ...profiledata,user_Proof_Select_edit:false,
    })
    ToastAndroid.show('Incomplete',ToastAndroid.LONG);
  }

  
}


const [profiledata, setprofiledata] = React.useState({  
  check_textInputEmailChange:((user_data_user_email===null||user_data_user_email==='')?false :true) , 
  check_textInput_user_first_name:((user_data_user_first_name===null||user_data_user_first_name==='')?false :true),
  check_textInput_user_last_name:((user_data_user_last_name===null||user_data_user_last_name==='')?false :true),
  isUserImageAvailable:user_data_isUserImageAvailable,  
  otherBloodGroup:null,
  imageUrl:'', 
   
    address:'ggrgerg',
    city:"trergt city",
    area:' test area',
    statename:'test state ',
    latitude: 99.425998333,
    longitude:  -180.125100000, 
    user_country:'india',
    user_pincode:'1254623',
    user_name:user_data_user_name,
    user_number:user_data_user_number,
    user_first_name:user_data_user_first_name,
    user_last_name:user_data_user_last_name,
    user_email:user_data_user_email,
    user_Gender:user_data_user_Gender,
    user_BloodGroup:user_data_user_BloodGroup,
    user_DOB:user_data_user_DOB,
    user_Age:null,   
    user_Confermation:((user_data_user_Confermation ==='1')?true:false),
    user_Proof:user_data_user_Proof,
    user_Proof_Select:user_data_user_Proof_Select,
    user_Proof_Select_edit:((user_data_user_Proof_Select===null||user_data_user_Proof_Select==='')?false :true),
    user_logout:'1',
  });
  

const SubmitHandler =async() => {

  console.log(profiledata.isUserImageAvailable+" Edit profile screen submit isUserImageAvailable ");
  
  if(profiledata.check_textInputEmailChange &&
     profiledata.user_Proof_Select_edit &&
      profiledata.user_BloodGroup!== '' &&
      profiledata.user_Gender!=='' &&
      profiledata.check_textInput_user_first_name)
      {
        navigation.navigate('Explore');
        asyncStoragehandler();
        dipatchHandler();
        user_data_upload();
        ToastAndroid.show('Your details has been saved.',ToastAndroid.LONG);
      }
  else{
    Alert.alert("Invalid Data","Please complete the form", [
      {text: 'Okay'}
  ]);
  }
  


};

const dipatchHandler=async() =>{
  dispatch(toggleuserfirstname(profiledata.user_first_name));
 
  dispatch(toggleuserlastname(profiledata.user_last_name));
  dispatch(toggleuseremail(profiledata.user_email));    
  dispatch(toggleuserisUserImageAvailable(profiledata.isUserImageAvailable));
  dispatch(toggleuser_BloodGroup(profiledata.user_BloodGroup));
  dispatch(toggleuser_Gender(profiledata.user_Gender));
  dispatch(toggleuser_Confermation(((profiledata.user_Confermation)?'1':'0') )); 
  dispatch(toggleuser_DOB(profiledata.user_DOB));
  dispatch(toggleuser_Proof(profiledata.user_Proof));
  dispatch(toggleuser_Proof_Select(profiledata.user_Proof_Select));
  // if(profiledata.user_BloodGroup==='Other')
  // {
  //   dispatch(toggleuser_BloodGroup(profiledata.otherBloodGroup));
  // }
  // else
  // {
  //  
  // }

  
  // dispatch(toggleuser_latitude(profiledata.user_latitude));
  // dispatch(toggleuser_longitude(profiledata.user_longitude));
  // dispatch(toggleuser_pincode(profiledata.user_pincode));
  //dispatch(toggleuser_state_name(profiledata.user_state_name));
  //dispatch(toggleuser_area(profiledata.user_area));
  //dispatch(toggleuser_city(profiledata.user_city));
  //dispatch(toggleuser_address_line1(profiledata.user_address_line1));
  
 
  
  
 
}

const user_data_upload=async() =>{

  fetch('http://192.168.0.9/help_1/user_personal_details_upload.php',{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
        mobile:profiledata.user_number,
        userfirst:profiledata.user_first_name,
        userlast:profiledata.user_last_name,
        UserImage:profiledata.isUserImageAvailable,	

        address:profiledata.address,
        city:profiledata.city,
        area:profiledata.area,
        statename:profiledata.statename,
        latitude:profiledata.latitude,
        usercountry:profiledata.user_country,
        userpincode:profiledata.user_pincode,
        longitude:profiledata.longitude,   


        useremail:profiledata.user_email,
        userGender:profiledata.user_Gender,
        userBloodGroup:profiledata.user_BloodGroup,
        userDOB:profiledata.user_DOB,    
        userConfermation:profiledata.user_Confermation,
        userProof:profiledata.user_Proof	
			})
			
		})
		.then((response) => response.json())
		 .then((responseJson) => {
      console.log(responseJson+ " responseJson");
      //ToastAndroid.show(responseJson,ToastAndroid.LONG);
      
      if(responseJson === "Updated")
          {
             console.log("Updated");        
          //navigation.goBack();
          }
        else if(responseJson==="Recorded")
        {            
            console.log("Recorded");
        
        //navigation.goBack();
        }  
        else if(responseJson ==="check")
        {
            Alert.alert("Connection Lost", 'check internet connection!', [
                {text: 'Okay'}
            ]);
            console.log("fail");
        //alert(responseJson);
        //navigation.goBack();
        }
        else if(responseJson =="user")
        {
            console.log("Invalid user");
            Alert.alert("Invalid user", 'Invalid user!', [
              {text: 'Okay'}
          ]);
        //alert(responseJson);
        //navigation.goBack();
        }
      else{
        console.log("else else");
      };
        })
		 .catch((error)=>{
		 console.error(error);
		 });

}

const asyncStoragehandler =async()=>{
  console.log(" aynsc storgae in edit screen ");
  try {
    await AsyncStorage.setItem('user_logout', profiledata.user_logout);
    await AsyncStorage.setItem('userfirstname', profiledata.user_first_name);
    await AsyncStorage.setItem('user_last_name', profiledata.user_last_name);
    await AsyncStorage.setItem('user_email', profiledata.user_email);
    await AsyncStorage.setItem('isUserImageAvailable', profiledata.isUserImageAvailable);	
    await AsyncStorage.setItem('user_BloodGroup', profiledata.user_BloodGroup);	

    await AsyncStorage.setItem('user_Gender', profiledata.user_Gender);	
    await AsyncStorage.setItem('user_DOB', profiledata.user_DOB);
    
    await AsyncStorage.setItem('user_Confermation', ((profiledata.user_Confermation)?'1':'0') );	
    await AsyncStorage.setItem('user_Proof', profiledata.user_Proof);	
    await AsyncStorage.setItem('user_Proof_Select', profiledata.user_Proof_Select);	
    // await AsyncStorage.setItem('user_address_line1', profiledata.user_address_line1);	
    // await AsyncStorage.setItem('user_city', profiledata.user_city);	
    // await AsyncStorage.setItem('user_area', profiledata.user_area);	
    // await AsyncStorage.setItem('user_longitude', profiledata.user_longitude);	
    // await AsyncStorage.setItem('user_pincode', profiledata.user_pincode);	
    // await AsyncStorage.setItem('user_latitude', profiledata.user_latitude);
    // await AsyncStorage.setItem('user_state_name', profiledata.user_state_name);	
    // await AsyncStorage.setItem('userName', userName); 
    console.log("profiledata.user_BloodGroup  "+profiledata.user_BloodGroup);
  } catch(e) {
    console.log(e);
  }
}

// const otherBloodHandler =(val)=>
// {
//   console.log("val  "+val);
//   if(profiledata.user_BloodGroup ==="Other"){
//     setprofiledata({...profiledata,
//       otherBloodGroup:val,
//     })
//   }       
// }

const{width,height} = Dimensions.get('window');


  // useEffect(()=>{
  //   if(profiledata.user_email!=''||profiledata.user_email!==null)
  //   {
  //     console.log("user email"+profiledata.user_email);

  //   }

  // })

  const {colors} = useTheme();
 const bs = React.createRef();
 const proofbs =React.createRef();
  const fall = new Animated.Value(1);
  const proof_fall = new Animated.Value(1);

  const proofFromCamera =()=>{
    console.log("proofFromCamera");
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      setprofiledata({
        ...profiledata,user_Proof:image.path,
        
      })
      ToastAndroid.show('Please click the save button to save the proof',ToastAndroid.LONG);
    }).catch((error)=>{
      console.log("openCamera catch" + error.toString()) 
      ToastAndroid.show('You have canceled the request ',ToastAndroid.LONG);
      })
      proofbs.current.snapTo(1);
    }
    
    const proofFromLibrary =()=>{
        console.log("proofFromLibrary");
        ImagePicker.openPicker({
          width: 500,
          height: 500,
          cropping: true
        }).then(image => {
          console.log(image);
          setprofiledata({
            ...profiledata,user_Proof:image.path,            
          })
          ToastAndroid.show('Please click the save button to save the proof',ToastAndroid.LONG);
        }).catch((error)=>{
          console.log("openCamera catch" + error.toString()) 
          ToastAndroid.show('You have canceled the request ',ToastAndroid.LONG);
          })
          proofbs.current.snapTo(1);
    }

    const removeproof=() =>{
      setprofiledata({
        ...profiledata,user_Proof:'',
            
      })
      ToastAndroid.show('You proof has been removed',ToastAndroid.LONG);
      proofbs.current.snapTo(1);
    }
    
  const  renderInnerProof = () => (    
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload proof</Text>
        <Text style={styles.panelSubtitle}>Choose You Proof</Text>
      </View>
      <TouchableOpacity style={styles.submit}  onPress={() => proofFromCamera()}>
        <Text style={styles.panelButtonTitle}>Take proof</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submit} onPress={() => proofFromLibrary()}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={[styles.submit,{backgroundColor: '#AD4336'}]}
        onPress={() => removeproof()}>
        <Text style={styles.panelButtonTitle}>Remove proof</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.submit,{backgroundColor: '#009387'}]}
        onPress={() => proofbs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeaderProof = () => (
    <View style={[styles.header]}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );





  const photoFromCamera =()=>{
    console.log("photoFromCamera");
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      setprofiledata({
        ...profiledata,isUserImageAvailable:image.path,
      })
      ToastAndroid.show('Photo has uploaded',ToastAndroid.LONG);
    }).catch((error)=>{
      console.log("openCamera catch" + error.toString()) 
      ToastAndroid.show('You have canceled the request ',ToastAndroid.LONG);
      })
      bs.current.snapTo(1);
    }
    
    const photoFromLibrary =()=>{
        console.log("photoFromLibrary");
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true
        }).then(image => {
          console.log(image);
          setprofiledata({
            ...profiledata,isUserImageAvailable:image.path,
          })
          ToastAndroid.show('Photo has uploded',ToastAndroid.LONG);
        }).catch((error)=>{
          console.log("openCamera catch" + error.toString()) 
          ToastAndroid.show('You have canceled the request ',ToastAndroid.LONG);
          })
          bs.current.snapTo(1);
    }

    const removephoto=() =>{
      setprofiledata({
        ...profiledata,isUserImageAvailable:'',     
      })
      ToastAndroid.show('You Photo has been removed',ToastAndroid.LONG);
      bs.current.snapTo(1);
    }
    
  const  renderInner = () => (
      // console.log("width "+width+" height "+height),
      // console.log("user_data_isUserImageAvailable"+user_data_isUserImageAvailable),
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.submit}  onPress={() => photoFromCamera()}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submit} onPress={() => photoFromLibrary()}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.submit,{backgroundColor: '#AD4336'}]}
        onPress={() => removephoto()}>
        <Text style={styles.panelButtonTitle}>Remove Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.submit,{backgroundColor: '#009387'}]}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={[styles.header]}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
//  useEffect(() => {
//   // console.log('user_data_user_name sdf'+user_data_user_name);
//   // console.log('todo '+todo);
//   navigation.setParams({back_user_first_name: toggleuserfname});
//  },[toggleuserfname]);

    return(
        <ScrollView>
         <SafeAreaView style={[styles.container,styles.cardview]}>
         
          <BottomSheet
              ref={bs}
              snapPoints={[height, height-height-1000]}
              renderContent={renderInner}
              renderHeader={renderHeader}
              initialSnap={1}
              callbackNode={fall}
              enabledGestureInteraction={true}
            />
            <BottomSheet
              ref={proofbs}
              snapPoints={[height/2, height-height-1000]}
              renderContent={renderInnerProof}
              renderHeader={renderHeaderProof}
              initialSnap={1}
              callbackNode={proof_fall}
              enabledGestureInteraction={true}
              />
            <TouchableWithoutFeedback 
              onPress={ ()=> {bs.current.snapTo(1);
                proofbs.current.snapTo(1);
              } }              
            >
            <Animated.View style={{
            opacity: Animated.add(0.08, Animated.multiply(proof_fall, 1.0)),
              }}>
          
          <Animated.View style={{margin:'4%',
            opacity: Animated.add(0.08, Animated.multiply(fall, 1.0)),
              }}>
          
              <View style={{alignItems: 'center'}}>
                <Text style={[ProfileStyles.DOBstyle,{marginTop:'3%'}]}>  Upload your photo </Text>
                  <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                      <View style={[styles.imagestye]}>
                      { (profiledata.isUserImageAvailable ===''|| profiledata.isUserImageAvailable ===null)?
                        <FontAwesome  name="user-plus" color={colors.text} size={80} />                                    
                      :
                      <ImageBackground
                          source={{uri:profiledata.isUserImageAvailable}}
                          style={{height: 140, width: 140}}
                          imageStyle={{borderRadius: 70,}}>
                              <View
                              style={styles.imageeditstyle}>

                              <MaterialIcons name="add-a-photo"  size={30}
                                  color="grey"
                                  style={styles.imageplusicon}/>
                              </View>                          
                          </ImageBackground> 
                      
                                                        
                      }
                      </View>
                  </TouchableOpacity>
                  <View style={[styles.cardview_no_shadow,]}> 
                      <Text style={{padding: '1%', fontSize: 18, fontWeight: 'bold'}}>
                      {profiledata.user_name}
                      </Text>
                  </View>
              </View>
              
              <View style={[styles.cardview,{marginRight:0, 
                 marginLeft:0,paddingLeft:'7%',padding:'7%'}]}> 
                <View style={[signupstyles.action,]}>
                  <FontAwesome name="user-o" color={colors.text} size={20} />                     
                    <TextInput placeholder="First Name"
                        style={[signupstyles.textInput,{color:colors.text}]} autoCapitalize="none"
                        onChangeText={(val)=>handleuserfirstname(val)}
                        >{profiledata.user_first_name}
                        </TextInput>                      
                    {profiledata.check_textInput_user_first_name ?
                    <Animatable.View
                        animation="bounceIn">
                    <Feather 
                        name= "check-circle" 
                        color="green"
                        size={20}
                          />
                    </Animatable.View>
                          : null}
                    <Feather style={styles.editicon} name="edit-2" color={colors.text} size={20} />
                </View>                        
                <View style={[signupstyles.action,]}>
                <FontAwesome name="user-o" color={colors.text} size={20} />                     
                  <TextInput placeholder="Last Name"
                      style={[signupstyles.textInput,{color:colors.text}]} autoCapitalize="none"
                      onChangeText={(val)=>handleuserlastname(val)}
                      >{profiledata.user_last_name}
                      </TextInput>                      
                  {profiledata.check_textInput_user_last_name ?
                  <Animatable.View
                      animation="bounceIn">
                  <Feather 
                      name= "check-circle" 
                      color="green"
                        size={20}
                        />
                  </Animatable.View>
                        : null}
                    <Feather style={styles.editicon} name="edit-2" color={colors.text} size={20} />
              </View>


                <View style={[signupstyles.action,{ borderBottomWidth: 0,marginBottom:0},]}>
                    <Icon name="phone" color={colors.text} size={20} />
                    
                    <TextInput                        
                        placeholderTextColor="#666666"  
                        editable={false}          
                        style={[signupstyles.textInput,
                        {
                            color: colors.text,
                        },
                        ]}> {profiledata.user_number}
                        </TextInput>
                </View>
                
                <View style={[signupstyles.action]}>
                  <Icon name="email" color={colors.text} size={20} />
                    <TextInput placeholder="Your Email"
                        style={[signupstyles.textInput,{color:colors.text}]} autoCapitalize="none"
                        onChangeText={(val)=>textInputEmailChange(val)}
                        >{profiledata.user_email}

                        </TextInput>
                    {profiledata.check_textInputEmailChange ?
                    <Animatable.View
                        animation="bounceIn"
                    >
                    <Feather 
                        name= "check-circle" 
                        color="green"
                        size={20}
                          />
                    </Animatable.View>
                          : null}
                    <Feather style={styles.editicon} name="edit-2" color={colors.text} size={20} />      
                </View>
                
              </View>
              
                <View style={[styles.cardview,{marginRight:0, 
                  marginLeft:0,paddingLeft:'6%'}]}> 
                            
                <View style={[styles.rowview]} >
                  
                    <Text style={[BloodRequestStyle.title],{paddingTop:'2%',fontWeight:'bold'}}>Blood Group:</Text>
                    <View style={{paddingTop:'2%'}}> 
                    <Picker 
                      selectedValue={profiledata.user_BloodGroup}
                      style={{ height: 25, width: 120,color:colors.text,}}
                      onValueChange={(itemValue, itemIndex) => setprofiledata({...profiledata,user_BloodGroup:itemValue})
                      }>
                        <Picker.Item label="A+" value="A+" />
                        <Picker.Item label="A-" value="A-" />
                        <Picker.Item label="B+" value="B+" />
                        <Picker.Item label="B-" value="B-" />
                        <Picker.Item label="A1+" value="A1+" />
                        <Picker.Item label="A1-" value="A1-" />
                        <Picker.Item label="A2-" value="A2-" />
                        <Picker.Item label="A2+" value="A2+" />
                        <Picker.Item label="AB+" value="AB+" />
                        <Picker.Item label="AB-" value="AB-" />  
                        <Picker.Item label="A1B+" value="A1B+" /> 
                        <Picker.Item label="A1B-" value="A1B-" />
                        <Picker.Item label="A2B+" value="A2B+" /> 
                        <Picker.Item label="A2B-" value="A2B-" />             
                        <Picker.Item label="O+" value="O+" />
                        <Picker.Item label="O-" value="O-" />
                        <Picker.Item label="INRA" value="INRA" />
                        {/* <Picker.Item label="Other" value="Other" /> */}
                    
                    </Picker>
                  
                  </View>               
                </View>
                
                  {/* {profiledata.user_BloodGroup ==="Other" ?
                  <TextInput
                  style={[BloodRequestStyle.textInput,
                    {color:colors.text}
                  ]}
                  onChangeText={(val)=>otherBloodHandler(val)}
                  placeholder="Enter Blood Group"></TextInput>
                  :null} */}

                <View style={{paddingTop:'2%',}} >
                  <RadioButton.Group  key="Gender" onValueChange={handleuser_Gender} value={profiledata.user_Gender}  >
                                        
                    <View style={[styles.rowview,]}>
                        <Text style={BloodRequestStyle.title}>Gender: </Text>
                      {/* <Text style={styles.content}>Yes</Text> */}
                      <Fontisto style={{marginLeft:'4%'}} name="male" color={colors.text} size={25} />
                      <RadioButton 
                        value="Male"
                        // status={ isReplacementAvailables === 'Yes' ? 'checked' : 'unchecked' }
                        // onPress={() => setisReplacementAvailables({isReplacementAvailables:'Yes'})}              
                      />

                      <Fontisto style={{marginLeft:'4%'}} name="female" color={colors.text} size={25} />
                      {/* <Text style={styles.content}>No</Text> */}
                      <RadioButton 
                        value="Female"
                        // status={ isReplacementAvailables === 'No' ? 'checked' : 'unchecked' }
                        // onPress={() => setisReplacementAvailables({isReplacementAvailables:'No'})}
                      />
                    </View>
                
                  </RadioButton.Group> 
                
                </View>
                
                <View style={styles.rowview}>
                  <Text style={BloodRequestStyle.title,{paddingTop:'3%',fontWeight:'bold'}}>DOB: </Text>
                   
                    <DatePicker
                    style={{width: 150,}}
                    date={profiledata.user_DOB} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate="01-01-1888"
                    maxDate="01-01-2200"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel" 
                                       
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                        
                      },
                      dateInput: {
                        marginLeft: 36,            
                        backgroundColor:'white' ,     
                         
                      }
                    }}
                    onDateChange={(date) => handleuser_DOB(date)}
                    />                 
                </View>
                
                <View style={styles.rowview}>
                  <Text style={BloodRequestStyle.title,{paddingTop:'2%',fontWeight:'bold'}}>User Available: </Text>
                    <View style={{paddingBottom:'2%',paddingLeft:'2%'}}>
                      <Checkbox
                       status={profiledata.user_Confermation ? 'checked' : 'unchecked'}
                       onPress={()=>handleuser_Confermation()}
                      />
                    </View>
                    
                </View>

                
              </View>   
              
              

              <View > 
                  <View style={styles.cardview_no_shadow}>
                  <Text style={[BloodRequestStyle.title],{paddingTop:'7%',fontWeight:'bold'}}>User Proof:</Text>
                  {!profiledata.user_Proof_Select_edit ?
                    <View >
                      <View style={[styles.rowview,{marginTop:0,paddingRight:'5%',alignSelf:'center'}]}>
                      <Picker 
                        selectedValue={profiledata.user_Proof_Select}
                        style={{ height: 30, width:screen_width-110,color:colors.text,}}
                        onValueChange={(itemValue, itemIndex) => setprofiledata({...profiledata,user_Proof_Select:itemValue})
                        }>
                           <Picker.Item label="Select your Proof" value="" />
                          <Picker.Item label="Aadhar card" value="Aadhar" />
                          <Picker.Item label="Diving Licence" value="Diving Licence" />
                          <Picker.Item label="Voter Id" value="Voter  Id" />
                          <Picker.Item label="Other Id" value="Other" />                   
                      </Picker>
                      <TouchableOpacity onPress={() => proofbs.current.snapTo(0)}>                          
                          <Icon name="image-plus" color={colors.text} size={30} />                    
                      </TouchableOpacity> 
                      </View>                      
                    <TouchableOpacity style={[{paddingBottom:'3%',alignItems:'center'}]} onPress={() => SubmitUploadHandler()}>  
                       <Icon name="content-save-move"
                        color="#089597" 
                        style={{borderColor:colors.text,borderWidth:2,borderRadius:40}}
                         size={40} /> 
                    </TouchableOpacity>
                    </View>                    
                    :      

                          
                    <Animatable.View style={[styles.rowview,{paddingBottom:'5%'}]}
                          animation="bounceIn">
                        <TouchableOpacity onPress={() => EditProofHandler()}>
                            <Icon style={[styles.editicon,]} name="content-save-edit-outline" color='red' size={25} />
                         </TouchableOpacity>
                        <Text style={{paddingRight:'5%',paddingLeft:'5%'}}>Your {profiledata.user_Proof_Select}</Text>
                        <Feather 
                            name= "check-circle" 
                            color="green"
                            size={20}
                              />
                     
                    </Animatable.View>
                    
                    }
                  </View>             
              </View>      
             
              </Animated.View>
            </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableOpacity style={styles.submit}   onPress={() => SubmitHandler()}>
                  <Text style={styles.panelButtonTitle}>Submit</Text>
              </TouchableOpacity>
          
        </SafeAreaView>     
        
        </ScrollView>    
    )
};
// let ctr='';

// const mapStateToProps= state =>{
//   console.log("get");
//   // setprofiledata({
//   //   ...profiledata,user_name:state.user_firstname        
//   // })
//   console.log(state.user_firstname);
//   return {
//      ctr:state.user_firstname,
     
//   };
   
// }
// const mapDispatchToProps = dispatch => {
//   return {
//       onIncrementCounter: () => dispatch({type: 'Toggle_user_name'})
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);

export default EditProfileScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editicon:{
    marginRight:'1%',
    marginLeft:'1%',
  },
  uploadborder:{
    padding: '1%',  
  borderRadius: 20,
  borderWidth: 2,
  alignItems: 'center', 
  fontSize: 9,
  fontWeight: '100'
 },
  cardview:{
    shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 1,
      shadowOpacity: 0.25,
      elevation:5,
      // backgroundColor: 'white',
      // padding: '2%',
      borderRadius:20,      
      margin:'3%'     
  },
  cardview_no_shadow:{
    // shadowColor: 'black',
    //   shadowOffset: { width: 0, height: 1 },
    //   shadowRadius: 1,
      shadowOpacity: 0.25,
      elevation: 5,
      // backgroundColor: 'white',
      // padding: '2%',
      borderRadius:20,   
      paddingRight:'7%',
      paddingLeft:'7%',      
      marginTop:'3%',
  },
  imagestye:{
    marginTop:'2%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageeditstyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageplusicon:{
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
  },
  submit: {
    padding: '2.5%',
    borderRadius: 20,
    backgroundColor: '#1988AC',
    alignItems: 'center',
    margin: '3%',
  },
  panel: {
    padding: '5%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: '20%',
    height: 8,
    borderRadius: 40,
    backgroundColor: '#00000040',
   marginBottom: "2%",
  },
  panelTitle: {
    fontSize: 27,
    height: 5,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: "2%",
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  rowview: {
    flexDirection: 'row',
    marginTop: '3%',
    // marginLeft:'3%',      
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
