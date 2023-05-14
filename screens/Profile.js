import { ReactComponentElement, useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native'
import { doc, getFirestore, getDoc } from "firebase/firestore"; 
import { getAuth, signOut } from "firebase/auth";


export default function Profile({ navigation }) {
    const [name, setName] = useState("");
    const [lastName, setLastname] = useState("");
    const [userName, setUsername] = useState("");
    const [profURL, setProfURL] = useState("");
    const [user, setUser] = useState("");
    const auth = getAuth();
    if (auth){
      const db = getFirestore();
      const nav = useNavigation();
  
      useEffect(() => {
      getUser();
      nav.setOptions({
        headerRight: () => <TouchableOpacity
        style={styles.buttonFacebookStyle}
        activeOpacity={0.5}
        onPress={() => signOutGoHome()}>
        <Image
          source={{
            uri:
              'https://img.icons8.com/ios/512/exit.png',
          }}
          style={styles.buttonImageIconStyle}
        />
      </TouchableOpacity>
      });
  
      })
      function signOutGoHome(){
        signOut(auth).then(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
            });
        }).catch((error) => {
          // An error happened.
          alert("Error occured while logging out")
        });
      }
      function getUser(){
          setUser(auth.currentUser)
          let docRef = doc(db, "users", auth.currentUser.email)
          getDoc(docRef).then((doc) => {
          if (doc.exists) {
          setName(doc.data().name);
          setLastname(doc.data().lastname);
          setUsername(doc.data().username);
          setProfURL(doc.data().profURL);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
    }
    }

  return (
    <View style={styles.container}>
    <Image
      source={{ uri: 'https://undergrad.biology.ucsb.edu/sites/default/files/styles/big_banner_desktop/public/2020-02/campus-point.jpg?itok=1Hfo-apZ' }}
      style={styles.coverImage}
    />
    <View style={styles.avatarContainer}>
      <Image
        source={{ uri: profURL }}
        style={styles.avatar}
      />
      <Text style={[styles.name, styles.textWithShadow]}>{userName}</Text>
    </View>
    <View style={styles.content}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>First Name:</Text>
        <Text style={styles.infoValue}>{name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Last Name:</Text>
        <Text style={styles.infoValue}>{lastName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoValue}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>School:</Text>
        <Text style={styles.infoValue}>UCSB</Text>
      </View>
    </View>
  </View>
  );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 20,
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
    buttonFacebookStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderWidth: 0.5,
      borderColor: '#fff',
      height: 40,
      borderRadius: 5,
      margin: 5,
    },
    buttonImageIconStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
    },
    coverImage: {
      height: 200,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    avatarContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      color:'white'
    },
    content: {
      marginTop: 20,
    },
    infoContainer: {
      marginTop: 20,
    },
    infoLabel: {
      fontWeight: 'bold',
    },
    infoValue: {
      marginTop: 5,
    },
  });