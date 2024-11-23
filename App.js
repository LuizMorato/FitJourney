import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Telas importadas
import Inicial from './screens/Inicial';
import RegisterStep0 from './screens/RegisterStep0';
import Login from './screens/Login';
import Home from './screens/Home';  // Importa a tela Home diretamente
import Exercises from './screens/Exercises';

// Telas de Exercícios
import Agachamentos from './screens/exercises_screens/Agachamentos';
import Flexoes from './screens/exercises_screens/Flexoes';
import Alongamentos from './screens/exercises_screens/Alongamentos';
import Atividades from './screens/exercises_screens/Atividades';

const Stack = createNativeStackNavigator();

function AppNavigator({ isLoggedIn }) {
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Inicial"}>
      <Stack.Screen options={{ headerShown: false }} name="Inicial" component={Inicial} />
      <Stack.Screen options={{ headerShown: false }} name="RegisterStep0" component={RegisterStep0} />
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Stack.Screen options={{ headerShown: false }} name="Exercises" component={Exercises} />
      {/* Telas de Exercícios */}
      <Stack.Screen options={{ headerShown: false }} name="Agachamentos" component={Agachamentos} />
      <Stack.Screen options={{ headerShown: false }} name="Flexoes" component={Flexoes} />
      <Stack.Screen options={{ headerShown: false }} name="Alongamentos" component={Alongamentos} />
      <Stack.Screen options={{ headerShown: false }} name="Atividades" component={Atividades} />
    </Stack.Navigator>
  );
}

export default function MainApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Se user existir, usuário está logado
    });

    // Limpar o observador ao desmontar o componente
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {/* Renderiza o AppNavigator passando o estado de login */}
      <AppNavigator isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
}
