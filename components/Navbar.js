import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import scanIcon from '../assets/scanIcon.webp';
import profileIcon from '../assets/exerciseIcon.png';
import statsIcon from '../assets/statsIcon.png';
import homeIcon from '../assets/homeicon.png';
import recipesIcon from '../assets/recipesIcon.png';

const CustomTabBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Definindo as abas
  const tabs = [
    { name: 'Home', icon: homeIcon },
    { name: 'Stats', icon: statsIcon }, // Descomentado
    { name: 'Scan', icon: scanIcon },   // Descomentado
    { name: 'Recipes', icon: recipesIcon }, // Descomentado
    { name: 'Exercises', icon: profileIcon },
  ];

  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: 'white',
      height: 70,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: 'absolute',
      bottom: 0,
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
    }}>
      {tabs.map((tab, index) => {
        const focused = route.name === tab.name;
        const iconSize = focused ? 44 : 33;
        const iconColor = focused ? '#FFFF' : 'gray';
        const iconBackgroundColor = focused ? '#0DE347' : 'transparent';

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(tab.name)} // Navegação correta
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: iconBackgroundColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={tab.icon}
              style={{
                width: iconSize,
                height: iconSize,
                tintColor: iconColor,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
