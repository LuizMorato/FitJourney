import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas importadas
import Inicial from './screens/Inicial';
import RegisterStep0 from './screens/RegisterStep0';
import Login from './screens/Login';
import Home from './screens/Home';  // Importa a tela Home diretamente

// Telas de Exercícios
import Agachamentos from './screens/exercises_screens/Agachamentos';
import Flexoes from './screens/exercises_screens/Flexoes';
import Alongamentos from './screens/exercises_screens/Alongamentos';
import Exercicio from './screens/exercises_screens/Exercicio';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Inicial">
      <Stack.Screen options={{ headerShown: false }} name="Inicial" component={Inicial} />
      <Stack.Screen options={{ headerShown: false }} name="RegisterStep0" component={RegisterStep0} />
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      {/* Removido o HomeTabs e adicionado o Home diretamente */}
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} /> 

      {/* Telas de Exercícios */}
      <Stack.Screen name="Agachamentos" component={Agachamentos} />
      <Stack.Screen name="Flexoes" component={Flexoes} />
      <Stack.Screen name="Alongamentos" component={Alongamentos} />
      <Stack.Screen name="Exercicio" component={Exercicio} />
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
