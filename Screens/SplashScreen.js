
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Dimensions,Image,Button } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';// import this
import * as Animatable from 'react-native-animatable';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ScrollView } from 'react-native-gesture-handler';

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
const SplashScreen = ({navigation}) => {
    const {colors} =useTheme();// this
    return (
        
    <View style={styles.container}>
        <ScrollView>
       <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="3000"
            source={require('../assets/blood_logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        
        <Animatable.View style={[styles.footer,{
            backgroundColor:colors.background
        }]}
            animation="fadeInUpBig"> 
            <Text style={[styles.title,{color:colors.text}]}>Every Blood Donor is Life Saver</Text>
            <Text style={[styles.text,{color:colors.text}]}>Sign in with account</Text>
            <View style={styles.Buttonstyle}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}
                    style={styles.Button}
                    activeOpacity = { .55 }
                    >
            <Text style={styles.textSign}>  Get Started  </Text>
            
            </TouchableOpacity>
            </View>
            
        </Animatable.View>
        </ScrollView>
    </View>

    );
};

export default SplashScreen;




const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '10%',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
               
        paddingVertical: '10%',
        paddingHorizontal: '10%',
        borderRadius:30,
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#8a0303',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:10
    },
    Buttonstyle: {
        alignItems: 'flex-end',
        marginTop: 10,
    },

    Button: {
        backgroundColor:'#009387',
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        margin:10,
        marginRight:10,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#009397'
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
  });
  