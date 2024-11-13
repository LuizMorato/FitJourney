import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Plano de Exercícios</Text>

      <Text style={styles.subHeader}>Exercícios Populares</Text>

      {/* Adicionando ScrollView para rolagem horizontal dos banners 1 e 2 */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false} // Oculta a barra de rolagem, opcional
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={[styles.banner, styles.red]}
          onPress={() =>
            navigation.navigate('Exercicios', { tipo: 'Treinar em Casa' })
          }>
          <Text style={styles.bannerText2}>Treinar em Casa</Text>
          <Text style={styles.subText}>3 Exercícios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.banner, styles.black]}
          onPress={() =>
            navigation.navigate('Exercicios', { tipo: 'Alongamento em Casa' })
          }>
          <Text style={styles.bannerText2}>Alongamento em Casa</Text>
          <Text style={styles.subText}>3 Exercícios</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.subHeader}> (🚧 EM BREVE 🚧) Treinos da Comunidade</Text>

      {/* Banner 3 */}
      <TouchableOpacity
        style={[styles.banner, styles.orange, styles.spacedBanner]}
        onPress={() =>
          navigation.navigate('Exercicios', {
            tipo: 'Treino de Peito e Braços',
          })
        }>
        <Text style={styles.bannerText}>Treino de Peito e Braços</Text>
        <Text style={styles.subText}>10 Exercícios</Text>
      </TouchableOpacity>

      {/* Banner 4 */}
      <TouchableOpacity
        style={[styles.banner, styles.darkRed, styles.spacedBanner]}
        onPress={() =>
          navigation.navigate('Exercicios', { tipo: 'Cardio em Casa' })
        }>
        <Text style={styles.bannerText}>Cardio em Casa</Text>
        <Text style={styles.subText}>10 Exercícios</Text>
      </TouchableOpacity>

      {/* Banner 5 */}
      <TouchableOpacity
        style={[styles.banner, styles.brown, styles.spacedBanner]}
        onPress={() =>
          navigation.navigate('Exercicios', {
            tipo: 'Treino de Peito e Braços 2',
          })
        }>
        <Text style={styles.bannerText}>Treino de Peito e Braços 2</Text>
        <Text style={styles.subText}>10 Exercícios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },

  scrollContainer: {
    flex: 1,
    maxHeight: 200, // Definir altura máxima para limitar a rolagem
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: -50,
  },
  scrollContent: {
    paddingHorizontal: 40,
  },

    
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 40,
  },
  subHeader: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  banner: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  spacedBanner: {
    marginVertical: 10, // Adiciona espaçamento vertical
  },
  red: {
    backgroundColor: '#d9534f',
  },
  black: {
    backgroundColor: '#000',
  },
  orange: {
    backgroundColor: '#f0ad4e',
  },
  darkRed: {
    backgroundColor: '#c9302c',
  },
  brown: {
    backgroundColor: '#5e4b3a',
  },
  bannerText2: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  bannerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'space-between',
  },
  subText: {
    color: '#fff',
    fontSize: 16,
  },
});
