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
    { name: 'Plans', icon: statsIcon },
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

        // Ajustando estilos com base na aba e estado de foco
        const iconColor = tab.name === 'Scan' 
          ? focused 
            ? '#FFF' // Ícone branco ao ser selecionado
            : '#000' // Ícone preto quando não selecionado
          : focused 
            ? '#000' // Ícones das outras abas ficam pretos ao serem selecionados
            : 'gray'; // Cinza para ícones não focados

        const iconBackgroundColor = tab.name === 'Scan'
          ? focused 
            ? '#0DE347' // Fundo mais escuro para "Scan" ao ser selecionado
            : '#9CFF83' // Fundo padrão para "Scan"
          : 'transparent'; // Fundo transparente para as outras abas

        return (
          <View
            key={index}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
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
                  width: 35, // Tamanho fixo
                  height: 35, // Tamanho fixo
                  tintColor: iconColor,
                }}
              />
            </TouchableOpacity>

            {/* Mostra o traço abaixo do ícone se a aba está focada e não for "Scan" */}
            {focused && tab.name !== 'Scan' && (
              <View
                style={{
                  width: 20, // Largura do traço
                  height: 2, // Altura do traço
                  backgroundColor: '#000', // Cor do traço
                  position: 'absolute', // Garantindo que o traço não afete o layout
                  bottom: 10, // Ajuste o valor para subir o traço
                  borderRadius: 1, // Bordas arredondadas do traço
                }}
              />
            )}
          </View>
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
    height: 80, // Aumentado ligeiramente para ajustar a altura
    borderTopWidth: 2, // Espessura da borda
    borderColor: '#E5E4E2', // Cor da borda
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    // Efeito de sombra
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Cor da sombra para iOS
    shadowOffset: { width: 0, height: 3 }, // Deslocamento da sombra para iOS
    shadowOpacity: 0.2, // Opacidade da sombra para iOS
    shadowRadius: 4, // Raio da sombra para iOS
  },
};

export default CustomTabBar;
