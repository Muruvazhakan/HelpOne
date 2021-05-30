import React, { useEffect, useState } from 'react';
import {
  View, SafeAreaView,
  Button, StyleSheet, StatusBar, ToastAndroid, FlatList,
  TouchableOpacity, Linking
} from 'react-native';
//import Toaster from 'react-native-toaster';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, Text, ActivityIndicator } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { styles as MainScreenStyles } from '../../../Main_Screen/MainScreen';
import AnimateNumber from 'react-native-countup';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import { styles as ProfileScreenStyles } from '../../../Screens/ProfileScreen/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as fetchCovid from '../Covid_India_Fetch_Datas';
import { commonstyles } from '../../../components/Styles';
let clgdata = {}, isload = true;
const Covid_Medical_Colleges_Screen = (props) => {
  const themes = useTheme();
  const user_data_user_first_name = useSelector(state =>
    state.helpone.user_first_name,
  );
  const [selectedclgloc, setselectedclgloc] = useState(null);
  const initialState = {
    clgdatas: {},
    summary: {},
    state: null,
    name: null,
    city: null,
    ownership: null,
    admissionCapacity: null,
    hospitalBeds: null,
    lastRefreshed: null,
    lastOriginUpdate: null,
    isLoading: true,
    refreshing: false,
    selectclg: {},
  }
  let newData = {}, uniquestas = [];
  const [state, setState] = useState(initialState);
  const [load, setload] = useState(true);
  useEffect(() => {
    // console.log('[Covid_Bed_Details_Screen] home ');
    // console.log(props.props);
    // console.log(props.summary);

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

    // console.log(clgdata.lastRefreshed);


    // console.log(clgdata.data.medicalColleges);  
    componentUpdate();
  }, []);

  const componentUpdate = async () => {
    console.log("componentUpdate");
    clgdata = await fetchCovid.fetchCovidMedicalCollegesData();
    // console.log(clgdata.medicalColleges);     
    // clgdata.medicalColleges.map((medicalColleges, index) => {
    //   console.log("medicalColleges state") ;
    //   console.log(medicalColleges.state) ;  
    //   // this.var =  bed.state;

    // }); 

    updatethestate();

  }

  const updatethestate = () => {
    uniquestas = [...new Set(clgdata.medicalColleges.map(
      clg => clg.state
    ))];
    console.log("uniquestas");
    console.log(uniquestas);
    setState({
      clgdatas: clgdata,
    });

  }

  const handleStateclgChange = (e) => {
    newData = clgdata.medicalColleges.filter((bed) => {
      return bed.state === e;
    })
    console.log("newData");
    console.log(newData);
    setState({
      ...state,
      selectclg: newData,
    });
    console.log("selectclg");
    console.log(state.selectclg);
  }
  const handleRefresh = () => {
    console.log("refresh");
    ToastAndroid.show("Refreshed", 200, ToastAndroid.LONG);
    componentUpdate();
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
        {clgdata.medicalColleges ?
          <View>

            <View>

              <View

                style={[ProfileScreenStyles.cardview, { alignItems: 'center' }]}

              >

                <Text style={[styles.textStyle, { color: '#1DA1F2' }]}>Pick Your State</Text>
                <Picker
                  selectedValue={selectedclgloc}
                  style={[{
                    height: 50, width: 200, alignSelf: 'center',
                    //   color: colors.text, 
                  }]}
                  // style={[
                  //   // MainScreenStyles.cardview,
                  //   { 
                  //   height: 50, width:200,marginTop:'8%',
                  //   justifyContent: 'center', color: colors.text, }]}
                  onValueChange={(e, itemIndex) => {
                    console.log(e);
                    setselectedclgloc(e);
                    handleStateclgChange(e)
                  }
                  }>
                  <Picker.Item label="Select" value="" />
                  {clgdata.medicalColleges.map((clg, i) =>
                    <Picker.Item key={i} label={clg.state} value={clg.state} />
                  )}

                  {/* {uniquestas !==null? */}
                  <View>
                    {/* {uniquestas.map((clg, i) =>
               {
                console.log("clg");
                console.log(clg);
                return ( <Picker.Item  key={i}  label={clg} value={clg}/>)
              }
               )} */}
                  </View>
                  {/* :null} */}
                </Picker>

                {state.state ?
                  <View

                    style={[ProfileScreenStyles.cardview, styles.buttonstyle, {}]}

                  >
                    <Text style={styles.textStyle}>State: {state.state}</Text>
                    <Text  >name: {state.name}</Text>
                    <Text  >City: {state.city}</Text>
                    <Text  >Rural Hospitals: {state.ruralHospitals}</Text>
                    <Text  >Rural Beds: {state.ruralBeds}</Text>

                    {/* {newData.map((bed, i) =>
               <Text  style={styles.textStyle}>State: {bed.state}</Text>
               )}          */}

                  </View>
                  : null}
                {state.selectclg ?
                  <View>

                  </View>

                  : null}
              </View>

              <FlatList
                showsVerticalScrollIndicator={false}
                data={state.selectclg}
                renderItem={({ item }) => (
                  <View
                    style={[ProfileScreenStyles.cardview, { alignItems: 'center', }]}
                  >

                    <Text style={styles.textStyle}>State: {item.state}</Text>
                    <Text  > College name: {item.name}</Text>
                    <Text  >City: {item.city}</Text>
                    <Text  >Cwnership: {item.ownership}</Text>
                    <Text  >Admission Capacity: {item.admissionCapacity}</Text>

                    <Text  >Hospital Beds: {item.hospitalBeds}</Text>


                  </View>
                )}
                // keyExtractor={item => item.name}
                keyExtractor={(item, index) => index}

              >


              </FlatList>


            </View>

          </View>
          : null}
      </View>
    )
  }

  // if( isload) {
  //   return(
  //     <View style={{
  //        flex:1,
  //       justifyContent:'center',alignItems:'center'}}>
  //       <ActivityIndicator size="large"/>  


  //     </View>
  //   );
  // }

  const { colors } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      {clgdata.medicalColleges ?
        <View
          style={[ProfileScreenStyles.cardview, { alignItems: 'center', width: '95%' }]}
        >

          <FlatList
            showsVerticalScrollIndicator={false}
            data={clgdata.medicalColleges}
            renderItem={null}
            keyExtractor={(item, index) => index}
            // ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderHeader}
          //   ListFooterComponent={renderFooter}
          // onRefresh={handleRefresh}
          // refreshing={state.refreshing}

          >


          </FlatList>

        </View>
        :
        <View style={commonstyles.activityIndicatorStyle}>
          <ActivityIndicator size="large" />
        </View>
      }

    </SafeAreaView>

  );
};
export default Covid_Medical_Colleges_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center', 
    justifyContent: 'space-evenly',
    // margin:'4%',    
  },
  buttonstyle: {
    alignItems: 'center',
    marginBottom: '4%',
    paddingBottom: '4%',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    paddingBottom: '1%'
  }
});

