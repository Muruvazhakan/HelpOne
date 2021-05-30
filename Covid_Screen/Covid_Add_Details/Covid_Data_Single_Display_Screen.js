import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useTheme, Text, RadioButton } from 'react-native-paper';
import { styles as ProfileScreenStyles } from '../../Screens/ProfileScreen/ProfileScreen';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Zocial from 'react-native-vector-icons/Zocial';
import { styles as CovidLimitListStyle } from '../Covid_Home_Screen/Covid_Details_List_Limt_Screen';
import { styles as CovidDisplayListStyle } from './Covid_Data_Display_List_Screen';
import { styles as BloodRequestStyle } from '../../Screens/Blood_Request/Blood_Request_Screen';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import { stat } from 'react-native-fs';
import {Server_URL} from '../../components/Parameter';
const Covid_Data_Single_Display_Screen = (props) => {
  const { colors } = useTheme();
  const user_data_user_Id = useSelector(state =>
    state.helpone.user_Id,
  );
  const user_data_user_number = useSelector(state =>
    state.helpone.user_number,
  );

 let normalBedCount= props.marker.BedCount,
  O2BedCount= props.marker.O2BedCount,
  ICUBedCount= props.marker.ICUBedCount,
  O2SupplyCount= props.marker.O2SupplyCount,
  BedCountAccepted=props.marker.BedCountAccepted,
  O2BedCountAccepted=props.marker.O2BedCountAccepted,
  ICUBedCountAccepted=props.marker.ICUBedCountAccepted,	
  O2SupplyCountAccepted=props.marker.O2SupplyCountAccepted;

  const initialData = {
    selectedDetail: null,   
    status: props.marker.status,
    detailsid:props.marker.CovidAddDetailsId,
    addeduserid:props.marker.addeduserid,    
  };
  
  const [state, setState] = useState(initialData);
  
  const [deatilselect, setdeatilselect] = useState(null);
  useEffect(() => {
    console.log("[Covid_Data_Single_Display_Screen] props**");
    console.log(props.databack); 
    console.log(props)
  });

  const detailsAcceptHandler = () => {
   
    let API_URL = `${Server_URL}/Covid_Components/Covid_Add_Details_Components/Covid_Accept_Close_Details_Handler.php`;
      fetch(API_URL,{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
        body: JSON.stringify({
          // we will pass our input data to server
          mobile: user_data_user_number,
          detailid: state.detailsid.trim(),
          addeduserid: state.addeduserid.trim(),
          detailstatus: state.status,
          BedCountAccepted:BedCountAccepted,
          O2BedCountAccepted:O2BedCountAccepted,
          ICUBedCountAccepted:ICUBedCountAccepted,	
          O2SupplyCountAccepted:O2SupplyCountAccepted,
          BedCount:normalBedCount,
          ICUBedCount:ICUBedCount,
          O2BedCount:O2BedCount,	
          O2SupplyCount:O2SupplyCount,
        })
  
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson + " responseJson");
          //ToastAndroid.show(responseJson,ToastAndroid.LONG);
  
          if (responseJson === "Already Accepted") {
            Alert.alert("Already Done", 'Details already Accepted!', [
              { text: 'Okay' }
            ]);
          }
          else if (responseJson === "Accepted") {
            Alert.alert("Done", 'Details are Accepted!', [
              { text: 'Okay' }
            ]);          
          }
      else if (responseJson == "Not Updated'") {
            Alert.alert("Failed!", 'Not Updated', [
              { text: 'Okay' }
            ]);
            
          }
          else {
            console.log("Recorded");
            reqno = responseJson.toString();
            setState({
              ...state,
              requestno: responseJson,
            }),
  
              Alert.alert("Closed", 'Details are'+state.status, [
                { text: 'Okay' }
              ]);          
  
          };
        })
        .catch((error) => {
          console.error(error);
        });
        
    }

  const acceptHandler = () => {
    console.log("acceptHandler deatilselect " + deatilselect);
    // if(props.marker.addeduserid===user_data_user_Id)
    // {
    //   Alert.alert("Opps!", 'Same user cannot be Accepted', [
    //     {
    //       text: 'Okay',          
    //     }
    //   ]);
    //   return false;
    // }

    if (state.deatilselect === null) {
      Alert.alert("Invalid data!", 'Please select your Requirement', [
        {
          text: 'Okay',
        }
      ]);
      return false;
    }
    if (deatilselect === "normalbed") {
      if (normalBedCount === '0' || normalBedCount <= 0) {
        Alert.alert("Invalid data!", 'Normal Bed is not available', [
          {
            text: 'Okay',
          }
        ]);
        return false;
      }
      normalBedCount--;
      BedCountAccepted++;
    }
    if (deatilselect === "O2bed") {
      if (O2BedCount === '0'|| O2BedCount < 0) {
        Alert.alert("Invalid data!", 'Oxygen Bed is not available', [
          {
            text: 'Okay',
          }
        ]);
        return false;
      }
     
        O2BedCount--;
        O2BedCountAccepted++;
     
    }



    if (deatilselect === "Icubed") {
      if (ICUBedCount === '0'|| ICUBedCount < 0) {
        Alert.alert("Invalid data!", 'ICU Bed is not available', [
          {
            text: 'Okay',
          }
        ]);
        return false;
      }
     
      ICUBedCount--;
      ICUBedCountAccepted++;
    }

   
    if (deatilselect === "O2cyl") {
      if (O2SupplyCount === '0'|| O2SupplyCount < 0) {
        Alert.alert("Invalid data!", 'Oxygen Cylinder is not available', [
          {
            text: 'Okay',
          }
        ]);
        return false;
      }
     
      O2SupplyCount--;
      O2SupplyCountAccepted++;
    }
    // props.navigation.goBack();
    detailsAcceptHandler();
    // databack("done");
    props.databack("done");
    console.log("O2BedCount " + O2BedCount+normalBedCount+O2SupplyCount+O2BedCount+BedCountAccepted);
  }

  return (
    <ScrollView>

      <SafeAreaView style={[styles.container, {
        // paddingTop: '7%'
      }]} >

        <View style={[ProfileScreenStyles.cardview, { alignSelf: 'stretch', fontSize: 30, fontWeight: 'bold' }]}>
          <Text style={[{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }]} >Details</Text>
        </View>

        <View style={[ProfileScreenStyles.cardview, { margin: '10%', padding: '10%', marginTop: '5%' }]}>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <FontAwesome name="id-badge" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>Id: {props.marker.CovidAddDetailsId}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>


            <Entypo name="location" color={colors.text} size={20} />
            <Text style={{ marginLeft: '3%' }}> {props.marker.title}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <Zocial name="statusnet" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>status: {props.marker.status}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>Contact Name: {props.marker.contactname}</Text>
          </View>
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${props.marker.contactnumber}`)}
            >
              <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
                <Icon style={{ color: 'green' }} name="phone" color={colors.text} size={20} />
                <Text style={[styles.cardDesc, { color: 'green', paddingLeft: '3%' }]}>Contact Number: {props.marker.contactnumber}</Text>
              </View>
            </TouchableOpacity>
          </View>





          {props.marker.BedCount > 0 || props.marker.O2BedCount > 0 || props.marker.ICUBedCount > 0 ?
            <View >
              <View style={[ProfileScreenStyles.row, { padding: 0, marginTop: '-5%', alignContent: 'center', justifyContent: 'center' }]}>
                <Fontisto name="bed-patient" color={colors.text} size={20} />
                <Text style={[CovidLimitListStyle.textheaderstyle, { paddingLeft: '3%' }]}>Bed Availablity</Text>
              </View>

              <View style={[CovidLimitListStyle.columncontentstyle, { justifyContent: 'center' }]}>

                <View style={CovidLimitListStyle.columnalignstyle}>
                  <View style={[ProfileScreenStyles.row]}>
                    <Text style={{ marginLeft: '3%', }}>Normal Bed</Text>
                    <Text style={{ marginLeft: '3%', }}>Oxygen Bed</Text>
                    <Text style={{ marginLeft: '3%', }}>ICU Bed</Text>
                  </View>
                </View>

                <View style={CovidLimitListStyle.columnalignstyle}>
                  <View style={[ProfileScreenStyles.row]}>

                    <Text >{props.marker.BedCount}</Text>
                    <Text style={CovidLimitListStyle.itemmiddlestyle}>{props.marker.O2BedCount}</Text>
                    <Text >{props.marker.ICUBedCount}</Text>
                  </View>
                </View>

              </View>
            </View>
            : null}

          {props.marker.O2SupplyCount > 0 ?
            <View style={[ProfileScreenStyles.row, { margin: 0, paddingTop: '8%' }]}>
              <Icon name="gas-cylinder" color={colors.text} size={20} />
              <Text
                style={CovidLimitListStyle.iconCovidLimitListStyle}

              >Oxygen Cylinder Available Count:  {props.marker.O2SupplyCount}</Text>
            </View>
            : null}

          {props.marker.BedCountAccepted > 0 || props.marker.O2BedCountAccepted > 0 || props.marker.ICUBedCountAccepted > 0 ?
            <View style={{ paddingBottom: "5%" }}>
              <View style={[ProfileScreenStyles.row, { padding: 0, marginTop: '-5%', alignContent: 'center', justifyContent: 'center',marginBottom:'3%' }]}>
                <Fontisto name="bed-patient" color={colors.text} size={20} />
                <Text style={[CovidLimitListStyle.textheaderstyle, { paddingLeft: '3%' }]}>Bed Accepted</Text>
              </View>

              <View style={[CovidLimitListStyle.columncontentstyle, { justifyContent: 'center' }]}>

                <View style={CovidLimitListStyle.columnalignstyle}>
                  <View style={[ProfileScreenStyles.row]}>
                    <Text style={{ marginLeft: '3%', }}>Normal Bed</Text>
                    <Text style={{ marginLeft: '3%', }}>Oxygen Bed</Text>
                    <Text style={{ marginLeft: '3%', }}>ICU Bed</Text>
                  </View>
                </View>

                <View style={CovidLimitListStyle.columnalignstyle}>
                  <View style={[ProfileScreenStyles.row]}>

                    <Text >{props.marker.BedCountAccepted}</Text>
                    <Text style={CovidLimitListStyle.itemmiddlestyle}>{props.marker.O2BedCountAccepted}</Text>
                    <Text >{props.marker.ICUBedCountAccepted}</Text>
                  </View>
                </View>

              </View>
            </View>
            : null}
          {/* {props.marker.BedCountAccepted > 0 && props.marker.BedCountAccepted !== "" ?
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>No of Normal Bed Accepted: {props.marker.BedCountAccepted}</Text>
			 </View>
          : null}
			
			{props.marker.O2BedCountAccepted > 0 && props.marker.O2BedCountAccepted !== "" ?
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>No of Details Accepted: {props.marker.O2BedCountAccepted}</Text>
			 </View>
          : null}
			
			
              {props.marker.ICUBedCountAccepted > 0 && props.marker.ICUBedCountAccepted !== "" ?
          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>No of Details Accepted: {props.marker.ICUBedCountAccepted}</Text>			
          </View>
          : null} */}

          {props.marker.O2SupplyCountAccepted === 0 || props.marker.O2SupplyCountAccepted !== "" ?
            <View style={[ProfileScreenStyles.row, { marginTop: '2%',marginBottom:0 }]}>
              <Icon name="gas-cylinder" color={colors.text} size={20} />
              <Text style={{ marginLeft: '5%' }}>No of Oxygen Cylinder Accepted: {props.marker.O2SupplyCountAccepted}</Text>
            </View>
            : null}


          <View style={[ProfileScreenStyles.row,
          { paddingBottom: 0, marginBottom: 0,marginTop:'7%' }
          ]}
          >
            <FontAwesome name="address-book" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>Address: {props.marker.address}</Text>
          </View>

          {/* <Text style={{ marginLeft: '5%' }}>District: {props.marker.district}</Text> */}

          <View style={[ProfileScreenStyles.row, { paddingBottom: '2%' }]}>
            <Icon name="map-marker-radius" color={colors.text} size={20} />
            <Text style={{ marginLeft: '5%' }}>Pincode: {props.marker.pincode}</Text>
          </View>

          {props.screen === "Accept" ?
            <View>
              <View
                style={[ProfileScreenStyles.cardview, { alignItems: 'center' }]}
              >
                <Text style={[styles.cardDesc, { color: "green", fontSize: 18 }]}>Select your Requirement</Text>
                {/* <Picker
              selectedValue={state.selectedDetail}
              style={{ height: 50, width: 130, }}
              onValueChange={(itemValue, itemIndex) => setState({ ...state, selectedDetail: itemValue })
              }>
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Normal Bed" value="normalbed" />
              <Picker.Item label="Oxygen Bed" value="O2bed" /> 
              <Picker.Item label="Icu Bed" value="Icubed" /> 
              <Picker.Item label="Oxygen Cylinder" value="O2cyl" />            

            </Picker> */}

                <RadioButton.Group
                  key="Required"
                  onValueChange={value => setdeatilselect(value)}
                  // onValueChange={(value) =>
                  //   setState({
                  //     ...state, selectedDetail: value
                  //   })
                  // }
                  // onValueChange={(itemValue, itemIndex) => setState({ ...state, selectedDetail: itemValue })}
                  value={deatilselect}

                >
                  {
                    props.marker.BedCount > 0 || props.marker.O2BedCount > 0 || props.marker.ICUBedCount > 0 ?

                      <View style={[BloodRequestStyle.radioButtonstyle, BloodRequestStyle.content,
                      { marginTop: '2%' }]}>
                       
                          
                              <Text style={{ marginTop: '3%' }}>Normal Bed</Text>
                              <RadioButton
                                value="normalbed" />                     
                           
                       
                         
                            <Text style={{ marginTop: '3%' }}>Oxygen Bed</Text>
                            <RadioButton
                              value="O2bed" />
                         
                      </View>
                      : null
                  }
                  {
                    props.marker.ICUBedCount > 0 || props.marker.O2SupplyCount > 0 ?

                      <View style={[BloodRequestStyle.radioButtonstyle, BloodRequestStyle.content, { marginTop: '2%' }]}>
                       
                        <Text style={{ marginTop: '3%' }}>Icu Bed</Text>
                        <RadioButton
                          value="Icubed" />

                        <Text style={{ marginTop: '3%' }}>Oxygen Cylinder</Text>
                        <RadioButton
                          value="O2cyl" />
                      </View>
                      : null
                  }
                </RadioButton.Group>

                <TouchableOpacity
                  onPress={
                    () => { acceptHandler() }
                    //onOpen

                  }
                  style={[CovidDisplayListStyle.signIn, { alignSelf: 'center', marginBottom: '5%', marginTop: '3%' }]} >

                  <Text style={[CovidDisplayListStyle.textSign, {
                    color: '#009387'
                  }]}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
            : null
          }

        </View>

      </SafeAreaView>
    </ScrollView>

  );
};


export default Covid_Data_Single_Display_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop:'12%'
  },
});
