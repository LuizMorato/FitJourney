import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/Navbar';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const { width, height } = Dimensions.get('window');

export default function Home({ route, navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [dateList, setDateList] = useState([]);
  const [checklist, setChecklist] = useState({
    agua: false,
    exercicios: false,
    passos: false,
  });

  const toggleItem = (key) => {
    setChecklist(prevChecklist => ({
      ...prevChecklist,
      [key]: !prevChecklist[key],
    }));
  };

  useEffect(() => {
    const generateDates = () => {
      const dates = [];
      const today = new Date();

      for (let i = -1; i <= 1; i++) {
        const newDate = new Date();
        newDate.setDate(today.getDate() + i);
        const daysOfWeek = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];
        const dayOfWeek = daysOfWeek[newDate.getDay()];
        const dayOfMonth = newDate.getDate();
        dates.push(`${dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)} ${dayOfMonth}`);
      }

      setDateList(dates);
      setSelectedDate(dates[1]);
    };

    generateDates();
  }, []);

  const { email, total_calories } = route.params;

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatValue = (value) => (value != null ? value : 0);

  useEffect(() => {
    if (email) {
      const fetchUserProfile = async () => {
        try {
          const docRef = doc(db, 'users', email);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProfileData(docSnap.data());
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
        <View style={styles.header}>
          {profileData && (
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Settings', { email })}
                style={styles.profileImageContainer}
              >
                {profileData.profileImage ? (
                  <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
                ) : (
                  <Icon name="user-circle" size={40} color="#aaa" />
                )}
              </TouchableOpacity>

              <View style={styles.textContainer}>
                <Text style={styles.headerText}>
                  Olá {profileData.name || 'Usuário'} {profileData.surname || ''}!
                </Text>
                <Text style={styles.dateText}>
                  {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
                    .replace(/-feira/, '')
                    .replace(/^./, (char) => char.toUpperCase())}
                </Text>
              </View>
              <Icon name="bell" size={24} color="black" style={styles.notificationIcon} onPress={() => navigation.navigate('Notifications', { email })}/>
            </View>
          )}
        </View>

        <View style={styles.dailyChallenge}>
          <Text style={styles.dailyChallengeText}>
            Desafio{'\n'}Diário
          </Text>
          <View style={styles.daySelector}>
            {dateList.map((date, index) => {
              const [dayOfWeek, dayOfMonth] = date.split(' ');
              const isToday = date === selectedDate;

              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dayContainer, isToday ? styles.selectedDayContainer : styles.otherDayContainer]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[styles.day, isToday && styles.selectedDay]}>{dayOfWeek}</Text>
                  <Text style={[styles.dayNumber, isToday && styles.selectedDayNumber]}>{dayOfMonth}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Rotina de Hoje</Text>
        <View style={styles.section}>
          <View style={styles.routineList}>
            {[
              { key: 'agua', title: 'Água', subtitle: 'Meta de água para beber', color: '#00CFFF' },
              { key: 'exercicios', title: 'Exercícios', subtitle: 'Meta de exercícios', color: '#FF6B6B' },
              { key: 'passos', title: 'Passos', subtitle: 'Meta de caminhada', color: '#FFB6C1' },
            ].map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.routineItem}
                onPress={() => toggleItem(item.key)}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.color }]} />
                <View style={styles.textContainer}>
                  <Text style={styles.routineTitle}>{item.title}</Text>
                  <Text style={styles.routineSubtitle}>{item.subtitle}</Text>
                </View>
                <Icon
                  name={checklist[item.key] ? 'check-circle' : 'circle-o'}
                  size={24}
                  color={checklist[item.key] ? '#00FF19' : '#CCC'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Status Nutricional</Text>
        <View style={styles.section}>
          <View style={styles.routineList}>
            {[
              { key: 'calories', title: 'Calorias', value: total_calories, color: '#FBB13C' },
            ].map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.routineItem}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.color }]} />
                <View style={styles.textContainer}>
                  <Text style={styles.routineTitle}>{item.title}</Text>
                  <Text style={styles.routineSubtitle}>
                    {formatValue(total_calories)} kcal
                  </Text>
                </View>
                <Icon
                  name="check-circle"
                  size={24}
                  color={item.value ? item.color : '#CCC'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
      <Navbar navigation={navigation} email={email} style={styles.navbarContainer} />
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
    backgroundColor: '#C5FFB7',
    padding: 15,
    borderRadius: 20,
    marginBottom: 16,
    flexDirection: 'row', // Coloca os itens na mesma linha
    alignItems: 'center', // Centraliza verticalmente
    justifyContent: 'space-between', // Espaça os itens horizontalmente
  },
  dailyChallengeText: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10, // Adiciona espaço à direita do texto
  },
  daySelector: {
    flexDirection: 'row', // Mantém os dias alinhados horizontalmente
    alignItems: 'center', // Centraliza os dias verticalmente
    justifyContent: 'center', // Centraliza os itens horizontalmente
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5, // Margem lateral entre os dias
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
    width: 60, // Define uma largura fixa para consistência
    height: 70, // Altura maior para o dia selecionado (hoje)
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDay: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedDayNumber: {
    color: '#fff',
    fontWeight: 'bold',
  },
  otherDayContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    width: 60, // Largura fixa
    height: 60, // Altura igual à largura para formar um quadrado
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 10,
    fontFamily: 'Inter_400Regular',
    backgroundColor: '#FFF', // Fundo branco
    padding: 20, // Espaçamento interno
    borderRadius: 8, // Bordas arredondadas
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: 'lightgray',
    elevation: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  sectionTitle: {
    fontSize: 16, // Diminui o tamanho do título
    fontWeight: 'bold',
    marginBottom: 8, // Diminui a margem inferior
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
  routineList: {
  marginTop: 10,
  },
  routineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  iconContainer: {
    width: 10,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  routineSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  statusCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },

});


