import React, { useEffect,useState } from 'react';
import { View, Text,SafeAreaView,
   Button, StyleSheet,StatusBar,ToastAndroid,FlatList,
   TouchableOpacity,Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
//import Toaster from 'react-native-toaster';
import {useSelector,useDispatch} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles as MainScreenStyles} from '../../Main_Screen/MainScreen';
import AnimateNumber from 'react-native-countup';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import Covid_Global_Chart from '../Covid_Global_Component/Covid_Global_Chart';
import Covid_Cause_Screen from '../Covid_Home_Screen/Covid_Cause_Screen';
import { styles as ProfileScreenStyles } from '../../Screens/ProfileScreen/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Covid_India_Contacts_Screen = (props) => {
  const themes = useTheme();
  const user_data_user_first_name=useSelector(state =>
    state.helpone.user_first_name,
    );
    const [selectedcontactloc, setselectedcontactloc] = useState(null);
    const initialState = {
        contact: "",
        location: "",  
        refreshing: false,      
    }
    let newData={};
    const [state, setState] = useState(initialState);
   
    useEffect(() => {      
      console.log('[Covid_India_Contacts_Screen] home ');
      console.log(props.props);
      console.log(props.primarycontacts);
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
 
    
   const  handleStateContactChange = (e) =>{
    newData = props.props.filter((contact)=>{
      return contact.location === e;
    })
    console.log("newData") ;
    console.log(newData) ;
    newData.map((contact, index) => {
      console.log("regiondata") ;
      console.log(contact) ;
      setState({ ...state,
        location: contact.location,
        contact: contact.number,       
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
 {props.primarycontacts.number ? 
            <View>  
             <View > 
            
        <View  style={[ProfileScreenStyles.cardview]}>             
            <View style={[ProfileScreenStyles.cardview,styles.buttonstyle]}>
        <Text style={[styles.textStyle,{color:'#1DA1F2'}]}>Primary Contact Deatils</Text>
        </View>
            <TouchableOpacity style={[ProfileScreenStyles.cardview,ProfileScreenStyles.row,styles.buttonstyle]}
            onPress={() => Linking.openURL(`tel:${props.primarycontacts.number}`)}
            >
            <Icon style={{ color: 'green' }} name="phone" 
            // color={colors.text} 
            size={20} />
            <Text style={{color: 'green'}}>  Number: {props.primarycontacts.number}</Text>
            </TouchableOpacity>
            {/* <Text> {props.primarycontacts.numbertollfree}</Text> */}
            <TouchableOpacity style={[ProfileScreenStyles.cardview,ProfileScreenStyles.row,styles.buttonstyle]}
            onPress={() => Linking.openURL(`mailto:${props.primarycontacts.email}`)}
            >
                 <Icon name="email" color='#DC143C' size={20} />
                <Text style={{color: '#8B0000'}}>  Email</Text>  
            </TouchableOpacity>
                     
            <TouchableOpacity style={[ProfileScreenStyles.cardview,ProfileScreenStyles.row,styles.buttonstyle]}
            onPress={() => Linking.openURL(`${props.primarycontacts.twitter}`)}
            >
                <Icon name="twitter" color='#1DA1F2' size={20} />
            <Text style={{color: '#1DA1F2'}} >  Twitter </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[ProfileScreenStyles.cardview,ProfileScreenStyles.row,styles.buttonstyle]}
            onPress={() => Linking.openURL(`${props.primarycontacts.facebook}`)}
            >
                <Icon name="facebook" color= '#4267B2' size={20} />
            <Text style={{color: '#4267B2'}}>  Facebook</Text>
              </TouchableOpacity>
            {/* <Text>facebook: {props.primarycontacts.facebook}</Text> */}
            </View>
           
         </View>
        <View>
        
          <View style={[ProfileScreenStyles.cardview,{alignItems:'center'}]}>
         
          <Text style={[styles.textStyle,{color:'#1DA1F2'}]}>Pick Your State</Text>
        <Picker
              selectedValue={selectedcontactloc}
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
                    setselectedcontactloc(e);
                    handleStateContactChange(e)
                }
              }>
              {/* <Picker.Item label="Select" value="" /> */}
              {props.props.map((contact, i) =>
               <Picker.Item  key={i}  label={contact.location} value={contact.location}/>
               )}

            </Picker>
            
            {state.location ?
            <View 
            
            style={[ProfileScreenStyles.cardview,{paddingBottom:0,marginTop:0}]}
            
            >
                 <TouchableOpacity 
                 style={[styles.buttonstyle,{paddingBottom:0}]}
            onPress={() => Linking.openURL(`tel:${state.contact}`)}
            >
                <Text  style={styles.textStyle}>{state.location}</Text>
                <View style={[ProfileScreenStyles.row]}>
                <Icon style={{ color: 'green' }} name="phone" 
                // color={colors.text}
                
                size={20} />
                <Text style={{ color: 'green' }}>  {state.contact}</Text>
                </View>
                </TouchableOpacity>
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
                     <TouchableOpacity 
                //  style={[styles.buttonstyle,]}
            onPress={() => Linking.openURL(`tel:${item.number}`)}
            >
                    <View style={[{alignItems:'center'}]}>
                    <Text style={styles.textStyle}>{item.location}</Text>  
                    <View style={[ProfileScreenStyles.row,{padding:0}]}>  
                    <Icon style={{ color: 'green' }} name="phone"
                    //  color={colors.text} 
                     size={20} />
                    <Text style={[ProfileScreenStyles.row,{padding:0,color: 'green'}]}>  {item.number}</Text> 
                    </View>    
                    </View>   
                    </TouchableOpacity>    
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
export default Covid_India_Contacts_Screen;

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

