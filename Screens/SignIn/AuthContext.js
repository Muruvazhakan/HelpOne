import React, { useState,Component } from 'react';
import { Alert, Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import { View } from 'react-native-animatable';

// let [confirm, setConfirm] = useState(null);
//  let  [code, setCode] = useState('');
let verifycode='';
class AuthContext extends Component {
    // If null, no SMS has been sent
    
    //D7 network msg
    renderRandom(){
      const min=1000;
      const max=9999;
      const random =(Math.floor(Math.random() * (max-min+1))+min);
      return random;
    }

    sendmessage(phoneNumber){
       verifycode = this.renderRandom();
      var request="https://http-api.d7networks.com/send?username=lkqr4040&password=uAgQ5fbU&dlr-method=POST&dlr-url=https://4ba60af1.ngrok.io/receive&dlr=yes&dlr-level=3&from=smsinfo&content=HelpOne! Your otp code is"+verifycode+ " &to=+"+phoneNumber;
      fetch(request).then(res =>{
        if(res.ok){
          console.log('ok',res.ok);    
          console.log('message send');    
        }
        else {
          console.log('else',res.ok);
        }
      })
    } 

    dverification(servercode){
      console.log('servercode'+servercode+" "+verifycode);
      if (servercode===verifycode){
        alert("Otp succ");
      }
      else{
        alert("Otp failed!");
      }
    }

    // Handle the button press
     async signInWithPhoneNumber(phoneNumber) {
        console.log('signInWithPhoneNumber click', phoneNumber);      
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
            .catch(error => {
            alert(error.message)    
            console.log(error)
          });      
         console.log('confirmation click', confirmation);
         setConfirm(confirmation);
    }
    async  createemailAccount (email,password) {
        try {
          await auth().createUserWithEmailAndPassword(email,password)
          .catch(error => {
            alert(error.message)   
            console.log(error)
          });       
          console.log('User account created & signed in!'+email+password);
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
    
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        }
      }

    async  verifyPhoneNumber(phoneNumber) {
        console.log('verifyPhoneNumber click', phoneNumber);
        // PhoneAuthProvider.getInstance().verifyPhoneNumber(
        //     phoneNumber,        // Phone number to verify
        //     60,                 // Timeout duration
        //     TimeUnit.SECONDS,   // Unit of timeout
        //     this,               // Activity (for callback binding)
        //     mCallbacks);        // OnVerificationStateChangedCallbacks

        const confirmation = await auth().verifyPhoneNumber(phoneNumber)
            .catch(error => {
            alert(error.message)    
    
            console.log(error)
          });
          
        // const confirmation = await auth().verifyPhoneNumber(phoneNumber) 
        // .catch(error => {
        //     alert(error.message)
    
        //     console.log(error)
        //     });

        // auth().signInWithPhoneNumber(phoneNumber)
        //     .then(function (confirmationResult) {
        //         // SMS sent. Prompt user to type the code from the message, then sign the
        //         // user in with confirmationResult.confirm(code).
        //         let cod=prompt('otp');
        //         confirmationResult.confirm(cod).then(function(result){
        //             console.log('result' + result.user);
        //         })
        //         window.confirmationResult = confirmationResult;
        //     }).catch(function (error) {
        //         // Error; SMS not sent
        //         // ...
        //     });
         console.log('confirmation click', confirmation);
         setConfirm(confirmation);
    }

    async  confirmVerifyPhoneNumberCode() {
        try {
          const credential = auth.PhoneAuthProvider.credential(
            confirm.verificationId,
            code,
          );
          let userData = await auth().currentUser.linkWithCredential(credential);
          setUser(userData.user);
        } catch (error) {
          if (error.code == 'auth/invalid-verification-code') {
            console.log('Invalid code.');
          } else {
            console.log('Account linking error');
          }
        }
      }

    async  confirmSignInWithPhoneNumberCode() {
        try {
            await confirm.confirm(code).then(function(result){
                console.log('result' + result.user);
                alert("Success");
            });
            console.log('code' + code);
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    // if (!confirm) {
    //     return (
    //         <View>
    //         <Button
    //             title="Phone Number Sign In"
    //             onPress={() => verifyPhoneNumber('+91 7338979499')}
    //         />
    //         {/* <TextInput value={code} onChangeText={text => setCode(text)} />
    //         <Button title="Confirm Code" onPress={() => confirmCode()} /> */}
    //         </View>
    //     );
    // }

    // return (
    //     <>
    //         <TextInput keyboardType='numeric' 
    //         maxLength={6}
    //         placeholder='Verification code'
    //         placeholderTextColor='#eee'
    //         value={code} onChangeText={text => setCode(text)} />
    //         <Button title="Confirm Code" onPress={() => confirmCode()} />
    //     </>
    // );
}

export const authContext = new AuthContext();