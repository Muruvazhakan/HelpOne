import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState,useCallback, useRef } from 'react';
import * as toggledata from '../actions/HelpOne';
import { connect, useSelector, useDispatch } from 'react-redux';
import {onRetrivetableSosdata} from '../../Screens/SOS_Componet/SOSData';
import { Alert,ToastAndroid,ActivityIndicator,View } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import {Server_URL} from '../../components/Parameter';
const RetriveData = (props) => {

    var retriveserverdata = [];
    
    var setupretrivedata = [];
    var setupsosretrivedata =[];
    var data;
    var sosdata;
    const [userdataderver, setuserdataderver] = useState({
        user_address_line1: '',
        user_city: '',
        user_area: '',
        user_country: '',
        user_state_name: '',
        user_latitude: null,
        user_longitude: null,
        user_pincode: null,
        user_id: null,
        user_name: '',
        user_number: '',
        user_image: '',
        isUserImageAvailable: null,
        user_first_name: '',
        user_last_name: '',
        user_email: '',
        user_bood_donated: 0,
        user_bood_request_raised: 0,
        user_Gender: '',
        user_BloodGroup: '',
        user_DOB: '',
        user_Age: null,
        user_Confermation: false,
        user_Proof: '',
        asyncstorage: true,
        serverdata: true,
        user_logout: '',
        retrivedata: false,
        admin_comments: null,
        proof_status: null,
        user_level: '',
        user_rewardPoint: 0,
        user_donated: 0,
        user_request: 0,
        user_rewardsclaimed: 0,
    });
    const initialState = {
        retriveserverdata,
        user_address_line1: ' test address',
        user_city: 'test city',
        user_area: ' test area',
        user_state_name: 'test state ',
        user_district:null,
        user_country:null,
        user_latitude: 37.425998333,
        user_longitude: -110.125100000,
        user_pincode: null,
        user_id: null,
        user_name: props.userData.userdata.userName,
        user_number: props.userData.userdata.userNumber,
        user_image: '',
        isUserImageAvailable: null,
        user_first_name: '',
        user_last_name: '',
        user_email: '',
        user_bood_donated: 0,
        user_bood_request_raised: 0,
        user_Gender: '',
        user_BloodGroup: '',
        user_DOB: '01-01-1888',
        user_Age: null,
        user_Confermation: false,
        user_Proof: '',
        asyncstorage: true,
        serverdata: true,
        user_logout: '',
        retrivedata: false,
        admin_comments: null,
        proof_status: null,
        user_level: null,
        user_rewardPoint: 0,
        user_donated: 0,
        user_request: 0,
        user_rewardsclaimed: null,
        dispatch_sos_ServerData:false,
        sos_name1:null,
        sos_name2:null,
        sos_name3:null,
        sos_name1_number:null,
        sos_name2_number:null,
        sos_name3_number:null,
		user_sos_msg:null,
    };

    const [state, setState] = useState(initialState);
    const [isStarted , setIsStarted ] = useState(false);
    const [isloading , setIsLoading ] = useState(true);
    const dispatch = useDispatch();
    var offline=0;
    // dispatch(toggleusername(props.userData.userName));
    // dispatch(toggleusernumber(props.userData.userNumber));
    //console.log('[RetriveData] Screen: props ');
    //console.log(props);
    //console.log('[RetriveData] Screen: user name ' + props.userData.userdata.userName);
    console.log('[RetriveData] Screen: user name ' + props.userData.userdata.userNumber);
    console.log("data in state "+state.user_name +""+ state.user_number);
    let connectstate="";
    const [error, setError] = useState();
    const [offlinemsgflag, setOfflinemsgflag] = useState(false);
    const offlinemsgflagref = useRef();
    
    useEffect(()=>{
        offlinemsgflagref.current=offlinemsgflag;
    },[offlinemsgflag])

    const loadProducts = ()=> {
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
     
    const errorAlerthandler =()=>{
        console.log("errorAlerthandler");
        setOfflinemsgflag(false);
        checkConnectivity();
    }

    const checkConnectivity = () => {          
        setOfflinemsgflag(false);  
     console.log("offlinemsgflagref", offlinemsgflagref);
        NetInfo.fetch().then(state => {           
            console.log("Is connected?111", state.isConnected);
            //  setIsStarted({setState:false});
            if(state.isConnected.toString() === "false"){
               // Alert.alert("You are offline!");
               if(!offlinemsgflagref.current){
                console.log("Is connected?", state.isConnected);

                console.log("Is NetInfoStateType?", state.NetInfoStateType);
                 connectstate = state.isConnected.toString() ;
                 console.log("connectstate", connectstate);
                Alert.alert("Opps!", 'No Internet Please check your connection',[
                    { 
                        text: 'Try Again',
                        onPress:() => errorAlerthandler()
                    }
               
                  ]);
                
                setOfflinemsgflag(true);   
                //   setState({
                //     ...state,
                //     asyncstorage: false,
                // });
                 offline=1;
                }
              } else {
                //Alert.alert("You are online!");
                console.log("You are online!", state.isConnected);
                manageretrive();
                if(offline===1)
                {
                    ToastAndroid.show("Back to online!",ToastAndroid.SHORT);
                }
                
              }
           
          });
          
         

         

        // For Android devices
        // if (Platform.OS === "android") {
        //   NetInfo.isConnected.fetch().then(isConnected => {
        //     if (isConnected) {
        //       Alert.alert("You are online!");
              //manageretrive();
        //     } else {
        //       Alert.alert("You are offline!");
        //     }
        //   });
        // } else {
        //   // For iOS devices
        //   NetInfo.isConnected.addEventListener(
        //     "connectionChange",
        //     handleFirstConnectivityChange
        //   );
        // }
      };
     
     
    useEffect(() => {
        // Alert.alert(props.userData);
        // state.user_logout=  AsyncStorage.getItem('user_logout');
        //setIsloading(true);
       
        loadProducts();
       
        // if (state.asyncstorage) {
        //     console.log('[RetriveData] RetriveData Screen: asyncstorage get values ' + state.asyncstorage);
        //     // state.user_logout=  AsyncStorage.getItem('user_logout');
        //     checkConnectivity();
            
        //     // asyncstorage=false;
        //     setState({
        //         ...state,
        //         asyncstorage: false,
        //     });

        // }
        // if(state.serverdata){
        //     //onRetrivetabledata();
        //     // dispacthactualdata();
        // }

       // console.log("typeof state.user_logout "+ typeof state.user_logout);
    }, []);
    
    const manageretrive = () => {
        
         getdatafromstorage();
        //onRetrivetabledata();
    }

    const getdatafromstorage = async () => {
        try {
            state.user_logout = await AsyncStorage.getItem('user_logout');
            state.user_name = await AsyncStorage.getItem('userName');
            state.user_number = await AsyncStorage.getItem('userNumber');            
            // console.log('RetriveData Screen user_logout1 :'+ state.user_logout);
            // if(state.user_logout!=='0'){
            //state.user_data = await AsyncStorage.getItem('userfirstname');
            state.user_first_name = await AsyncStorage.getItem('user_First_Name');
            state.user_last_name = await AsyncStorage.getItem('user_Last_Name');
            state.isUserImageAvailable = await AsyncStorage.getItem('is_User_Image_Available');
            //console.log('RetriveData Screen isUserImageAvailable :'+ state.isUserImageAvailable);
            state.user_BloodGroup = await AsyncStorage.getItem('user_BloodGroup');
            state.user_Gender = await AsyncStorage.getItem('user_Gender');
            state.user_DOB = await AsyncStorage.getItem('user_DOB');
            state.user_email = await AsyncStorage.getItem('user_Email');
            state.user_Confermation = await AsyncStorage.getItem('user_Confermation');
            state.user_Proof = await AsyncStorage.getItem('user_Proof');
            state.user_address_line1 = await AsyncStorage.getItem('user_Address_Line1');
            state.user_city = await AsyncStorage.getItem('user_City');
            state.user_district = await AsyncStorage.getItem('user_District');
            state.user_country = await AsyncStorage.getItem('user_Country');
            
            state.user_area = await AsyncStorage.getItem('user_Area');
            state.user_state_name = await AsyncStorage.getItem('user_State_Name');
            state.user_latitude = await AsyncStorage.getItem('user_Latitude');
            state.user_longitude = await AsyncStorage.getItem('user_Longitude');
            state.user_pincode = await AsyncStorage.getItem('user_Pincode');
            state.user_bood_donated = await AsyncStorage.getItem('user_Bood_Donated');
            state.user_bood_request_raised = await AsyncStorage.getItem('user_Bood_Request_Raised');
            state.user_Proof_Select = await AsyncStorage.getItem('user_Proof_Select');
            state.user_id = await AsyncStorage.getItem('user_Id');
            state.admin_comments = await AsyncStorage.getItem('admin_Comments');

            state.sos_name1 = await AsyncStorage.getItem('user_sos_name1');
            state.sos_name2 = await AsyncStorage.getItem('user_sos_name2');
            state.sos_name3 = await AsyncStorage.getItem('user_sos_name3');
            console.log('RetriveData Screen state.sos_name1 set ' + state.sos_name1 + state.sos_name2);
            state.sos_name1_number = await AsyncStorage.getItem('user_sos_name1_number');
            state.sos_name2_number = await AsyncStorage.getItem('user_sos_name2_number');
            state.sos_name3_number = await AsyncStorage.getItem('user_sos_name3_number');
			state.user_sos_msg = await AsyncStorage.getItem('user_sos_msg');
			
            setState({
                ...state,
                asyncstorage: false,
            });

            // }
            console.log('[RetriveData] From Storage Screen ' + state.user_id + state.serverdata);
			console.log(state);
            // userNumber = await AsyncStorage.getItem('userNumber');+
            if (state.serverdata) {
                onRetrivetabledata();
                setState({
                    ...state,
                    serverdata: false,
                });
                //dispacthactualdata();
            }
            
        } catch (e) {
            console.log('[RetriveData] Screen error' + e);
        }
    }

    const onRetrivetabledata = () => {
       
        //console.log(state.user_number+"state.user_number"); 
        // let API_URL = '${Server_URL}/Retrive_Component/user_login_retrive_data.php';
        let API_URL = `${Server_URL}/Retrive_Component/user_login_retrive_data.php`;
        // setmarkers:{isloading:true};
        fetch(API_URL, {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                mobile: state.user_number
            })

        }).then(res => res.json()).then(res => {
            console.log("[RetriveData] res");

            console.log(res);
            console.log("[RetriveData] res.ok value"+res.ok);
            //console.log(state.isRequestCompleted);
            setState({
                ...state,
                serverdata: false,
            });            
            if (res == "No") {
                console.log("[RetriveData] No");

                // ToastAndroid.show("No Blood  Request is Available, Please try after some time",ToastAndroid.LONG);
                // console.log(state.isBoodRequestAvailable);
                // console.log(" onMapget2 state.isRequestCompleted");
                // console.log(state.isRequestCompleted);
            }
            else if(res===']'){
                console.log("[RetriveData] No data");
            }
            else {

                console.log("[RetriveData] server data else state.user_id "+state.user_id);
                setupretrivedata = JSON.parse(res);
                //console.log("retriveserverdata before");
                //console.log(setupretrivedata);

                for (data of setupretrivedata) {
                    console.log("setupretrivedata");
                    console.log(data);
                }
                
                //console.log('data.sdfsdf ' + data.sdfsdf);
                onRetrivetableSosdata();
                if (state.user_id === null) {
                    console.log('[RetriveData] *****table data copy to local**** old '+
                    state.user_id+state.user_BloodGroup+state.user_DOB+state.user_email);
                    // setState({
                    //     ...state,
                    //     user_id: data.userid,
                    //     user_BloodGroup: data.bloodgroup,
                    //     user_DOB: data.dob,
                    //     user_email: data.email,
                    //     user_first_name: data.firstname,
                    //     user_last_name: data.lastname,
                    //     retrivedata: true,
                    //     user_request:data.userrequest,                        
                    // });
                                  
                    dipatchserverdata(data);
                    // setState({
                    //     ...state,
                    //     dispatch_sos_ServerData:true,                        
                    // });
                    
                }
                else {
                    dispacthactualdata();
                }
                
                // setState({
                //     ...state,
                //     user_level:data.userlevel ,
                //     user_rewardPoint: data.userrewardPoint ,
                //     user_donated: data.userdonated,
                //     user_request: data.userrequest,
                //     user_rewardsclaimed: data.userrewardsclaimed,                   
                //     serverdata: false,
                //     retrivedata:true,
                //     user_state_name:data.userstate,
                // });   
                // setuserdataderver({
                //     ...userdataderver,
                //     user_id: data.userid,
                //     user_BloodGroup:data.bloodgroup,
                //     user_DOB:data.dob,                        
                //     user_email:data.email,
                //     user_first_name:data.firstname,
                //     user_last_name:data.lastname,
                //     retrivedata:true,       
                //     user_Confermation:data.avaliable,
                //     user_Proof:data.proofstatus, 
                //     user_address_line1:data.useraddressline1,
                //     user_city:  data.usercity ,
                //     user_country: data.usercountry, 
                //     user_state_name: data.userstate  ,
                //     user_latitude:data.userlocationlatitude,
                //     user_longitude:data.userlocationlongitude,
                //     user_pincode: data.userpincode ,                 
                //     user_level:   data.userlevel ,
                //     user_rewardPoint: data.userrewardPoint ,
                //     user_donated: data.userdonated  ,
                //     user_request: data.userrequest ,
                //     user_rewardsclaimed: data.rewardsclaimed,

                // });
                //console.log('user_rewardsclaimed ' + state.user_rewardsclaimed);
                // console.log( state);
                //console.log( userdataderver);
                //console.log('data from server ');
                //console.log(data);

                console.log('[RetriveData] state.proof_status2 same typeof data.userproofstatus ' + state.proof_status+typeof data.userproofstatus);
                // if ((data.proofstatus !== null
                //     || data.proofstatus !== ' ' || data.proofstatus !== " ")) 
                if ((data.userproofstatus !== null && data.userproofstatus !== ' ' &&
                 data.userproofstatus !== " ") &&  typeof data.userproofstatus !== "undefined") {
                    console.log('[RetriveData] new data.userproofstatus  ' + data.userproofstatus);
                    dispatch(toggledata.toggleuser_proof_status(data.userproofstatus));
                    setState({
                        ...state,
                        proof_status: data.userproofstatus,
                        serverdata: false,
                    });
                }
                console.log('[RetriveData] state.admincomments ' + state.admin_comments);
                if(state.admin_comments !== data.admincomments)
                {
                if ((data.admincomments !== null
                    && data.admincomments !== ' ' && data.admincomments !== " ")) {
                    console.log('[RetriveData] new data.admincomments  ' + data.admincomments);
                    ToastAndroid.show('admin comments:'+ data.admincomments, ToastAndroid.LONG);
                    setState({
                        ...state,
                        admin_comments: data.admincomments,
                        serverdata: false,
                    });
                    AsyncStorage.setItem('admin_Comments', data.admincomments);
                    dispatch(toggledata.toggleadmin_comments(data.admin_comments));
                }
                }
                //console.log('data.userdonated ' + data.userdonated);
                //console.log('data.userstate ' + data.userstate);
                checkdata(data);
                setState({
                    ...state,
                    retrivedata: false,
                });

                // console.log(state.isBoodRequestAvailable);
            }
            //console.log(data.dob+data.bloodgroup);
            let val;
        }).catch((error) => {

                setState({
                    ...state,
                    serverdata:false,
                    retrivedata: false,
                    asyncstorage: false,
                });
                console.error("Internet connection "+error);
                console.log("[RetriveData] list error "+error);
                Alert.alert("Sorry", 'Something went wrong',error [
                    { 
                        text: 'Try Again',
                        onPress:() => onRetrivetabledata()
                    }
                
                  ]);                
                console.log("[RetriveData] state serverdatas "+state.serverdata+state.retrivedata);                              
            });
        //console.log(data.dob+data.bloodgroup);
        
    };

    const checkdata = (data) => {       

        console.log('[RetriveData] state.proof_status same ' + state.proof_status);
        if (state.user_id === data.userid) {
            console.log('[RetriveData] state.user_id same ' + state.user_id);
        }

        //dispacthactualdata();
        
        setState({
            ...state,
            asyncstorage: false,
        });
        console.log('[RetriveData] check data');
    }

    const setsosasyncstorage = async (datas) => {       
        try{

           
        console.log('[RetriveData] sos setsosasyncstorage '+datas.Name1);

        if (typeof datas.Name1 !== "undefined") {
            await AsyncStorage.setItem('user_sos_name1', datas.Name1);
        }

        if (typeof datas.Name1Number !== "undefined") {
           await AsyncStorage.setItem('user_sos_name1_number', datas.Name1Number);
          }

        if (typeof datas.Name2 !== "undefined") {
            await AsyncStorage.setItem('user_sos_name2', datas.Name2);
        }

        if (typeof datas.Name2Number !== "undefined") {
            await AsyncStorage.setItem('user_sos_name2_number', datas.Name2Number);
           }

        if (typeof datas.Name3 !== "undefined") {
            await AsyncStorage.setItem('user_sos_name3', datas.Name3);
        }

        if (typeof datas.Name3Number !== "undefined") {
           await AsyncStorage.setItem('user_sos_name3_number', datas.Name3Number);
          }
          console.log('[RetriveData] sos setsosasyncstorage state sos_name1 '+state.sos_name1+state.sos_name2);   
    
        console.log('[RetriveData] inside sos setasyncstorage completed ');
    }
    catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
       
}

const onRetrivetableSosdata = () => {
    console.log(state.user_number+"onRetrivetableSosdata state.user_number");
    let API_URL = `${Server_URL}/Retrive_Component/user_sos_data.php`;    
    // let API_URL = `${Server_URL}/Retrive_Component/user_sos_data.php`;    
    //user_data_ip_address
    //let API_URL = 'http://192.168.0.9/help_1/Retrive_Component/user_sos_data.php';
    // setmarkers:{isloading:true};
    fetch(API_URL, {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        mobile: state.user_number,
        reqtype: '2'
      })

    }).then(res => res.json()).then(res => {
      console.log("[RetriveData] res");

      console.log(res);
      console.log("[RetriveData] res.ok value" + res.ok);
      //console.log(state.isRequestCompleted);     
      if (res == "No") {
        console.log("[RetriveData] No");
        // ToastAndroid.show("No Blood  Request is Available, Please try after some time",ToastAndroid.LONG);
        // console.log(state.isBoodRequestAvailable);
        // console.log(" onMapget2 state.isRequestCompleted");
        // console.log(state.isRequestCompleted);
      }
      else if (res === ']') {
        console.log("[RetriveData] No data");
      }
      else {

        console.log("[RetriveData] sosdata server data else state.user_id " + state.user_id);
        setupsosretrivedata = JSON.parse(res);
        //console.log("retriveserverdata before");
        //console.log(setupretrivedata);

        for (sosdata of setupsosretrivedata) {
          console.log("sosdata setupretrivedata");
          console.log(sosdata);
        }
        console.log("sosdata state.sos_name1 compare"+sosdata.Name1.trim()+state.sos_name1);
        if (state.sos_name1.trim() !== sosdata.Name1.trim() || state.sos_name2.trim() !== sosdata.Name2.trim() || state.sos_name3.trim() !== sosdata.Name3.trim()){
            console.log("sosdata dipatchsosdata");
            dipatchsosdata(sosdata);
        }
        else
        {
            console.log("sosdata not dipatch sos data");
        }
        
      }
      //console.log(data.dob+data.bloodgroup);
      let val;
    }).catch((error) => {
      
      console.error("Internet connection " + error);
      console.log("[RetriveData] list error " + error);
      Alert.alert("Sorry", 'Something went wrong', error[
        {
          text: 'Try Again',
          onPress: () => onRetrivetableSosdata()
        }

      ]);
      
    });


  }

  const dipatchsosdata = (datas) => {
    console.log('[RetriveData] dipatchsosdata data');
    console.log(datas);
    try {

      if (typeof datas.Name1 !== "undefined") {
        dispatch(toggledata.toggleuser_sos_name1(datas.Name1));
      }

      if (typeof datas.Name1Number !== "undefined") {
        dispatch(toggledata.toggleuser_sos_name2(datas.Name1Number));
      }
      if (typeof datas.Name2 !== "undefined") {
        dispatch(toggledata.toggleuser_sos_name2(datas.Name2));
      }

      if (typeof datas.Name2Number !== "undefined") {
        dispatch(toggledata.toggleuser_sos_name2(datas.Name2Number));
      }

      if (typeof datas.Name3 !== "undefined") {
        dispatch(toggledata.toggleuser_sos_name3(datas.Name3));
      }

      if (typeof datas.Name3Number !== "undefined") {
        dispatch(toggledata.toggleuser_sos_name3(datas.Name3Number));
      }
      
      console.log('[RetriveData] sos data datas.Name1' + datas.Name1,datas.Name2);

      setsosasyncstorage(datas);
    } catch (e) {
      console.log('[RetriveData] RetriveData dispatch error' + e);
    }
  }

    const dispacthactualdata = () => {
        try {

            //console.log('retriveserverdata  '+state.retriveserverdata.dob);
            //console.log('state.user_DOB '+state.user_DOB);
            // if(state.user_DOB === state.retriveserverdata.dob)
            // {
            //     console.log('user_DOB '+state.user_DOB);
            // }
            //dispatch(toggledata.toggleuser_Id(data.userid));
            console.log('[RetriveData] dispacthing actualdata');
            console.log(state);
            dispatch(toggledata.toggleusername(state.user_name));
            dispatch(toggledata.toggleusernumber(state.user_number));
            dispatch(toggledata.toggleuser_Proof_Select(state.user_Proof_Select));
            dispatch(toggledata.toggleuser_bood_request_raised(state.user_bood_request_raised));
            dispatch(toggledata.toggleuser_bood_donated(state.user_bood_donated));
            dispatch(toggledata.toggleuser_pincode(state.user_pincode));
            dispatch(toggledata.toggleuser_longitude(state.user_longitude));
            dispatch(toggledata.toggleuser_latitude(state.user_latitude));
            dispatch(toggledata.toggleuser_state_name(state.user_state_name));
            dispatch(toggledata.toggleuser_area(state.user_area));
            dispatch(toggledata.toggleuser_city(state.user_city));
            dispatch(toggledata.toggleuser_district(state.user_district));
            dispatch(toggledata.toggleuser_country(state.user_country));
            dispatch(toggledata.toggleuser_address_line1(state.user_address_line1));
            dispatch(toggledata.toggleuser_Proof(state.user_Proof));
            dispatch(toggledata.toggleuser_Confermation(state.user_Confermation));
            dispatch(toggledata.toggleuser_DOB(state.user_DOB));
            dispatch(toggledata.toggleuserfirstname(state.user_first_name));
            dispatch(toggledata.toggleuserlastname(state.user_last_name));
            dispatch(toggledata.toggleuserisUserImageAvailable(state.isUserImageAvailable));
            dispatch(toggledata.toggleuser_BloodGroup(state.user_BloodGroup));
            dispatch(toggledata.toggleuser_Gender(state.user_Gender));
            dispatch(toggledata.toggleuseremail(state.user_email));
            dispatch(toggledata.toggleuser_Id(state.user_id));
            //dispatch(toggledata.toggleuser_Id(state.user_id));
            //console.log('state.userid tog '+state.user_id);
        } catch (e) {
            console.log('[RetriveData] RetriveData dispatch error' + e);
        }
    }
    const dipatchserverdata = (datas) => {
        console.log('[RetriveData] dipatchserverdata data datas.userid *****'+datas.userid);
        console.log(datas);        
        try {            
            
            
            dispatch(toggledata.toggleusername(state.user_name));
            
            dispatch(toggledata.toggleusernumber(state.user_number));
            //dispatch(toggledata.toggleuser_Proof_Select(datas.user_Proof_Select));
            if(typeof datas.userrequest !== "undefined")
            {
                dispatch(toggledata.toggleuser_bood_request_raised(datas.userrequest));
            } 

            if(typeof datas.userdonated !== "undefined")
            {
                dispatch(toggledata.toggleuser_bood_donated(datas.userdonated));
                
                
            }

            if(typeof datas.userpincode !== "undefined")
            {
                dispatch(toggledata.toggleuser_pincode(datas.userpincode));
                
                
            }

            if(typeof datas.userlocationlongitude !== "undefined")
            {
                dispatch(toggledata.toggleuser_longitude(datas.userlocationlongitude));
               
                
            }

            if(typeof datas.userlocationlatitude !== "undefined")
            {
                dispatch(toggledata.toggleuser_latitude(datas.userlocationlatitude));                
                
            }

            if(typeof datas.userstate !== "undefined")
            {
                dispatch(toggledata.toggleuser_state_name(datas.userstate));
            }

            if(typeof datas.usercity !== "undefined")
            {
                dispatch(toggledata.toggleuser_city(datas.usercity));
            
            }

            if(typeof datas.useraddressline1 !== "undefined")
            {
                dispatch(toggledata.toggleuser_address_line1(datas.useraddressline1));
            }
                       
            if(typeof datas.district !== "undefined")
            {
                dispatch(toggledata.toggleuser_district(datas.district));
            }

            if(typeof datas.usercountry !== "undefined")
            {              
                dispatch(toggledata.toggleuser_country(datas.usercountry));
            }  

            if(typeof datas.userconfermation !== "undefined")
            {
                dispatch(toggledata.toggleuser_Confermation(datas.userconfermation));
               
            }

            if(typeof datas.userdob !== "undefined")
            {
                dispatch(toggledata.toggleuser_DOB(datas.userdob));
            }

            if(typeof datas.userfirstname !== "undefined")
            {
                
                dispatch(toggledata.toggleuserfirstname(datas.userfirstname.trim()));
                
            }

            if(typeof datas.userlastname !== "undefined")
            {
                dispatch(toggledata.toggleuserlastname(datas.userlastname.trim()));
            }

            if(typeof datas.userbloodgroup !== "undefined")
            {
                dispatch(toggledata.toggleuser_BloodGroup(datas.userbloodgroup));
                
            }

            if(typeof datas.usergender !== "undefined")
            {
                dispatch(toggledata.toggleuser_Gender(datas.usergender));
                
            }

            if(typeof datas.userproof !== "undefined" && datas.userproof !== null)
            {               
                dispatch(toggledata.toggleuser_Proof_Select(datas.userproof));
                dispatch(toggledata.toggleuser_Proof(datas.userproof));                
            }


            if(typeof datas.useremail !== "undefined")
            {
                dispatch(toggledata.toggleuseremail(datas.useremail));
            }

            if(typeof datas.userid !== "undefined")
            {
                dispatch(toggledata.toggleuser_Id(datas.userid));
            }
                         
               
            if(typeof datas.isUserImageAvailable !== "undefined")
            {
                dispatch(toggledata.toggleuserisUserImageAvailable(datas.isUserImageAvailable));
            }

            if(typeof datas.userrewardsclaimed !== "undefined")
            {
                dispatch(toggledata.toggleuserrewardclaimed(datas.userrewardsclaimed));
            } 
            
            //console.log('datas.userid tog '+datas.user_id);
            setasyncServerdatasHandler(datas);
        } catch (e) {
            console.log('[RetriveData] RetriveData dispatch error' + e);
        }
    }

    const setasyncServerdatasHandler = async (datas) => {
        console.log(" ***[RetriveData] ***aynsc storgae datas ");
        console.log(datas);
        try {
            
        //await AsyncStorage.setItem('userName', datas.username);	
        //await AsyncStorage.setItem('userNumber', datas.username);	
    
          if (typeof datas.userfirstname !== "undefined" && datas.userfirstname !== null) {
            await AsyncStorage.setItem('user_First_Name', datas.userfirstname);
          }
    
          if (typeof datas.userlastname !== "undefined" && datas.userlastname !== null) {
            await AsyncStorage.setItem('user_Last_Name', datas.userlastname);
          }
    
    
    
          if (typeof datas.useremail !== "undefined" && datas.useremail !== null) {
            await AsyncStorage.setItem('user_Email', datas.useremail);
          }
    
          if (typeof datas.isUserImageAvailable !== "undefined" && datas.isUserImageAvailable !== null) {
            await AsyncStorage.setItem('is_User_Image_Available', datas.isUserImageAvailable);
          }
    
    
          if (typeof datas.userbloodgroup !== "undefined" && datas.userbloodgroup !== null) {
            await AsyncStorage.setItem('user_BloodGroup', datas.userbloodgroup);
          }
    
    
    
          if (typeof datas.usergender !== "undefined" && datas.usergender !== null) {
            await AsyncStorage.setItem('user_Gender', datas.usergender);
          }
    
    
          if (typeof datas.userdob !== "undefined" && datas.userdob !== null) {
            await AsyncStorage.setItem('user_DOB', datas.userdob);
          }
    
          if (typeof datas.userconfermation !== "undefined" && datas.userconfermation !== null) {
            await AsyncStorage.setItem('user_Confermation', ((datas.userconfermation) ? '1' : '0'));
          }
          //await AsyncStorage.setItem('user_Proof', datas.user_Proof);
          if (typeof datas.userproof !== "undefined" && datas.userproof !== null) {
            await AsyncStorage.setItem('user_Proof_Select', datas.userproof);
            await AsyncStorage.setItem('user_Proof', datas.userproof);
          }
    
          if (typeof useraddressline1 !== "undefined" && useraddressline1 !== null) {
            await AsyncStorage.setItem('user_Address_Line1', datas.useraddressline1);
          }
    
          if (typeof usercity !== "undefined" && usercity !== null) {
            await AsyncStorage.setItem('user_City', datas.usercity);
          }
    
    
          if (typeof userstate !== "undefined" && userstate !== null) {
            await AsyncStorage.setItem('user_State_Name', datas.userstate);
          }
    
          if (typeof datas.district !== "undefined" && datas.district !== null) {
            await AsyncStorage.setItem('user_District', datas.district);
          }
    
          if (typeof usercountry !== "undefined" && usercountry !== null) {
            await AsyncStorage.setItem('user_Country', datas.usercountry);
          }
    
          if (typeof datas.userpincode !== "undefined" && datas.userpincode !== null) {
            await AsyncStorage.setItem('user_Pincode', datas.userpincode);
          }
    
          if (typeof datas.userlocationlongitude !== "undefined" && datas.userlocationlongitude !== null) {
            // await AsyncStorage.setItem('user_Longitude', datas.userlocationlongitude.stringify());	
            await AsyncStorage.setItem('user_Longitude', datas.userlocationlongitude);
    
          }
    
          if (typeof datas.userlocationlatitude !== "undefined" && datas.userlocationlatitude !== null) {
             await AsyncStorage.setItem('user_Latitude', datas.userlocationlatitude);
            
          }
    
        if (typeof datas.userid !== "undefined" && datas.userid !== null) {
             await AsyncStorage.setItem('user_id', datas.userid);
            
          }
          
          if (typeof datas.userrewardsclaimed !== "undefined" && datas.userrewardsclaimed !== null) {
             await AsyncStorage.setItem('user_rewards_claimed', datas.userrewardsclaimed);
            
          }
           
          console.log("AsyncStorage is over");
        } catch (e) {
          console.log(e);
        }
      }
    
    if(isloading){   

        return ( <View>
            <ActivityIndicator size="large"/>
        </View>
        )
    }

    return (
        null
    )

}

export default RetriveData;

// class RetriveDatas extends React.Component {

//     componentDidMount(){
//         checkConnectivity();  
//         console.log("Is componentDidMount?", state.isConnected);
//     }

//      checkConnectivity(){
//         NetInfo.fetch().then(state => {           
//             console.log("Is connected?", state.isConnected);
//             console.log("Is NetInfoStateType?", state.NetInfoStateType);
                       
//             if(state.isConnected.toString() === "false"){
//                // Alert.alert("You are offline!");
//                 Alert.alert("Opps!", 'No Internet Please check your connection',[
//                     { 
//                         text: 'Try Again',
//                         onPress:this.checkConnectivity()
//                     }
                    
//                   ]);
                  
//                 //   setState({
//                 //     ...state,
//                 //     asyncstorage: false,
//                 // });
//                  //connect=1;
//               } else {
//                 //Alert.alert("You are online!");
//                 console.log("You are online!", state.isConnected);
//                 //manageretrive();
//                 // if(connect===1)
//                 // {
//                 //     ToastAndroid.show("Back to online!",ToastAndroid.SHORT);
//                 // }
                
//               }
           
//           });
          
         
         

//         // For Android devices
//         // if (Platform.OS === "android") {
//         //   NetInfo.isConnected.fetch().then(isConnected => {
//         //     if (isConnected) {
//         //       Alert.alert("You are online!");
//         //       manageretrive();
//         //     } else {
//         //       Alert.alert("You are offline!");
//         //     }
//         //   });
//         // } else {
//         //   // For iOS devices
//         //   NetInfo.isConnected.addEventListener(
//         //     "connectionChange",
//         //     handleFirstConnectivityChange
//         //   );
//         // }
//       };

//       render() {
//         return (
//          null
//         );
//       }

// }
// export const retriveService = new RetriveDatas();