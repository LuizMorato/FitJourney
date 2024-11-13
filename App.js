import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas importadas
import Inicial from './screens/Inicial';
import RegisterStep0 from './screens/RegisterStep0';
import Login from './screens/Login';
import Home from './screens/Home';

// Criação do stack
const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Inicial">
      <Stack.Screen options={{ headerShown: false }} name="Inicial" component={Inicial} />
      <Stack.Screen options={{ headerShown: false }} name="RegisterStep0" component={RegisterStep0} />
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default function MainApp() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
