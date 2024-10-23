import React, { useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, 
    Inter_100Thin, 
    Inter_200ExtraLight, 
    Inter_300Light, 
    Inter_400Regular, 
    Inter_500Medium, 
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_800ExtraBold, 
 } from '@expo-google-fonts/inter';

// Evita que a tela de splash seja escondida automaticamente
SplashScreen.preventAutoHideAsync();

// DESCRIÇÃO: Tela de boas vindas ao FitJourney.
export default function Inicial({ navigation }) {
    const [fontsLoaded] = useFonts({
      Inter_100Thin,
      Inter_200ExtraLight,
      Inter_300Light,
      Inter_400Regular,
      Inter_500Medium,
      Inter_600SemiBold,
      Inter_700Bold,
      Inter_800ExtraBold,
    });

    // Previne o splash screen de desaparecer automaticamente
    useEffect(() => {
      async function prepare() {
        try {
          if (fontsLoaded) {
            // Esconde o splash screen quando as fontes estiverem carregadas
            await SplashScreen.hideAsync();
          }
        } catch (e) {
          console.warn(e);
        }
      }

      prepare();
    }, [fontsLoaded]); // Monitora o estado de carregamento das fontes

    // Se as fontes ainda não foram carregadas, não renderiza o conteúdo
    if (!fontsLoaded) {
      return null; // Mostra uma tela em branco até que as fontes carreguem
    }
    
    return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.subtitle}>
              Dê seu primeiro passo em direção a uma 
              <Text style={styles.phrase}> vida saudável</Text> com o
          </Text>
          <Text style={styles.title}>FitJourney</Text>
          <Text style={styles.slogan}>
              Seu parceiro pra uma 
              <Text style={styles.phrase}> vida saudável</Text>.
          </Text>
          <TouchableOpacity 
              style={styles.buttonStart} 
              onPress={() => navigation.navigate('Login')}
          >
              <Text style={styles.textButton}>Vamos lá?</Text>
          </TouchableOpacity>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 45,
      fontFamily: 'Inter_800ExtraBold'
    },
    subtitle: {
      fontSize: 20,
      padding: 15,
      textAlign: 'center',
      fontFamily: 'Inter_700Bold'
    },
    phrase: {
      color: "#0DE347",
    },
    slogan: {
      fontSize: 14,
      fontFamily: 'Inter_700Bold'
    },
    buttonStart: {
      height: 45,
      width: 185,
      borderWidth: 2,
      borderColor: 'black', 
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 80,
    },
    textButton: {
      fontFamily: 'Inter_800ExtraBold'
    }
});