import './global.css';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/screens/Home';
import DropImage from '@/screens/DropImage';

enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Homepage' }} 
        />
         <Stack.Screen
          name="DropImage"
          component={DropImage}
          options={{ title: 'DropImage' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
