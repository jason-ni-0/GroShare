import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNav from '../screens/MainNav'
import CreatePost from '../screens/CreatePost'
import Home from '../screens/Home'
import GetEmail from '../screens/GetEmail'
import GetPassword from '../screens/GetPassword'
import GetInfo from '../screens/GetInfo'

const Stack = createNativeStackNavigator();

export default function HomeStack({navigation}) {
    return (
        <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitle: "",
          headerTintColor: 'black',
        }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="GetEmail" component={GetEmail} />
        <Stack.Screen name="GetPassword" component={GetPassword} />
        <Stack.Screen name="GetInfo" component={GetInfo} />
          <Stack.Screen
          name="MainNav"
          component={MainNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create Post"
          component={CreatePost}
      />
        </Stack.Navigator>
    );
  }

