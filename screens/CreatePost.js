import { React, useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, ActivityIndicator, Animated } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import {launchImageLibrary} from 'react-native-image-picker';
import { doc, getFirestore, collection, setDoc, addDoc, serverTimestamp } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function CreatePost( { route, navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [school, setSchool] = useState("");
  const [img, setImg] = useState("");
  const auth = getAuth();
  const storage = getStorage();
    if (auth){
      const db = getFirestore();
      const storageRef = ref(storage, 'some-child');

  shakeAnimation = new Animated.Value(0)
    startShake = () => {
      Animated.sequence([
        Animated.timing(this.shakeAnimation, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(this.shakeAnimation, { toValue: -5, duration: 50, useNativeDriver: true }),
        Animated.timing(this.shakeAnimation, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(this.shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true })
      ]).start();
   }

   function savePost() {
    setLoading(true);
    uploadBytes(storageRef, img).then((snapshot) => {
        console.log(snapshot);
      });
    try{ 
        addDoc(collection(db, "posts"), {
            userId: auth.currentUser.uid,
            title: title,
            desc: desc,
            school: school,
            img: 'blank', // change
            timestamp: serverTimestamp(),
        }, { merge: false });
        }
        catch(e){console.log(e)}
        navigation.reset({
          index: 0,
          routes: [{name: 'MainNav'}],
        });
      }
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
        Create Posting
      </Text>

      <Input 
      maxLength={30}
      style={{alignContent:'flex-start'}}
      placeholder="Title"
      onChangeText={text => setTitle(text)}
      />

      <Input 
      maxLength={200}
      style={{alignContent:'flex-start'}}
      placeholder="Description of Items"
      onChangeText={text => setDesc(text)}
      />

      <Input 
      maxLength={200}
      style={{alignContent:'flex-start'}}
      placeholder="School"
      onChangeText={text => setSchool(text)}
      />
      {img ? <Text>Image Selected</Text>: null }

<Button
      title="Pick Image"
      titleStyle={{ fontWeight: 'bold' }}
      buttonStyle={{
      backgroundColor: 'rgba(39, 39, 39, 1)',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      height: 45,
      }}
      onPress={() => launchImageLibrary({},response => {
        fetch(response.assets[0].uri)
        .then((res) => {setImg(res.blob())
        })})}
      />

      </Animated.View>
      <View style={ styles.footer }>
      <Button
      title="Post"
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
      onPress={() => savePost()}
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