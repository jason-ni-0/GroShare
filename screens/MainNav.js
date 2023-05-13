import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Button } from '@rneui/themed';
import Profile from '../screens/Profile'
import Posts from '../screens/Posts'
import Messages from '../screens/Messages'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();


export default function MainNav({ navigation }) {
  return (
      <Tab.Navigator>
        <Tab.Screen 
          name="Posts" 
          options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
          component={Posts} />
        <Tab.Screen 
        name="Messages" 
        options={{
            tabBarLabel: 'Messages',
            tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message" color={color} size={size} />
            ),
        }}
        component={Messages} />
        <Tab.Screen 
            name="Profile" 
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
            }}
            component={Profile} />
      </Tab.Navigator>
  );
  }