import { React, useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Animated } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import { doc, getFirestore, getDoc } from "firebase/firestore";

const db = getFirestore();

export default function GetEmail( { navigation }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    function submitEmail(input){
        if (error != ""){
            startShake();
            return;
        }
        let docRef = doc(db, "users", input)
        getDoc(docRef).then((doc) => {
        console.log(doc.data())
        if (doc.exists()){
            navigation.navigate('GetPassword', {email: email});
        }
        else{
            navigation.navigate('GetInfo', {email: email});
        }
    })
    }
    function validateEmail(e){
      setEmail(e.toLowerCase());
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      if (expression.test(String(email).toLowerCase())){
        setError("");
        return true;
      }
      setError("Enter a valid email address")
      return false;
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
          Enter your email
        </Text>
        <Input 
        autoFocus='true'
        style={{alignContent:'flex-start'}}
        placeholder="johndoe@mail.com"
        keyboardType='email-address'
        onChangeText={text => validateEmail(text)}
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
        onPress={() => submitEmail(email)}
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
});