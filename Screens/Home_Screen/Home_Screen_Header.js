import React, { useEffect, useState } from 'react';
import {
  View, Button, Animated, ScrollView,
  StyleSheet, TouchableOpacity, SafeAreaView,
  Platform, Image
} from 'react-native';
import { styles as MainScreenStyles } from '../../Main_Screen/MainScreen';
import { styles as ProfileStyles } from '../ProfileScreen/ProfileScreen';
import { styles as Blood_Request_List_ScreenStyles } from '../Blood_Request/Blood_Request_List_Screen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  Avatar,
  Title,
  Caption,
  Text,
  useTheme, Checkbox
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { screen_width,screen_height } from '../../components/Parameter';
import Swiper from 'react-native-swiper'
import { TouchableHighlight } from 'react-native-gesture-handler';
const CARD_HEIGHT = 177;
const CARD_WIDTH = screen_width * 0.9;
const SPACING_FOR_CARD = screen_width * 0.1 - 10;

const Home_Screen_Header = (props) => {
  const user_data_user_bood_request_raised = useSelector(state =>
    state.helpone.user_bood_request_raised
  );
  let length = 5;

  const initialState = [
    {
      img: require('../../assets/blood_request.png'),
      screen: "My_Blood_Donated_Screen",
      text: 'My Donated',
    },
    {
      img: require('../../assets/donate.png'),
      screen: "My_Request_Raised_Screen",
      text: 'My Request',
    },
    {
      img: require('../../assets/donate.png'),
      screen: "Blood_Request_List",
      text: 'Blood Request',
    },
    {
      img: require('../../assets/blood_logo.png'),
      screen: "Detail",
      text: 'Blood Request Form',
    },
    {
      img: require('../../assets/blood_request.png'),
      screen: "Profile",
      text: 'Profile',
    },
  ];

  const [state, setState] = useState(initialState);

  useEffect(() => {

    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item

      if (index >= length) {
        index = length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
    });


  }, []);


  const user_data_user_bood_donated = useSelector(
    state =>
      state.helpone.user_bood_donated

  );
  const _scrollView = React.useRef(null);
  let mapAnimation = new Animated.Value(0);
  const themes = useTheme();
  const { colors } = useTheme();

  return (
    <SafeAreaView >

      {/* <View style={{margin:0,padding:0,}}>
        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          scrollEventThroll={1}
          // showsHorizontalScrollIndicator={false}        
          pagingEnabled
          snapToInterval={CARD_WIDTH+20}
          snapToAlignment="center"
          // style={[ProfileStyles.cardview,{backgroundColor:'white',paddingLeft:0}]}
          contentInset={{
            top:0,
            left:SPACING_FOR_CARD,
            bottom:0,
            right:SPACING_FOR_CARD,
          }}
          contentContainerStyle={{
            paddingHorizontal:Platform.OS === 'android' ? SPACING_FOR_CARD:0
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent:{
                  contentOffset:{
                    x: mapAnimation,
                  }
                },
              },
            ],
            {useNativeDriver:true}
          )}
          >   
           {state.map((screen,index) =>(
             <View style={[{marginBottom:'1%',}]}>
             <View style={[styles.card,{margin:0,backgroundColor:"black",}]} key={screen.text}>
                <ScrollView key={index}>
                <View style={[{flexDirection: 'column'}]}>
               
                <TouchableOpacity style={MainScreenStyles.touchspacing}
                  onPress={() => props.navigation.navigate(screen.screen)}>
                     <Image
                // source={{ uri: '../../assets/blood_request.jpg' }}
              //  source={require('../../assets/blood_request.jpg')}
                source={screen.img}
                // style={[{ height:CARD_HEIGHT, width:CARD_WIDTH, }]}
                style={[styles.card,{backgroundColor:"red",height:CARD_HEIGHT,width:CARD_WIDTH,paddingTop:'10%'}]}
                imageStyle={[{ borderRadius: 25 }]} />  
                <Text>{screen.text} </Text>                 
                </TouchableOpacity> 
                             
               
              </View>        
                  </ScrollView>
              </View>       
           
                 
              </View>
             ))}
           </Animated.ScrollView>
            
           </View>
            */}
      <View style={{ margin: 0, padding: 0 }}>
        <Swiper
          autoplay
          // horizontal={false}
          height={200}
          activeDotColor="#bb0a1e">
          {state.map((screen, index) => (
            <View style={[{ marginBottom: '1%', }]}>
              <View style={[styles.card, { margin: 0, backgroundColor: "white", }]} key={screen.text}>
                <ScrollView key={index.toString()}>
                  <View style={[{ flexDirection: 'column' }]}>
                    <TouchableOpacity key={index.toString()} style={MainScreenStyles.touchspacing}
                      onPress={() => props.navigation.navigate(screen.screen)}>
                      <Image
                        source={screen.img}
                        resizeMode="cover"
                        // style={styles.sliderImage}
                        style={[styles.card, 
                         { backgroundColor: "red",
                          height: CARD_HEIGHT, width: CARD_WIDTH,
                          }
                        ]}
                        imageStyle={[{ borderRadius: 25 }]} />
                      <Text>{screen.text} </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>


            </View>
          ))}
        </Swiper>
      </View>

      <View style={[ProfileStyles.infoBoxWrapper, ProfileStyles.cardview, { marginBottom: '4%' }]}>
        <View style={[ProfileStyles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1,
        }]}>
          <Title>{((user_data_user_bood_donated === null || user_data_user_bood_donated === '') ? 0 : user_data_user_bood_donated)}</Title>
          <Caption>Donated</Caption>
        </View>
        <View style={ProfileStyles.infoBox}>
          <Title>{((user_data_user_bood_request_raised === null || user_data_user_bood_request_raised === '') ? 0 : user_data_user_bood_request_raised)}</Title>
          <Caption>Request Raised</Caption>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default Home_Screen_Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: "#fff",
    // borderTopLeftRadius:5,
    // borderTopRightRadius:5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    //shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius: 30,
    borderColor:'black',
    //paddingLeft:'1%',
  },

});
