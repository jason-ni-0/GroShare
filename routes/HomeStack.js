import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNav from '../screens/MainNav'

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitle: "",
          headerTintColor: 'black',
        }}>
          <Stack.Screen
          name="MainNav"
          component={MainNav}
          options={{ headerShown: false }}
        />
        </Stack.Navigator>
    );
  }

