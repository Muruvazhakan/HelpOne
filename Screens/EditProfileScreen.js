import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,useTheme,
  } from 'react-native-paper';

  import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

import ImagePicker from 'react-native-image-crop-picker';

const EditProfileScreen = () => {
    
  // const [image,setimage]=useState(require('../assets/user-icon.png'));


    const{width,height} = Dimensions.get('window');
    const [profiledata, setprofiledata] = React.useState({   
      isUserImageAvailable:false,
      imageUrl:'', 
        loactionAddress:{
        address:12,
        city:"test city",
        area:' test area',
        statename:'test state ',
        latitude: 37.425998333,
        longitude:  -110.125100000,
        },
        mail_id:'abc@gmail.com',
        user_name:'asd',
        user_number:'9898',
        user_firstname:'asda',
        user_Lastname:null,
        user_email:null,
        user_Gender:'',
        user_BloodGroup:'',
        user_DOB:null,
        user_Age:null,
        user_Confermation:false,
        user_Proof:null,
      });
  const {colors} = useTheme();
 const bs = React.createRef();
  const fall = new Animated.Value(1);

  const photoFromCamera =()=>{
    console.log("cam");
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      setprofiledata({
        ...profiledata,imageUrl:image.path,isUserImageAvailable:true
      })
      ToastAndroid.show('Photo has uploaded',ToastAndroid.LONG);
    }).catch((error)=>{
      console.log("openCamera catch" + error.toString()) 
      ToastAndroid.show('You have canceled the request ',ToastAndroid.LONG);
      })
    }
    
    const photoFromLibrary =()=>{
        console.log("lib");
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true
        }).then(image => {
          console.log(image);
          setprofiledata({
            ...profiledata,imageUrl:image.path,isUserImageAvailable:true
          })
          ToastAndroid.show('Photo has uploded',ToastAndroid.LONG);
        }).catch((error)=>{
          console.log("openCamera catch" + error.toString()) 
          ToastAndroid.show('You have canceled the request ',ToastAndroid.LONG);
          })
    }
    const removephoto=() =>{
      setprofiledata({
        ...profiledata,imageUrl:'',isUserImageAvailable:false,        
      })
      ToastAndroid.show('You Photo has been removed',ToastAndroid.LONG);
      bs.current.snapTo(1)
    }
    
  const  renderInner = () => (
      console.log("width"+width+"height"+height),
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


    return(
        <ScrollView>
        <SafeAreaView style={[styles.container,styles.cardview]}>
            <View style={styles.container }>
                <BottomSheet
                    ref={bs}
                    snapPoints={[height/2, height-height-1000]}
                    renderContent={renderInner}
                    renderHeader={renderHeader}
                    initialSnap={1}
                    callbackNode={fall}
                    enabledGestureInteraction={true}
                 />
                  <Animated.View style={{margin: 20,
                    opacity: Animated.add(0.08, Animated.multiply(fall, 1.0)),
                     }}>
                        <View style={{alignItems: 'center'}}>
                          <Text style={[styles.uploadborder,{borderColor: colors.text}]}>  Upload you photo </Text>
                            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                                <View style={styles.imagestye}>
                                  { profiledata.isUserImageAvailable?
                                    <ImageBackground
                                    source={{uri:profiledata.imageUrl}}
                                    style={{height: 100, width: 100,}}
                                    imageStyle={{borderRadius: 15}}>
                                        <View
                                        style={styles.imageeditstyle}>

                                        <MaterialIcons name="add-a-photo"  size={30}
                                            color="grey"
                                            style={styles.imageplusicon}/>
                                        </View>                          
                                    </ImageBackground> 
                                :
                               
                                <FontAwesome  name="user-plus" color={colors.text} size={80} />
                                                                  
                                }
                                </View>
                            </TouchableOpacity>
                            <Text style={{marginTop: '1%', fontSize: 18, fontWeight: 'bold'}}>
                            {profiledata.user_name}
                            </Text>
                        </View>

                        <View style={styles.rowview}>
                            <FontAwesome name="user-o" color={colors.text} size={20} />
                            {profiledata.person_user===null?
                            <TextInput
                                placeholder="First Name"
                                placeholderTextColor="#666666"            
                                style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                                ]}> 
                                </TextInput>: 
                                <TextInput
                                placeholder="First Name"
                                placeholderTextColor="#666666"            
                                style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                                ]}> {profiledata.user_firstname}
                                </TextInput>
                                }       
                                <Feather style={styles.editicon} name="edit-2" color={colors.text} size={20} />   
                        </View>

                        <View style={styles.rowview}>
                            <FontAwesome name="user-o" color={colors.text} size={20} />
                            {profiledata.user_Lastname===null?
                            <TextInput
                                placeholder="Last Name"
                                placeholderTextColor="#666666"            
                                style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                                ]}> 
                                </TextInput>: 
                                <TextInput                        
                                placeholderTextColor="#666666"            
                                style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                                ]}> {profiledata.user_Lastname}
                                </TextInput>
                                }   
                                <Feather style={styles.editicon} name="edit-2" color={colors.text} size={20} />       
                        </View>
                        
                        <View style={styles.rowview}>
                            <Icon name="phone" color={colors.text} size={20} />
                            
                            <TextInput                        
                                placeholderTextColor="#666666"  
                                editable={false}          
                                style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                                ]}> {profiledata.user_number}
                                </TextInput>
                        </View>
                        
                        <View style={styles.rowview}>
                            <Icon name="email" color={colors.text} size={20} />
                            {profiledata.user_email===null?
                            <TextInput
                                placeholder="Email id"
                                placeholderTextColor="#666666"            
                                style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                                ]}> 
                                </TextInput>: 
                                <TextInput                        
                                placeholderTextColor="#666666"            
                                style={[
                                styles.textInput,
                                {
                                    color: colors.text,
                                },
                                ]}> {profiledata.user_email}
                                </TextInput>
                                }    
                                <Feather style={styles.editicon} name="edit-2" color={colors.text} size={20} />   
                        </View>
                        
                        <TouchableOpacity style={styles.submit}   onPress={() => {}}>
                            <Text style={styles.panelButtonTitle}>Submit</Text>
                        </TouchableOpacity>
                    </Animated.View>
            </View>
            
        </SafeAreaView>     
        
        </ScrollView>    
    )
};

export default EditProfileScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editicon:{
    marginRight:'5%',
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
      shadowRadius: 7,
      shadowOpacity: 0.25,
      elevation: 5,
      // backgroundColor: 'white',
      padding: '2%',
      borderRadius:20,
      margin:'2%',         
  },
  imagestye:{
    marginTop:'2%',
    borderRadius: 15,
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
    marginLeft:'3%',      
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
