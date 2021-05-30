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
import {commonstyles} from '../../../components/Styles';
let guidedata = null, isload = true;
const Covid_Guidelines_Screen = (props) => {
  const themes = useTheme();
  const user_data_user_first_name = useSelector(state =>
    state.helpone.user_first_name,
  );
  
  const initialState = {
    guidedatas: null,
    }
 
  const [state, setState] = useState(initialState);
  const [load, setload] = useState(true);
  useEffect(() => {
    console.log('[Covid_Guidelines_Screen] home ');
    componentUpdate();
  }, []);

  const componentUpdate = async () => {
    guidedata = await fetchCovid.fetchCovidGuidelinesData();
    console.log("componentUpdate");
    console.log(guidedata.notifications);

    updatethestate();

  }

  const updatethestate = () => {

    setState({
      guidedatas: guidedata.notifications,
    });
    console.log(state.guidedatas);
  }


  const renderHeader = () => {
    return (
      <View>
        {state.guidedatas ?
          <View>

            <View style={[ProfileScreenStyles.cardview, { alignItems: 'center', paddingBottom: '3%' }]} >
              <Text style={[styles.textStyle, { color: '#1DA1F2' }]} >Covid Guidelines</Text>
            </View>
            <Text style={[styles.textStyle, { color: '#FF6347',textAlign:'center' }]} >Note: Click to Download the Document</Text>
          </View>
          : null}
      </View>
    )
  }


  const { colors } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      {state.guidedatas ?
        <View
          style={[ProfileScreenStyles.cardview, { alignItems: 'center', width: '95%' }]}
        >

          <FlatList
            // showsVerticalScrollIndicator={false}
            data={state.guidedatas}
            renderItem={({ item }) => (
              <View>
              <TouchableOpacity onPress={() => 
                Linking.openURL(item.link)}>
              <View
                style={[ProfileScreenStyles.cardview, { alignItems: 'center', }]}
              >
                
                <Text style={styles.textStyle}>{item.title}</Text>
                {/* <Text  > College name: {item.name}</Text>                         */}

              </View>
              </TouchableOpacity>
              </View>
            )}
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
        // <ActivityIndicator size="large" />
        <View style={commonstyles.activityIndicatorStyle}>
		<ActivityIndicator size="large"/>
		</View>
        }

    </SafeAreaView>

  );
};
export default Covid_Guidelines_Screen;

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

