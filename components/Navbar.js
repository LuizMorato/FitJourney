import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import scanIcon from '../assets/scanIcon.webp';
import profileIcon from '../assets/exerciseIcon.png';
import statsIcon from '../assets/statsIcon.png';
import homeIcon from '../assets/homeicon.png';
import recipesIcon from '../assets/recipesIcon.png';

const CustomTabBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [email, setEmail] = useState(null);

  // Verificando se o parâmetro 'email' está disponível
  useEffect(() => {
    if (route.params && route.params.email) {
      setEmail(route.params.email);
    }
  }, [route.params]);

  // Definindo as abas
  const tabs = [
    { name: 'Home', icon: homeIcon },
    { name: 'Stats', icon: statsIcon },
    { name: 'Scan', icon: scanIcon },
    { name: 'AddFood', icon: recipesIcon },
    { name: 'Exercises', icon: profileIcon },
  ];

  if (!email) {
    // Enquanto o email não for carregado, exibe o loading
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0DE347" />
      </View>
    );
  }

  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab, index) => {
        const focused = route.name === tab.name;
        const iconSize = focused ? 44 : 33;
        const iconColor = focused ? '#FFFF' : 'gray';
        const iconBackgroundColor = focused ? '#0DE347' : 'transparent';

        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // Envia o email como parâmetro para a navegação
              navigation.navigate(tab.name, { email: email });
            }}
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

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
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
  },
};

export default CustomTabBar;
