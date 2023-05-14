import { React, useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, ActivityIndicator, Animated } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import validator from 'validator'
import { doc, getFirestore, setDoc } from "firebase/firestore"; 
import firebase from '../config/firebase'

const auth = getAuth();
const db = getFirestore();

export default function GetInfo( { route, navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [usererror, setUsererror] = useState("");
  const [passerror, setPasserror] = useState("");
  const [passValid, setpassvalid] = useState(false);
  const [passmatch, setpassmatch] = useState(false);
  const [passmatcherror, setPassmatcherror] = useState("");

  function validatePass(e){
    setPassword(e)
    if (validator.isStrongPassword(e, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setpassvalid(true);
      setPasserror("");
    } else {
      setpassvalid(false);
      setPasserror('Password is weak');
    }
  }

  function passMatch(e){
    setPasswordAgain(e);
    if (e == password){
      setpassmatch(true);
      setPassmatcherror("");
    }
    else{
      setPassmatcherror("Passwords are not matching")
    }
  }

  shakeAnimation = new Animated.Value(0)
    startShake = () => {
      Animated.sequence([
        Animated.timing(this.shakeAnimation, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(this.shakeAnimation, { toValue: -5, duration: 50, useNativeDriver: true }),
        Animated.timing(this.shakeAnimation, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(this.shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true })
      ]).start();
   }

  function goWait(){
    if (!name || !lastname || !username || !passmatch){
      startShake();
      return ;
    }
    else{
      setLoading(true);
      try{
      createUserWithEmailAndPassword(auth, route.params.email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        //console.log(user);
        try{
        setDoc(doc(db, "users", user.email), {
          name: name,
          lastname: lastname,
          username: username,
          profURL: 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
        }, { merge: false });
        }
        catch(e){}
        // ...
        navigation.reset({
          index: 0,
          routes: [{name: 'MainNav'}],
          });
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
    }
    catch(e){
      
    }
    }
  }

  if (isLoading){
    return (
    <View style={styles.preloader}>
      <ActivityIndicator size="large" color="#9E9E9E"/>
    </View>)
  }
    return (
      <KeyboardAvoidingView
      {...(Platform.OS === 'ios' || 'android' ? { behavior: 'padding' } : {})}
      style={styles.container}>
      <Animated.View style={{ alignItems: 'flex-start',
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        margin: 15, transform: [{translateX: shakeAnimation}] }}>
      {/*<Text>{route.params.email}</Text>*/}
      <Text
        h4='true'
        h4Style={{
        fontWeight: 'bold'}}
        style={{padding: 10, margin: 10, marginLeft: 0, paddingLeft: 2}}
      >
        Let's personalize with GroShare
      </Text>

      <Input 
      maxLength={20}
      style={{alignContent:'flex-start'}}
      placeholder="Name: eg. John"
      textContentType='givenName'
      onChangeText={text => setName(text.trim())}
      />

      <Input 
      maxLength={20}
      style={{alignContent:'flex-start'}}
      placeholder="Last name: eg. Doe"
      textContentType='familyName'
      onChangeText={text => setLastname(text.trim())}
      />

      <Input 
      maxLength={20}
      style={{alignContent:'flex-start'}}
      placeholder="Username: eg. johndoe7"
      textContentType='username'
      onChangeText={text => setUsername(text.trim().toLowerCase())}
      />

      <Input 
      style={{alignContent:'flex-start'}}
      placeholder="Password:"
      secureTextEntry='true'
      onChangeText={text => validatePass(text.trim())}
      errorMessage={passerror}
      />

      <Input 
      style={{alignContent:'flex-start'}}
      placeholder="Confirm password:"
      secureTextEntry='true'
      onChangeText={text => passMatch(text.trim())}
      errorMessage={passmatcherror}
      />

      </Animated.View>
      <View style={ styles.footer }>
      <Button
      title="Next"
      titleStyle={{ fontWeight: 'bold' }}
      buttonStyle={{
      backgroundColor: 'rgba(39, 39, 39, 1)',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      height: 45,
      }}
      containerStyle={{
        width: 300,
        height: 80,
        marginHorizontal: 50,
        marginVertical: 10,
      }}
      onPress={() => goWait()}
      />
      </View>
    </KeyboardAvoidingView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textContainer: {
    alignItems: 'flex-start',
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 15,
  },
  footer: {
    height: 125,
    margin: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
});