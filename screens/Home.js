import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/Navbar';
import { db } from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore';

const { width, height } = Dimensions.get('window');

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

  // UseEffect para buscar as informações do perfil do usuário via Firestore
  useEffect(() => {
    if (email) {
      const fetchUserProfile = async () => {
        try {
          const docRef = doc(db, 'users', email); // Referência ao documento do Firestore com o email do usuário
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProfileData(docSnap.data()); // Dados do perfil armazenados no Firestore
          } else {
            console.log("Não encontrou o documento do usuário!");
          }
        } catch (error) {
          console.error("Erro ao buscar dados do perfil:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
      </ScrollView>
      {/* Navbar */}
      <Navbar navigation={navigation} email={email} style={styles.navbarContainer}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: width * 0.04, // 4% da largura da tela
    paddingBottom: height * 0.15, // Ajustado para não sobrepor a Navbar
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
    width: width * 0.1, // 10% da largura
    height: width * 0.1,
    borderRadius: width * 0.05, // Metade da largura para manter o círculo
    marginRight: width * 0.03,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  dateText: {
    marginTop: 15,
    fontSize: 16,
    color: '#777',
  },
  dailyChallenge: {
    backgroundColor: '#DFFFD8',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  dailyChallengeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F9D27',
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  day: {
    fontSize: width * 0.035,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  routineItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  routineText: {
    fontSize: 14,
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
    width: '48%', // Dois itens ocupam 48% cada
    backgroundColor: '#FFF',
    padding: height * 0.02, // Dinâmico para diferentes tamanhos
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
    padding: height * 0.02, // Margem vertical proporcional
    borderRadius: 10,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  communityButtonText: {
    color: '#FFF',
    fontSize: 16,
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
    zIndex: 1,
    height: height * 0.1, // 10% da altura
  },
  scrollContent: {
    margin: 30,  // Espaço nas laterais
    marginBottom: height * 0.2,
    paddingBottom: 100, // Aumentando o espaço na parte inferior para garantir que o conteúdo tenha espaço
  },
});
