import React, { useEffect } from 'react';
import { View, StyleSheet,StatusBar,ToastAndroid,TouchableOpacity } from 'react-native';
//import Toaster from 'react-native-toaster';
import {Currentlocation} from '../../components/context';
import {useSelector,useDispatch} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {styles as MainScreenStyles} from '../../Main_Screen/MainScreen';
import Covid_Screen from './Covid_Main_Screen';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import AnimateNumber from 'react-native-countup';
import { width, height } from '../../components/Parameter';
import {commonstyles} from '../../components/Styles';
import { useTheme, Text, ActivityIndicator } from 'react-native-paper';
import Click_to_flip_Component from '../../components/Click_to_flip_Component';
const Covid_Cause_Screen = (props) => {
  const themes = useTheme();
  let datas=''
  // const user_data_user_first_name=useSelector(state =>
  //   state.helpone.user_first_name,
  //   ); let datas
    useEffect(() => {
      // console.log('user_data_user_name sdf'+user_data_user_name);
      // console.log('user_data_user_first_name home '+user_data_user_first_name);
      console.log("[Covid_Cause_Screen] props");
      // console.log("width"+width);
      console.log(props.countrty);
      // console.log(props.data.confirmed);
      datas=props.data;
     });
 // const [state,setState] = React.useState(Currentlocation);

//  const [data, setData] = React.useState({    
//   location:Currentlocation.location,
// })

  const { colors } = useTheme();
    return (
      <View style={styles.container}>   
        <StatusBar  barStyle= {themes.dark ?"light-content":"default-content" } />  
             
        {props.countrty ?   
            <View style={[MainScreenStyles.cardview,
            { padding: 0}
          ]}>
            <View 
              style={{alignItems: 'center'}} >
                {props.countrty ===" India"
                ?<Click_to_flip_Component cardface={"back"}/>
                :
                <Click_to_flip_Component cardface={"front"}/>
              }
           
            </View>
            <View>   
            <View style={[{ padding: 0,
            paddingTop:'3%',alignItems: 'center'}
          ]}>
              <Text style={styles.fontstyles}>Covid Causes in {props.countrty}</Text>
            </View>
            <View style={[MainScreenStyles.row,{justifyContent:'space-evenly',
             padding: 0, paddingTop:'3%'
            }]}>
            <View style={[
            //  
            styles.cardBottomstyle,{borderColor:'red'}           
              ]}>
              <View style={[MainScreenStyles.component,{ alignItems:'center',paddingTop:'20%'}]}>               
                <Text>Confirmed</Text>   
                {props.countupstate === "No" ?
                 <Text>{props.data.confirmed}</Text>  
                :
                 <AnimateNumber 
                initial={0}
                 value={props.data.confirmed}   />      
               }  
              </View>   
                                
          </View>  
          <View style={[
            // MainScreenStyles.cardview,
            // {margin:'2%',
            // // width:'30%'
            // }
            styles.cardBottomstyle,{borderColor:'green'}
            ]}>
              <View style={[MainScreenStyles.component,styles.textcenter]}>               
                <Text>Recovered</Text>   
                {props.countupstate === "No" ?
                <Text>{props.data.recovered}</Text>      
                :          
                <AnimateNumber 
                initial={0}
                 value={props.data.recovered} 
                 interval={0} 
                 />  
                }
              </View>                     
          </View>     
          <View style={[
            // MainScreenStyles.cardview,
            // {margin:'2%',
            // // width:'30%'
            // }
            styles.cardBottomstyle,{borderColor:'black'}
            ]}>
              <View style={[MainScreenStyles.component,styles.textcenter]}>           
                <Text>Deaths</Text>   
                {props.countupstate === "No" ?
                <Text>{props.data.deaths}{width}</Text>  
                :                
                <AnimateNumber                 
                 value={props.data.deaths} 
                 interval={0}                  
                //  formatter={(val) => {
                //   return '$ ' + parseFloat(val).toFixed(2)
                  
                // }} 
                />  }
              </View>                     
          </View>
          </View>
          </View>
        </View>  
        
      :
      <View style={[commonstyles.activityIndicatorStyle,{flex:1}]}>
		{/* <ActivityIndicator size="large"/> */}
		</View>
      }
      </View>
    );
};
export default Covid_Cause_Screen;

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  cardBottomstyle:{
   borderRadius:55 ,
   height:110,
   width:110,
   borderWidth:1,
   alignSelf:'center',
   textAlign:'auto',
  borderBottomWidth:10,
  padding:'4%',  },
  fontstyles:{
    fontWeight:'bold',fontSize:20
  },
  textcenter:{
    alignItems:'center',paddingTop:'20%'
  }
});

