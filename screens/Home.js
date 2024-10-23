import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import firebase from '../firebase';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function App({ navigation }) {


  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para deslogar o usuário
  function logoutFirebase() {
    signOut(auth).then(() => {
      alert("Deslogado");
      navigation.replace('Login');
    }).catch((error) => {
      alert(`Erro: ${error}`);
    });
  }

  // UseEffect para atualizar o usuário quando o app carrega
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);  // Atualiza o estado com o usuário logado
    }
    setLoading(false);  // Termina o estado de carregamento
  }, [auth]);

  // Exibe um indicador de carregamento enquanto busca o usuário
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {/* Mostra o nome do usuário se estiver disponível */}
      <Text style={styles.title}>FitJourney</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={logoutFirebase}>
          <Icon name="sign-out" size={20} color="#fff" />
          <Text style={styles.buttonText}>Deslogar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.analysisButton} onPress={() => navigation.navigate('Analysis')}>
          <Text style={styles.buttonText}>Análise de Rótulos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Cor de fundo mais suave
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  title: {
    fontSize: 45,
    fontFamily: 'Inter_800ExtraBold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%', // Largura fixa para os botões
    paddingHorizontal: 20,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d', // Vermelho mais claro
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // Largura dos botões
  },
  analysisButton: {
    backgroundColor: '#4CAF50', // Verde para análise
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // Largura dos botões
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
});
