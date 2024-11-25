import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Telas importadas
import Inicial from './screens/Inicial';
import RegisterStep0 from './screens/RegisterStep0';
import Login from './screens/Login';
import Home from './screens/Home';
import Exercises from './screens/Exercises';
import AddFood from './screens/AddFood';
import Scan from './screens/Scan';

// Telas de Exercícios
import Agachamentos from './screens/exercises_screens/Agachamentos';
import Flexoes from './screens/exercises_screens/Flexoes';
import Alongamentos from './screens/exercises_screens/Alongamentos';
import Atividades from './screens/exercises_screens/Atividades';

// Telas de Receitas
import Recipes from './screens/addFood_screens/Recipes';
import Details from './screens/addFood_screens/Details';

// Tela de Scan
import CameraScreen from './screens/scan_screens/CameraScreen';
import Analysis from './screens/scan_screens/Analysis';

const Stack = createNativeStackNavigator();

function AppNavigator({ isLoggedIn }) {
  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'Home' : 'Inicial'}
      screenOptions={{
        gestureEnabled: true,
        transitionSpec: {
          open: {
            animation: 'spring',
            config: { stiffness: 500, damping: 30, mass: 2 },
          },
          close: {
            animation: 'spring',
            config: { stiffness: 500, damping: 30, mass: 2 },
          },
        },
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      {/* Telas do aplicativo */}
      <Stack.Screen name="Inicial" component={Inicial} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterStep0" component={RegisterStep0} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Exercises" component={Exercises} options={{ headerShown: false }} />
      <Stack.Screen name="AddFood" component={AddFood} options={{ headerShown: false }} />
      <Stack.Screen name="Scan" component={Scan} options={{ headerShown: false }} />
      
      {/* Telas de Exercícios */}
      <Stack.Screen name="Agachamentos" component={Agachamentos} options={{ headerShown: false }} />
      <Stack.Screen name="Flexoes" component={Flexoes} options={{ headerShown: false }} />
      <Stack.Screen name="Alongamentos" component={Alongamentos} options={{ headerShown: false }} />
      <Stack.Screen name="Atividades" component={Atividades} options={{ headerShown: false }} />

      {/* Telas de Receitas */}
      <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
      <Stack.Screen name="Recipes" component={Recipes} options={{ headerShown: false }} />

      {/* Tela de Scan */}
      <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Analysis" component={Analysis} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function MainApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Se o usuário estiver logado, setIsLoggedIn será true
    });

    // Limpar o observador ao desmontar o componente
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
}
