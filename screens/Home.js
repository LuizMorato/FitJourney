import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({ route, navigation }) {
  const { email } = route.params; // Obtém o e-mail dos parâmetros de rota
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para deslogar o usuário e voltar à tela de login
  function logout() {
    alert("Deslogado");
    navigation.replace('Login');
  }

  // UseEffect para buscar as informações do perfil do usuário pelo PHP
  useEffect(() => {
    if (email) {
      fetch(`https://home-fj-php.onrender.com/index.php?email=${email}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setProfileData(data.profile);
          } else {
            console.log("Erro ao buscar dados do perfil:", data.message);
          }
        })
        .catch(error => {
          console.error("Erro ao conectar com o servidor PHP:", error);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [email]);

  // Exibe um indicador de carregamento enquanto busca o perfil do usuário
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitJourney</Text>

      {/* Exibe o nome, sobrenome e a foto de perfil, se disponíveis */}
      {profileData && (
        <View style={styles.profileContainer}>
          {profileData.profileImage ? (
            <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
          ) : (
            <Icon name="user-circle" size={80} color="#aaa" />
          )}
          <Text style={styles.profileName}>
            {profileData.name || 'Usuário'} {profileData.surname || ''}
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
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
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  title: {
    fontSize: 45,
    fontFamily: 'Inter_800ExtraBold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingHorizontal: 20,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  analysisButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
});
