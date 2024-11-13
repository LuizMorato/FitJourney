import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importar as telas para o Tab Navigator
import HomeScreen from './screens/Home';
// import StatsScreen from './screens/StatsScreen';
// import ScanScreen from './screens/ScanScreen';
// import RecipesScreen from './screens/RecipesScreen';
import Exercises from './screens/Exercises';

// Importar o CustomTabBar
import CustomTabBar from './components/Navbar';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Exercises" component={Exercises} />
      </Tab.Navigator>
    );
  }
  