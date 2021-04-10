import React, { useEffect,useState } from 'react';
import { View, Button, StyleSheet, SafeAreaView, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useTheme, Text, Switch, TouchableRipple } from 'react-native-paper';
import { authContext } from './AuthContext';
import { styles as editprofilestyle } from '../ProfileScreen/EditProfileScreen';


const OTP_Screen = (props) => {
    const [code, setCode] = useState('');
    let verifycode='';
    const { colors } = useTheme();   
    const verification = (mobile) => {
        // authContext.verifyPhoneNumber(mobile).catch(error => {
        //     alert(error.message)   
        //     console.log(error)
        //   }); 

        sendmessage(mobile);
        //send();

    }
    const renderRandom = () => {
        const min = 1000;
        const max = 9999;
        const random = (Math.floor(Math.random() * (max - min + 1)) + min);
        return random;
    }

//     const send = () => {
//         var request = require('request');
//     var options = {
//      'method': 'POST',
//   'url': 'https://http-api.d7networks.com/send?username=lkqr4040&password=uAgQ5fbU&dlr-method=POST &dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=smsinfo&content=This is the sample content sent to test &to=+7338979499',
//   'headers': {
//   },
//   formData: {

//      }
// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });
//     }
    const sendmessage = (phoneNumber) => {
        verifycode = renderRandom();
        var request = "https://http-api.d7networks.com/send?username=lkqr4040&password=uAgQ5fbU&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=smsinfo&content=HelpOne! Your otp code is"+verifycode+"&to=+" + phoneNumber;
        fetch(request).then(res => {
            if (res.ok) {
                console.log('ok', res.ok);
                console.log('message send');
            }
            else {
                console.log('else', res.ok);
            }
        })
    }
    const dverification = (servercode) => {
        console.log('servercode' + servercode + " " + verifycode);
        if (servercode === verifycode) {
            alert("Otp succ");
        }
        else {
            alert("Otp failed!");
        }
    }

    const confirmCode = () => {

        dverification(code).catch(error => {
            alert(error.message)
            console.log(error)
        });

    }

    return (

        <View style={styles.container}>
            <TouchableOpacity style={editprofilestyle.submit} onPress={() => verification(917338979499)}>
                <Text style={editprofilestyle.panelButtonTitle}>Verify with mobile</Text>
            </TouchableOpacity>

            {/* <TextInput value={code} onChangeText={text => setCode(text)} />
            <Button title="Confirm Code" onPress={() => confirmCode()} /> */}
            <TextInput keyboardType='numeric'
            style={[{marginTop:'15%',alignSelf:'center'}]}
                maxLength={6}
                placeholder='Verification code'
                placeholderTextColor='#eee'
                value={code} onChangeText={text => setCode(text)} />
            <TouchableOpacity style={[editprofilestyle.submit,{marginTop:'15%'}]}
             onPress={() => confirmCode()}>
                <Text style={editprofilestyle.panelButtonTitle}>Confirm Code</Text>
            </TouchableOpacity>
        </View>


    )
}

export default OTP_Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
     // alignSelf: 'center', 
     // justifyContent: 'center',
        marginTop:'30%',
       margin:'10%',
    },
  });