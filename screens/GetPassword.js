import { React, useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Animated, ActivityIndicator } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import { signInWithEmailAndPassword, getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import firebase from '../config/firebase'

const auth = getAuth();

export default function GetPassword( { navigation, route }) {
    const email = route.params.email;
    const [isLoading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    function signIn(){
      //console.log(auth)
      setLoading(true);
      //etPersistence(auth, browserLocalPersistence);
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         const user = userCredential.user;
         //console.log(user);
         navigation.reset({
          index: 0,
          routes: [{name: 'MainNav'}],
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        startShake();
        if (errorCode=="auth/wrong-password"){
          //login
          setError("The password entered is incorrect");
        }
        else if(errorCode=="auth/too-many-requests"){
          setError("Access to this account has been temporarily disabled. Reset your password or try again later.");
        }
        else if (errorCode=="auth/user-disabled"){
          setError("This account has been disabled");
        }
      });
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
        <Text
          h4='true'
          h4Style={{
          fontWeight: 'bold'}}
          style={{padding: 10, margin: 10, marginLeft: 0, paddingLeft: 2}}
        >
          Enter your password
        </Text>
        <Input 
        autoFocus='true'
        style={{alignContent:'flex-start'}}
        placeholder="Password:"
        secureTextEntry='true'
        onChangeText={text => {setPassword(text); setError("")}}
        errorMessage={error}
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
        onPress={() => signIn()}
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