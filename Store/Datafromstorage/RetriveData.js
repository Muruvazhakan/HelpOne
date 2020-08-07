import AsyncStorage from '@react-native-community/async-storage';
import React,{useEffect,useState}from 'react';
import {toggleusername,
    toggleusernumber,
    toggleuserfirstname,
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
    toggleuser_bood_donated,
    toggleuser_bood_request_raised,
    toggleuser_Proof_Select,
    
} from '../actions/HelpOne';
import {connect,useSelector,useDispatch} from 'react-redux';
import { View } from 'react-native-animatable';
import { Alert } from 'react-native';

const RetriveData = (props) => {



    const initialState={

        user_address_line1:' test address',
        user_city:'test city',
        user_area:' test area',
        user_state_name:'test state ',
        user_latitude:37.425998333,
        user_longitude:-110.125100000,
        user_pincode:null,

        user_name:'sad',
        user_number:'989888',
        user_image:'',   
        isUserImageAvailable:null,         
        user_first_name:'',    
        user_last_name:'',
        user_email:'',
        user_bood_donated:0,
        user_bood_request_raised:0,
        user_Gender:'',
        user_BloodGroup:'',
        user_DOB:'01-01-1888',
        user_Age:null,
        user_Confermation:false,
        user_Proof:'',
        asyncstorage:true,
        user_logout:'',
    };

    const [state,setState] = useState(initialState); 

    const dispatch = useDispatch();
    dispatch(toggleusername(props.userData.userName));
    dispatch(toggleusernumber(props.userData.userNumber));

    useEffect(() => {
        // Alert.alert(props.userData);
       
       
        // state.user_logout=  AsyncStorage.getItem('user_logout');
        
        if(state.asyncstorage){
            console.log('RetriveData Screen: asyncstorage get values'+state.asyncstorage);
            // state.user_logout=  AsyncStorage.getItem('user_logout');
           
            getdatafromstorage();
            // asyncstorage=false;
            setState({...state,
                asyncstorage:false,
              })            
        }
       });

    const getdatafromstorage =async()=>{
        try {
            state.user_logout= await AsyncStorage.getItem('user_logout');
            console.log('RetriveData Screen user_logout1 :'+ state.user_logout);
            // if(state.user_logout!=='0'){
            state.user_data= await AsyncStorage.getItem('userfirstname');
            state.user_first_name= await AsyncStorage.getItem('userfirstname');
            state.user_last_name= await AsyncStorage.getItem('user_last_name');
            state.isUserImageAvailable= await AsyncStorage.getItem('isUserImageAvailable');
            state.user_BloodGroup= await AsyncStorage.getItem('user_BloodGroup');
            state.user_Gender= await AsyncStorage.getItem('user_Gender');
            state.user_DOB= await AsyncStorage.getItem('user_DOB');
            state.user_email= await AsyncStorage.getItem('user_email');
            state.user_Confermation= await AsyncStorage.getItem('user_Confermation');
            state.user_Proof= await AsyncStorage.getItem('user_Proof');
            state.user_address_line1= await AsyncStorage.getItem('user_address_line1');
            state.user_city= await AsyncStorage.getItem('user_city');
            state.user_area= await AsyncStorage.getItem('user_area');
            state.user_state_name= await AsyncStorage.getItem('user_state_name');
            state.user_latitude= await AsyncStorage.getItem('user_latitude');
            state.user_longitude= await AsyncStorage.getItem('user_longitude');
            state.user_pincode= await AsyncStorage.getItem('user_pincode');
            state.user_bood_donated= await AsyncStorage.getItem('user_bood_donated');
            state.user_bood_request_raised= await AsyncStorage.getItem('user_bood_request_raised');
            state.user_Proof_Select= await AsyncStorage.getItem('user_Proof_Select');
            
            dispatch(toggleuser_Proof_Select(state.user_Proof_Select));
            dispatch(toggleuser_bood_request_raised(state.user_bood_request_raised));
            dispatch(toggleuser_bood_donated(state.user_bood_donated));	
            dispatch(toggleuser_pincode(state.user_pincode));	
            dispatch(toggleuser_longitude(state.user_longitude));
            dispatch(toggleuser_latitude(state.user_latitude));
            dispatch(toggleuser_state_name(state.user_state_name));
            dispatch(toggleuser_area(state.user_area));
            dispatch(toggleuser_city(state.user_city));                
            dispatch(toggleuser_address_line1(state.user_address_line1));
            dispatch(toggleuser_Proof(state.user_Proof));            
            dispatch(toggleuser_Confermation(state.user_Confermation));
            dispatch(toggleuser_DOB(state.user_DOB));
            dispatch(toggleuserfirstname(state.user_first_name));
            dispatch(toggleuserlastname(state.user_last_name));
            dispatch(toggleuserisUserImageAvailable(state.isUserImageAvailable));
            dispatch(toggleuser_BloodGroup(state.user_BloodGroup));
            dispatch(toggleuser_Gender(state.user_Gender));
            dispatch(toggleuseremail(state.user_email)); 
            // }
            console.log('RetriveData Screen user_logout :'+ state.user_logout);
            // userNumber = await AsyncStorage.getItem('userNumber');           
            } catch(e) {
            console.log('RetriveData Screen error'+e);
            }
    }

       return (
           <View>


           </View>
       )

}

export default RetriveData;