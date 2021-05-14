import React, { useEffect,useState } from 'react';
import { View, Text,SafeAreaView,
   Button, StyleSheet,StatusBar,ToastAndroid,FlatList,
   TouchableOpacity,Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import Toaster from 'react-native-toaster';
import {useSelector,useDispatch} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles as MainScreenStyles} from '../../../Main_Screen/MainScreen';
import AnimateNumber from 'react-native-countup';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import { styles as ProfileScreenStyles } from '../../../Screens/ProfileScreen/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Covid_Bed_Details_Screen = (props) => {
  const themes = useTheme();
  const user_data_user_first_name=useSelector(state =>
    state.helpone.user_first_name,
    );
    const [selectedBedloc, setselectedBedloc] = useState(null);
    const initialState = {
      bed: {}, 
      summary:{},     
      ruralHospitals: null,
        ruralBeds: null,
        urbanHospitals: null,
        urbanBeds: null,
        totalHospitals: null,
        totalBeds: null,
        asOn: null,
      selectedbedloc:null ,       
        refreshing: false,      
    }
    let newData={};
    const [state, setState] = useState(initialState);
   
    useEffect(() => {      
      console.log('[Covid_Bed_Details_Screen] home ');
      console.log(props.props);
      console.log(props.summary);
    //   console.log(props);
    //      setState({ ...state,
    //         primarydetails:props.primarycontacts,
    //     // recovered: contact.discharged,
    //   });
    //   console.log(props.data.deaths);
    //   {props.data.map((regiondata, index) => {
    //     // console.log(" props.data index " + index)
    //     // console.log(regiondata)     
    //     // console.log("index "+regiondata.loc)          
        
    //   })}
      
     },[]);
 
    
   const  handleStateBedChange = (e) =>{
    newData = props.props.filter((bed)=>{
      return bed.state === e;
    })
    console.log("newData") ;
    console.log(newData) ;
    newData.map((bed, index) => {
      console.log("bed data") ;
      console.log(bed) ;
      setState({ ...state,       
        ruralHospitals: bed.ruralHospitals,       
        ruralBeds: bed.ruralBeds, 
        urbanHospitals: bed.urbanHospitals, 
        urbanBeds: bed.urbanBeds, 
        totalHospitals: bed.totalHospitals, 
        totalBeds: bed.totalBeds, 
        asOn: bed.asOn, 
      });
    });  
    console.log("state") ;
    console.log(state) ;
   }
   const handleRefresh = () => {
    console.log("refresh");
    ToastAndroid.show("Refreshed", 200, ToastAndroid.LONG);

    // setState(
    //   {
    //     ...state,
    //     checkserverdata: true,
    //     isLoading: true,
    //     refreshing: true,
    //     search: '',
    //     // retrivemydonateddata:state.fulldata,
    //   },
    // );
    //onRetrivemydonateddata();
	// loadProducts();
  };

  const renderHeader = () => {
      return (
          <View>
 {props.summary.ruralHospitals ? 
            <View>  
             <View > 
            
        <View  style={[ProfileScreenStyles.cardview]}>             
            <View style={[ProfileScreenStyles.cardview,styles.buttonstyle]}>
        <Text style={[styles.textStyle,{color:'#1DA1F2'}]}>Summary</Text>
        
        </View>
        <Text 
        style={[styles.textStyle,{color:'#1DA1F2'}]}
        >ruralHospitals {props.summary.ruralHospitals}</Text>
        <Text 
        style={[styles.textStyle,{color:'#1DA1F2'}]}
        >ruralBeds {props.summary.ruralBeds}</Text>
        <Text 
        style={[styles.textStyle,{color:'#1DA1F2'}]}
        >urbanBeds {props.summary.urbanBeds}</Text>
        <Text 
        style={[styles.textStyle,{color:'#1DA1F2'}]}
        >totalHospitals {props.summary.totalHospitals}</Text>
        <Text 
        style={[styles.textStyle,{color:'#1DA1F2'}]}
        >totalBeds {props.summary.totalBeds}</Text>
       


            </View>
           
         </View>
        <View>
        
          <View style={[ProfileScreenStyles.cardview,{alignItems:'center'}]}>
         
          <Text style={[styles.textStyle,{color:'#1DA1F2'}]}>Pick Your State</Text>
        <Picker
              selectedValue={selectedBedloc}
              style={[{ height: 50, width:200,alignSelf: 'center', 
            //   color: colors.text, 
            }]}
              // style={[
              //   // MainScreenStyles.cardview,
              //   { 
              //   height: 50, width:200,marginTop:'8%',
              //   justifyContent: 'center', color: colors.text, }]}
              onValueChange={(e, itemIndex) => 
                {  console.log(e);                   
                    setselectedBedloc(e);
                    handleStateBedChange(e)
                }
              }>
              {/* <Picker.Item label="Select" value="" /> */}
              {props.props.map((bed, i) =>
               <Picker.Item  key={i}  label={bed.state} value={bed.state}/>
               )}

            </Picker>
            
            {state.ruralBeds ?
            <View 
            
            style={[ProfileScreenStyles.cardview,styles.buttonstyle,{}]}
            
            >
               <Text  style={styles.textStyle}>Total Hospitals: {state.totalHospitals}</Text>  
                <Text  style={styles.textStyle}>Total Beds: {state.totalBeds}</Text> 
                <Text  style={styles.textStyle}>Rural Hospitals: {state.ruralHospitals}</Text>                      
                <Text  style={styles.textStyle}>Rural Beds: {state.ruralBeds}</Text>  
                
                <Text  style={styles.textStyle}>Urban Hospitals: {state.urbanHospitals}</Text>  
                <Text  style={styles.textStyle}>Urban Beds: {state.urbanBeds}</Text>  
                <Text  style={styles.textStyle}>As On: {new Date(state.asOn).toDateString()}</Text>           
               
            </View>
            :null }
            </View>
            <View  style={[ProfileScreenStyles.cardview,{alignItems:'center',paddingBottom:'3%'}]} >
            <Text style={[styles.textStyle,{color:'#1DA1F2'}]} >All State Data</Text>
            </View>       
        
      </View>
      
      </View> 
      :null} 
          </View>
      )
  }

  const { colors } = useTheme();
    return (
        <SafeAreaView style={styles.container}>     
      
        <View 
        // style={[ProfileScreenStyles.cardview,{alignItems:'center',width:'95%'}]}
         >
            {props.props  ?
      <FlatList
      showsVerticalScrollIndicator={false}
              data={props.props}
              renderItem={({ item }) => (
                <View
                style={[ProfileScreenStyles.cardview,{alignItems:'center',}]}
                >
                   
                   <Text  style={styles.textStyle}>Total Hospitals: {item.totalHospitals}</Text>  
                <Text  style={styles.textStyle}>Total Beds: {item.totalBeds}</Text> 
                <Text  style={styles.textStyle}>Rural Hospitals: {item.ruralHospitals}</Text>                      
                <Text  style={styles.textStyle}>Rural Beds: {item.ruralBeds}</Text>  
                
                <Text  style={styles.textStyle}>Urban Hospitals: {item.urbanHospitals}</Text>  
                <Text  style={styles.textStyle}>Urban Beds: {item.urbanBeds}</Text>  
                <Text  style={styles.textStyle}>As On: {new Date(item.asOn).toDateString()}</Text>    
                    
                </View>
              )}
              keyExtractor={item => item.location}
              // ItemSeparatorComponent={renderSeparator}
              ListHeaderComponent={renderHeader}
            //   ListFooterComponent={renderFooter}
              onRefresh={handleRefresh}
              refreshing={state.refreshing}
      
            >
              {/* <Text>asas</Text>
             {!state.checkdiplayselected ?
              // <Text>{state.selectedvalue.bloodrequestid}</Text>
              <Text>asas</Text>
              :null} */}

            </FlatList>
          : null}  
          </View>
        </SafeAreaView>

        );
};
export default Covid_Bed_Details_Screen;

const styles = StyleSheet.create({
  container: {
    // flex: 1, 
    // alignItems: 'center', 
    justifyContent: 'space-evenly',
    // margin:'4%',    
  },
  buttonstyle:{      
    alignItems:'center',
    marginBottom:'4%',
    paddingBottom:'4%',
    justifyContent: 'center',   
  },
  textStyle:{
      fontWeight:'bold',
      paddingBottom:'1%'
  }
});

