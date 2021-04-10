import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../components/context';
import { useTheme } from 'react-native-paper';
import { createAnimatableComponent } from 'react-native-animatable';
import Toaster, { ToastStyles } from 'react-native-toaster';
import { ScrollView } from 'react-native-gesture-handler';
import {Server_URL} from '../../components/Parameter';
//import Users from '../model/users';
const SignInScreen = ({navigation}) => {

    const {colors} =useTheme();
    const[data, setData] = React.useState({
        user:'',
        username: '',
        password:'', 
        check_textInputChange:false,
        secureTextEntry:true,
        isValidUser: true,
        isValidPassword: true,
    });
     const {signIn} = React.useContext(AuthContext)
    const textInputChange=(val) => {
        if(val.length === 0) {
            setData({
                ...data, username:val,isValidUser:true
            });
        }
        else {
            setData({
                ...data, username:val,isValidUser:true
            });

        }
    }

    const handlePasswordChange = (val) => { 
            setData({
                ...data,
                password:val,
                isValidPassword:true
            });
    }
    

    const handleValidpass = (val) => {
        if(val.trim().length >=6){
            setData({
                ...data,
                password:val,
                isValidPassword:true
            });
        } else {
            setData({
                ...data,
                password:val,
                isValidPassword:false
            });
        }
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    
    const handleValidMob = (val) => {
        if(val.trim().length >=10){
            setData({
                ...data,
                isValidUser:true,
                check_textInputChange:true
            });
       }
       else {
        setData({ 
            ...data,
            isValidUser:false,
            check_textInputChange:false
        });
       }
    }
    // //
    // const loginHandle = (username, password) =>{
    //     signIn(username,password);
    // }
    const loginHandle = (name, password) => {

        // const foundUser = Users.filter( item => {
        //     return userName == item.username && password == item.password;
        // } );
        //const foundUser=[this.userName,this.password];
        console.log(name);
        //console.log(userName);
        if ( name.length == 0 || password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if ( name.trim().length != 10 ) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }
        else
        {
			let API_URL = `${Server_URL}/user_login.php`;
            fetch(API_URL,{
                method:'post',
                header:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({
                    // we will pass our input data to server
                    name: name,
                    password: password
                })
                
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson+"te");
                if(responseJson === "Wrong"){
                   // alert("Wrong Login Details");
                    Alert.alert("Invalid Login Details","Please Register with us!", [
                        {text: 'Okay'}
                    ]);
                }
                else{
                   // user:responseJson;
                    // console.log(responseJson+"succ");
                    // <Toaster message="Welcome"/>
                    signIn(responseJson,name);// change
                    //alert("Successfully Login");
                }
                
            })
            .catch((error)=>{
            console.error(error);
            });
        }
		
    }
    
    return (
        <ScrollView>
        <View style={styles.container}>
           
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
                
                <Text style={styles.title}>Welcome</Text>
            </View>
            <Animatable.View style={[styles.footer, { backgroundColor:colors.background}]} 
                animation="fadeInUpBig">
                <Text style={[styles.text_footer,{color:colors.text}]}>Phone Number</Text>
                <View style={styles.action}>
                     <FontAwesome 
                     name="phone" 
                     color={colors.text}
                     size={20} />
                    <TextInput keyboardType="phone-pad"
                        placeholder="Enter your Phone Number" 
                        style={[styles.textInput,{color:colors.text}]} autoCapitalize="none"
                        onChangeText={(val)=>textInputChange(val)}
                        onEndEditing={(e)=> handleValidMob(e.nativeEvent.text)} 

                        />
                    {data.check_textInputChange ?
                    <Animatable.View
                        animation="bounceIn"
                    >
                    <Feather 
                        name= "check-circle" 
                        color="#009387"
                         size={20} 
                          />
                    </Animatable.View>
                          : null}
                </View>

                 { data.isValidUser ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}> 
                <Text style={styles.errorMsg}>Phone Number must have 10 digits</Text>
                 </Animatable.View>
                }

                <Text style={[styles.text_footer,{color:colors.text}, {marginTop:'7%'}]}>Password</Text>
                <View style={styles.action}>
                     <FontAwesome 
                     name="lock" color={colors.text} size={20} />
                    <TextInput placeholder="Enter Your Password"
                        secureTextEntry={data.secureTextEntry ? true:false }
                        style={[styles.textInput,{color:colors.text}]} autoCapitalize="none"
                        onChangeText={(val)=>handlePasswordChange(val)}
                        onEndEditing={(e)=> handleValidpass(e.nativeEvent.text)}
                        />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                        <Feather 
                        name= "eye-off"
                         color="#009387" 
                         size={20}
                          />
                          :  
                        <Feather 
                          name= "eye"
                           color="#009387" 
                           size={20}
                        />
                        }
                    </TouchableOpacity>
                </View>

                { data.isValidPassword ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}> 
                <Text style={styles.errorMsg}>Password is incomplete</Text>
                 </Animatable.View>
                 }
                 
                <TouchableOpacity>
                    <Text style={{color:colors.text, marginTop:'7%'}}>Forgot password</Text>
                </TouchableOpacity>
                <View >
                <TouchableOpacity 
                    style={styles.buttonSign}
                    activeOpacity = { .55 }
                    onPress={()=>{loginHandle(data.username,data.password)}}
                    >
                 <Text style={styles.textSign}>Sign In</Text>
            
                </TouchableOpacity>
                </View>
                <View >
                <TouchableOpacity onPress={()=>navigation.navigate('SignUpScreen')}
                    style={[styles.buttonSign,{backgroundColor:"#fff"}]}
                    activeOpacity = { .55 }   
                    >
                 <Text style={[styles.textSign,{color:"#009387"}]}>Sign Up</Text>
            
                </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
      
        </ScrollView>       
      );

};
export default SignInScreen;


export const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: "5%",
        paddingBottom: "30%",
        alignItems:'center',
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: "5%",
        paddingVertical: '7%'
    },
    title: {
        color: '#fff',
        fontSize: 40,
        paddingHorizontal: "1%",
        marginTop:"9%",
        fontWeight: 'bold',
        alignItems: 'center',
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: '4%',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: '7%',
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
 
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color:"white"
    },
    buttonSign: {
        backgroundColor:'#009387',
        marginTop:'7%',
        alignItems: 'center',
        padding:'4%',
        paddingBottom:'4%',
        borderRadius:50,
        borderWidth: 1,
        borderColor: '#089597',
    },
  });
