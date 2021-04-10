import React,{useEffect} from 'react';
import { View,
 Dimensions, 
  StyleSheet,Platform} from 'react-native';

// import Geolocation from '@react-native-community/geolocation';
import Map from '../Map_Component/Map';

const{width,height} = Dimensions.get('window');
const CARD_HEIGHT =177;
const CARD_WIDTH = width*0.9;
const SPACING_FOR_CARD= width*0.1 -10;

const GetLocationMapScreen = ({navigation}) => {

  const [data, setData] = React.useState({    
    screenvalues:"getLocation",
    done:true,
    // loactionAddress:{
    // address:12,
    // city:"test city",
    // area:' test area',
    // statename:'test state ',
    // latitude: 36.425998333,
    // longitude:  -110.125100000,
    // }
})

  // const retrivevalue=() =>{
  //   setData({
  //     ...data,
  //   })
  // }

  const retrivelocation=(val) =>{
    console.log("retrivelocation1 : "+val.longitude+val.latitude);
    setData({
          ...data,done:true,
        });      
    navigation.goBack();
  }


    return (
         
      <View style={styles.container}>
     <Map valuesfrom={data.screenvalues} 
          // getvaluesfrom={()=>retrivevalue} 
          loactionAddress={data.screenvalues}
          getloactionAddress={(val)=>retrivelocation(val)}

     >

     </Map>

    </View>
      

   
   );
};

export default GetLocationMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});

