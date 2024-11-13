import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/Navbar';

export default function Home({ route, navigation }) {
  // Função para formatar a data
  function formatDate(date) {
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    return `${dayOfWeek}. ${dayOfMonth}`;
  }

  const [selectedDate, setSelectedDate] = useState('');
  const [dateList, setDateList] = useState([]);
  
  useEffect(() => {
    // Função para gerar datas dinâmicas
    const generateDates = () => {
      const dates = [];
      const today = new Date();

      // Adiciona as três datas: ontem, hoje e amanhã
      for (let i = -1; i <= 1; i++) {
        const newDate = new Date();
        newDate.setDate(today.getDate() + i);
        dates.push(formatDate(newDate));
      }

      setDateList(dates);
      setSelectedDate(dates[1]); // Seleciona a data do meio como "hoje"
    };

    generateDates();
  }, []);

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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Exibe o nome, sobrenome e a foto de perfil, se disponíveis */}
        {profileData && (
          <View style={styles.profileContainer}>
            {profileData.profileImage ? (
              <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
            ) : (
              <Icon name="user-circle" size={40} color="#aaa" />
            )}
            <Text style={styles.headerText}>
              Olá {profileData.name || 'Usuário'} {profileData.surname || ''}!
            </Text>
          </View>
        )}
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </Text>
      </View>

      {/* Desafio diário */}
      <View style={styles.dailyChallenge}>
        <Text style={styles.dailyChallengeText}>Desafio diário</Text>
        <View style={styles.daySelector}>
          {dateList.map((date, index) => (
            <Text
              key={index}
              style={[styles.day, date === selectedDate && styles.selectedDay]}
              onPress={() => setSelectedDate(date)}
            >
              {date}
            </Text>
          ))}
        </View>
      </View>

      {/* Rotina de Hoje */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rotina de Hoje</Text>
        <View style={styles.routineItem}>
          <Text style={styles.routineText}>Água</Text>
          <Text style={styles.routineGoal}>Meta de água para beber</Text>
        </View>
        <View style={styles.routineItem}>
          <Text style={styles.routineText}>Exercícios</Text>
          <Text style={styles.routineGoal}>Meta de exercícios</Text>
        </View>
        <View style={styles.routineItem}>
          <Text style={styles.routineText}>Passos</Text>
          <Text style={styles.routineGoal}>Meta de caminhada</Text>
        </View>
      </View>

      {/* Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status</Text>
        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Proteínas</Text>
            <Text style={styles.statusValue}>112g</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Água</Text>
            <Text style={styles.statusValue}>2.6 Litros</Text>
          </View>
        </View>
        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Calorias</Text>
            <Text style={styles.statusValue}>680 Kcal</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Gorduras</Text>
            <Text style={styles.statusValue}>65g</Text>
          </View>
        </View>
      </View>

      {/* Navbar */}
      <Navbar navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
    paddingBottom: 120, // Ajustado para não sobrepor a Navbar
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 18,
    color: '#777',
  },
  dailyChallenge: {
    backgroundColor: '#DFFFD8',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  dailyChallengeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F9D27',
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  day: {
    fontSize: 16,
    color: '#555',
  },
  selectedDay: {
    color: '#000',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#2F9D27',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  routineItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  routineText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  routineGoal: {
    fontSize: 14,
    color: '#777',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 16,
    color: '#555',
  },
  statusValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  communityButton: {
    backgroundColor: '#2F9D27',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  communityButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1, // Isso faz com que a view ocupe toda a tela
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Uma leve transparência para não ocultar o fundo completamente
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Garante que fique acima de outros componentes
  },
});
