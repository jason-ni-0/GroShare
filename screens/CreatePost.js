import { React, useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, ActivityIndicator, Animated } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import {launchImageLibrary} from 'react-native-image-picker';

export default function CreatePost( { route, navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");


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
      onPress={() => {}}
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