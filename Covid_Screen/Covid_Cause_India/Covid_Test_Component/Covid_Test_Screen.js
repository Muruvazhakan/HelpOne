import React, { useEffect, useState } from 'react';
import {
  View, SafeAreaView,
  StyleSheet,  ToastAndroid, 
} from 'react-native';
//import Toaster from 'react-native-toaster';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, Text, ActivityIndicator } from 'react-native-paper';
import { styles as MainScreenStyles } from '../../../Main_Screen/MainScreen';
import AnimateNumber from 'react-native-countup';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import { styles as ProfileScreenStyles } from '../../../Screens/ProfileScreen/ProfileScreen';
import * as fetchCovid from '../Covid_India_Fetch_Datas';
import { styles as CovidScreenstyles } from '../../Covid_Home_Screen/Covid_Cause_Screen'
import { commonstyles } from '../../../components/Styles';
const Covid_Test_Screen = (props) => {
  const themes = useTheme();
  const user_data_user_first_name = useSelector(state =>
    state.helpone.user_first_name,
  );
  const [selecteddate, setselecteddate] = useState(null);
  const initialState = {
    testhisdatas: null,
    summary: {},   
    selectdata: {}
  }
  let newData = {}, uniquestas = [];
  const [state, setState] = useState(initialState);
  const [load, setload] = useState(true);
  let testdata = {}, isload = true, testhistorydata = {};
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
    testdata = await fetchCovid.fetchCovidTestData();
    testhistorydata = await fetchCovid.fetchCovidTestHistoryData();

    // testhistorydata.map((testhistorydata, index) => {
    //   console.log("testhistorydata state") ;
    //   console.log(testhistorydata.day) ;  
    //   // this.var =  bed.state;

    // }); 

    updatethestate();

  }

  const updatethestate = () => {
    console.log("testhistorydata");
    // console.log(testhistorydata);
    setState({
      testhisdatas: testhistorydata,
      summary: testdata,
    });
    console.log(state.summary);
  }

  const handleStatetestChange = (e) => {

    newData = state.testhisdatas.filter((data) => {
      console.log(data);
      console.log(e);
      return data.day === e;
    })
    console.log(newData);
    newData.map((data, index) => {
      console.log("data");
      console.log(data);
      // setState({ ...state,
      //   day: data.day,
      //   totalSamplesTested: data.totalSamplesTested,
      //   totalIndividualsTested: data.totalIndividualsTested,
      //   totalPositiveCases: data.totalPositiveCases,
      // });
      setState({
        ...state,
        selectdata: data,
      });
    });
    // console.log("newData") ;
    console.log(state.selectdata);



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
      <ScrollView>
      {state.testhisdatas ?
        <View
          style={[ProfileScreenStyles.cardview,

            // { justifyContent: 'center', width: '95%' }

          ]}
        >

          <Text style={[styles.textStyle, { color: 'black', fontSize: 25, textAlign: 'center' }]}>Covid Test Results</Text>

          <View style={[ProfileScreenStyles.cardview]}>
            <View style={[ProfileScreenStyles.cardview, styles.buttonstyle]}>
              <Text style={[styles.textStyle, { color: '#1DA1F2' }]}>Summary</Text>

            </View>

            <View
              style={[
                // ProfileScreenStyles.cardview, 
                MainScreenStyles.row,
                {
                  // alignItems: 'center' 
                  justifyContent: 'center'
                  // marginRight:'3%',
                }
              ]}

            >




              {state.summary ?
                <View style={[
                  //  
                  CovidScreenstyles.cardBottomstyle, { borderColor: 'green' }
                ]}>
                  <View style={[MainScreenStyles.component, {
                    alignItems: 'center',
                    paddingTop: '20%'
                  }]}>
                    <Text>Samples Tested</Text>



                    <AnimateNumber
                      initial={0}
                      value={state.summary.totalSamplesTested}
                    />

                  </View>
                </View>
                : null}
              {state.summary.totalIndividualsTested ?
                <View style={[
                  //  
                  CovidScreenstyles.cardBottomstyle, { borderColor: 'red' }
                ]}>
                  <View style={[MainScreenStyles.component, { alignItems: 'center', paddingTop: '20%' }]}>
                    <Text>Individuals Tested</Text>


                    <AnimateNumber
                      initial={0}
                      value={state.summary.totalIndividualsTested}
                    />

                  </View>
                </View>
                : null}

              {state.summary.totalPositiveCases ?
                <View style={[
                  //  
                  CovidScreenstyles.cardBottomstyle, { borderColor: 'red' }
                ]}>
                  <View style={[MainScreenStyles.component, { alignItems: 'center', paddingTop: '20%' }]}>
                    <Text>Positive Cases</Text>


                    <AnimateNumber
                      initial={0}
                      value={state.summary.totalPositiveCases}
                    />

                  </View>
                </View>
                : null}
            </View>

          </View>

          <View

            style={[ProfileScreenStyles.cardview, { alignItems: 'center' }]}

          >
            <Text style={[styles.textStyle, { color: '#1DA1F2' }]}>Pick the Date</Text>
            <View style={[{ justifyContent: 'space-around', }]}>
              <Picker
                selectedValue={selecteddate}
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
                  setselecteddate(e);
                  handleStatetestChange(e)
                }
                }>
                <Picker.Item label="Select" value="" />
                {state.testhisdatas.map((testhistorydata, i) =>
                  <Picker.Item key={i} label={testhistorydata.day} value={testhistorydata.day} />
                )}
                {/* {testhistorydata ?
              <View>
              {testhistorydata.map((testhistorydata, i) =>
                <Picker.Item key={i} label={testhistorydata.day} value={testhistorydata.day} />
              )}
              </View>
              :null } */}

                {/* {state.testhisdatas ?
              <View>
              {state.testhisdatas.map((testhistorydata, i) =>
                <Picker.Item key={i} label={testhistorydata.day} value={testhistorydata.day} />
              )}
              </View>
              :<ActivityIndicator size="large"/>   } */}

              </Picker>
            </View>

          </View>
          {state.selectdata ?
            <View style={[
              // ProfileScreenStyles.cardview,               
            ]} >


              <Text style={[styles.textStyle, { color: '#1DA1F2', textAlign: 'center' }]} >  {state.selectdata.day}</Text>
              <View
                style={[
                  // ProfileScreenStyles.cardview, 
                  MainScreenStyles.row,
                  {
                    // alignItems: 'center' 
                    justifyContent: 'center'
                    // marginRight:'3%',
                  }
                ]}

              >




                {state.selectdata.totalSamplesTested ?
                  <View style={[
                    //  
                    CovidScreenstyles.cardBottomstyle, { borderColor: 'black' }
                  ]}>
                    <View style={[MainScreenStyles.component, {
                      alignItems: 'center',
                      paddingTop: '20%'
                    }]}>
                      <Text>Samples Tested</Text>



                      <AnimateNumber
                        initial={0}
                        value={state.selectdata.totalSamplesTested}
                      />

                    </View>
                  </View>
                  : null}
                {state.selectdata.totalIndividualsTested ?
                  <View style={[
                    //  
                    CovidScreenstyles.cardBottomstyle, { borderColor: '#ccc' }
                  ]}>
                    <View style={[MainScreenStyles.component, { alignItems: 'center', paddingTop: '20%' }]}>
                      <Text>Individuals Tested</Text>


                      <AnimateNumber
                        initial={0}
                        value={state.selectdata.totalIndividualsTested}
                      />

                    </View>
                  </View>
                  : null}

                {state.selectdata.totalPositiveCases ?
                  <View style={[
                    //  
                    CovidScreenstyles.cardBottomstyle, { borderColor: 'red' }
                  ]}>
                    <View style={[MainScreenStyles.component, { alignItems: 'center', paddingTop: '20%' }]}>
                      <Text>Positive Cases</Text>


                      <AnimateNumber
                        initial={0}
                        value={state.selectdata.totalPositiveCases}
                      />

                    </View>
                  </View>
                  : null}
              </View>

            </View>
            : null}

        </View>
        :
        <View style={[commonstyles.activityIndicatorStyle,{flex:1}]}>
          <ActivityIndicator size="large" />
        </View>
      }
    </ScrollView>
    </SafeAreaView>

  );
};
export default Covid_Test_Screen;

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

