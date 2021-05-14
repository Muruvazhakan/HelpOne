import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { FCM_Handle_message } from '../../FirebaseCloud/FCM_Screen';
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
  ActivityIndicator,
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
import { styles as signupstyles } from '../SignIn/SignUpScreen';
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
import { connect, useSelector, useDispatch, useCallback } from 'react-redux';
//import ImagePicker from 'react-native-image-crop-picker';
import { Picker } from '@react-native-community/picker';
import ImagePicker from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import * as toggledata from '../../Store/actions/HelpOne';
import { styles as BloodRequestStyle } from '../Blood_Request/Blood_Request_Screen';
import { styles as ProfileStyles } from './ProfileScreen';
import { screen_width } from '../../components/Parameter';
import RNFetchBlob from 'rn-fetch-blob';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NetInfo from "@react-native-community/netinfo";
import * as Aws from '../../components/Parameter';
import { RNS3 } from 'react-native-aws3';
// import {profiledata as profile_data} from './ProfileScreen';
const EditProfileScreen = ({ navigation }) => {

  // const [image,setimage]=useState(require('../assets/user-icon.png'));
  const dispatch = useDispatch();

  // const toggleuserfname =useCallback(()=>{
  //   dispatch(toggleuserfirstname(profiledata.user_first_name));
  // },[dispatch,profiledata.user_first_name]);
  const bucketName = 'staging.helpone-9bf33.appspot.com';  
  const user_data_ip_address = useSelector(state =>
    state.helpone.ip_address,
  );
  const user_data_user_name = useSelector(state =>
    state.helpone.user_name
  );

  const user_data_user_number = useSelector(state =>
    state.helpone.user_number,
  );
  const user_data_user_first_name = useSelector(state =>
    state.helpone.user_first_name
  );

  const user_data_user_email = useSelector(state =>
    state.helpone.user_email
  );

  const user_data_user_last_name = useSelector(state =>
    state.helpone.user_last_name
  );

  const user_data_user_Confermation = useSelector(state =>
    state.helpone.user_Confermation
  );

  const user_data_user_Gender = useSelector(state =>
    state.helpone.user_Gender
  );

  const user_data_isUserImageAvailable = useSelector(state =>
    state.helpone.isUserImageAvailable
  );

  const user_data_user_BloodGroup = useSelector(state =>
    state.helpone.user_BloodGroup
  );

  const user_data_user_DOB = useSelector(state =>
    state.helpone.user_DOB
  );

  const user_data_user_Proof = useSelector(state =>
    state.helpone.user_Proof
  );

  const user_data_user_address_line1 = useSelector(state =>
    state.helpone.user_address_line1
  );

  const user_data_user_city = useSelector(state =>
    state.helpone.user_city
  );

  const user_data_user_country = useSelector(state =>
    state.helpone.user_country
  );

  const user_data_user_state_name = useSelector(state =>
    state.helpone.user_state_name
  );
  const user_data_user_district = useSelector(state =>
    state.helpone.user_district
  );

  const user_data_user_latitude = useSelector(state =>
    state.helpone.user_latitude
  );

  const user_data_user_longitude = useSelector(state =>
    state.helpone.user_longitude
  );

  //  const user_data_user_pincode = useSelector(state =>
  //   state.helpone.user_cou
  // );
  const user_data_user_pincode = useSelector(state =>
    state.helpone.user_pincode
  );

  const user_data_user_Proof_Select = useSelector(state =>
    state.helpone.user_Proof_Select
  );

  const handleuser_pincode = (val) => {
    console.log(val + " handleuser_pincode val");
    setprofiledata({
      ...profiledata,
      user_pincode: val,
    });
    // availableprofiledata =val;
    console.log(profiledata.user_pincode + "user_pincode");
  }

  var offline = 0;
  let connectstate = "";
  const [error, setError] = useState();
  const [offlinemsgflag, setOfflinemsgflag] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const offlinemsgflagref = useRef();

  const loadProducts = () => {
    // console.log("loadProduct");
    setError(null);

    try {
      checkConnectivity();
      // manageretrive();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  const checkConnectivity = () => {
    setOfflinemsgflag(false);
    console.log("offlinemsgflagref", offlinemsgflagref);
    
    NetInfo.fetch().then(state => {
      console.log("Is connected?111", state.isConnected);
      //  setIsStarted({setState:false});
      if (state.isConnected.toString() === "false") {
        // Alert.alert("You are offline!");
        if (!offlinemsgflagref.current) {
          console.log("Is connected?", state.isConnected);

          console.log("Is NetInfoStateType?", state.NetInfoStateType);
          connectstate = state.isConnected.toString();
          console.log("connectstate", connectstate);
          Alert.alert("Opps!", 'No Internet Please check your connection', [
            {
              text: 'Try Again',
              onPress: () => errorAlerthandler()
            }

          ]);

          setOfflinemsgflag(true);
          //   setState({
          //     ...state,
          //     asyncstorage: false,
          // });
          offline = 1;
          return;
        }
      } else {
        //Alert.alert("You are online!");
        console.log("You are online!", state.isConnected);
        // onRetrivemydonordata();
        if (offline === 1) {
          ToastAndroid.show("Back to online!", ToastAndroid.SHORT);
        }

      }

    });
  }
  const errorAlerthandler = () => {
    console.log("errorAlerthandler");
    setOfflinemsgflag(false);
    checkConnectivity();
  }

  const handleuser_longitude = (val) => {
    console.log(val + " handleuser_longitude val");
    setprofiledata({
      ...profiledata,
      user_longitude: val,
    });
    // availableprofiledata =val;
    console.log(profiledata.user_longitude + "user_longitude");
  }

  const handleuser_latitude = (val) => {
    console.log(val + " handleuser_latitude val");
    setprofiledata({
      ...profiledata,
      user_latitude: val,
    });
    // availableprofiledata =val;
    console.log(profiledata.user_latitude + "user_latitude");
  }


  const handleuser_state_name = (val) => {
    console.log(val + " val");
    setprofiledata({
      ...profiledata,
      user_state_name: val,
    });
    // availableprofiledata =val;
    console.log(profiledata.user_state_name + "user_state_name");
  }

  const handleuser_area = (val) => {
    console.log(val + " val");
    setprofiledata({
      ...profiledata,
      user_area: val,
    });
    // availableprofiledata =val;
    console.log(profiledata.user_area + "user_area");
  }


  const handleuser_city = (val) => {
    console.log(val + " val");
    setprofiledata({
      ...profiledata,
      user_city: val,
    });
    // availableprofiledata =val;
    console.log(profiledata.user_city + "user_city");
  }


  const handleuser_address_line1 = (val) => {
    console.log(val + " val");
    setprofiledata({
      ...profiledata,
      user_address_line1: val,
    });
    // availableprofiledata =val;
    console.log(profiledata.user_address_line1 + "user_address_line1");
  }
  const Full_date = new Date();
  const date="-"+Full_date.getDate()+"-"+Full_date.getMonth()+"-"+Full_date.getFullYear()
  +"-"+Full_date.getHours()+":"+Full_date.getMinutes()+":"+Full_date.getSeconds();
  useEffect(() => {
    
    console.log("*******user_data_ip_address", user_data_ip_address);
    console.log('user_data_user_name user_data_user_Gender ' + user_data_user_Gender + profiledata.user_Gender);
    setprofiledata({
      ...profiledata, isLoading: false,
    })
  }, []);


  const handleuser_Confermation = () => {
    if (profiledata.user_Confermation) {
      setprofiledata({
        ...profiledata,
        user_Confermation: false,
      });
    }
    else {
      setprofiledata({
        ...profiledata,
        user_Confermation: true,
      });
    }
    // availableprofiledata =val;
    console.log(profiledata.user_Confermation + " edit user_Confermation");
  }

  const handleuserfirstname = (val) => {
    if (val.length === 0) {
      console.log(val + " val");
      setprofiledata({
        ...profiledata,
        user_first_name: val.replace(/\s/g, ''),
        check_textInput_user_first_name: false,
      });
    }
    else {
      setprofiledata({
        ...profiledata,
        user_first_name: val.replace(/\s/g, ''),
        check_textInput_user_first_name: true,
      });
    }
    // availableprofiledata =val;
    console.log(profiledata.user_first_name + " handle user_first_name");
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
    if (val.length === 0) {
      console.log(val + " val");
      setprofiledata({
        ...profiledata,
        user_last_name: val.replace(/\s/g, ''),
        check_textInput_user_last_name: false,
      });
    }
    else {
      setprofiledata({
        ...profiledata,
        user_last_name: val.replace(/\s/g, ''),
        check_textInput_user_last_name: true,
      });
    }
    // availableprofiledata =val;
    console.log(profiledata.user_last_name + " handleuserlastname");
  }

  const handleuser_BloodGroup = (val) => {
    console.log(val + " val");
    setprofiledata({
      ...profiledata,
      user_BloodGroup: val,
    });
    // availableprofiledata =val;
    console.log(profiledata.user_BloodGroup + " user_BloodGroup");
  }

  const handleuser_Gender = (val) => {
    console.log(val + " val");
    setprofiledata({
      ...profiledata,
      user_Gender: val,
    });
    // availableprofiledata =val;
    console.log(profiledata.user_Gender + " user_Gender");
  }

  const handleuser_DOB = (val) => {
    console.log(val + " val");
    setprofiledata({
      ...profiledata,
      user_DOB: val,
    });
    // availableprofiledata =val;
    console.log(profiledata.user_DOB + " user_DOB");
  }


  const textInputEmailChange = (val) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/.test(val)) {
      setprofiledata({
        ...profiledata, user_email: val, check_textInputEmailChange: true
      });
    }
    else {
      setprofiledata({
        ...profiledata, user_email: val, check_textInputEmailChange: false
      });
    }
  }

  const EditProofHandler = async () => {
    setprofiledata({
      ...profiledata, user_Proof_Select_edit: false,
    })
  }

  const SubmitUploadHandler = async () => {
    console.log('Edit profile user_Proof_Select and user_Proof: ' + profiledata.user_Proof_Select + profiledata.user_Proof);
    if (profiledata.user_Proof_Select !== '' && profiledata.user_Proof !== '') {
      setprofiledata({
        ...profiledata, user_Proof_Select_edit: true,
      })
      ToastAndroid.show('Your Proof has been saved!', ToastAndroid.LONG);
    }
    else {
      setprofiledata({
        ...profiledata, user_Proof_Select_edit: false,
      })
      ToastAndroid.show('Incomplete', ToastAndroid.LONG);
    }


  }  

  const [profiledata, setprofiledata] = React.useState({
    isLoading: true,
    check_textInputEmailChange: ((user_data_user_email === null || user_data_user_email === '') ? false : true),
    check_textInput_user_first_name: ((user_data_user_first_name === null || user_data_user_first_name === '') ? false : true),
    check_textInput_user_last_name: ((user_data_user_last_name === null || user_data_user_last_name === '') ? false : true),
    isUserImageAvailable: user_data_isUserImageAvailable,
    otherBloodGroup: null,
    imageUrl: '',

    address: 'ggrgerg',
    city: "trergt city",
    area: ' test area',
    statename: 'test state ',
    latitude: 99.425998333,
    longitude: -180.125100000,
    user_country: 'india',
    user_pincode: '1254623',
    user_name: user_data_user_name,
    user_number: user_data_user_number,
    user_first_name: user_data_user_first_name,
    user_last_name: user_data_user_last_name,
    user_email: user_data_user_email,
    user_Gender: user_data_user_Gender,
    user_BloodGroup: user_data_user_BloodGroup,
    user_DOB: user_data_user_DOB,
    user_Age: null,
    user_Confermation: ((user_data_user_Confermation === '1') ? true : false),
    user_Proof: user_data_user_Proof,
    user_Proof_Select: user_data_user_Proof_Select,
    user_Proof_Select_edit: ((user_data_user_Proof_Select === null || user_data_user_Proof_Select === '') ? false : true),
    user_logout: '1',
    pic: '',
    Proof_data: '',
  });

 
  const SubmitHandler = async () => {

    console.log(profiledata.isUserImageAvailable + " Edit profile screen submit isUserImageAvailable ");

    if (profiledata.check_textInputEmailChange &&
      //  profiledata.user_Proof_Select_edit &&
      profiledata.user_BloodGroup !== '' &&
      profiledata.user_Gender !== '' &&
      profiledata.check_textInput_user_first_name) {
      //navigation.navigate('Explore');
      // loadProducts();
      // asyncStoragehandler();
      // dipatchHandler();
      // user_data_upload();
      //update_Aws_Proof_InServer();
      update_Aws_Photo_InServer();
      //  upusingapi();     
      //handleUploadPhoto();
      //uploadproof();
      if (user_data_isUserImageAvailable !== profiledata.isUserImageAvailable) {
        ToastAndroid.show('Photo is Uploaded', ToastAndroid.LONG);
        //uploadphoto();
       // upload_Aws_Photo();
      }
      if (user_data_user_Proof !== profiledata.user_Proof) {
        ToastAndroid.show('Proof is  Uploaded', ToastAndroid.LONG);
        //uploadproof();
        //upload_Aws_Proof();
      }
      ToastAndroid.show('Your details has been saved.', ToastAndroid.LONG);
    }
    else {
      Alert.alert("Invalid Data", "Please complete the form", [
        { text: 'Okay' }
      ]);
    }
  };

  const dipatchHandler = () => {
    dispatch(toggledata.toggleuserfirstname(profiledata.user_first_name));
    dispatch(toggledata.toggleuser_BloodGroup(profiledata.user_BloodGroup));
    dispatch(toggledata.toggleuser_Gender(profiledata.user_Gender));
    dispatch(toggledata.toggleuser_Confermation(((profiledata.user_Confermation) ? '1' : '0')));
    dispatch(toggledata.toggleuseremail(profiledata.user_email));
    if (profiledata.isUserImageAvailable !== null & profiledata.isUserImageAvailable !== '') {
      //console.log(profiledata.isUserImageAvailable + " Edit profile screen submit isUserImageAvailable ");
      //console.log(user_data_isUserImageAvailable + " Edit profile screen submit user_data_isUserImageAvailable ");
      dispatch(toggledata.toggleuserisUserImageAvailable(profiledata.isUserImageAvailable));
    }
    if (profiledata.user_Proof_Select !== null & profiledata.user_Proof_Select !== '') {
      dispatch(toggledata.toggleuser_Proof_Select(profiledata.user_Proof_Select));
      dispatch(toggledata.toggleuser_Proof(profiledata.user_Proof));
    }

    if (profiledata.user_DOB !== null & profiledata.user_DOB !== '') {
      dispatch(toggledata.toggleuser_DOB(profiledata.user_DOB));
    }
    if (profiledata.user_last_name !== null & profiledata.user_last_name !== '') {
      dispatch(toggledata.toggleuserlastname(profiledata.user_last_name));
    }
    console.log(" Dispatches in edit profile screen ");



    //ToastAndroid.show('Dispatches', ToastAndroid.LONG);
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

  const handleUpload = async () => {
    const formData = new FormData();
    //Add your input data

    formData.append('phone', profiledata.user_number);

    //Add your photo
    //this, retrive the file extension of your photo
    const uriPart = profiledata.isUserImageAvailable.split('.');
    const fileExtension = uriPart[uriPart.length - 1];

    formData.append('photo', {
      uri: profiledata.isUserImageAvailable,
      name: `photo.${fileExtension}`,
      type: `image/${fileExtension}`
    });
    console.log("upload formData", formData.photo);
	let API_URL = `${user_data_ip_address}/User_Photo_Component/user_image_upload.php`;
	//let API_URL = `${Aws.Server_URL}/User_Photo_Component/user_image_upload.php`;
    fetch(API_URL, {
      method: "POST",
      header: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload succes", response);
        alert("Upload success!");
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  const handleUploadPhoto = async () => {
	let API_URL = `${user_data_ip_address}`;
	//let API_URL = `${Aws.Server_URL}`;
    let res = await fetch(API_URL, {
      method: "POST",
      header: {
        'Accept': 'application/json',
        'Content-type': 'multipart/form-data'
      },
      body: createFormData(profiledata.user_Proof, { userId: profiledata.user_number })
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload succes", response);
        ToastAndroid.show('Upload success!', ToastAndroid.LONG);
        // alert("Upload success!");

      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };
  const options = {
    title: 'Choose the Picture',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
    width: 100,
    height: 100,
    cropping: true,
    storageOptions: {
      skipBackup: false,
      path: 'tmp_files',
      cameraRoll: true,
      width: 100,
      height: 100,
      cropping: true,
      privateDirectory: true
    },
  }

  const proofoptions = {
    title: 'Choose the Proof',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
  }

  const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("photo", {
      name: 'my_proof.jpg',
      type: photo.type,
      uri:
        Platform.OS === "android" ? profiledata.isUserImageAvailable : profiledata.isUserImageAvailable.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  const uploadFile = async () => {
    var filename = profiledata.isUserImageAvailable;
    //isUserImageAvailable
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
  }

  const upusingapi = () => {
    var dataString = profiledata.pic;
    let API_URL = 'https://storage.googleapis.com/upload/storage/v1/b/helpone-9bf33.appspot.com/o';

    fetch(API_URL, {
      method: 'POST',
      headers: {
        "Authorization": "Bearer GOOG1E3RC5255547OYUDUY422MTNVBC4EJ627DVMS3GOXBJKA65FQW6O3P3SA",
        "Content-Type": "media"
      },
      body: profiledata.pic,
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.error(error);
    })

  }

  const Aws_Profile_File = {
    // `uri` can also be a file system path (i.e. file://)
    uri: profiledata.isUserImageAvailable,
    name: `${profiledata.user_number}.png`,
    // `${profiledata.user_number}.png`
    type: "image/png"
  }
  const Aws_Profile_Options = {
    keyPrefix: 'Profile/',
    bucket: Aws.AWS_Bucket,
    region: Aws.AWS_Region,
    accessKey: Aws.AWS_Access_KeyId,
    secretKey: Aws.AWS_Secret_KeyId,
    successActionStatus: 201
  }  

  const upload_Aws_Photo = () => {
    console.log("profiledata.isUserImageAvailable: "+profiledata.isUserImageAvailable);
    RNS3.put(Aws_Profile_File,Aws_Profile_Options)
    .progress((e) => console.log(e.loaded / e.total))
    .then(response => {
      console.log(response);
      
      if (response.status !== 201)
      {
        console.log("Failed to upload image to S3");
        ToastAndroid.show('Failed to upload image', ToastAndroid.LONG);
      }
      else  {
        update_Aws_Photo_InServer();
        console.log("upload_Aws_photo Uploaded");        
      }
      console.log(response.body);
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
    });
  }

  const Aws_Proof_File = {
    // `uri` can also be a file system path (i.e. file://)
    uri: profiledata.user_Proof,
    name: `${profiledata.user_number}${date.toString()}.png`,
    // `${profiledata.user_number}.png`
    type: "image/png"
  }
  const Aws_Proof_Options = {
    keyPrefix: 'Proof/',
    bucket: Aws.AWS_Bucket,
    region: Aws.AWS_Region,
    accessKey: Aws.AWS_Access_KeyId,
    secretKey: Aws.AWS_Secret_KeyId,
    successActionStatus: 201
  }  

  const upload_Aws_Proof = () => {
    console.log("profiledata.isUserImageAvailable: "+profiledata.isUserImageAvailable);
    RNS3.put(Aws_Proof_File,Aws_Proof_Options)
    .progress((e) => console.log(e.loaded / e.total))
    .then(response => {
      console.log(response);
      console.log("upload_Aws_Proof Uploaded");
      if (response.status !== 201)
      {
        console.log("Failed to Proof to S3");
        ToastAndroid.show('Failed to Proof', ToastAndroid.LONG);
      }
      else  {
        update_Aws_Proof_InServer();
        console.log("update_Aws_Proof_InServer Uploaded");        
      }
      console.log(response.body);
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
    });
  }

  const update_Aws_Proof_InServer = () => {
    console.log("update_Aws_Proof_InServer", profiledata.user_Proof_Select);
	let API_URL = `${user_data_ip_address}/User_Photo_Component/user_proof_upload.php`;
    //let API_URL = `${Aws.Server_URL}/User_Photo_Component/user_proof_upload.php`;
    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will pass our input data to server
        mobile: profiledata.user_number,
        proofid:profiledata.user_Proof_Select,    
        filename: Aws_Proof_File.name       
      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(" update_Aws_Proof_InServer responseJson");
        console.log(responseJson);
        //ToastAndroid.show(responseJson,ToastAndroid.LONG);

        if (responseJson === "Updated") {
          console.log("Updated the Proof");
          ToastAndroid.show('Updated the Proof', ToastAndroid.LONG);         
        }
        else if (responseJson === "Recorded") {
          console.log("Recorded the Proof");
          ToastAndroid.show('Recorded the Proof', ToastAndroid.LONG); 
        }
        else if (responseJson === "Pending") {
          // if (user_data_user_Proof !== profiledata.user_Proof) {
          //   console.log("Pending");
          //   ToastAndroid.show('Your Proof is in Pending Status', ToastAndroid.LONG);
          // }
          ToastAndroid.show('Your Proof is in Pending Status', ToastAndroid.LONG);
        }
        else if (responseJson === "check") {
          Alert.alert("Connection Lost", 'check internet connection!', [
            { text: 'Okay' }
          ]);
          console.log("fail");
          //alert(responseJson);
          //navigation.goBack();
        }
        else if (responseJson == "user") {
          console.log("Invalid user");
          Alert.alert("Invalid user", 'Invalid user!', [
            { text: 'Okay' }
          ]);
          //alert(responseJson);
          //navigation.goBack();
        }
        else {
          console.log("else else");
        };

      })
      .catch((error) => {
        console.error(error);
      });
    //navigation.goBack();  
  }

  const update_Aws_Photo_InServer = () => {
    console.log("update_Aws_Photo_InServer");
	let API_URL = `${user_data_ip_address}/User_Photo_Component/user_profile_upload.php`;
    //let API_URL = `${Aws.Server_URL}/User_Photo_Component/user_profile_upload.php`;
    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will pass our input data to server
        mobile: profiledata.user_number     
      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(" update_Aws_Photo_InServer");
        console.log(responseJson);
        //ToastAndroid.show(responseJson,ToastAndroid.LONG);

        if (responseJson === "Updated") {
          console.log("Photo Updated");
          ToastAndroid.show('Photo Updated', ToastAndroid.LONG);         
        }
        else if (responseJson === "Recorded") {
          console.log("Photo Recorded");
        }
        else if (responseJson === "Pending") {
          // if (user_data_user_Proof !== profiledata.user_Proof) {
          //   console.log("Pending");
          //   ToastAndroid.show('Your Proof is in Pending Status', ToastAndroid.LONG);
          // }
          ToastAndroid.show('Your Photo is Updated', ToastAndroid.LONG);
        }
        else if (responseJson === "check") {
          Alert.alert("Connection Lost", 'check internet connection!', [
            { text: 'Okay' }
          ]);
          console.log("fail");
          //alert(responseJson);
          //navigation.goBack();
        }
       else {
          console.log("Photo else else");
        };

      })
      .catch((error) => {
        console.error(error);
      });
    //navigation.goBack();  
  }

  const upload_GCP_photo = () => {
	  let API_URL = `${user_data_ip_address}/user_profile_upload.php`;
	//let API_URL = `${Aws.Server_URL}/user_profile_upload.php`;
    RNFetchBlob.fetch('POST', API_URL, {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [

      {
        name: 'image',
        filename: profiledata.user_number,
        type: 'image/png',
        data: profiledata.pic
      }
      // { name : 'mobile', data : profiledata.user_number},


    ]).then((resp) => {
      console.log("res");
      console.log(resp);

      // ...
    }).catch((err) => {
      // ...
    })
  };

  const upload_Gcp_proof = () => {
	let API_URL = `${user_data_ip_address}/user_proof_upload.php`;
	//let API_URL = `${Aws.Server_URL}/user_proof_upload.php`;
    RNFetchBlob.fetch('POST', API_URL, {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [

      {
        name: 'image',
        filename: profiledata.user_number,
        type: 'image/png',
        data: profiledata.Proof_data
      }
      // { name : 'mobile', data : profiledata.user_number},


    ]).then((resp) => {
      console.log("res uploadproof");
      console.log(resp);

      // ...
    }).catch((err) => {
      // ...
      console.log("err" + err);
    })
  };

  const user_data_upload = async () => {
    console.log("else profiledata.user_Proof_Select else profiledata.user_Proof_Select", profiledata.user_Proof_Select);
	let API_URL = `${user_data_ip_address}/User_Photo_Component/user_personal_details_upload.php`;
	//let API_URL = `${Aws.Server_URL}/User_Photo_Component/user_personal_details_upload.php`;
    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will pass our input data to server
        mobile: profiledata.user_number,
        userfirst: profiledata.user_first_name,
        userlast: profiledata.user_last_name,
        UserImage: profiledata.pic,
        userProofSelect: profiledata.user_Proof_Select,
        address: user_data_user_address_line1,
        city: user_data_user_city,
        statename: user_data_user_state_name,
        latitude: user_data_user_latitude,
        longitude: user_data_user_longitude,
        usercountry: user_data_user_country,
        userpincode: user_data_user_pincode,
        district: user_data_user_district,


        // address: profiledata.address,
        // city: profiledata.city,
        // area: profiledata.area,
        // statename: profiledata.statename,
        // latitude: profiledata.latitude,
        // usercountry: profiledata.user_country,
        // userpincode: profiledata.user_pincode,
        // longitude: profiledata.longitude,


        useremail: profiledata.user_email,
        userGender: profiledata.user_Gender,
        userBloodGroup: profiledata.user_BloodGroup,
        userDOB: profiledata.user_DOB,
        userConfermation: profiledata.user_Confermation    
      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson + " responseJson");
        //ToastAndroid.show(responseJson,ToastAndroid.LONG);

        if (responseJson === "Updated") {
          console.log("Updated");
          ToastAndroid.show('Updated', ToastAndroid.LONG);
          //navigation.goBack();
        }
        else if (responseJson === "Recorded") {
          console.log("Recorded");

          //navigation.goBack();
        }
        else if (responseJson === "Pending") {
          if (user_data_user_Proof !== profiledata.user_Proof) {
            console.log("Pending");
            ToastAndroid.show('Your Proof is in Pending Status', ToastAndroid.LONG);
          }

          //navigation.goBack();
        }
        else if (responseJson === "check") {
          Alert.alert("Connection Lost", 'check internet connection!', [
            { text: 'Okay' }
          ]);
          console.log("fail");
          //alert(responseJson);
          //navigation.goBack();
        }
        else if (responseJson == "user") {
          console.log("Invalid user");
          Alert.alert("Invalid user", 'Invalid user!', [
            { text: 'Okay' }
          ]);
          //alert(responseJson);
          //navigation.goBack();
        }
        else {
          console.log("else else");
        };

      })
      .catch((error) => {
        console.error(error);
      });
    //navigation.goBack();
  }

  const asyncStoragehandler = async () => {
    console.log(" aynsc storgae in edit screen ");
    try {
      await AsyncStorage.setItem('user_Logout', profiledata.user_logout);

      if (typeof profiledata.user_first_name !== "undefined" && profiledata.user_first_name !== null) {
        await AsyncStorage.setItem('user_First_Name', profiledata.user_first_name);
      }

      if (typeof profiledata.user_last_name !== "undefined" && profiledata.user_last_name !== null) {
        await AsyncStorage.setItem('user_Last_Name', profiledata.user_last_name);
      }



      if (typeof profiledata.user_email !== "undefined" && profiledata.user_email !== null) {
        await AsyncStorage.setItem('user_Email', profiledata.user_email);
      }

      if (typeof profiledata.isUserImageAvailable !== "undefined" && profiledata.isUserImageAvailable !== null) {
        await AsyncStorage.setItem('is_User_Image_Available', profiledata.isUserImageAvailable);
      }


      if (typeof profiledata.user_BloodGroup !== "undefined" && profiledata.user_BloodGroup !== null) {
        await AsyncStorage.setItem('user_BloodGroup', profiledata.user_BloodGroup);
      }



      if (typeof profiledata.user_Gender !== "undefined" && profiledata.user_Gender !== null) {
        await AsyncStorage.setItem('user_Gender', profiledata.user_Gender);
      }


      if (typeof profiledata.userdob !== "undefined" && profiledata.userdob !== null) {
        await AsyncStorage.setItem('user_DOB', profiledata.userdob);
      }

      if (typeof profiledata.user_Confermation !== "undefined" && profiledata.user_Confermation !== null) {
        await AsyncStorage.setItem('user_Confermation', ((profiledata.user_Confermation) ? '1' : '0'));
      }
      //await AsyncStorage.setItem('user_Proof', profiledata.user_Proof);
      if (typeof profiledata.user_Proof_Select !== "undefined" && profiledata.user_Proof_Select !== null) {
        await AsyncStorage.setItem('user_Proof_Select', profiledata.user_Proof_Select);
        await AsyncStorage.setItem('user_Proof', profiledata.user_Proof);
      }

      if (typeof user_data_user_address_line1 !== "undefined" && user_data_user_address_line1 !== null) {
        await AsyncStorage.setItem('user_Address_Line1', user_data_user_address_line1);
      }

      if (typeof user_data_user_city !== "undefined" && user_data_user_city !== null) {
        await AsyncStorage.setItem('user_City', user_data_user_city);
      }


      if (typeof user_data_user_state_name !== "undefined" && user_data_user_state_name !== null) {
        await AsyncStorage.setItem('user_State_Name', user_data_user_state_name);
      }

      if (typeof user_data_user_district !== "undefined" && user_data_user_district !== null) {
        await AsyncStorage.setItem('user_District', user_data_user_district);
      }

      if (typeof user_data_user_country !== "undefined" && user_data_user_country !== null) {
        await AsyncStorage.setItem('user_Country', user_data_user_country);
      }

      if (typeof user_data_user_pincode !== "undefined" && user_data_user_pincode !== null) {
        await AsyncStorage.setItem('user_Pincode', user_data_user_pincode);
      }

      if (typeof user_data_user_longitude !== "undefined" && user_data_user_longitude !== null) {
        // await AsyncStorage.setItem('user_Longitude', user_data_user_longitude.stringify());	
        await AsyncStorage.setItem('user_Longitude', JSON.stringify(user_data_user_longitude));

      }

      if (typeof user_data_user_latitude !== "undefined" && user_data_user_latitude !== null) {
        // await AsyncStorage.setItem('user_Latitude', user_data_user_latitude);
        await AsyncStorage.setItem('user_Longitude', JSON.stringify(user_data_user_latitude));
      }





      // await AsyncStorage.setItem('user_Area', profiledata.user_area);	




      // await AsyncStorage.setItem('user_Name', userName); 
      console.log("AsyncStorage is over");
    } catch (e) {
      console.log(e);
    }
  }

  const onPress_Pick_Location_Handler = () => {
    navigation.navigate('Here_Map', {
      screenName: 'Edit_Profile_Screen'
    });
    dispatch(toggledata.togglemap_screen_name('Edit_Profile_Screen'));

    // navigation.push('Here_Map', {     
    //   screenName: 'Edit_Profile_Screen'
    // });
  }
  const handle_Address = (val) => {
    console.log("before user_data_user_request_address_line1" + user_data_user_address_line1);
    dispatch(toggledata.toggleuser_address_line1(val));
    console.log("after user_data_user_request_address_line1" + user_data_user_address_line1);
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

  const { width, height } = Dimensions.get('window');


  // useEffect(()=>{
  //   if(profiledata.user_email!=''||profiledata.user_email!==null)
  //   {
  //     console.log("user email"+profiledata.user_email);

  //   }

  // })

  const { colors } = useTheme();
  const bs = React.createRef();
  const proofbs = React.createRef();
  const fall = new Animated.Value(1);
  const proof_fall = new Animated.Value(1);

  const proofFromCamera = () => {
    console.log("proofFromCamera");
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      setprofiledata({
        ...profiledata, user_Proof: image.path,

      })
      ToastAndroid.show('Please click the save button to save the proof', ToastAndroid.LONG);
    }).catch((error) => {
      console.log("openCamera catch" + error.toString())
      ToastAndroid.show('You have canceled the request ', ToastAndroid.LONG);
    })
    proofbs.current.snapTo(1);
  }

  // const proofFromLibrary = () => {
  //   console.log("proofFromLibrary");
  //   ImagePicker.showImagePicker({
  //     width: 500,
  //     height: 500,
  //     cropping: true
  //   }).then(image => {
  //     console.log(image);
  //     setprofiledata({
  //       ...profiledata, user_Proof: image.path,
  //     })
  //     ToastAndroid.show('Please click the save button to save the proof', ToastAndroid.LONG);
  //   }).catch((error) => {
  //     console.log("openCamera catch" + error.toString())
  //     ToastAndroid.show('You have canceled the request ', ToastAndroid.LONG);
  //   })
  //   proofbs.current.snapTo(1);
  // }

  const proofFromLibrary = () => {
    console.log("proofFromLibrary");
    ImagePicker.showImagePicker(proofoptions, (response) => {
      // console.log('Response = '+ response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        ToastAndroid.show('Photo selection is canceled', ToastAndroid.SHORT);
      }
      else if (response.error) {
        console.log('Image Picker Error: ', response.error);
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
      }

      else {
        let source = { uri: response.uri };
        console.log('Image source: ', source);
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        const path = response.path;
        let pathuri = "file://" + "Path/" + path;
        console.log('Image pathuri: ' + pathuri);
        setprofiledata({
          ...profiledata, user_Proof: pathuri,
          Proof_data: response.data,
        });
        ToastAndroid.show('Photo Updated', ToastAndroid.LONG);
      }

    });
    //proofbs.current.snapTo(1);
  }

  const removeproof = () => {
    setprofiledata({
      ...profiledata, user_Proof: '',

    })
    ToastAndroid.show('You proof has been removed', ToastAndroid.LONG);
    proofbs.current.snapTo(1);
  }

  const renderInnerProof = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload proof</Text>
        <Text style={styles.panelSubtitle}>Choose You Proof</Text>
      </View>
      <TouchableOpacity style={styles.submit} onPress={() => proofFromCamera()}>
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
        style={[styles.submit, { backgroundColor: '#009387' }]}
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





  const photoFromCamera = () => {
    console.log("photoFromCamera");
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      setprofiledata({
        ...profiledata, isUserImageAvailable: image.path,
        pic: image.data,
      })
      ToastAndroid.show('Photo has uploaded', ToastAndroid.LONG);
    }).catch((error) => {
      console.log("openCamera catch" + error.toString())
      ToastAndroid.show('You have canceled the request ', ToastAndroid.LONG);
    })
    bs.current.snapTo(1);
  }


  const photoFromLibrary = () => {
    console.log("photoFromLibrary");
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = '+ response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        ToastAndroid.show('Photo selection is canceled', ToastAndroid.SHORT);
      }
      else if (response.error) {
        console.log('Image Picker Error: ', response.error);
        ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
      }

      else {
        //let source = { uri: response.uri };
        //console.log('Image source: ', source);    
        console.log('Image path: ', response.path);
        const path = response.path;
        let pathuri = "file://" + "Path/" + path;
        console.log('Image pathuri: ' + pathuri);
        // console.log('Image origURL: ', response.origURL);
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        setprofiledata({
          ...profiledata, isUserImageAvailable: pathuri,
          pic: response.data,
        });
        console.log('isUserImageAvailable origURL: ', profiledata.isUserImageAvailable);
        ToastAndroid.show('Photo Updated', ToastAndroid.LONG);
      }

    });
    // bs.current.snapTo(1);
  }


  // const photoFromLibrary =()=>{
  //     console.log("photoFromLibrary");
  //     ImagePicker.openPicker({
  //       width: 300,
  //       height: 300,
  //       cropping: true
  //     }).then(image => {          
  //       console.log("imageimage "+image.path);
  //       console.log("imageimage "+image.data);
  //       console.log("imageimage "+image.filename);
  //       console.log("imageimage "+image.size);
  //       setprofiledata({
  //         ...profiledata,isUserImageAvailable:image.path,
  //       })
  //       ToastAndroid.show('Photo has uploded',ToastAndroid.LONG);
  //     }).catch((error)=>{
  //       console.log("openCamera catch" + error.toString()) 
  //       ToastAndroid.show('You have canceled the request ',ToastAndroid.LONG);
  //       })
  //       bs.current.snapTo(1);
  // }

  const removephoto = () => {
    setprofiledata({
      ...profiledata, isUserImageAvailable: '',
    })
    ToastAndroid.show('You Photo has been removed', ToastAndroid.LONG);
    bs.current.snapTo(1);
  }

  const renderInner = () => (
    // console.log("width "+width+" height "+height),
    // console.log("user_data_isUserImageAvailable"+user_data_isUserImageAvailable),
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.submit} onPress={() => photoFromCamera()}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submit} onPress={() => photoFromLibrary()}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.submit, { backgroundColor: '#AD4336' }]}
        onPress={() => removephoto()}>
        <Text style={styles.panelButtonTitle}>Remove Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.submit, { backgroundColor: '#009387' }]}
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
  if (profiledata.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView>

      <SafeAreaView style={[styles.container, styles.cardview]}>

        <BottomSheet
          ref={bs}
          snapPoints={[height, height - height - 1000]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <BottomSheet
          ref={proofbs}
          snapPoints={[height / 2, height - height - 1000]}
          renderContent={renderInnerProof}
          renderHeader={renderHeaderProof}
          initialSnap={1}
          callbackNode={proof_fall}
          enabledGestureInteraction={true}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            bs.current.snapTo(1);
            proofbs.current.snapTo(1);
          }}
        >
          <Animated.View style={{
            opacity: Animated.add(0.08, Animated.multiply(proof_fall, 1.0)),
          }}>

            <Animated.View style={{
              margin: '4%',
              opacity: Animated.add(0.08, Animated.multiply(fall, 1.0)),
            }}>

              <View style={{ alignItems: 'center' }}>
                <Text style={[ProfileStyles.DOBstyle, { marginTop: '3%' }]}>  Upload your photo </Text>
                <TouchableOpacity onPress={() => photoFromLibrary()}>
                  <View style={[styles.imagestye]}>
                    {(profiledata.isUserImageAvailable === '' || profiledata.isUserImageAvailable === null) ?
                      <FontAwesome name="user-plus" color={colors.text} size={80} />
                      :
                      <ImageBackground
                        source={{ uri: profiledata.isUserImageAvailable }}
                        style={{ height: 150, width: 150 }}
                        imageStyle={{ borderRadius: 75, borderColor: 'green', borderWidth: 1 }}>
                        <View
                          style={styles.imageeditstyle}>

                          <MaterialIcons name="add-a-photo" size={30}
                            color="grey"
                            style={styles.imageplusicon} />
                        </View>
                      </ImageBackground>


                    }
                  </View>
                </TouchableOpacity>
                <View style={[styles.cardview_no_shadow,]}>
                  <Text style={{ padding: '1%', fontSize: 18, fontWeight: 'bold' }}>
                    {profiledata.user_name}
                  </Text>
                </View>
              </View>

              <View style={[styles.cardview, {
                marginRight: 0,
                marginLeft: 0, paddingLeft: '7%', padding: '7%'
              }]}>
                <View style={[signupstyles.action,]}>
                  <FontAwesome name="user-o" color={colors.text} size={20} />
                  <TextInput placeholder="First Name"
                    style={[signupstyles.textInput, { color: colors.text }]} autoCapitalize="none"
                    onChangeText={(val) => handleuserfirstname(val)}
                  >{profiledata.user_first_name}
                  </TextInput>
                  {profiledata.check_textInput_user_first_name ?
                    <Animatable.View
                      animation="bounceIn">
                      <Feather
                        name="check-circle"
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
                    style={[signupstyles.textInput, { color: colors.text }]} autoCapitalize="none"
                    onChangeText={(val) => handleuserlastname(val)}
                  >{profiledata.user_last_name}
                  </TextInput>
                  {profiledata.check_textInput_user_last_name ?
                    <Animatable.View
                      animation="bounceIn">
                      <Feather
                        name="check-circle"
                        color="green"
                        size={20}
                      />
                    </Animatable.View>
                    : null}
                  <Feather style={styles.editicon} name="edit-2" color={colors.text} size={20} />
                </View>


                <View style={[signupstyles.action, { borderBottomWidth: 0, marginBottom: 0 },]}>
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
                    style={[signupstyles.textInput, { color: colors.text }]} autoCapitalize="none"
                    onChangeText={(val) => textInputEmailChange(val)}
                  >{profiledata.user_email}

                  </TextInput>
                  {profiledata.check_textInputEmailChange ?
                    <Animatable.View
                      animation="bounceIn"
                    >
                      <Feather
                        name="check-circle"
                        color="green"
                        size={20}
                      />
                    </Animatable.View>
                    : null}
                  <Feather style={styles.editicon} name="edit-2" color={colors.text} size={20} />
                </View>

              </View>

              <View style={[styles.cardview, {
                marginRight: 0,
                marginLeft: 0, paddingLeft: '6%'
              }]}>

                <View style={[styles.rowview]} >

                  <Text style={[BloodRequestStyle.title], { paddingTop: '2%', fontWeight: 'bold' }}>Blood Group:</Text>
                  <View style={{ paddingTop: '2%' }}>
                    <Picker
                      selectedValue={profiledata.user_BloodGroup}
                      style={{ height: 25, width: 120, color: colors.text, }}
                      onValueChange={(itemValue, itemIndex) => setprofiledata({ ...profiledata, user_BloodGroup: itemValue })
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

                <View style={{ paddingTop: '2%', }} >
                  <RadioButton.Group key="Gender"
                    // value="Female"
                    value={profiledata.user_Gender === "Male" ? "Male" : "Female"}
                    onValueChange={handleuser_Gender}
                  // value={profiledata.user_Gender}

                  >

                    <View style={[styles.rowview,]}>
                      <Text style={BloodRequestStyle.title}>Gender: </Text>
                      {/* <Text style={styles.content}>Yes</Text> */}
                      <Fontisto style={{ marginLeft: '4%' }} name="male" color={colors.text} size={25} />
                      <RadioButton
                        value="Male"

                      // status={ isReplacementAvailables === 'Yes' ? 'checked' : 'unchecked' }
                      // onPress={() => setisReplacementAvailables({isReplacementAvailables:'Yes'})}              
                      />

                      <Fontisto style={{ marginLeft: '4%' }} name="female" color={colors.text} size={25} />
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
                  <Text style={BloodRequestStyle.title, { paddingTop: '3%', fontWeight: 'bold' }}>DOB: </Text>

                  <DatePicker
                    style={{ width: 150, }}
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
                        backgroundColor: 'white',

                      }
                    }}
                    onDateChange={(date) => handleuser_DOB(date)}
                  />
                </View>

                <View style={styles.rowview}>
                  <Text style={BloodRequestStyle.title, { paddingTop: '2%', fontWeight: 'bold' }}>User Available: </Text>
                  <View style={{ paddingBottom: '2%', paddingLeft: '2%' }}>
                    <Checkbox
                      status={profiledata.user_Confermation ? 'checked' : 'unchecked'}
                      onPress={() => handleuser_Confermation()}
                    />
                  </View>

                </View>


              </View>



              <View style={[styles.cardview, { alignItems: 'center', }]}>


                <View style={[styles.rowview, { padding: '2%', marginTop: 0, paddingBottom: '4%' }]}>
                  <TouchableOpacity onPress={() => onPress_Pick_Location_Handler()}
                    style={[styles.rowview,]}
                    activeOpacity={.55}
                  >
                    <Entypo name="location-pin" color={colors.text} size={30} />
                    <Text style={[styles.textSign, { color: "#009387", marginLeft: '20%', fontSize: 20 }]}>Pick Location</Text>
                  </TouchableOpacity>
                </View>

              </View>
              {user_data_user_address_line1 ?
                <View style={[styles.cardview, { padding: '4%' }]}>
                  {(user_data_user_address_line1 !== '' || user_data_user_address_line1 !== null) ?
                    <View   >
                      <View style={[signupstyles.action]}>
                        <FontAwesome5 style={{ paddingTop: '1%', color: 'green' }} name="address-card" size={30} />
                        <TextInput multiline={true}
                          style={[signupstyles.textInput, { color: colors.text }]}
                          onChangeText={(val) => handle_Address(val)}
                        >{user_data_user_address_line1}</TextInput>
                        {user_data_user_address_line1 !== null ?
                          <Animatable.View
                            animation="bounceIn">
                            <Feather
                              name="check-circle"
                              color="green"
                              size={20}
                            />
                          </Animatable.View>
                          : null}
                        <Feather style={styles.editicon} name="edit-2" color={colors.text} size={20} />
                      </View>
                    </View>
                    : null
                  }
                  {(user_data_user_city !== '' || user_data_user_city !== null) ?
                    <View >
                      <View>
                        {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
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
                  {(user_data_user_country !== '' || user_data_user_country !== null) ?
                    <View >
                      <View>
                        {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                        <Text >Country: {user_data_user_country}</Text>
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

                  {(user_data_user_longitude !== '' || user_data_user_longitude !== null) ?
                    <View >
                      <View>
                        {/* <FontAwesome5 style={{paddingTop:'1%',color:'green'}}name="address-card" size ={30} /> */}
                        <Text >Your Longitude: {user_data_user_longitude}</Text>
                      </View>
                    </View>
                    : null
                  }

                </View> : null}


              <View >
                <View style={styles.cardview_no_shadow}>
                  <Text style={[BloodRequestStyle.title], { paddingTop: '7%', fontWeight: 'bold' }}>User Proof:</Text>
                  {!profiledata.user_Proof_Select_edit ?
                    <View >
                      <View style={[styles.rowview, { marginTop: 0, paddingRight: '5%', alignSelf: 'center' }]}>
                        <Picker
                          selectedValue={profiledata.user_Proof_Select}
                          style={{ height: 30, width: screen_width / 1.5, color: colors.text, }}
                          onValueChange={(itemValue, itemIndex) => setprofiledata({ ...profiledata, user_Proof_Select: itemValue })
                          }>
                          <Picker.Item label="Select your Proof" value="" />
                          <Picker.Item label="Aadhar card" value="Aadhar" />
                          <Picker.Item label="Diving Licence" value="Diving Licence" />
                          <Picker.Item label="Voter Id" value="Voter  Id" />
                          <Picker.Item label="Other Id" value="Other" />
                        </Picker>
                        <TouchableOpacity onPress={() => proofFromLibrary()}>
                          <Icon name="image-plus" color={colors.text} size={30} />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity style={[{ paddingBottom: '3%', alignItems: 'center' }]}
                        onPress={() => SubmitUploadHandler()}>
                        <Icon name="content-save-move"
                          color="#089597"
                          style={{ borderColor: colors.text, borderWidth: 2, borderRadius: 40 }}
                          size={40} />
                      </TouchableOpacity>
                    </View>
                    :


                    <Animatable.View style={[styles.rowview, { paddingBottom: '5%' }]}
                      animation="bounceIn">
                      <TouchableOpacity onPress={() => EditProofHandler()}>
                        <Icon style={[styles.editicon,]} name="content-save-edit-outline" color='red' size={25} />
                      </TouchableOpacity>
                      <Text style={{ paddingRight: '5%', paddingLeft: '5%' }}>Your {profiledata.user_Proof_Select}</Text>
                      <Feather
                        name="check-circle"
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
        {/* <FCM_Handle_message/> */}
        <TouchableOpacity style={styles.submit} onPress={() => SubmitHandler()}>
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
  editicon: {
    marginRight: '1%',
    marginLeft: '1%',
  },
  uploadborder: {
    padding: '1%',
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    fontSize: 9,
    fontWeight: '100'
  },
  cardview: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: 'white',
    // padding: '2%',
    borderRadius: 20,
    margin: '3%'
  },
  cardview_no_shadow: {
    shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 1,
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: 'white',
    // padding: '2%',
    borderRadius: 20,
    paddingRight: '7%',
    paddingLeft: '7%',
    marginTop: '3%',
  },
  imagestye: {
    marginTop: '2%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageeditstyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageplusicon: {
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
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
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
