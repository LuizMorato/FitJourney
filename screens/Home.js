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
    const daysOfWeek = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    
    // Capitaliza a primeira letra do dia da semana e retorna a data formatada
    return `${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)} ${dayOfMonth}`;
  }

  // Teste da função
  const today = new Date();
  console.log(formatDate(today));

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
              <View style={styles.textContainer}>
                <Text style={styles.headerText}>
                  Olá {profileData.name || 'Usuário'} {profileData.surname || ''}!
                </Text>
                <Text style={styles.dateText}>
                  {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
                    .replace(/-feira/, '') // Remove a parte "-feira" do nome do dia da semana
                    .replace(/^./, (char) => char.toUpperCase())}  {/* Capitaliza a primeira letra */}
                </Text>
              </View>
              <Icon name="bell" size={24} color="black" style={styles.notificationIcon} />
            </View>
          )}
        </View>

        {/* Desafio diário */}
        <View style={styles.dailyChallenge}>
          <Text style={styles.dailyChallengeText}>Desafio diário</Text>
          <View style={styles.daySelector}>
            {dateList.map((date, index) => {
              const [dayOfWeek, dayOfMonth] = date.split(' '); // Separa o nome do dia e o número
              const isToday = date === selectedDate; // Verifica se é o dia selecionado (hoje)

              return (
                <View
                  key={index}
                  style={[styles.dayContainer, 
                    isToday 
                      ? styles.selectedDayContainer 
                      : styles.otherDayContainer
                  ]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text
                    style={[styles.day, isToday && styles.selectedDay]}
                  >
                    {dayOfWeek}
                  </Text>
                  <Text style={[styles.dayNumber, isToday && styles.selectedDayNumber]}>
                    {dayOfMonth}
                  </Text>
                </View>
              );
            })}
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
    padding: width * 0.06, // Reduzi o padding lateral para 6% da largura
    paddingBottom: height * 0.18, // Reduzi o padding inferior para dar um pouco mais de espaço
    fontFamily: 'Inter_400Regular',
  },
  header: {
    marginTop: 16, // Diminui o espaço superior
    marginBottom: 16, // Diminui o espaço inferior
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Inter_400Regular',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },
  profileImage: {
    width: width * 0.14, // Diminui um pouco a imagem do perfil
    height: width * 0.14,
    borderRadius: width * 0.07, // Ajusta o tamanho do círculo
    marginRight: width * 0.03, // Diminui o espaço entre a imagem e o texto
  },
  textContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Inter_400Regular',
  },
  dateText: {
    fontSize: 15, // Ajuste no tamanho da fonte
    fontWeight: 'bold',
    marginTop: 5,
    fontFamily: 'Inter_400Regular',
  },
  notificationIcon: {
    marginLeft: 8, // Diminui o espaço do ícone de notificação
    backgroundColor: 'transparent',
  },
  dailyChallenge: {
    backgroundColor: '#DFFFD8', 
    padding: 10, // Reduzi um pouco o padding para aproximar os itens
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center', // Para garantir alinhamento vertical
    justifyContent: 'space-between', // Mantenha a distribuição de espaço entre o texto e os dias
  },

  dailyChallengeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Inter_400Regular',
  },

  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',  // Muda para 'space-evenly' para deixar o espaçamento entre os itens mais controlado
    width: '60%',  // Diminui a largura total da seleção de dias
  },

  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 6, // Reduz a altura do padding para diminuir o espaço
    paddingHorizontal: 8, // Reduz a largura do padding para diminuir o espaço
    marginHorizontal: 5, // Adiciona uma pequena margem horizontal para garantir que não fiquem muito colados
  },

  day: {
    fontSize: width * 0.035,
    color: '#555',
    fontFamily: 'Inter_400Regular',
  },

  dayNumber: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Inter_400Regular',
  },

  selectedDayContainer: {
    backgroundColor: '#000',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  selectedDay: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Inter_400Regular',
  },
  selectedDayNumber: {
    color: '#fff',
    fontWeight: 'bold',
  },
  otherDayContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000', // Borda preta para os dias "ontem" e "amanhã"
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  section: {
    marginBottom: 16, // Diminui a margem inferior
    fontFamily: 'Inter_400Regular',
  },
  sectionTitle: {
    fontSize: 16, // Diminui o tamanho do título
    fontWeight: 'bold',
    marginBottom: 8, // Diminui a margem inferior
    fontFamily: 'Inter_400Regular',
  },
  routineItem: {
    paddingVertical: 10, // Reduz o padding vertical
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    fontFamily: 'Inter_400Regular',
  },
  routineText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Inter_400Regular',
  },
  routineGoal: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'Inter_400Regular',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Inter_400Regular',
  },
  statusItem: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: height * 0.02, // Ajuste no padding dinâmico
    borderRadius: 10,
    marginBottom: 10, // Diminui a margem inferior
    alignItems: 'center',
    fontFamily: 'Inter_400Regular',
  },
  statusLabel: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Inter_400Regular',
  },
  statusValue: {
    fontSize: 18, // Diminui um pouco o tamanho da fonte
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Inter_400Regular',
  },
  communityButton: {
    backgroundColor: '#2F9D27',
    padding: height * 0.02, // Ajuste no padding
    borderRadius: 10,
    alignItems: 'center',
    marginTop: height * 0.02, // Diminui o espaço superior
    fontFamily: 'Inter_400Regular',
  },
  communityButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter_400Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Inter_400Regular',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: height * 0.12,
    fontFamily: 'Inter_400Regular',
  },
  scrollContent: {
    margin: 24, // Diminui a margem geral
    marginBottom: height * 0.25,
    paddingBottom: 100,
    fontFamily: 'Inter_400Regular',
  },
});


