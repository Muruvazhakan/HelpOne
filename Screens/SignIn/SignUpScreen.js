import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { createAnimatableComponent } from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import {authContext} from './AuthContext';
import {Server_URL} from '../../components/Parameter';
const SignUpScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [data, setData] = React.useState({
        email: '',
        mobileno: '',
        password: '',
        name: '',
        confirm_password: '',
        check_textInputEmailChange: false,
        check_textInputUserChange: false,
        check_textInputPhoneChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidUsername: true,
        isValidUseremail: true,
        isValidUsermobile: true,
        isValidUserpassword: true
    });

    const textInputEmailChange=(val) => {

         if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/.test(val)) {
            setData({
                ...data, email:val,check_textInputEmailChange:true
            });

        }
        else{
            setData({
                ...data, email:val,check_textInputEmailChange:false
            });
        }
    }
    const textInputPhoneChange = (val) => {
        if (val.length === 10) {
            setData({
                ...data, mobileno: val, check_textInputPhoneChange: true
            });
        }
        else {
            setData({
                ...data, mobileno: val, check_textInputPhoneChange: false
            });

        }
    }
    const textInputUserChange = (val) => {
        if (val.length === 0) {
            setData({
                ...data, name: val, check_textInputUserChange: false
            });
        }
        else {
            setData({
                ...data, name: val, check_textInputUserChange: true
            });

        }
    }
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const handleValidMobile = (val) => {
        if (val.trim().length == 10) {
            setData({
                ...data,
                isValidUsermobile: true,
                // check_textInputPhoneChange:true
            });
        }
        else {
            setData({
                ...data,
                isValidUsermobile: false,
                //check_textInputPhoneChange:false
            });
        }
    }

    const regesterHandle = (mobileno, password, email, confirm_password, name) => {

        if (password !== confirm_password) {
            Alert.alert('Password is not matching', 'Enter the same password', [
                { text: 'Okay' }
            ]);
            return;
        }

        if (name.length === 0 || password.length === 0 || mobileno.length === 0) {
            Alert.alert('Wrong Input!', 'Field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }
        if (email.length !== 0) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/.test(email)) {                
                console.log("email is good");                
            }
            else {
                alert("You have entered an invalid email address!")
                return;
            }
        }        
        authContext.createemailAccount(email,password);
        console.log("createemailAccount passed");
		let API_URL = `${Server_URL}/user_register.php`;
        fetch(API_URL, {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                // we will pass our input data to server
                name: name,
                mobile: mobileno,
                password: password,
                email:email
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson == "User already Registered") {
                    Alert.alert("User Exist", 'Account already Registered!', [
                        { text: 'Okay' }
                    ]);
                    //alert(responseJson);
                    navigation.goBack();
                }
                if (responseJson == "Account is Registered") {
                    Alert.alert("Congrats!", 'Your account is Registered!', [
                        { text: 'Okay' }
                    ]);
                    //alert(responseJson);
                    // PhoneAuth.createemailAccount(email,password)
                    navigation.goBack();
                }
                if (responseJson == "check internet connection") {
                    Alert.alert("Connection Lost", 'check internet connection!', [
                        { text: 'Okay' }
                    ]);
                    //alert(responseJson);
                    navigation.goBack();
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }





    return (

        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>

                <Text style={[styles.title, { color: colors.text }]}>Register Now</Text>
            </View>

            {/* <Text styles={ [styles.title,{color:colors.text}]}>Register Now</Text> */}

            <Animatable.View style={[styles.footer, { backgroundColor: colors.background }]}

                animation="fadeInUpBig">
                <ScrollView>
                    <Text style={[styles.text_footer, { color: colors.text }]}>Your Name</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o" color={colors.text} size={20} />
                        <TextInput placeholder="Your Name"
                            style={[styles.textInput, { color: colors.text }]} autoCapitalize="none"
                            onChangeText={(val) => textInputUserChange(val)}
                        />
                        {data.check_textInputUserChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    <Text style={[styles.text_footer, { marginTop: '3%' }, { color: colors.text }]}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o" color={colors.text} size={20} />
                        <TextInput placeholder="Your Email"
                            style={[styles.textInput, { color: colors.text }]} autoCapitalize="none"
                            onChangeText={(val) => textInputEmailChange(val)}
                        />
                        {data.check_textInputEmailChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    <Text style={[styles.text_footer, { marginTop: '5%' }, { color: colors.text }]}>Phone Number</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="phone" color={colors.text} size={20} />
                        <TextInput keyboardType="phone-pad" placeholder="Your Phone Number"
                            style={[styles.textInput, { color: colors.text }]} autoCapitalize="none"
                            onChangeText={(val) => textInputPhoneChange(val)}
                            onEndEditing={(e) => handleValidMobile(e.nativeEvent.text)}
                        />
                        {data.check_textInputPhoneChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidUsermobile ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Phone Number must have 10 digits</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, { marginTop: '5%' }, { color: colors.text }]}>Password</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="lock" color={colors.text} size={20} />
                        <TextInput placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={[styles.textInput, { color: colors.text }]} autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="green"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="green"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.text_footer, { marginTop: '5%' }, { color: colors.text }]}>Confirm Password</Text>
                    <View style={[styles.action, { color: colors.text }]}>
                        <FontAwesome
                            name="lock" color={colors.text} size={20} />
                        <TextInput placeholder="Confirm your Password"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={[styles.textInput, { color: colors.text }]} autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {data.confirm_secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="green"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="green"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>

                    <View >
                        <View style={styles.textPrivate}>
                            <Text style={styles.color_textPrivate}>By registering, you confirm that you accept our </Text>
                            <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                                <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>Terms of service</Text>
                            </TouchableOpacity>
                            <Text style={styles.color_textPrivate}> and </Text>
                            <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>Privacy Policy</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.buttonSign}
                            activeOpacity={.55}
                            onPress={() => { regesterHandle(data.mobileno, data.password, data.email, data.confirm_password, data.name) }}
                        >
                            <Text style={styles.textSign}>Sign Up</Text>

                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity onPress={() => navigation.goBack()}
                            style={[styles.buttonSign, { backgroundColor: "#fff" }]}
                            activeOpacity={.55}
                        >
                            <Text style={[styles.textSign, { color: "#009387" }]}>Sign In</Text>

                        </TouchableOpacity>




                    </View>
                </ScrollView>
            </Animatable.View>

        </View>

    );

};
export default SignUpScreen;


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: "5%",
        paddingBottom: "8%",
    },
    title: {
        color: '#fff',
        fontSize: 35,
        paddingHorizontal: "1%",
        marginTop: "9%",
        fontWeight: 'bold',
        alignItems: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'grey',
    },
    footer: {
        flex: 4.5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: "7%",
        paddingVertical: 15
    },

    text_footer: {
        color: '#05375a',
        fontSize: 14
    },
    action: {
        flexDirection: 'row',
        marginTop: '3%',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        marginBottom: '3%',
    },
    actionError: {
        flexDirection: 'row',
        marginTop: "4%",
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: '1%'
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
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "white"
    },
    buttonSign: {
        backgroundColor: '#009387',
        marginTop: '5%',
        alignItems: 'center',
        paddingTop: '4%',
        paddingBottom: '4%',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#089597',
    },
});
