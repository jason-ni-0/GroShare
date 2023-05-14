import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from '@rneui/themed';
import firebase from "../config/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export default function Home({ navigation }) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties.
    // https://firebase.google.com/docs/reference/js/firebase.User.
    navigation.reset({
      index: 0,
      routes: [{name: 'MainNav'}],
      });
    }
  })
    return (
      <View style={ styles.container }>
        <Image style={{
          width: 400, 
          height: 200,
          marginBottom: 0,
          paddingBottom: 0,
          resizeMode: 'contain',
          }} 
          />
        <Text
          h4='true'
          h4Style={{alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          padding: 25,
          margin: 25,
          flex: 1}}
        >
          GroShare
        </Text>
        <View style={ styles.footer }>
        <Button
        title="Get Started"
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
        onPress={() => navigation.navigate('GetEmail')}
        />
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 35,
      margin: 35,
    },
    footer: {
      height: 125,
      alignItems: 'center',
      justifyContent: 'center',
    },
});