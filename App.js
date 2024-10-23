// Dependências do Navigation Container
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";

// Telas importadas
import Inicial from './screens/Inicial';
import Register from './screens/Register';
import UserInfo from './screens/UserInfo';
import Login from './screens/Login';
import Home from './screens/Home';
import Analysis from './screens/Analysis';

// Criação do stack
const Stack = createNativeStackNavigator();

// Navegação entre as telas
function App() {

  const auth = getAuth();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator initialRouteName="Inicial">
        <Stack.Screen options={{ headerShown: false }} name="Inicial" component={Inicial} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="UserInfo" component={UserInfo} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Stack.Screen options={{ headerShown: false }} name="Analysis" component={Analysis} />
      <Stack.Screen options={{ headerShown: false }} name="UserInfo" component={UserInfo} />
    </Stack.Navigator>
  );
}

export default function MainApp() {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}
